// src/api/api.ts
import axios from "axios";
import { getTokenFromStore } from "../lib/get-token";
import skipAuthPaths from "./skip-path";
import { showToast } from "@/components/toast";

// const baseUrl = "https://quagga-driving-socially.ngrok-free.app";
const baseUrl = "https://astrosevaa.com";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    // "Content-Type": "multipart/form-data",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  async (config) => {
    const urlPath = config.url || "";

    const shouldSkip = skipAuthPaths.some((path: string) =>
      urlPath.startsWith(path)
    );
    const token = shouldSkip ? "" : getTokenFromStore();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    showToast.error(error.message || "Something went wrong");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.msg || error.message || "Something went wrong";
    showToast.error(message || "Something went wrong");

    return Promise.reject(error);
  }
);

export default api;
