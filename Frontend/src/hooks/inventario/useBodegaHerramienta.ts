import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { BodegaHerramienta } from "@/types/inventario/BodegaHerramienta";

const API_URL = "http://127.0.0.1:8000/inventario/bodega_herramienta/";

const fetchBodegaHerramientas = async (): Promise<BodegaHerramienta[]> => {
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

const registrarBodegaHerramienta = async (bodegaHerramienta: BodegaHerramienta) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, bodegaHerramienta, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useBodegaHerramientas = () => {
  return useQuery<BodegaHerramienta[], Error>({
    queryKey: ["bodegaHerramientas"],
    queryFn: fetchBodegaHerramientas,
  });
};

export const useRegistrarBodegaHerramienta = () => {
  return useMutation({
    mutationFn: (bodegaHerramienta: BodegaHerramienta) => registrarBodegaHerramienta(bodegaHerramienta),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Bodega de herramienta registrada con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la bodega de herramienta",
      });
    },
  });
};