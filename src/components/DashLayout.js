import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashLayoutHeader from "./DashLayoutHeader";
import DashLayoutFooter from "./DashLayoutFooter";

function DashLayout({ auth, setAuth }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <DashLayoutHeader auth={auth} setAuth={setAuth} />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <DashLayoutFooter />
    </Box>
  );
}

export default DashLayout;
