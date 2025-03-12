import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Lote } from "@/types/cultivo/Lotes";

const API_URL = "http://127.0.0.1:8000/cultivo/lote/";

const fetchLotes = async (): Promise<Lote[]> => {
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

const registrarLote = async (lote: Lote) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const formData = new FormData();
  formData.append("nombre", lote.nombre);
  formData.append("descripcion", lote.descripcion);
  formData.append("activo", JSON.stringify(lote.activo));
  formData.append("tam_x", lote.tam_x.toString());
  formData.append("tam_y", lote.tam_y.toString());
  formData.append("pos_x", lote.pos_x.toString());
  formData.append("pos_y", lote.pos_y.toString());

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useLotes = () => {
  return useQuery<Lote[], Error>({
    queryKey: ["lotes"],
    queryFn: fetchLotes,
  });
};

export const useRegistrarLote = () => {
  return useMutation({
    mutationFn: (lote: Lote) => registrarLote(lote),
    onSuccess: () => {
      addToast({
        title: "Éxito",
        description: "Lote registrado con éxito",
      });
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Error al registrar el lote",
      });
    },
  });
};
