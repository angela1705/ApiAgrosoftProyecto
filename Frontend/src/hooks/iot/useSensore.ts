import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/toast";
import { SensorData } from "@/types/iot/SensorData";

const API_URL = "http://127.0.0.1:8000/iot/sensores/";

const fetchSensores = async (): Promise<SensorData[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const useSensores = () => {
  return useQuery<SensorData[], Error>({
    queryKey: ["sensores"],
    queryFn: fetchSensores,
  });
};

const registrarSensor = async (sensor: Omit<SensorData, "id">) => {
  try {
    const response = await axios.post(API_URL, sensor);
    return response.data;
  } catch (error: any) {
    console.error("Error en la API:", error.response?.data);
    throw error;
  }
};

export const useRegistrarSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sensor: Omit<SensorData, "id">) => registrarSensor(sensor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({ title: "Éxito", description: "Sensor registrado con éxito" });
    },
    onError: () => {
      addToast({ title: "Error", description: "Error al registrar el sensor" });
    },
  });
};
