import { useAuthContext } from "./useAuthContext";

export function useAuth() {
  const { loginUser, logoutUser, registerUser, loading, error } =
    useAuthContext();

  return {
    handleLogin: loginUser,
    handleRegister: registerUser,
    handleLogout: logoutUser,
    loading,
    error,
  };
}
