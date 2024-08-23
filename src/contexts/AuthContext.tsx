import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextProps } from "../types/props";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const { handleLogin, handleRegister, loading, error } = useAuth();

  async function loginUser(username: string, password: string) {
    const response = await handleLogin(username, password);
    setToken(response.data.token);
  }

  async function registerUser(data: any) {
    await handleRegister(data);
  }

  async function logoutUser() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        loginUser,
        registerUser,
        logoutUser,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be within AuthProvider");
  }
  return context;
}
