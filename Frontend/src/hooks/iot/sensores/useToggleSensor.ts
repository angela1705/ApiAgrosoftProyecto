import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";

const API_URL = "http://127.0.0.1:8000/iot/sensores/";

const toggleSensor = async ({ sensorId, newEstado }: { sensorId: number; newEstado: string }) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("[useToggleSensor] No se encontró el token de autenticación.");
    throw new Error("No se encontró el token de autenticación.");
  }

  console.log("[useToggleSensor] Enviando PATCH a /iot/sensores/" + sensorId + "/ con datos:", { estado: newEstado });
  try {
    const response = await api.patch(`${API_URL}${sensorId}/`, { estado: newEstado }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("[useToggleSensor] Respuesta de PATCH /iot/sensores/" + sensorId + "/: ", response.data);
    return response;
  } catch (error: any) {
    console.error("[useToggleSensor] Error en PATCH /iot/sensores/" + sensorId + "/: ", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const useToggleSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSensor,
    onSuccess: () => {
      console.log("[useToggleSensor] Estado del sensor actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({
        title: "Éxito",
        description: "Estado del sensor actualizado con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: (error: any) => {
      console.error("[useToggleSensor] Error al cambiar el estado del sensor: ", error);
      addToast({
        title: "Error",
        description: error.response?.data?.message || "Error al cambiar el estado del sensor",
        timeout: 3000,
        color: "danger",
      });
    },
  });
};