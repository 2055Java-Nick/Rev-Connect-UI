// src/services/apiService.ts

import axios from 'axios';

// Set the base URL for the API
const BASE_URL = 'http://localhost:8080/connect';

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL: BASE_URL
});

// Send Connection Request:
export const sendConnectionRequest = async (requesterId: number, recipientId: number) => {
    try {
        const response = await api.post('/send', null, {
            params: {
                requesterId,
                recipientId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending connection request:', error);
        throw error;
    }
};

// Accept Connection Request:
export const acceptConnectionRequest = async (requestId: number) => {
    try {
        const response = await api.post(`/accept/${requestId}`);
        return response.data;
    } catch (error) {
        console.error('Error accepting connection request:', error);
        throw error;
    }
};

// Reject Connection Request:
export const rejectConnectionRequest = async (requestId: number) => {
    try {
        const response = await api.post(`/reject/${requestId}`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting connection request:', error);
        throw error;
    }
};

// List Pending Connection Requests:
export const getPendingConnectionRequests = async (userId: number) => {
    try {
        const response = await api.get(`/pending/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pending connection requests:', error);
        throw error;
    }
};

// List All Connections:
export const getAllConnections = async () => {
    try {
        const response = await api.get('/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching all connections:', error);
        throw error;
    }
};

// List Connections By User ID:
export const findConnectionsByUserId = async (userId: number) => {
    try {
        const response = await api.get(`/connections/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching connections for user:', error);
        throw error;
    }
}

    // List users by query:
    export const searchUser = async (query: string) => {
        try {
            const response = await api.get(`/search/${query}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
