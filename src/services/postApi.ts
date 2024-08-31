//const BASE_URL = import.meta.env.VITE_API_URL; // This pulls the base URL from your .env file

export const createPost = async (formData: FormData) => {
  console.log(formData.values());
  const response = await apiClient.post(`/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
import { Post, PostUpdate } from "../types/postTypes";
import apiClient from "./api";

export const getPostById = async (id: number) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export const updatePostById = async (post: PostUpdate) => {
  console.log(post);
  const response = await apiClient.put(`/posts/${post.postId}`, post);
  return response.data;
};

export const deletePostById = async (id: number) => {
  const response = await apiClient.delete(`/posts/${id}`);
  return response.data;
};

export const getPostsByPage = async (page: number) => {
  const response = await apiClient.get(`/posts`);
  return response.data;
};

export const getMediaByPostId = async (postId: number) => {
  const response = await apiClient.get(`/posts/media/${postId}`);
  return response.data;
};
