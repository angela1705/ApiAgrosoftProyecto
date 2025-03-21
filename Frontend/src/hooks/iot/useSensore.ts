import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Sensor {
  id?: number;
  nombre: string;
  tipo_sensor: string;
  unidad_medida: string;
  descripcion: string;
  medida_minima: number;
  medida_maxima: number;
}

export const useSensores = () => {
  const token = localStorage.getItem("access_token");

  const { data: sensores = [], isLoading, error } = useQuery<Sensor[], Error>({
    queryKey: ["sensores"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/iot/sensores/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!token, // Solo ejecuta si hay token
  });

  return { sensores, isLoading, error };
};

export const useRegistrarSensor = () => {
  const token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sensor: Sensor) => {
      const response = await fetch("http://127.0.0.1:8000/iot/sensores/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensor),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error al registrar el sensor");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensores"] }); // Actualiza la lista de sensores
    },
  });
};