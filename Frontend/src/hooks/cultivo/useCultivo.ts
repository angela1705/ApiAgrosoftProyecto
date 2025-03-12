import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Cultivo } from "@/types/cultivo/Cultivo";

const API_URL = "http://127.0.0.1:8000/cultivo/cultivos/";

const fetchCultivos = async (): Promise<Cultivo[]> => {
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

const registrarCultivo = async (cultivo: Cultivo) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    try {
        console.log("Enviando datos al backend:", cultivo); 
        const response = await axios.post(API_URL, cultivo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error en la API:", error.response?.data); 
        throw error;
    }
};

export const useCultivos = () => {
    return useQuery<Cultivo[], Error>({
        queryKey: ["cultivos"],
        queryFn: fetchCultivos,
    });
};

export const useRegistrarCultivo = () => {
    return useMutation({
        mutationFn: (cultivo: Cultivo) => registrarCultivo(cultivo),
        onSuccess: () => {
            addToast({
              title: "Éxito",
              description: "Cultivo registrado con éxito",
            });
          },
          onError: () => {
            addToast({
              title: "Error",
              description: "Error al registrar el cultivo",
            });
          },
    });
};