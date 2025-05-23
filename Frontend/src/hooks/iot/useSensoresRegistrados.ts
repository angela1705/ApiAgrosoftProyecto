import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";
import { Sensor } from "@/types/iot/type";

const API_URL = "http://127.0.0.1:8000/iot/sensores/";

const fetchSensores = async (): Promise<Sensor[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  const response = await api.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateSensor = async (sensor: Sensor) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  const response = await api.put(`${API_URL}${sensor.id}/`, sensor, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteSensor = async (id: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  return api.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const toggleSensor = async ({ sensorId, newEstado }: { sensorId: number; newEstado: string }) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  return api.patch(`${API_URL}${sensorId}/`, { estado: newEstado }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useSensoresRegistrados = () => {
  const queryClient = useQueryClient();

  const sensoresQuery = useQuery<Sensor[], Error>({
    queryKey: ["sensores"],
    queryFn: fetchSensores,
  });

  const updateSensorMutation = useMutation({
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
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "warning",
        });
      } else {
        addToast({
          title: "Error",
          description: error.response?.data?.message || "Error al actualizar el sensor",
          timeout: 3000,
          color: "danger",
        });
      }
    },
  });

  const deleteSensorMutation = useMutation({
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
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "warning",
        });
      } else {
        addToast({
          title: "Error",
          description: error.response?.data?.message || "Error al eliminar el sensor",
          timeout: 3000,
          color: "danger",
        });
      }
    },
  });

  const toggleSensorMutation = useMutation({
    mutationFn: toggleSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "warning",
        });
      } else {
        addToast({
          title: "Error",
          description: error.response?.data?.message || "Error al cambiar el estado del sensor",
          timeout: 3000,
          color: "danger",
        });
      }
    },
  });

  return {
    sensores: sensoresQuery.data || [],
    isLoading: sensoresQuery.isLoading,
    error: sensoresQuery.error,
    updateSensor: updateSensorMutation,
    deleteSensor: deleteSensorMutation,
    toggleSensor: toggleSensorMutation,
  };
};