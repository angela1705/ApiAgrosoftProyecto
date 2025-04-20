import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Pago } from "@/types/finanzas/Pago";

const API_URL = "http://127.0.0.1:8000/finanzas/pago/";

const fetchPagos = async (): Promise<Pago[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const registrarPago = async (pago: Pago): Promise<Pago> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await axios.post(API_URL, pago, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const actualizarPago = async (pago: Pago): Promise<Pago> => {
  const token = localStorage.getItem("access_token");
  if (!token || !pago.id) throw new Error("Falta token o ID del pago.");
  const response = await axios.put(`${API_URL}${pago.id}/`, pago, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const eliminarPago = async (id: number): Promise<void> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const usePago = () => {
  const queryClient = useQueryClient();
  
 
  const pagosQuery = useQuery<Pago[], Error>({
    queryKey: ["pagos"],
    queryFn: fetchPagos,
  });


  const registrarMutation = useMutation({
    mutationFn: registrarPago,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      addToast({ title: "Éxito", description: "Pago registrado con éxito" });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
        });
      } else {
        addToast({
          title: "Error",
          description: "Error al registrar el pago",
          timeout: 3000,
        });
      }
    },
  });
  
  const actualizarMutation = useMutation({
    mutationFn: actualizarPago,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      addToast({ title: "Éxito", description: "Pago actualizado con éxito" });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
        });
      } else {
        addToast({
          title: "Error",
          description: "Error al actualizar el pago",
          timeout: 3000,
        });
      }
    },
  });
  
  const eliminarMutation = useMutation({
    mutationFn: eliminarPago,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      addToast({ title: "Éxito", description: "Pago eliminado con éxito" });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
        });
      } else {
        addToast({
          title: "Error",
          description: "Error al eliminar el pago",
          timeout: 3000,
        });
      }
    },
  });
  return {
    pagos: pagosQuery.data ?? [],
    isLoading: pagosQuery.isLoading,
    isError: pagosQuery.isError,
    error: pagosQuery.error,
    registrarPago: registrarMutation.mutate,
    isRegistrando: registrarMutation.isPending,
    actualizarPago: actualizarMutation.mutate,
    isActualizando: actualizarMutation.isPending,
    eliminarPago: eliminarMutation.mutate,
    isEliminando: eliminarMutation.isPending,
  };
};
