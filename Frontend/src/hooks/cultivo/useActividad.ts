import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Actividad } from "@/types/cultivo/Actividad";

const API_URL = "http://127.0.0.1:8000/cultivo/actividades/";

const fetchActividades = async (): Promise<Actividad[]> => {
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }
  
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const useActividades = () => {
    return useQuery<Actividad[], Error>({
      queryKey: ["actividades"],
      queryFn: fetchActividades,
    });
  };

const fetchUsuarios = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get("http://127.0.0.1:8000/usuarios/usuarios/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // No se define un tipo específico
};

export const useUsuarios = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: fetchUsuarios,
    });
};

// Fetch Insumos
const fetchInsumos = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get("http://127.0.0.1:8000/inventario/insumo/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // No se define un tipo específico
};

export const useInsumos = () => {
    return useQuery({
        queryKey: ["insumos"],
        queryFn: fetchInsumos,
    });
};

const registrarActividad = async (actividad: Actividad) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    try {
        const response = await axios.post(API_URL, actividad, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error.response?.data);
        Swal.fire({
            icon: "error",
            title: "Error en la API",
            text: JSON.stringify(error.response?.data || "Error desconocido"),
        });
        throw error;
    }
};

export const useRegistrarActividad = () => {
    return useMutation({
        mutationFn: (actividad: Actividad) => registrarActividad(actividad),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Actividad registrada con éxito",
            });
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al registrar la actividad",
            });
        },
    });
};