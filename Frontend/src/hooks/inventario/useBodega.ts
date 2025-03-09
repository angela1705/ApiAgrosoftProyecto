import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Bodega } from "@/types/inventario/Bodega";

const API_URL = "http://127.0.0.1:8000/inventario/bodega/";

const fetchBodegas = async (): Promise<Bodega[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const useBodegas = () => {
    return useQuery<Bodega[], Error>({
        queryKey: ["bodegas"],
        queryFn: fetchBodegas,
        staleTime: 1000 * 60,
    });
};

const fetchUsuarios = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get("http://127.0.0.1:8000/usuarios/usuarios/", {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const useUsuarios = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: fetchUsuarios,
    });
};

const registrarBodega = async (bodega: Bodega) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.post(API_URL, bodega, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useRegistrarBodega = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registrarBodega,
        onSuccess: () => {
            Swal.fire("Éxito", "Bodega registrada con éxito", "success");
            queryClient.invalidateQueries({ queryKey: ["bodegas"] });
        },
        onError: () => {
            Swal.fire("Error", "Error al registrar la bodega", "error");
        },
    });
};

const actualizarBodega = async (bodega: Bodega) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.put(`${API_URL}${bodega.id}/`, bodega, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useActualizarBodega = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: actualizarBodega,
        onSuccess: () => {
            Swal.fire("Éxito", "Bodega actualizada con éxito", "success");
            queryClient.invalidateQueries({ queryKey: ["bodegas"] });
        },
        onError: () => {
            Swal.fire("Error", "Error al actualizar la bodega", "error");
        },
    });
};

const eliminarBodega = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const useEliminarBodega = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eliminarBodega,
        onSuccess: () => {
            Swal.fire("Eliminado", "Bodega eliminada con éxito", "success");
            queryClient.invalidateQueries({ queryKey: ["bodegas"] });
        },
        onError: () => {
            Swal.fire("Error", "No se pudo eliminar la bodega", "error");
        },
    });
};