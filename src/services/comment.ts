import apiContext from "./api";
import { Comment, CommentResponse } from "../models/Comment";

export const getCommentsForPost = async (
  postId: bigint,
  userId: number
): Promise<CommentResponse[]> => {
  try {
    const response = await apiContext.get(`/${userId}/post/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (comment: Comment): Promise<Comment> => {
  try {
    const response = await apiContext.post("/comments", comment);
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
    const response = await apiContext.post(
      `/comment/${commentId}/like/${userId}`
    );
    return response.data; // Assuming the server returns the updated comment object
  } catch (error) {
    console.error("Error liking the comment:", error);
    throw error;
  }
};
