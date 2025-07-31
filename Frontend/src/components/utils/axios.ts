import axios from "axios";
import { addToast } from "@heroui/react";
import { obtenerNuevoToken } from "./refresh";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8000`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/iot/datosmeteorologicos/")) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const newToken = await obtenerNuevoToken(refreshToken);
        localStorage.setItem("access_token", newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        addToast({
          title: "Error",
          description: "Token expirado. Inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;