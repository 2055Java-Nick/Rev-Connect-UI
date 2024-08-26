import axios from "axios";
import log from "loglevel";

import { ApiError } from "./errors";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Inteceptors
// attach token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (
      token &&
      !config.url?.includes("/login") &&
      !config.url?.includes("/register")
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// global error handling if needed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.reponse) {
      const apiError = new ApiError(
        error.response.data?.message || "Ooops, an error occured",
        error.response.status,
        error.response.data?.details,
      );
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  },
);

// logging if needed
log.setLevel("INFO"); // set logging level to info

apiClient.interceptors.response.use(
  (response) => {
    log.info("API Response: ", response);
    return response;
  },
  (error) => {
    log.error("API Error: ", error);
    return Promise.reject(error);
  },
);

//connection api

// Send Connection Request:
const connection = 'connection'

export const sendConnectionRequest = async (requesterId: number, recipientId: number) => {
  try {
      const response = await axios.post(`/${connection}/send`, null, {
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
      const response = await axios.post(`/${connection}/accept/${requestId}`);
      return response.data;
  } catch (error) {
      console.error('Error accepting connection request:', error);
      throw error;
  }
};

// Reject Connection Request:
export const rejectConnectionRequest = async (requestId: number) => {
  try {
      const response = await axios.post(`/${connection}/reject/${requestId}`);
      return response.data;
  } catch (error) {
      console.error('Error rejecting connection request:', error);
      throw error;
  }
};

// Remove Connection:
export const removeConnection = async (connectionId: number) => {
  try {
    const response = await axios.delete(`/${connection}/remove/${connectionId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing connection:', error);
    throw error;
  }
};


// List Pending Connection Requests:
export const getPendingConnectionRequests = async (userId: number) => {
  try {
      const response = await axios.get(`/${connection}/pending/${userId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching pending connection requests:', error);
      throw error;
  }
};

// List All Connections:
export const getAllConnections = async () => {
  try {
      const response = await axios.get(`/${connection}/all`);
      return response.data;
  } catch (error) {
      console.error('Error fetching all connections:', error);
      throw error;
  }
};

// List Connections By User ID:
export const findConnectionsByUserId = async (userId: number) => {
  try {
      const response = await axios.get(`/${connection}/connections/${userId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching connections for user:', error);
      throw error;
  }
}

  // List users by query:
  export const searchUser = async (query: string, currentUserId: number) => {
      try {
        const response = await axios.get(`/${connection}/search/${query}`, {
          params: { currentUserId },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    };


export default apiClient;
