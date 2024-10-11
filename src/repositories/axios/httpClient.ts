/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export abstract class HttpClient {
  protected instance: AxiosInstance | undefined;

  protected createInstance = (): AxiosInstance => {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.initializeResponseInterceptor();
    return this.instance;
  };

  readonly initializeResponseInterceptor = () => {
    this.instance?.interceptors.response.use(
      (response) => {
        // this.handleResponse,
        return response;
      },
      (error) => {
        return this.handleError(error);
      }
    );
    const token = localStorage.getItem("jwtToken");
    this.instance?.interceptors.request.use((config: any) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    });
  };

  // private handleResponse = ({ data }: AxiosResponse) => data;

  private handleError = (error: any) => Promise.reject(error);
}
