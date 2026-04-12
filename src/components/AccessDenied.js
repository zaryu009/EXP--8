import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function AccessDenied({ auth }) {
  return (
    <Paper
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 5,
        color: "#fff",
        background:
          "linear-gradient(135deg, #2b0a0a 0%, #5f1111 45%, #160405 100%)",
        boxShadow: "0 28px 60px rgba(67, 11, 11, 0.28)",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: "0.22em", color: "#fca5a5" }}>
            SECURE GATE
          </Typography>
          <Typography variant="h3" fontWeight={900}>
            Access Denied
          </Typography>
          <Typography sx={{ mt: 1.5, maxWidth: 640, color: "rgba(255,255,255,0.78)" }}>
            This page is only for the reserved administrator account. Customer
            users can use the simple dashboard, but admin tools stay locked.
          </Typography>
        </Box>

        <Alert
          severity="error"
          sx={{
            bgcolor: "rgba(32, 6, 6, 0.42)",
            color: "#fff",
            "& .MuiAlert-icon": { color: "#fca5a5" },
          }}
        >
          Only `aditya123@example.com` with password `aditya123` can open the
          admin interface.
        </Alert>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" color="error" component={RouterLink} to="/login">
            Admin Login
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to={auth?.token ? "/dashboard" : "/"}
            sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.32)" }}
          >
            Go to Customer Area
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default AccessDenied;
