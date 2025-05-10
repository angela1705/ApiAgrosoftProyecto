import { useQuery } from '@tanstack/react-query';
import api from "@/components/utils/axios"; 
import { TrazabilidadItem } from '@/types/cultivo/Trazabilidad';

const fetchTrazabilidad = async (cultivoId: number): Promise<TrazabilidadItem[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No token found");

  const response = await api.get(`http://localhost:8000/cultivo/cultivos/${cultivoId}/trazabilidad/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const useTrazabilidad = (cultivoId: number, enabled = true) => {
  return useQuery({
    queryKey: ['trazabilidad', cultivoId],
    queryFn: () => fetchTrazabilidad(cultivoId),
    enabled: !!cultivoId && enabled, // Solo si cultivoId es válido
  });
};
