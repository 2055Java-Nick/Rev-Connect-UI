import apiClient from "./api";
import { handleApiResponse } from "./responseHandler";

interface PostResponse {
    
}

export async function getPosts() {
  const response = await apiClient.post("/auth/login");
  return handleApiResponse<PostResponse>(response);
}