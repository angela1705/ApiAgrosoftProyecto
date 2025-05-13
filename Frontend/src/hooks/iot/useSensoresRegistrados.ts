import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Sensor } from "@/types/iot/type";

const API_URL = "http://192.168.1.12:8000/iot/sensores/";

const fetchSensores = async (): Promise<Sensor[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateSensor = async (sensor: Sensor) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await axios.patch(`${API_URL}${sensor.id}/`, sensor, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteSensor = async (id: number) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useSensoresRegistrados = () => {
  const queryClient = useQueryClient();

  const { data: sensores = [], isLoading, error } = useQuery<Sensor[], Error>({
    queryKey: ["sensores"],
    queryFn: fetchSensores,
  });

  const updateMutation = useMutation({
    mutationFn: updateSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({ title: "Éxito", description: "Sensor actualizado con éxito" });
    },
    onError: () => {
      addToast({ title: "Error", description: "Error al actualizar el sensor" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({ title: "Éxito", description: "Sensor eliminado con éxito" });
    },
    onError: () => {
      addToast({ title: "Error", description: "Error al eliminar el sensor" });
    },
  });

  return {
    sensores,
    isLoading,
    error,
    updateSensor: updateMutation,
    deleteSensor: deleteMutation,
  };
};