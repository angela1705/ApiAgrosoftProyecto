import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Pago } from "@/types/finanzas/Pago";

const API_URL = "http://127.0.0.1:8000/finanzas/pagos/";


const fetchPagos = async (): Promise<Pago[]> => {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const usePagos = () => {
    return useQuery<Pago[], Error>({
        queryKey: ["pagos"],
        queryFn: fetchPagos,
    });
};


const registrarPago = async (pago: Pago) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(API_URL, pago, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useRegistrarPago = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pago: Pago) => registrarPago(pago),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pagos"] });
        },
    });
};


const actualizarPago = async (pago: Pago) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${API_URL}${pago.id}/`, pago, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useActualizarPago = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pago: Pago) => actualizarPago(pago),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pagos"] });
        },
    });
};


const eliminarPago = async (id: number) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${API_URL}${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useEliminarPago = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => eliminarPago(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pagos"] });
        },
    });
};