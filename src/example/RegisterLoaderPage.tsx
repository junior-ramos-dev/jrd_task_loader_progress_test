import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";

import { TaskLoaderProgress } from "../../node_modules/jrd_task_loader_progress/dist";
import AuthRepository, {
  IRegisterRequest,
  User,
} from "../repositories/AuthRepository";

import { RingProgressBar } from "./RingProgressBar";

const authRepository: AuthRepository = new AuthRepository();
authRepository.setEndpointPath("task");

const RegisterLoaderPage = () => {
  const [returnData, setReturnData] = useState<User>();
  const [request, setRequest] = useState<IRegisterRequest>();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (returnData) {
      setIsLoading(false);
    }
  }, [returnData]);

  const getData = (user: User) => {
    setEmail("");
    setPassword("");
    setReturnData(user);
  };

  const handleRegister = async () => {
    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      try {
        const registerRequest: IRegisterRequest = {
          email: email,
          password: password,
        };

        setRequest(registerRequest);

        setIsLoading(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };

  if (isLoading)
    return (
      <TaskLoaderProgress<User, IRegisterRequest>
        taskLoader={authRepository.register}
        returnData={getData}
        request={request}
        totalTasks={8}
      >
        <RingProgressBar />
      </TaskLoaderProgress>
    );

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Register</Typography>
        {returnData ? (
          <Box
            component="div"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={(theme) => ({
              display: "block",
              p: 1,
              m: 1,
              bgcolor: theme.palette.success.main,
              color: theme.palette.success.contrastText,
              border: "1px solid",
              borderColor: theme.palette.success.main,
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            })}
          >
            <Typography variant="h5" sx={{ fontSize: 14 }}>
              Success!!
            </Typography>
            <Typography variant="h5" sx={{ fontSize: 14 }}>
              User Id: {returnData.id}
            </Typography>
            <Typography variant="h5" sx={{ fontSize: 14 }}>
              Email: {returnData.email}
            </Typography>
          </Box>
        ) : (
          <></>
        )}
        <Box sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid2>
          </Grid2>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
          {/* <Grid2 container justifyContent="flex-end">
            <Grid2 size={6}>
              <Link to="/auth/login">Already have an account? Login</Link>
            </Grid2>
          </Grid2> */}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterLoaderPage;
