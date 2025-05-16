// useVenta.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";
import { Venta, DetalleVenta } from "@/types/finanzas/Venta";

const API_URL = "http://127.0.0.1:8000/finanzas/venta/";

// Tipo para la creación de ventas
interface CreateVentaData {
  fecha?: string;
  monto_entregado: number;
  detalles: Omit<DetalleVenta, 'id' | 'venta'>[];
}

const fetchVentas = async (): Promise<Venta[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token no encontrado");
  const response = await api.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const registrarVenta = async (ventaData: CreateVentaData): Promise<Venta> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token no encontrado");

  // Calcular cambio automáticamente si no se proporciona
  const totalVenta = ventaData.detalles.reduce((sum, detalle) => sum + detalle.total, 0);
  const cambio = ventaData.monto_entregado - totalVenta;

  const payload = {
    fecha: ventaData.fecha || new Date().toISOString(),
    monto_entregado: ventaData.monto_entregado,
    cambio,
    detalles: ventaData.detalles.map(detalle => ({
      producto: detalle.producto,
      cantidad: detalle.cantidad,
      unidades_de_medida: detalle.unidades_de_medida,
      total: detalle.total
    }))
  };

  console.log("Enviando venta:", payload); // DEBUG

  const response = await api.post(API_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const actualizarVenta = async (venta: Venta): Promise<Venta> => {
  const token = localStorage.getItem("access_token");
  if (!token || !venta.id) throw new Error("Falta token o ID");

  const payload = {
    fecha: venta.fecha,
    monto_entregado: venta.monto_entregado,
    cambio: venta.cambio,
    // Nota: Para actualizar detalles, considera un endpoint específico
  };

  const response = await api.put(`${API_URL}${venta.id}/`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const eliminarVenta = async (id: number): Promise<void> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token no encontrado");

  await api.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Función adicional para obtener detalles de una venta
const fetchDetallesVenta = async (ventaId: number): Promise<DetalleVenta[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Token no encontrado");
  
  const response = await api.get(`${API_URL}${ventaId}/detalles/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useVenta = () => {
  const queryClient = useQueryClient();

  const ventasQuery = useQuery<Venta[], Error>({
    queryKey: ["ventas"],
    queryFn: fetchVentas,
  });

  const registrarMutation = useMutation({
    mutationFn: registrarVenta,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({
        title: "Éxito",
        description: "Venta registrada con éxito",
        color: "success",
      });
      return data; // Devuelve los datos para poder acceder al ID en el onSuccess del componente
    },
    onError: (error: any) => {
      console.error("Error detalle:", error.response?.data);
      addToast({
        title: "Error",
        description: `Error al registrar venta: ${error.response?.data?.detail || error.message}`,
        color: "danger",
      });
    },
  });

  const actualizarMutation = useMutation({
    mutationFn: actualizarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({
        title: "Éxito",
        description: "Venta actualizada con éxito",
        color: "success",
      });
    },
    onError: (error: any) => {
      console.error("Error detalle:", error.response?.data);
      addToast({
        title: "Error",
        description: `Error al actualizar venta: ${error.response?.data?.detail || error.message}`,
        color: "danger",
      });
    },
  });

  const eliminarMutation = useMutation({
    mutationFn: eliminarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({
        title: "Éxito",
        description: "Venta eliminada con éxito",
        color: "success",
      });
    },
    onError: (error: any) => {
      console.error("Error detalle:", error.response?.data);
      addToast({
        title: "Error",
        description: `Error al eliminar venta: ${error.response?.data?.detail || error.message}`,
        color: "danger",
      });
    },
  });

  // Hook para obtener detalles de una venta específica
  const useDetallesVenta = (ventaId: number) => {
    return useQuery<DetalleVenta[], Error>({
      queryKey: ["ventas", ventaId, "detalles"],
      queryFn: () => fetchDetallesVenta(ventaId),
      enabled: !!ventaId,
    });
  };

  return {
    ventas: ventasQuery.data ?? [],
    isLoading: ventasQuery.isLoading,
    isError: ventasQuery.isError,
    error: ventasQuery.error,
    registrarVenta: registrarMutation.mutateAsync, // Cambiado a mutateAsync para poder esperar la respuesta
    isRegistrando: registrarMutation.isPending,
    actualizarVenta: actualizarMutation.mutate,
    isActualizando: actualizarMutation.isPending,
    eliminarVenta: eliminarMutation.mutate,
    isEliminando: eliminarMutation.isPending,
    useDetallesVenta, // Nuevo hook para detalles
  };
};