import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

export interface UsuarioUpdate {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username?: string;
  rol_id: number | null;   
}

export const useUsuarios = () => {
  const queryClient = useQueryClient();

  const fetchUsuarios = async (): Promise<Usuario[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
    const response = await axios.get(`${API_URL}usuarios/`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (!Array.isArray(response.data)) throw new Error("La API no devolvió un array de usuarios.");
    return response.data;
  };

  const fetchRoles = async (): Promise<Rol[]> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
    const response = await axios.get(`${API_URL}roles/`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    if (!Array.isArray(response.data)) throw new Error("La API no devolvió un array de roles.");
    return response.data;
  };

  const updateUsuario = async (usuario: UsuarioUpdate): Promise<Usuario> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
    const response = await axios.put(`${API_URL}usuarios/${usuario.id}/`, usuario, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data; 
  };
  const deleteUsuario = async (id: number): Promise<void> => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
    await axios.delete(`${API_URL}usuarios/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const usuariosQuery = useQuery<Usuario[], Error>({
    queryKey: ["usuarios"],
    queryFn: fetchUsuarios,
    retry: 1,
    enabled: !!localStorage.getItem("access_token"),
  });

  const rolesQuery = useQuery<Rol[], Error>({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    retry: 1,
    enabled: !!localStorage.getItem("access_token"),
  });

  const updateMutation = useMutation<Usuario, Error, UsuarioUpdate>({
    mutationFn: updateUsuario,
    onSuccess: (updatedUsuario) => {
      queryClient.setQueryData<Usuario[]>(["usuarios"], (oldData) =>
        oldData ? oldData.map((u) => (u.id === updatedUsuario.id ? updatedUsuario : u)) : [updatedUsuario]
      );
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return {
    ...usuariosQuery,
    roles: rolesQuery.data,
    isLoadingRoles: rolesQuery.isLoading,
    updateUsuario: updateMutation.mutateAsync,
    deleteUsuario: deleteMutation.mutate,
  };
};