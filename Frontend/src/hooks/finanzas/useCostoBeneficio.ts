import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnalisisCostoBeneficio, ResumenCosecha } from "../../types/finanzas/CostoBeneficio";

const API_URL = "http://127.0.0.1:8000/finanzas";

const getTokenHeaders = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const useAnalisisPorCosecha = (cosechaId: number) => {
  return useQuery<AnalisisCostoBeneficio>({
    queryKey: ["analisis-cosecha", cosechaId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/costo-beneficio/por-cosecha/${cosechaId}/`,
        getTokenHeaders()
      );
      return data;
    },
    enabled: !!cosechaId,
  });
};

export const useResumenCosechas = () => {
    return useQuery<ResumenCosecha[]>({
      queryKey: ["resumen-cosechas"],
      queryFn: async () => {
        const { data } = await axios.get(
          `${API_URL}/costo-beneficio/resumen-financiero/`,
          getTokenHeaders()
        );
  
        console.log("Respuesta del resumen financiero:", data);
  
        // Asegúrate de que ultimos_analisis exista
        if (!data || !data.ultimos_analisis) {
          throw new Error("La respuesta no contiene 'ultimos_analisis'");
        }
  
        return data.ultimos_analisis;
      },
    });
  };
  