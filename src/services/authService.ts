import { LoginData } from "../types/user";
import apiClient from "./api";
import { handleApiResponse } from "./responseHandler";

interface LoginResponse {
  token: string;
}
export async function loginUser(data: LoginData) {
  const response = await apiClient.post("/auth/login", data);
  return handleApiResponse<LoginResponse>(response);
}

export async function registerUser(data: any) {
  const response = await apiClient.post("/users/register", data);
  return handleApiResponse(response);
}
