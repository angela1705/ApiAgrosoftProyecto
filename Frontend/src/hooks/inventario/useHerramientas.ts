import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Herramienta } from "@/types/inventario/Herramienta";

const API_URL = "http://127.0.0.1:8000/inventario/herramientas/";

const fetchHerramientas = async (): Promise<Herramienta[]> => {
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

const registrarHerramienta = async (herramienta: Herramienta) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, herramienta, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useHerramientas = () => {
  return useQuery<Herramienta[], Error>({
    queryKey: ["herramientas"],
    queryFn: fetchHerramientas,
  });
};

export const useRegistrarHerramienta = () => {
  return useMutation({
    mutationFn: (herramienta: Herramienta) => registrarHerramienta(herramienta),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Herramienta registrada con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la herramienta",
      });
    },
  });
};