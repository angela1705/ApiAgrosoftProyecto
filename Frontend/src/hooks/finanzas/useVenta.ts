import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Venta } from "@/types/finanzas/Venta";

const API_URL = "http://127.0.0.1:8000/finanzas/venta/";


const fetchVentas = async (): Promise<Venta[]> => {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useVentas = () => {
    return useQuery<Venta[], Error>({
        queryKey: ["ventas"],
        queryFn: fetchVentas,
    });
};


const registrarVenta = async (venta: Venta) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(API_URL, venta, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useRegistrarVenta = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (venta: Venta) => registrarVenta(venta),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventas"] });
        },
    });
};


const actualizarVenta = async (venta: Venta) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${API_URL}${venta.id}/`, venta, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useActualizarVenta = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (venta: Venta) => actualizarVenta(venta),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventas"] });
        },
    });
};


const eliminarVenta = async (id: number) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${API_URL}${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useEliminarVenta = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => eliminarVenta(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ventas"] });
        },
    });
};