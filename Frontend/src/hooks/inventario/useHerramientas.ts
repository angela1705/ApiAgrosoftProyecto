import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Herramienta } from "@/types/inventario/Herramientas";

const API_URL = "http://127.0.0.1:8000/inventario/herramientas/";

const fetchHerramientas = async (): Promise<Herramienta[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const useHerramientas = () => {
    return useQuery<Herramienta[], Error>({
        queryKey: ["herramientas"],
        queryFn: fetchHerramientas,
        staleTime: 1000 * 60,
    });
};

const registrarHerramienta = async (herramienta: Herramienta) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.post(API_URL, herramienta, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useRegistrarHerramienta = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registrarHerramienta,
        onSuccess: () => {
            toast.success("Herramienta registrada con éxito");
            queryClient.invalidateQueries({ queryKey: ["herramientas"] });
        },
        onError: () => {
            toast.error("Error al registrar la herramienta");
        },
    });
};

const actualizarHerramienta = async (herramienta: Herramienta) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.put(`${API_URL}${herramienta.id}/`, herramienta, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useActualizarHerramienta = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: actualizarHerramienta,
        onSuccess: () => {
            toast.success("Herramienta actualizada con éxito");
            queryClient.invalidateQueries({ queryKey: ["herramientas"] });
        },
        onError: () => {
            toast.error("Error al actualizar la herramienta");
        },
    });
};

const eliminarHerramienta = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const useEliminarHerramienta = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eliminarHerramienta,
        onSuccess: () => {
            toast.success("Herramienta eliminada con éxito");
            queryClient.invalidateQueries({ queryKey: ["herramientas"] });
        },
        onError: () => {
            toast.error("No se pudo eliminar la herramienta");
        },
    });
};
