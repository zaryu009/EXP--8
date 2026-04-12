import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api/axios";

const defaultValues = {
  email: "",
  password: "",
};

function Login({ setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (location.state?.message) {
      setAlert({
        severity: "info",
        message: location.state.message,
      });
    }
  }, [location.state]);

  const onSubmit = async (formData) => {
    try {
      setAlert(null);

      const response = await api.post("/auth/login", formData);
      const { token, user, message } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      setAuth({ token, user });

      setAlert({
        severity: "success",
        message: message || "Login successful.",
      });

      const redirectTo =
        user?.role === "admin"
          ? "/admin"
          : location.state?.from?.pathname && location.state.from.pathname !== "/admin"
            ? location.state.from.pathname
            : "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setAlert({
        severity: "error",
        message:
          error.response?.data?.message || "Unable to login. Please try again.",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Login to access the customer dashboard or the reserved admin area.
            </Typography>
          </Box>

          {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    autoComplete="email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ py: 1.4 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
          </Box>

          <Alert severity="info">
            Customer accounts can register normally. Admin access is reserved
            for `aditya123@example.com` with password `aditya123` only.
          </Alert>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Login;
