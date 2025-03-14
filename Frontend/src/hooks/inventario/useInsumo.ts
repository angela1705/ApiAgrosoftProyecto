import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Insumo } from "@/types/inventario/Insumo";

const API_URL = "http://127.0.0.1:8000/inventario/insumo/";

export const useInsumos = () => {
  return useQuery({
    queryKey: ["insumos"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("📌 Insumos recibidos:", response.data);
      return response.data;
    },
  });
};

export const useRegistrarInsumo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (insumo: Insumo) => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      const response = await axios.post(API_URL, insumo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Insumo registrado con éxito");
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
    },
    onError: () => {
      toast.error("Error al registrar el insumo");
    },
  });
};

export const useActualizarInsumo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (insumo: Insumo) => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      const response = await axios.put(`${API_URL}${insumo.id}/`, insumo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Insumo actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
    },
    onError: () => {
      toast.error("Error al actualizar el insumo");
    },
  });
};

export const useEliminarInsumo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Insumo eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: ["insumos"] });
    },
    onError: () => {
      toast.error("No se pudo eliminar el insumo");
    },
  });
};