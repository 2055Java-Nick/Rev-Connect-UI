import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/post';

export const createPost = async (formData: FormData) => {
    const response = await axios.post(API_BASE_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getPostById = async (id: bigint) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const updatePostById = async (id: bigint, title: string, content:string ) => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, { title, content });
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

export const updatePostPin = async (id: bigint,formData: FormData) => {
    const response = await axios.post(`${API_BASE_URL}/pin/${id}`,formData);
    return response.data;
};