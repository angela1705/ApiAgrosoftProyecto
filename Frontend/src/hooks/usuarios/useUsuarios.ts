
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:8000/usuarios/";

export interface Rol {
  id: number;
  rol: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username?: string;
  rol: Rol | null;
}

export const useUsuarios = () => {
  const queryClient = useQueryClient();

  // Obtener todos los usuarios
  const fetchUsuarios = async (): Promise<Usuario[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get(`${API_URL}usuarios/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!Array.isArray(response.data)) {
      throw new Error("La API no devolvió un array de usuarios.");
    }
    return response.data;
  };

  // Obtener todos los roles
  const fetchRoles = async (): Promise<Rol[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get(`${API_URL}roles/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!Array.isArray(response.data)) {
      throw new Error("La API no devolvió un array de roles.");
    }
    return response.data;
  };

  // Actualizar un usuario
  const updateUsuario = async (usuario: Usuario): Promise<Usuario> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    try {
      const response = await axios.put(`${API_URL}usuarios/${usuario.id}/`, usuario, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: JSON.stringify(error.response?.data || "Error desconocido"),
      });
      throw error;
    }
  };

  // Eliminar un usuario
  const deleteUsuario = async (id: number): Promise<void> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    try {
      await axios.delete(`${API_URL}usuarios/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        text: JSON.stringify(error.response?.data || "Error desconocido"),
      });
      throw error;
    }
  };

  // Consulta de usuarios
  const usuariosQuery = useQuery<Usuario[], Error>({
    queryKey: ["usuarios"],
    queryFn: fetchUsuarios,
    retry: 1,
    enabled: !!localStorage.getItem("access_token"),
  });

  // Consulta de roles
  const rolesQuery = useQuery<Rol[], Error>({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    retry: 1,
    enabled: !!localStorage.getItem("access_token"),
  });

  // Mutación para actualizar usuario
  const updateMutation = useMutation({
    mutationFn: updateUsuario,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado con éxito",
      });
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  // Mutación para eliminar usuario
  const deleteMutation = useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario eliminado con éxito",
      });
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return {
    ...usuariosQuery,
    roles: rolesQuery.data,
    isLoadingRoles: rolesQuery.isLoading,
    updateUsuario: updateMutation.mutate,
    deleteUsuario: deleteMutation.mutate,
  };
};