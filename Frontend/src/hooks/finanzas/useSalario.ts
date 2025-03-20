import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Salario } from "@/types/finanzas/Salario";

const API_URL = "http://127.0.0.1:8000/finanzas/salario/";

const fetchSalarios = async (): Promise<Salario[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const useSalarios = () => {
    return useQuery<Salario[], Error>({
        queryKey: ["salarios"],
        queryFn: fetchSalarios,
    });
};

const registrarSalario = async (salario: Salario) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.post(API_URL, salario, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useRegistrarSalario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (salario: Salario) => registrarSalario(salario),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salarios"] });
            addToast({ title: "Éxito", description: "Salario registrado con éxito" });
        },
        onError: (error) => {
            console.error("Error al registrar el salario:", error);
            addToast({ title: "Error", description: "Error al registrar el salarioo" });
        },
    });
};

 const actualizarSalario = async (id: number, salario: Salario) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.put(`${API_URL}${id}/`, salario, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const useActualizarSalario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, salario }: { id: number; salario: Salario }) => actualizarSalario(id, salario),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salarios"] });
            addToast({ title: "Éxito", description: "Salario actualizado con éxito" });
        },
        onError: () => {
            addToast({ title: "Error", description: "Error al actualizar el salario" });
        },
    });
};

 export const eliminarSalario = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    return axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const useEliminarSalario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => eliminarSalario(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salarios"] });
            addToast({ title: "Éxito", description: "Salario eliminado con éxito" });
        },
        onError: () => {
            addToast({ title: "Error", description: "Error al eliminar el salario" });
        },
    });
};
