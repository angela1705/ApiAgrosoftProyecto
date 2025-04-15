import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Insumo, UnidadMedida } from "@/types/inventario/Insumo";

const API_URL = "http://127.0.0.1:8000/inventario/insumo/";

const fetchInsumos = async (): Promise<Insumo[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const useInsumos = () => {
    return useQuery({
        queryKey: ["insumos"],
        queryFn: fetchInsumos,
        staleTime: 1000 * 60,
    });
};

const fetchUnidadesMedida = async (): Promise<UnidadMedida[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(`${API_URL}unidades_medida/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const useUnidadesMedida = () => {
    return useQuery({
        queryKey: ["unidadesMedida"],
        queryFn: fetchUnidadesMedida,
        staleTime: 1000 * 60,
    });
};

const registrarInsumo = async (insumo: Omit<Insumo, "id" | "unidad_medida"> & { unidad_medida_id?: number }) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    try {
        const response = await axios.post(API_URL, insumo, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error.response?.data);
        throw error;
    }
};

export const useRegistrarInsumo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (insumo: Omit<Insumo, "id" | "unidad_medida"> & { unidad_medida_id?: number }) => registrarInsumo(insumo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["insumos"] });
            addToast({ title: "Éxito", description: "Insumo registrado con éxito", timeout: 3000 });
        },
        onError: (error: any) => {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "Error al registrar el insumo",
                timeout: 3000,
            });
        },
    });
};

const actualizarInsumo = async (id: number, insumo: Insumo & { unidad_medida_id?: number }) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    try {
        const { unidad_medida, ...rest } = insumo; // Excluimos unidad_medida
        const data = {
            ...rest,
            unidad_medida_id: insumo.unidad_medida?.id || insumo.unidad_medida_id || null,
        };

        const response = await axios.put(`${API_URL}${id}/`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error.response?.data);
        throw error;
    }
};

export const useActualizarInsumo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, insumo }: { id: number; insumo: Insumo & { unidad_medida_id?: number } }) => actualizarInsumo(id, insumo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["insumos"] });
            addToast({ title: "Éxito", description: "Insumo actualizado con éxito", timeout: 3000 });
        },
        onError: (error: any) => {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "Error al actualizar el insumo",
                timeout: 3000,
            });
        },
    });
};

const eliminarInsumo = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    try {
        const response = await axios.delete(`${API_URL}${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error.response?.data);
        throw error;
    }
};

export const useEliminarInsumo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => eliminarInsumo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["insumos"] });
            addToast({ title: "Éxito", description: "Insumo eliminado con éxito", timeout: 3000 });
        },
        onError: (error: any) => {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "No se pudo eliminar el insumo",
                timeout: 3000,
            });
        },
    });
};

const crearUnidadMedida = async (unidad: Omit<UnidadMedida, "id" | "fecha_creacion" | "creada_por_usuario">) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    try {
        const response = await axios.post(`${API_URL}crear_unidad_medida/`, unidad, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error.response?.data);
        throw error;
    }
};

export const useCrearUnidadMedida = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (unidad: Omit<UnidadMedida, "id" | "fecha_creacion" | "creada_por_usuario">) => crearUnidadMedida(unidad),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["unidadesMedida"] });
            addToast({ title: "Éxito", description: "Unidad de medida creada con éxito", timeout: 3000 });
        },
        onError: (error: any) => {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "Error al crear la unidad de medida",
                timeout: 3000,
            });
        },
    });
};