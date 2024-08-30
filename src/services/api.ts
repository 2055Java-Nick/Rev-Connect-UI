import axios from "axios";
import { CommentResponse } from "../models/CommentModel";
import { PostResponse } from "../models/PostModel";

const API_BASE_URL = "http://localhost:8080/api/post";

const apiContext = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiContext;

export const createPost = async (formData: FormData) => {
  const response = await axios.post(API_BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getPostById = async (id: bigint) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updatePostById = async (
  id: bigint,
  title: string,
  content: string
) => {
  const response = await axios.patch(`${API_BASE_URL}/${id}`, {
    title,
    content,
  });
  return response.data;
};

export const deletePostById = async (id: bigint) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getPostsByPage = async (page: number) => {
  const response = await axios.get(`${API_BASE_URL}?page=${page}`);
  return response.data;
};

export const getMediaByPostId = async (postId: bigint) => {
  const response = await axios.get(`${API_BASE_URL}/media/${postId}`);
  return response.data;
};

export const getCommentsForPost = async (
  postId: bigint,
  userId: number //Leaving it here incase we want to search a post by userId
): Promise<CommentResponse[]> => {
  try {
    const response = await apiContext.get(`${API_BASE_URL}/${postId}/comment`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (comment: Comment): Promise<CommentResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comment`,comment);
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
    // Make a PUT request to like the comment
    const response = await axios.put(
      `${API_BASE_URL}/comment/${commentId}/like`,
      null,
      {
        params: { userId } // Send userId as a query parameter
      }
    );
    return response.data; // Assuming the server returns the updated comment object
  } catch (error) {
    console.error("Error liking the comment:", error);
    throw error;
  }
};

export const likePost = async (
  postId: bigint,
  userId: number
): Promise<PostResponse> => {
  try {
    // Make a PUT request to like the comment
    const response = await axios.put(
      `${API_BASE_URL}/${postId}/like`,
      null, // PUT request with no body
      {
        params: { userId } // Send userId as a query parameter
      }
    );
    return response.data; // Assuming the server returns the updated comment object
  } catch (error) {
    console.error("Error liking the comment:", error);
    throw error;
  }
};
