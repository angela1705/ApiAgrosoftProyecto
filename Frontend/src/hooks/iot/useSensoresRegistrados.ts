import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios"; 
import { addToast } from "@heroui/react";
import { Sensor } from "@/types/iot/type";
import { obtenerNuevoToken } from "@/components/utils/refresh";

const API_URL = "http://127.0.0.1:8000/iot/sensores/";

const fetchSensores = async (): Promise<Sensor[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    addToast({
      title: "Sesión expirada",
      description: "No se encontró el token de autenticación, por favor inicia sesión nuevamente.",
      timeout: 3000,
      color: "danger",
    });
    throw new Error("No se encontró el token de autenticación.");
  }

  try {
    const response = await api.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        addToast({
          title: "Sesión expirada",
          description: "No se encontró el refresh token, por favor inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        throw new Error("No se encontró el refresh token.");
      }
      try {
        const newToken = await obtenerNuevoToken(refreshToken);
        localStorage.setItem("access_token", newToken);
        const response = await api.get(API_URL, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data;
      } catch (refreshError) {
        addToast({
          title: "Sesión expirada",
          description: "No se pudo refrescar el token, por favor inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        throw new Error("No se pudo refrescar el token");
      }
    } else if (error.response?.status === 403) {
      addToast({
        title: "Acceso denegado",
        description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
        timeout: 3000,
        color: "danger",
      });
    } else {
      addToast({
        title: "Error",
        description: error.response?.data?.message || "Error al cargar los sensores",
        timeout: 3000,
        color: "danger",
      });
    }
    throw error;
  }
};

const updateSensor = async (sensor: Sensor) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    addToast({
      title: "Sesión expirada",
      description: "No se encontró el token de autenticación, por favor inicia sesión nuevamente.",
      timeout: 3000,
      color: "danger",
    });
    throw new Error("No se encontró el token de autenticación.");
  }

  try {
    const response = await api.put(`${API_URL}${sensor.id}/`, sensor, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        addToast({
          title: "Sesión expirada",
          description: "No se encontró el refresh token, por favor inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        throw new Error("No se encontró el refresh token.");
      }
      try {
        const newToken = await obtenerNuevoToken(refreshToken);
        localStorage.setItem("access_token", newToken);
        const response = await api.put(`${API_URL}${sensor.id}/`, sensor, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
        });
        return response.data;
      } catch (refreshError) {
        addToast({
          title: "Sesión expirada",
          description: "No se pudo refrescar el token, por favor inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        throw new Error("No se pudo refrescar el token");
      }
    } else if (error.response?.status === 403) {
      addToast({
        title: "Acceso denegado",
        description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
        timeout: 3000,
        color: "danger",
      });
    } else {
      addToast({
        title: "Error",
        description: error.response?.data?.message || "Error al actualizar el sensor",
        timeout: 3000,
        color: "danger",
      });
    }
    throw error;
  }
};

const deleteSensor = async (id: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    addToast({
      title: "Sesión expirada",
      description: "No se encontró el token de autenticación, por favor inicia sesión nuevamente.",
      timeout: 3000,
      color: "danger",
    });
    throw new Error("No se encontró el token de autenticación.");
  }

  try {
    await api.delete(`${API_URL}${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        addToast({
          title: "Sesión expirada",
          description: "No se encontró el refresh token, por favor inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        throw new Error("No se encontró el refresh token.");
      }
      try {
        const newToken = await obtenerNuevoToken(refreshToken);
        localStorage.setItem("access_token", newToken);
        await api.delete(`${API_URL}${id}/`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
      } catch (refreshError) {
        addToast({
          title: "Sesión expirada",
          description: "No se pudo refrescar el token, por favor inicia sesión nuevamente.",
          timeout: 3000,
          color: "danger",
        });
        throw new Error("No se pudo refrescar el token");
      }
    } else if (error.response?.status === 403) {
      addToast({
        title: "Acceso denegado",
        description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
        timeout: 3000,
        color: "danger",
      });
    } else {
      addToast({
        title: "Error",
        description: error.response?.data?.message || "Error al eliminar el sensor",
        timeout: 3000,
        color: "danger",
      });
    }
    throw error;
  }
};

export const useSensoresRegistrados = () => {
  const queryClient = useQueryClient();

  const { data: sensores, isLoading, error } = useQuery<Sensor[], Error>({
    queryKey: ["sensores"],
    queryFn: fetchSensores,
    staleTime: 1000 * 60,
  });

  const updateMutation = useMutation({
    mutationFn: updateSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({
        title: "Éxito",
        description: "Sensor actualizado con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: () => { 
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({
        title: "Éxito",
        description: "Sensor eliminado con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: () => { 
    },
  });

  return {
    sensores: sensores ?? [],
    isLoading,
    error,
    updateSensor: updateMutation,
    deleteSensor: deleteMutation,
  };
};