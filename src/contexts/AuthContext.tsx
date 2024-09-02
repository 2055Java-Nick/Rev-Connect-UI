import { createContext, ReactNode, useContext, useState } from "react";
import {
  loginUser as authLoginUser,
  registerUser as authRegisterUser,
} from "../services/authService";
import { AuthContextProps } from "../types/props";
import { Post } from "../types/postTypes";
import { ApiError } from "../services/errors";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authLoginUser({ username, password });
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const registerUser = async (data: Post) => {
    setLoading(true);
    setError(null);
    try {
      await authRegisterUser(data);
    } catch (err) {
      setError(err as ApiError);
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
