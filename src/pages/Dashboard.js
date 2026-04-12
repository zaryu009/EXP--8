import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";
import api from "../api/axios";

const pulseGlow = keyframes`
  0% { transform: scale(0.95); opacity: 0.45; }
  50% { transform: scale(1.08); opacity: 0.85; }
  100% { transform: scale(0.95); opacity: 0.45; }
`;

const floatCard = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

function Dashboard() {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: "",
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setState({
          loading: false,
          data: response.data,
          error: "",
        });
      } catch (error) {
        setState({
          loading: false,
          data: null,
          error:
            error.response?.data?.message || "Unable to load dashboard data.",
        });
      }
    };

    fetchDashboard();
  }, []);

  if (state.loading) {
    return <CircularProgress />;
  }

  const user = state.data?.user;
  const firstName = user?.name?.split(" ")[0] || "Customer";

  return (
    <Stack spacing={3}>
      {state.error ? (
        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={700}>
              User Dashboard
            </Typography>
            <Alert severity="error">{state.error}</Alert>
          </Stack>
        </Paper>
      ) : (
        <>
          <Paper
            sx={{
              position: "relative",
              overflow: "hidden",
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              color: "#fff",
              background:
                "linear-gradient(135deg, #07111f 0%, #12305d 45%, #4f46e5 100%)",
              boxShadow: "0 28px 60px rgba(12, 23, 47, 0.28)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 32%), radial-gradient(circle at bottom left, rgba(96,165,250,0.28), transparent 36%)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: -140,
                right: -120,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background: "rgba(103, 80, 255, 0.22)",
                filter: "blur(20px)",
                animation: `${pulseGlow} 5s ease-in-out infinite`,
              }}
            />
            <Grid container spacing={4} alignItems="center" sx={{ position: "relative" }}>
              <Grid item xs={12} md={7}>
                <Stack spacing={2.5}>
                  <Chip
                    label="Authenticated Session Active"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: alpha("#ffffff", 0.14),
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.16)",
                    }}
                  />
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{ lineHeight: 1.05, letterSpacing: "-0.03em" }}
                  >
                    Welcome customer, {firstName}.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ maxWidth: 560, color: "rgba(255,255,255,0.82)" }}
                  >
                    You are signed in as a customer user. Your personal
                    dashboard is active, while admin controls stay locked for
                    the reserved administrator account.
                  </Typography>
                  <Alert
                    severity="success"
                    sx={{
                      borderRadius: 3,
                      bgcolor: alpha("#081120", 0.42),
                      color: "#fff",
                      "& .MuiAlert-icon": {
                        color: "#7dd3fc",
                      },
                    }}
                  >
                    {state.data?.message}
                  </Alert>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    position: "relative",
                    mx: "auto",
                    width: { xs: 240, md: 300 },
                    height: { xs: 300, md: 360 },
                    animation: `${floatCard} 4.8s ease-in-out infinite`,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: "10% 12% 0",
                      borderRadius: "50% 50% 44% 44%",
                      background:
                        "radial-gradient(circle at 50% 35%, rgba(147,197,253,0.95), rgba(59,130,246,0.3) 48%, rgba(17,24,39,0) 72%)",
                      animation: `${pulseGlow} 4s ease-in-out infinite`,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: "6%",
                      borderRadius: "28px",
                      border: "1px solid rgba(255,255,255,0.18)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "16%",
                      left: "50%",
                      width: 108,
                      height: 108,
                      borderRadius: "50%",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(180deg, #dbeafe 0%, #60a5fa 65%, #1d4ed8 100%)",
                      boxShadow: "0 0 34px rgba(125, 211, 252, 0.45)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "36%",
                      left: "50%",
                      width: 154,
                      height: 168,
                      borderRadius: "44% 44% 18% 18%",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(180deg, #0f172a 0%, #111827 46%, #1e3a8a 100%)",
                      boxShadow: "0 18px 36px rgba(2, 6, 23, 0.42)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "43%",
                      left: "8%",
                      width: 86,
                      height: 24,
                      borderRadius: 999,
                      transform: "rotate(-28deg)",
                      background:
                        "linear-gradient(90deg, rgba(147,197,253,0.1), rgba(255,255,255,0.85), rgba(147,197,253,0.1))",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "43%",
                      right: "8%",
                      width: 86,
                      height: 24,
                      borderRadius: 999,
                      transform: "rotate(28deg)",
                      background:
                        "linear-gradient(90deg, rgba(147,197,253,0.1), rgba(255,255,255,0.85), rgba(147,197,253,0.1))",
                    }}
                  />
                  <Typography
                    variant="overline"
                    sx={{
                      position: "absolute",
                      bottom: 22,
                      left: 24,
                      letterSpacing: "0.3em",
                      color: "rgba(255,255,255,0.78)",
                    }}
                  >
                    HERO MODE
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(240,245,255,0.96))",
                }}
              >
                <Typography variant="overline" color="text.secondary">
                  Profile
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
                <Chip
                  label={user?.role?.toUpperCase()}
                  color={user?.role === "admin" ? "secondary" : "primary"}
                  sx={{ mt: 2 }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: "100%",
                  color: "#fff",
                  background:
                    "linear-gradient(120deg, #111827 0%, #172554 50%, #0f766e 100%)",
                  backgroundSize: "200% 200%",
                  animation: `${shimmer} 8s linear infinite alternate`,
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.72)" }}>
                    Dashboard Status
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    Your customer session is live and protected routes are unlocked.
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.82)" }}>
                    Standard users can enter this dashboard after login.
                    Administrative tools are restricted to the dedicated admin
                    account only.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
}

export default Dashboard;
