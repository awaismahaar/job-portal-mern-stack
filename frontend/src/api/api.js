import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials : true,
});

// for request
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// for response
api.interceptors.response.use(
    (response) => {
      
      return response;
    },
    (error) => {
      // Handle response errors
      return Promise.reject(error);
    }
)
export default api;
