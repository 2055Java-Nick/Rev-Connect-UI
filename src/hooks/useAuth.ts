import { useState } from "react";
import { ApiError } from "../services/errors";
import { loginUser, registerUser } from "../services/authService";

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleLogin(username: string = "", password: string = "") {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.data.token); // { "token": <not-so-secret-token> }
      setLoading(false);
      return response;
    } catch (error) {
      setError(error as ApiError);
      setLoading(false);
      throw error;
    }
  }

  async function handleRegister(data: any) {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(data);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error as ApiError);
      setLoading(false);
      throw error;
    }
  }

  return {
    handleLogin,
    handleRegister,
    loading,
    error,
  };
}
