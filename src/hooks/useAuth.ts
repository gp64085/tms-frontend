import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_STORAGE_KEY } from "../constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    return !!token;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    navigate("/login");
  };

  return {
    isAuthenticated,
    logout,
  };
};
