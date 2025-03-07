import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { TipoEspecie } from "@/types/cultivo/TipoEspecie";

const API_URL = "http://127.0.0.1:8000/cultivo/tipo_especies/";

const fetchTipoEspecies = async (): Promise<TipoEspecie[]> => {
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

const registrarTipoEspecie = async (tipoEspecie: TipoEspecie) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }

  const formData = new FormData();
  formData.append("nombre", tipoEspecie.nombre);
  formData.append("descripcion", tipoEspecie.descripcion);
  if (tipoEspecie.img) {
    formData.append("img", tipoEspecie.img);
  }

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useTipoEspecies = () => {
  return useQuery<TipoEspecie[], Error>({
    queryKey: ["tipoEspecies"],
    queryFn: fetchTipoEspecies,
  });
};

export const useRegistrarTipoEspecie = () => {
  return useMutation({
    mutationFn: (tipoEspecie: TipoEspecie) => registrarTipoEspecie(tipoEspecie),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Tipo de especie registrado con éxito",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al registrar el tipo de especie",
      });
    },
  });
};