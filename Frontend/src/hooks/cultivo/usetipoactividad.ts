import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { TipoActividad } from "@/types/cultivo/TipoActividad";

const API_URL = "http://127.0.0.1:8000/cultivo/tipo_actividad/";

const fetchTipoActividad = async (): Promise<TipoActividad[]> => {
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

const registrarTipoActividad = async (tipoEspecie: TipoActividad) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const formData = new FormData();
  formData.append("nombre", tipoEspecie.nombre);
  formData.append("descripcion", tipoEspecie.descripcion);

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useTipoActividad = () => {
  return useQuery<TipoActividad[], Error>({
    queryKey: ["tipoEspecies"],
    queryFn: fetchTipoActividad,
  });
};

export const useRegistrarTipoActividad = () => {
  return useMutation({
    mutationFn: (tipoEspecie: TipoActividad) => registrarTipoActividad(tipoEspecie),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Tipo de actividad registrado con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar el tipo de actividad",
      });
    },
  });
};