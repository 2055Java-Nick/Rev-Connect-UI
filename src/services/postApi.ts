import axios from 'axios';
import apiClient from './api';
const BASE_URL = import.meta.env.VITE_API_URL; // This pulls the base URL from your .env file

export const createPost = async (formData: FormData) => {
    const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getPostById = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/posts/${id}`);
    return response.data;
};

export const updatePostById = async (id: number, title: string, content: string) => {
    const response = await axios.patch(`${BASE_URL}/posts/${id}`, { title, content });
    return response.data;
};

export const deletePostById = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/posts/${id}`);
    return response.data;
};

export const getPostsByPage = async (page: number) => {
    console.log(BASE_URL)
    const response = await apiClient.get(`${BASE_URL}/posts?page=${page}`);
    console.log("API PAGE:",response.data)
    return response.data;
};

export const getMediaByPostId = async (postId: number) => {
    const response = await axios.get(`${BASE_URL}/posts/media/${postId}`);
    return response.data;
};
