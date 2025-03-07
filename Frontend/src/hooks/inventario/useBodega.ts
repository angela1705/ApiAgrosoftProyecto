import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Bodega } from "@/types/inventario/Bodega";

const API_URL = "http://127.0.0.1:8000/inventario/bodega/";

const fetchBodegas = async (): Promise<Bodega[]> => {
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

const registrarBodega = async (bodega: Bodega) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  return axios.post(API_URL, bodega, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useBodegas = () => {
  return useQuery<Bodega[], Error>({
    queryKey: ["bodegas"],
    queryFn: fetchBodegas,
  });
};

export const useRegistrarBodega = () => {
  return useMutation({
    mutationFn: (bodega: Bodega) => registrarBodega(bodega),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Bodega registrada con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar la bodega",
      });
    },
  });
};