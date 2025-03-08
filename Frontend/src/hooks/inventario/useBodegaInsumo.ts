import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { BodegaInsumo } from "@/types/inventario/BodegaInsumo";

const API_URL = "http://127.0.0.1:8000/inventario/bodega_insumo/";

const fetchBodegaInsumos = async (): Promise<BodegaInsumo[]> => {
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

const registrarBodegaInsumo = async (bodegaInsumo: BodegaInsumo) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, bodegaInsumo, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useBodegaInsumos = () => {
  return useQuery<BodegaInsumo[], Error>({
    queryKey: ["bodegaInsumos"],
    queryFn: fetchBodegaInsumos,
  });
};

export const useRegistrarBodegaInsumo = () => {
  return useMutation({
    mutationFn: (bodegaInsumo: BodegaInsumo) => registrarBodegaInsumo(bodegaInsumo),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Bodega de insumo registrada con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la bodega de insumo",
      });
    },
  });
};