import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Bancal } from "@/types/cultivo/Bancal"; 

const API_URL = "http://127.0.0.1:8000/cultivo/Bancal/";

const fetchBancales = async (): Promise<Bancal[]> => {
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

const registrarBancal = async (bancal: Bancal) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, bancal, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useBancales = () => {
  return useQuery<Bancal[], Error>({
    queryKey: ["bancales"],
    queryFn: fetchBancales,
  });
};

export const useRegistrarBancal = () => {

  return useMutation({
    mutationFn: (bancal: Bancal) => registrarBancal(bancal),
    onSuccess: () => {
      addToast({
        title: "Éxito",
        description: "Bancal registrado con éxito",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Error al registrar el bancal",
      });
    },
  });
};
