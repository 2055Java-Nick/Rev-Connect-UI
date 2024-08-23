import { LoginData } from "../types/user";
import apiClient from "./api";
import { handleApiResponse } from "./responseHandler";

const BASE_URL = "/auth";
interface LoginResponse {
  token: string;
}
export async function loginUser(data: LoginData) {
  const response = await apiClient.post(`${BASE_URL}/login`, data);
  return handleApiResponse<LoginResponse>(response);
}

export async function registerUser(data: any) {
  const response = await apiClient.post("/users/register", data);
  return handleApiResponse(response);
}
