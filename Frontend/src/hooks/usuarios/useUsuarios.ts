import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Rol {
    id: number;
    rol: string;
}

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fk_id_rol: Rol | null;  // Puede ser null si el rol es opcional en Django
}

// Función para obtener los usuarios con manejo de errores y autenticación
const fetchUsuarios = async (): Promise<Usuario[]> => {
    try {
        const token = localStorage.getItem("token");  // Si usas JWT Token
        const { data } = await axios.get(`${apiUrl}/usuarios/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error("No se pudo obtener la lista de usuarios");
    }
};

export const useUsuarios = () => {
    return useQuery<Usuario[], Error>({
        queryKey: ['usuarios'],
        queryFn: fetchUsuarios,
        staleTime: 1000 * 60 * 10,
    });
};
