import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute() {
  const authContext = useContext(AuthContext);
  if (!authContext?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
