import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DashLayout from "./components/DashLayout";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AccessDenied from "./components/AccessDenied";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b57d0",
    },
    secondary: {
      main: "#0f766e",
    },
    background: {
      default: "#f4f7fb",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function getInitialAuth() {
  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("authUser");

  return {
    token: token || null,
    user: storedUser ? JSON.parse(storedUser) : null,
  };
}

function App() {
  const [auth, setAuth] = useState(getInitialAuth);

  useEffect(() => {
    const handleUnauthorized = () => {
      setAuth({ token: null, user: null });
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<DashLayout auth={auth} setAuth={setAuth} />}>
          <Route path="/" element={<Home auth={auth} />} />
          <Route
            path="/login"
            element={
              auth?.token ? (
                <Navigate
                  to={auth?.user?.role === "admin" ? "/admin" : "/dashboard"}
                  replace
                />
              ) : (
                <Login setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/register"
            element={
              auth?.token ? (
                <Navigate
                  to={auth?.user?.role === "admin" ? "/admin" : "/dashboard"}
                  replace
                />
              ) : (
                <Register />
              )
            }
          />

          <Route path="/access-denied" element={<AccessDenied auth={auth} />} />

          <Route element={<ProtectedRoutes auth={auth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            element={<ProtectedRoutes auth={auth} allowedRoles={["admin"]} />}
          >
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
