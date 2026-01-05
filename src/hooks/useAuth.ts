import { AUTH_TOKEN_STORAGE_KEY } from "../constants";

export const useAuth = () => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  return {
    isAuthenticated: !!token,
  };
};
