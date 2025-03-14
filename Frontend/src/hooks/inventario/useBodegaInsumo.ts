import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BodegaInsumo } from "@/types/inventario/BodegaInsumo";

const API_URL = "http://127.0.0.1:8000/inventario/bodega_insumo/";
const SOCKET_URL = "ws://localhost:8000/ws/inventario/bodega_insumo/";

export const useBodegaInsumos = () => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);
    socket.onmessage = () => {
      queryClient.invalidateQueries({ queryKey: ["bodega_insumos"] });
    };
    return () => socket.close();
  }, [queryClient]);
  
  return useQuery({
    queryKey: ["bodega_insumos"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("📌 Bodega Insumos recibidos:", response.data);
      return response.data;
    },
  });
};

export const useRegistrarBodegaInsumo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bodegaInsumo: BodegaInsumo) => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      const payload = {
        bodega: Number(bodegaInsumo.bodega),  
        insumo: Number(bodegaInsumo.insumo),  
        cantidad: Number(bodegaInsumo.cantidad),
      };
      
      console.log("📌 Enviando al backend:", payload);

      const response = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Bodega Insumo registrado con éxito");
      queryClient.invalidateQueries({ queryKey: ["bodega_insumos"] });
    },
    onError: () => {
      toast.error("Error al registrar el Bodega Insumo");
    },
  });
};

export const useActualizarBodegaInsumo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bodegaInsumo: BodegaInsumo) => {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No se encontró el token de autenticación.");
      
      const payload = {
        bodega: Number(bodegaInsumo.bodega),  
        insumo: Number(bodegaInsumo.insumo),  
        cantidad: Number(bodegaInsumo.cantidad),
      };
      
      console.log("📌 Enviando al backend:", payload);

      const response = await axios.put(`${API_URL}${bodegaInsumo.id}/`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Bodega Insumo actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: ["bodega_insumos"] });
    },
    onError: () => {
      toast.error("Error al actualizar el Bodega Insumo");
    },
  });
};

export const useEliminarBodegaInsumo = () => {
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
      toast.success("Bodega Insumo eliminado con éxito");
      queryClient.invalidateQueries({ queryKey: ["bodega_insumos"] });
    },
    onError: () => {
      toast.error("No se pudo eliminar el Bodega Insumo");
    },
  });
};
