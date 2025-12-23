import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};
