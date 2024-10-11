/* eslint @typescript-eslint/no-var-requires: "off" */

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { HotModuleReplacementPlugin } from "webpack";

module.exports = {
  //index file
  entry: path.resolve(__dirname, "src/index.tsx"),

  //Where we put the production code
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  // This says to webpack that we are in development mode and write the code in webpack file in different way
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
    plugins: [
      // Allows to use path aliases defined in tsconfig.json
      new TsconfigPathsPlugin(),
    ],
  },
  module: {
    /* ############################################################################# 
    # Asset Modules types replace all of these loaders by adding 4 new module types:
    #
    # asset/resource emits a separate file and exports the URL. 
    # - Previously achievable by using file-loader.
    # asset/inline exports a data URI of the asset. 
    # - Previously achievable by using url-loader.
    # asset/source exports the source code of the asset. 
    #- Previously achievable by using raw-loader.
    # asset automatically chooses between exporting a data URI and emitting a separate file. 
    # - Previously achievable by using url-loader with asset size limit.
    #
    ############################################################################# */

    rules: [
      //[0] Allows use typescript/javascript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/, //don't test node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      //[1] Allows use of CSS
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "style-loader",
        ],
      },
      //[2] Allows use of images
      {
        test: /\.(jpe?g|png|gif|svg)$/i, // a regular expression that catches images extensions
        exclude: /node_modules/,
        type: "asset/resource",
        // use: ["asset/resource", "asset/inline"],
      },
      //[3] Allows to import SVGR as React components.
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },
      //[4] Use asset SVG in the same project
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      //[5] Allows use of fonts
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // a regular expression that catches fonts extensions
        type: "asset/resource",
        // use: ["asset", "asset/resource"],
      },
    ],
  },
  plugins: [
    // Allows remove/clean the build folder
    new CleanWebpackPlugin(),
    // Allows update react components in real time
    new HotModuleReplacementPlugin(),
    // Allows to create an index.html in our build folder
    new HtmlWebpackPlugin({
      title: "PSN App",
      meta: {
        description: "PSN React App", // Will generate: <meta name="theme-color" content="#4285f4">
        //"theme-color": "#4285f4", // Will generate: <meta name="theme-color" content="#4285f4">
      },
      template: path.resolve(__dirname, "src/index.html"), //we put the file that we created in public folder
    }),
    // This get all our css and put in a unique file
    new MiniCssExtractPlugin({
      filename: "styles.[contentHash].css",
    }),
    // Load env vars
    new Dotenv({
      path: "./.env", // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
      //prefix: "import.meta.env.", // reference your env variables as 'import.meta.env.ENV_VAR'.
    }),
  ],
  // Config for webpack-dev-server module
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8001,
    // Aloows webapack-dev-ser write file to disk
    // devMiddleware: {
    //   writeToDisk: true,
    // },
    // open: "/",
    // hot: true,
    // http2: true,
    // https: {
    //   key: fs.readFileSync('/path/to/server.key'),
    //   cert: fs.readFileSync('/path/to/server.crt'),
    //   ca: fs.readFileSync('/path/to/ca.pem'),
    // }
  },
};
