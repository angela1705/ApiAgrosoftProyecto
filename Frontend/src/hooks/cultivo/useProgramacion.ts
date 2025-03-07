// hooks/programacion/useProgramacion.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Programacion } from "@/types/cultivo/Programacion";

const API_URL = "http://127.0.0.1:8000/cultivo/programacion/";

const fetchProgramaciones = async (): Promise<Programacion[]> => {
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

const registrarProgramacion = async (programacion: Programacion) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, programacion, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useProgramaciones = () => {
  return useQuery<Programacion[], Error>({
    queryKey: ["programaciones"],
    queryFn: fetchProgramaciones,
  });
};

export const useRegistrarProgramacion = () => {
  return useMutation({
    mutationFn: (programacion: Programacion) => registrarProgramacion(programacion),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Programación registrada con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la programación",
      });
    },
  });
};