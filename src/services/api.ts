import axios from "axios";

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
