import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios"; 
import { addToast } from "@heroui/react";
import { Venta } from "@/types/finanzas/Venta";

const API_URL = "http://127.0.0.1:8000/finanzas/venta/";


const fetchVentas = async (): Promise<Venta[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await api.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const registrarVenta = async (venta: Venta): Promise<Venta> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await api.post(API_URL, venta, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const actualizarVenta = async (venta: Venta): Promise<Venta> => {
  const token = localStorage.getItem("access_token");
  if (!token || !venta.id) throw new Error("Falta token o ID de la venta.");
  const response = await api.put(`${API_URL}${venta.id}/`, venta, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const eliminarVenta = async (id: number): Promise<void> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  await api.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useVenta = () => {
  const queryClient = useQueryClient();
  const ventasQuery = useQuery<Venta[], Error>({
    queryKey: ["ventas"],
    queryFn: fetchVentas,
  });
  const registrarMutation = useMutation({
    mutationFn: registrarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({ title: "Éxito", description: "Venta registrada con éxito", color:"success" });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador",
          timeout: 3000,
          color: "warning"
        });
      } else {
        addToast({
          title: "Error",
          description: `Error al registrar venta: ${error.message}`,
          color: "danger"
        });
      }
    }
  });
    const actualizarMutation = useMutation({
    mutationFn: actualizarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({ title: "Éxito", description: "Venta actualizada con éxito", color:"success" });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador",
          timeout: 3000,
          color: "warning"
        });
      } else {
        addToast({
          title: "Error",
          description: `Error al Actualizar venta: ${error.message}`,
          color: "danger"
        });
      }
    }
  });
    const eliminarMutation = useMutation({
    mutationFn: eliminarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({ title: "Éxito", description: "Venta eliminada con éxito", color:"success"});
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador",
          timeout: 3000,
          color: "warning"
        });
      } else {
        addToast({
          title: "Error",
          description: `Error al eliminar venta: ${error.message}`,
          color: "danger"
        });
      }
    }
  });
    return {
    ventas: ventasQuery.data ?? [],
    isLoading: ventasQuery.isLoading,
    isError: ventasQuery.isError,
    error: ventasQuery.error,
    registrarVenta: registrarMutation.mutate,
    isRegistrando: registrarMutation.isPending,
    actualizarVenta: actualizarMutation.mutate,
    isActualizando: actualizarMutation.isPending,
    eliminarVenta: eliminarMutation.mutate,
    isEliminando: eliminarMutation.isPending,
  };
};

