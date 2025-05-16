import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios"; 
import { addToast } from "@heroui/react";
import { Sensor } from "@/types/iot/type";

const API_URL = "http://127.0.0.1:8000/iot/sensores/";
 
const fetchSensores = async (): Promise<Sensor[]> => {
  const response = await api.get(API_URL);  
  return response.data;
};

// Actualizar un sensor existente
const updateSensor = async (sensor: Sensor) => {
  const response = await api.put(`${API_URL}${sensor.id}/`, sensor); 
  return response.data;
};

// Eliminar un sensor
const deleteSensor = async (id: number) => {
  await api.delete(`${API_URL}${id}/`);  
};

// Hook principal
export const useSensoresRegistrados = () => {
  const queryClient = useQueryClient();

  // Consulta para obtener los sensores
  const { data: sensores = [], isLoading, error } = useQuery<Sensor[], Error>({
    queryKey: ["sensores"],
    queryFn: fetchSensores,
  });

  // Mutación para actualizar un sensor
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

  // Mutación para eliminar un sensor
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
//---------------------------------------------------------------//