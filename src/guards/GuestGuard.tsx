import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const GuestGuard = () => {
  const { isAuthenticated } = useAuth();

  // If already authenticated, redirect to Dashboard
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
