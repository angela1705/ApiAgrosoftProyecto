import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Especie } from "@/types/cultivo/Especie";
import { addToast } from "@heroui/react";

const API_URL = "http://127.0.0.1:8000/cultivo/especies/";

const fetchEspecies = async (): Promise<Especie[]> => {
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

const registrarEspecie = async (especie: FormData) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, especie, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useEspecies = () => {
  return useQuery<Especie[], Error>({
    queryKey: ["especies"],
    queryFn: fetchEspecies,
  });
};

export const useRegistrarEspecie = () => {
  return useMutation({
    mutationFn: (especie: FormData) => registrarEspecie(especie),
    onSuccess: () => {
      addToast({
        title: "Éxito",
        description: "Especie registrada con éxito",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Error al registrar la especie",
      });
    },
  });
};


