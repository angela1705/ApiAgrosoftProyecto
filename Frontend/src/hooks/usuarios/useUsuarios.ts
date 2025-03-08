import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

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

const fetchUsuarios = async (): Promise<Usuario[]> => {
  const token = localStorage.getItem("access_token");  
  console.log("Token encontrado en localStorage:", token);  

  if (!token) {
    console.error("No se encontró token de autenticación en localStorage bajo 'access_token'.");
    throw new Error("No se encontró token de autenticación.");
  }

  try {
    const response = await axios.get(`${apiUrl}/usuarios/usuarios/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta de la API /usuarios/usuarios/:", response.data);  

    if (!Array.isArray(response.data)) {
      console.error("La API no devolvió un array:", response.data);
      throw new Error("La API no devolvió un array de usuarios.");
    }

    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const useUsuarios = () => {
  return useQuery<Usuario[], Error>({
    queryKey: ['usuarios'],
    queryFn: fetchUsuarios,  
    retry: 1,  
    enabled: !!localStorage.getItem("access_token"),  
  });
};