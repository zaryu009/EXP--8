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

const radarSweep = keyframes`
  0% { transform: rotate(0deg); opacity: 0.55; }
  100% { transform: rotate(360deg); opacity: 0.95; }
`;

const panelPulse = keyframes`
  0% { box-shadow: 0 0 0 rgba(56, 189, 248, 0.15); }
  50% { box-shadow: 0 0 40px rgba(56, 189, 248, 0.2); }
  100% { box-shadow: 0 0 0 rgba(56, 189, 248, 0.15); }
`;

function Admin() {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: "",
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get("/admin");
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
            error.response?.data?.message || "Unable to load admin data.",
        });
      }
    };

    fetchAdmin();
  }, []);

  if (state.loading) {
    return <CircularProgress />;
  }

  const admin = state.data?.currentUser;
  const users = state.data?.users || [];

  return (
    <Stack spacing={3}>
      <Paper
        sx={{
          position: "relative",
          overflow: "hidden",
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          color: "#dff7ff",
          background:
            "radial-gradient(circle at top, rgba(34,211,238,0.22), transparent 30%), linear-gradient(135deg, #020617 0%, #082f49 40%, #031525 100%)",
          border: "1px solid rgba(103, 232, 249, 0.2)",
          animation: `${panelPulse} 4.5s ease-in-out infinite`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(125, 211, 252, 0.22)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -110,
            right: -110,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, rgba(34,211,238,0.02), rgba(34,211,238,0.38), rgba(34,211,238,0.02))",
            animation: `${radarSweep} 5s linear infinite`,
          }}
        />

        {state.error ? (
          <Stack spacing={2} sx={{ position: "relative" }}>
            <Typography variant="h4" fontWeight={800}>
              Admin Command Center
            </Typography>
            <Alert severity="error">{state.error}</Alert>
          </Stack>
        ) : (
          <Grid container spacing={3} sx={{ position: "relative" }}>
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Chip
                  label="JARVIS MODE ACTIVE"
                  sx={{
                    alignSelf: "flex-start",
                    color: "#a5f3fc",
                    bgcolor: alpha("#67e8f9", 0.12),
                    border: "1px solid rgba(103, 232, 249, 0.28)",
                    letterSpacing: "0.18em",
                  }}
                />
                <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em" }}>
                  Welcome Admin Sir
                </Typography>
                <Typography sx={{ maxWidth: 560, color: "rgba(223,247,255,0.82)" }}>
                  Secure administrator access verified for {admin?.email}. All
                  other users are blocked from this command center.
                </Typography>
                <Alert
                  severity="success"
                  sx={{
                    color: "#dff7ff",
                    bgcolor: alpha("#082f49", 0.74),
                    border: "1px solid rgba(103, 232, 249, 0.22)",
                    "& .MuiAlert-icon": {
                      color: "#67e8f9",
                    },
                  }}
                >
                  {state.data?.message}
                </Alert>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  color: "#dff7ff",
                  bgcolor: "rgba(2, 6, 23, 0.45)",
                  border: "1px solid rgba(103, 232, 249, 0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="overline" sx={{ color: "#67e8f9", letterSpacing: "0.2em" }}>
                    ADMIN ID
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {admin?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(223,247,255,0.72)" }}>
                    {admin?.email}
                  </Typography>
                  <Chip
                    label={(admin?.role || "admin").toUpperCase()}
                    sx={{
                      alignSelf: "flex-start",
                      color: "#031525",
                      bgcolor: "#67e8f9",
                      fontWeight: 700,
                    }}
                  />
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  bgcolor: "rgba(2, 6, 23, 0.54)",
                  color: "#dff7ff",
                  border: "1px solid rgba(103, 232, 249, 0.14)",
                }}
              >
                <Typography variant="overline" sx={{ color: "#67e8f9", letterSpacing: "0.18em" }}>
                  ACCESS
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  Restricted
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(223,247,255,0.74)" }}>
                  Only `aditya123@example.com` with password `aditya123`
                  can enter this route and load these APIs.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  bgcolor: "rgba(2, 6, 23, 0.54)",
                  color: "#dff7ff",
                  border: "1px solid rgba(103, 232, 249, 0.14)",
                }}
              >
                <Typography variant="overline" sx={{ color: "#67e8f9", letterSpacing: "0.18em" }}>
                  USERS
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  {users.length}
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(223,247,255,0.74)" }}>
                  Registered accounts visible from the protected admin API.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  bgcolor: "rgba(2, 6, 23, 0.54)",
                  color: "#dff7ff",
                  border: "1px solid rgba(103, 232, 249, 0.14)",
                }}
              >
                <Typography variant="overline" sx={{ color: "#67e8f9", letterSpacing: "0.18em" }}>
                  STATUS
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  Online
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(223,247,255,0.74)" }}>
                  JWT verification, role guard, and admin API protection are active.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "rgba(2, 6, 23, 0.62)",
                  color: "#dff7ff",
                  border: "1px solid rgba(103, 232, 249, 0.14)",
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={700}>
                    Authorized User Feed
                  </Typography>
                  {users.map((user) => (
                    <Paper
                      key={user._id}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "rgba(8, 47, 73, 0.5)",
                        color: "#dff7ff",
                        border: "1px solid rgba(103, 232, 249, 0.12)",
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography fontWeight={700}>{user.name}</Typography>
                          <Typography variant="body2" sx={{ color: "rgba(223,247,255,0.72)" }}>
                            {user.email}
                          </Typography>
                        </Box>
                        <Chip
                          label={user.role}
                          sx={{
                            alignSelf: { xs: "flex-start", sm: "center" },
                            color: user.role === "admin" ? "#031525" : "#dff7ff",
                            bgcolor: user.role === "admin" ? "#67e8f9" : "rgba(103, 232, 249, 0.12)",
                            border: "1px solid rgba(103, 232, 249, 0.2)",
                            textTransform: "uppercase",
                            fontWeight: 700,
                          }}
                        />
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Stack>
  );
}

export default Admin;
