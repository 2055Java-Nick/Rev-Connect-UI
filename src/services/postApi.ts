import { PostUpdate } from "../types/postTypes";
import apiClient from "./api";
import { handleApiResponse } from "./responseHandler";

const BASE_URL = "/posts";

/**
 * Creates a new post.
 *
 * @param post - The post object containing title, content, etc.
 * @returns The Api response containing the newly created post.
 * @throws ApiError if the request fails.
 */
export async function createPost(post: PostUpdate) {
  const response = await apiClient.post(`${BASE_URL}`, post);
  return handleApiResponse(response);
}

export const getPostById = async (id: number) => {
  const response = await apiClient.get(`${BASE_URL}/${id}`);
  return handleApiResponse(response);
};

export const updatePost = async (post: PostUpdate) => {
  const response = await apiClient.put(`${BASE_URL}/${post.postId}`, post);
  return handleApiResponse(response);
};

export const deletePostById = async (id: number) => {
  const response = await apiClient.delete(`${BASE_URL}/${id}`);
  return handleApiResponse(response);
};

export const getPostsByPage = async (page: number) => {
  const response = await apiClient.get(`${BASE_URL}/recent?page=${page}`);
  return handleApiResponse(response);
};

export const getMediaByPostId = async (postId: number) => {
  const response = await apiClient.get(`${BASE_URL}/media/${postId}`);
  return handleApiResponse(response);
};
