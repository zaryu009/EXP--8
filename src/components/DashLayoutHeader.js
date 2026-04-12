import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function DashLayoutHeader({ auth, setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setAuth({ token: null, user: null });
    navigate("/login", {
      replace: true,
      state: { message: "You have been logged out successfully." },
    });
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}
        >
          Auth System
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          {auth?.token ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              {auth?.user?.role === "admin" && (
                <Button color="inherit" component={RouterLink} to="/admin">
                  Admin
                </Button>
              )}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="body2">
                  {auth?.user?.name} ({auth?.user?.role})
                </Typography>
              </Box>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default DashLayoutHeader;
