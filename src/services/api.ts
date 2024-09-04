import axios from "axios";
import log from "loglevel";

import { ApiError } from "./errors";
import { redirect } from "react-router-dom";

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
  }
);

// global error handling if needed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.reponse) {
      const statusCode = error.response.status;
      let message = error.response.data?.message || "An error occured";

      if (statusCode === 401) {
        message = "Unauthorized access - please log in.";
        redirect("/login");
      }
      if (statusCode === 403) {
        message = "You do not have permission to perform this action.";
      }

      const apiError = new ApiError(
        message || "Ooops, an error occured",
        statusCode,
        error.response.data?.details
      );
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);

// logging if needed
// TODO: remove in production, or setLevel("WARN") and log errors
log.setLevel("INFO"); // set logging level to info

apiClient.interceptors.response.use(
  (response) => {
    log.info("API Response: ", response);
    return response;
  },
  (error) => {
    log.error("API Error: ", error);
    return Promise.reject(error);
  }
);

export default apiClient;
