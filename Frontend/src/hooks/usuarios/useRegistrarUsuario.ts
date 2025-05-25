import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios"; 
import { addToast } from "@heroui/react";

const API_URL = "http://127.0.0.1:8000/usuarios/";

export interface NuevoUsuario {
  nombre: string;
  apellido: string;
  email: string;
  numero_documento: number;
  username?: string;
  password: string;
}

export const useRegistrarUsuario = () => {
  const queryClient = useQueryClient();

  const registrarUsuario = async (usuario: NuevoUsuario) => {
    const response = await api.post(`${API_URL}registroSecundario/`, {
      ...usuario,
      rol_id: 1, 
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registrarUsuario,
    onSuccess: (nuevoUsuario) => {
      queryClient.setQueryData(["usuarios"], (oldData: any) =>
        oldData ? [...oldData, nuevoUsuario] : [nuevoUsuario]
      );

      addToast({
        title: "Éxito",
        description: "Usuario registrado con éxito.",
        timeout: 3000,
        color: "success"
      });
    },
    onError: (error: any) => {
      if (api.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;

        if (data.username) {
          addToast({
            title: "Nombre de usuario inválido",
            description: data.username[0],
            timeout: 4000,
            color: "danger"
          });
        }

        if (data.email) {
          addToast({
            title: "Correo electrónico inválido",
            description: data.email[0],
            timeout: 4000,
            color: "danger"
          });
        }

        if (!data.username && !data.email) {
          addToast({
            title: "Error",
            description: "Error al registrar el usuario.",
            timeout: 3000,
            color: "danger"
          });
        }
      } else {
        addToast({
          title: "Error",
          description: error.message || "Error inesperado.",
          timeout: 3000,
          color: "danger"
        });
      }
    },
  });

  return {
    registrarUsuario: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
  };
};
