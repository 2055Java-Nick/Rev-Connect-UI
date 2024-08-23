import { useMutation } from "react-query";
import { loginUser, registerUser } from "../services/authService";

export function useLogin() {
  return useMutation(loginUser);
}

export function useRegister() {
  return useMutation(registerUser);
}

// in components
// const { mutate: loginUser, isLoading: isLoginLoading, error: loginError } = useLogin();
