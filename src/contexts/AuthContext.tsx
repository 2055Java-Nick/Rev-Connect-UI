/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useState } from "react";
import {
  loginUser as authLoginUser,
  registerUser as authRegisterUser,
} from "../services/authService";
import { AuthContextProps } from "../types/props";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authLoginUser({ username, password });
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const registerUser = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      await authRegisterUser(data);
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        loginUser,
        logoutUser,
        registerUser,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
