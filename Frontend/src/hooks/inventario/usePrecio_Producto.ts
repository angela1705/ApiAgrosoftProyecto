import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { PrecioProducto } from "@/types/inventario/precio_producto";

const API_URL = "http://127.0.0.1:8000/inventario/precio-producto/";

const fetchPreciosProductos = async (): Promise<PrecioProducto[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const usePreciosProductos = () => {
    return useQuery<PrecioProducto[], Error>({
        queryKey: ["preciosProductos"],
        queryFn: fetchPreciosProductos,
        staleTime: 1000 * 60,
    });
};

const registrarPrecioProducto = async (precioProducto: Omit<PrecioProducto, "id">) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.post(API_URL, precioProducto, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useRegistrarPrecioProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registrarPrecioProducto,
        onSuccess: () => {
            addToast({ title: "Éxito", description: "Precio de producto registrado con éxito" });
            queryClient.invalidateQueries({ queryKey: ["preciosProductos"] });
        },
        onError: () => {
            addToast({ title: "Error", description: "Error al registrar el precio de producto" });
        },
    });
};

const actualizarPrecioProducto = async (precioProducto: PrecioProducto) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.put(`${API_URL}${precioProducto.id}/`, precioProducto, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useActualizarPrecioProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: actualizarPrecioProducto,
        onSuccess: () => {
            addToast({ title: "Éxito", description: "Precio de producto actualizado con éxito" });
            queryClient.invalidateQueries({ queryKey: ["preciosProductos"] });
        },
        onError: () => {
            addToast({ title: "Error", description: "Error al actualizar el precio de producto" });
        },
    });
};

const eliminarPrecioProducto = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const useEliminarPrecioProducto = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eliminarPrecioProducto,
        onSuccess: () => {
            addToast({ title: "Éxito", description: "Precio de producto eliminado con éxito" });
            queryClient.invalidateQueries({ queryKey: ["preciosProductos"] });
        },
        onError: (error: any) => {
            const message = error.response?.data?.detail || "No se pudo eliminar el precio de producto";
            addToast({ title: "Error", description: message });
            console.error("Error al eliminar:", error);
        },
    });
};