import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes({ auth, allowedRoles = [] }) {
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(auth?.user?.role || "")
  ) {
    return <Navigate to="/access-denied" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
