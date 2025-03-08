import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { BodegaHerramienta } from "@/types/inventario/BodegaHerramienta";

const API_URL = "http://127.0.0.1:8000/inventario/bodega_herramienta/";

const fetchBodegaHerramienta = async (): Promise<BodegaHerramienta[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const useBodegaHerramienta = () => {
    return useQuery<BodegaHerramienta[], Error>({
        queryKey: ["bodegaHerramienta"],
        queryFn: fetchBodegaHerramienta,
        staleTime: 1000 * 60,
    });
};

const registrarBodegaHerramienta = async ({ bodega, herramienta, cantidad }: Omit<BodegaHerramienta, "id">) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.post(API_URL, { bodega, herramienta, cantidad }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useRegistrarBodegaHerramienta = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registrarBodegaHerramienta,
        onSuccess: () => {
            Swal.fire("Éxito", "Registro guardado con éxito", "success");
            queryClient.invalidateQueries({ queryKey: ["bodegaHerramienta"] });
        },
        onError: () => {
            Swal.fire("Error", "Error al registrar", "error");
        },
    });
};

const actualizarBodegaHerramienta = async ({ id, bodega, herramienta, cantidad }: BodegaHerramienta) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    const response = await axios.put(`${API_URL}${id}/`, { bodega, herramienta, cantidad }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const useActualizarBodegaHerramienta = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: actualizarBodegaHerramienta,
        onSuccess: () => {
            Swal.fire("Éxito", "Registro actualizado con éxito", "success");
            queryClient.invalidateQueries({ queryKey: ["bodegaHerramienta"] });
        },
        onError: () => {
            Swal.fire("Error", "Error al actualizar", "error");
        },
    });
};

const eliminarBodegaHerramienta = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");

    await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const useEliminarBodegaHerramienta = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: eliminarBodegaHerramienta,
        onSuccess: () => {
            Swal.fire("Eliminado", "Registro eliminado con éxito", "success");
            queryClient.invalidateQueries({ queryKey: ["bodegaHerramienta"] });
        },
        onError: () => {
            Swal.fire("Error", "No se pudo eliminar el registro", "error");
        },
    });
};
