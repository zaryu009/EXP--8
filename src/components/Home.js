import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home({ auth }) {
  return (
    <Stack spacing={3}>
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eff6ff 45%, #e0f2fe 100%)",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h3" fontWeight={800}>
            Choose Your Interface
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            Two entry points are available here: an admin-only JARVIS-style
            interface and a simple customer interface. Anyone other than the
            reserved admin account will see access denied for admin pages.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Chip
              label="Reserved admin: aditya123@example.com"
              color="secondary"
              sx={{ fontWeight: 700 }}
            />
            <Chip label="Customer accounts use the simple dashboard" />
          </Stack>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3.5,
              height: "100%",
              borderRadius: 5,
              color: "#dff7ff",
              background:
                "linear-gradient(135deg, #020617 0%, #082f49 40%, #031525 100%)",
            }}
          >
            <Stack spacing={2.5} height="100%">
              <Avatar sx={{ width: 68, height: 68, bgcolor: "rgba(103,232,249,0.18)", fontSize: 32 }}>
                A
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Admin
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(223,247,255,0.76)" }}>
                  JARVIS-style control panel with total users, protected admin
                  APIs, and strict admin-only access.
                </Typography>
              </Box>
              <Alert
                severity="info"
                sx={{
                  bgcolor: "rgba(8, 47, 73, 0.66)",
                  color: "#dff7ff",
                  "& .MuiAlert-icon": { color: "#67e8f9" },
                }}
              >
                Only `aditya123@example.com` / `aditya123` can enter.
              </Alert>
              <Box sx={{ mt: "auto" }}>
                <Button
                  fullWidth
                  variant="contained"
                  component={RouterLink}
                  to={auth?.user?.role === "admin" ? "/admin" : "/login"}
                  color="secondary"
                >
                  Open Admin Interface
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3.5,
              height: "100%",
              borderRadius: 5,
              background:
                "linear-gradient(135deg, #ffffff 0%, #eff6ff 60%, #ecfeff 100%)",
            }}
          >
            <Stack spacing={2.5} height="100%">
              <Avatar sx={{ width: 68, height: 68, bgcolor: "#dbeafe", color: "#1d4ed8", fontSize: 32 }}>
                C
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Customer
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Simple interface for regular users with a personal dashboard
                  after login.
                </Typography>
              </Box>
              <Alert severity="success">
                Regular registered users can log in here and use the customer dashboard.
              </Alert>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: "auto" }}>
                <Button fullWidth variant="contained" component={RouterLink} to="/login">
                  Customer Login
                </Button>
                <Button fullWidth variant="outlined" component={RouterLink} to="/register">
                  Register
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {!auth?.token && (
        <Alert severity="warning">
          Login is required to access the customer dashboard. Admin pages also
          require the reserved admin account.
        </Alert>
      )}
    </Stack>
  );
}

export default Home;
