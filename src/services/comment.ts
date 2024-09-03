import apiClient from "./api";
import { Comment, CommentResponse } from "../models/CommentModel";
const BASE_URL = import.meta.env.VITE_API_URL; // This pulls the base URL from your .env file
export const getCommentsForPost = async (
  postId: number,
  userId: number
): Promise<CommentResponse[]> => {
  try {
    const response = await apiClient.get(`${BASE_URL}/posts/${postId}/comment`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (comment: Comment): Promise<Comment> => {
  try {
    const response = await apiClient.post(`${BASE_URL}/posts/comment`, comment);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const likeComment = async (
  commentId: number,
  userId: number
): Promise<Comment> => {
  try {
    // Make a POST request to like the comment
    console.log(commentId,userId)
    const response = await apiClient.put(`${BASE_URL}/posts/comment/${commentId}/like?userId=${userId}`);
    return response.data; // Assuming the server returns the updated comment object
  } catch (error) {
    console.error("Error liking the comment:", error);
    throw error;
  }
};