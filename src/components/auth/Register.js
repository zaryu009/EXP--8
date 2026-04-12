import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
  name: "",
  email: "",
  password: "",
};

function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (formData) => {
    try {
      setAlert(null);

      const response = await api.post("/auth/register", formData);

      setAlert({
        severity: "success",
        message: response.data.message || "Registration successful.",
      });

      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful. Please login with your new account.",
        },
      });
    } catch (error) {
      setAlert({
        severity: "error",
        message:
          error.response?.data?.message ||
          "Unable to register. Please try again.",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Register a new customer account for this authentication demo.
            </Typography>
          </Box>

          {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />

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
                  "Register"
                )}
              </Button>
            </Stack>
          </Box>

          <Alert severity="info">
            Registration creates a customer account. Admin access is reserved.
          </Alert>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{" "}
            <Box component={RouterLink} to="/login" sx={{ color: "primary.main" }}>
              Login here
            </Box>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Register;
