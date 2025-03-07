import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Especie } from "@/types/cultivo/Especie";

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
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Especie registrada con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la especie",
      });
    },
  });
};