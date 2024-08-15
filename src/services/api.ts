import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/post';

export const createPost = async (text: string) => {
    const response = await axios.post(API_BASE_URL, { text });
    return response.data;
};

export const getPostById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const updatePostById = async (id: number, text: string) => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, { text });
    return response.data;
};

export const deletePostById = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};

// export const getAllPosts = async () => {
//     const response = await axios.get(`${API_BASE_URL}`);
//     return response.data;
// };
