import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Salario } from "@/types/finanzas/Salario";

const API_URL = "http://127.0.0.1:8000/finanzas/salario/";


const fetchSalarios = async (): Promise<Salario[]> => {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
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
        },
    });
};


const actualizarSalario = async (salario: Salario) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${API_URL}${salario.id}/`, salario, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useActualizarSalario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (salario: Salario) => actualizarSalario(salario),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salarios"] });
        },
    });
};


const eliminarSalario = async (id: number) => {
    const token = localStorage.getItem("access_token");
    const response = await axios.delete(`${API_URL}${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useEliminarSalario = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => eliminarSalario(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["salarios"] });
        },
    });
};