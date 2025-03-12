import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Insumo } from "../../types/inventario/insumo";
const API_URL = "http://127.0.0.1:8000/inventario/insumos/";

const fetchInsumos = async (): Promise<Insumo[]> => {
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

const registrarInsumo = async (insumo: Insumo) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, insumo, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useInsumos = () => {
  return useQuery<Insumo[], Error>({
    queryKey: ["insumos"],
    queryFn: fetchInsumos,
  });
};

export const useRegistrarInsumo = () => {
  return useMutation({
    mutationFn: (insumo: Insumo) => registrarInsumo(insumo),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Insumo registrado con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar el insumo",
      });
    },
  });
};