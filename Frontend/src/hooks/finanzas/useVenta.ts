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
  const payload = {
    producto: venta.producto,
    cantidad: venta.cantidad,
    fecha: venta.fecha,
  };
  console.log("Enviando venta al backend:", payload);
  try {
    const response = await api.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error en registrarVenta:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(
      error.response?.data?.detail ||
      error.response?.data?.error ||
      "Error al registrar la venta."
    );
  }
};

const registrarMultiplesVentas = async (ventas: Venta[]): Promise<Venta[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  if (!ventas.length) throw new Error("No se proporcionaron ventas para registrar.");
  const payload = {
    ventas: ventas.map(venta => ({
      producto: venta.producto,
      cantidad: venta.cantidad,
      fecha: venta.fecha,
    })),
  };
  console.log("Enviando ventas al backend:", JSON.stringify(payload, null, 2));
  try {
    const response = await api.post(`${API_URL}registrar_multiples_ventas/`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error en registrarMultiplesVentas:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    const errorMessage =
      error.response?.status === 405
        ? "El endpoint /finanzas/venta/registrar_multiples_ventas/ no permite POST. Añada la acción 'registrar_multiples_ventas' al VentaViewSet en el backend."
        : error.response?.data?.detail ||
          error.response?.data?.error ||
          "Error al registrar las ventas.";
    throw new Error(errorMessage);
  }
};

const actualizarVenta = async (venta: Venta): Promise<Venta> => {
  const token = localStorage.getItem("access_token");
  if (!token || !venta.id) throw new Error("Falta token o ID de la venta.");
  const payload = {
    producto: venta.producto,
    cantidad: venta.cantidad,
    fecha: venta.fecha,
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
      addToast({ title: "Éxito", description: "Venta registrada con éxito", timeout: 3000, color: "success" });
    },
    onError: (error: any) => {
      addToast({ title: "Error", description: `Error al registrar venta: ${error.message}`, timeout: 3000, color: "danger" });
    },
  });

  const registrarMultiplesMutation = useMutation({
    mutationFn: registrarMultiplesVentas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({ title: "Éxito", description: "Ventas registradas con éxito", timeout: 3000, color: "success" });
    },
    onError: (error: any) => {
      addToast({
        title: "Error",
        description: `Error al registrar ventas: ${error.message}`,
        timeout: 5000,
        color: "danger",
      });
    },
  });

  const actualizarMutation = useMutation({
    mutationFn: actualizarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({ title: "Éxito", description: "Venta actualizada con éxito", timeout: 3000, color: "success" });
    },
    onError: (error: any) => {
      addToast({ title: "Error", description: `Error al actualizar venta: ${error.message}`, timeout: 3000, color: "danger" });
    },
  });

  const eliminarMutation = useMutation({
    mutationFn: eliminarVenta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      addToast({ title: "Éxito", description: "Venta eliminada con éxito", timeout: 3000, color: "success" });
    },
    onError: (error: any) => {
      addToast({ title: "Error", description: `Error al eliminar venta: ${error.message}`, timeout: 3000, color: "danger" });
    },
  });

  return {
    ventas: ventasQuery.data ?? [],
    isLoading: ventasQuery.isLoading,
    isError: ventasQuery.isError,
    error: ventasQuery.error,
    registrarVenta: registrarMutation.mutate,
    isRegistrando: registrarMutation.isPending,
    registrarMultiplesVentas: registrarMultiplesMutation.mutate,
    isRegistrandoMultiples: registrarMultiplesMutation.isPending,
    actualizarVenta: actualizarMutation.mutate,
    isActualizando: actualizarMutation.isPending,
    eliminarVenta: eliminarMutation.mutate,
    isEliminando: eliminarMutation.isPending,
  };
};