import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { addToast } from "@heroui/react";
import { Actividad } from "@/types/cultivo/Actividad";
import { Insumo } from "@/types/inventario/Insumo";
import { User } from "@/context/AuthContext";
const API_URL = "http://127.0.0.1:8000/cultivo/actividades/";

const fetchActividades = async (): Promise<Actividad[]> => {
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

  export const useActividades = () => {
    return useQuery<Actividad[], Error>({
      queryKey: ["actividades"],
      queryFn: fetchActividades,
    });
  };

const fetchUsuarios = async (): Promise<User[]> => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get("http://127.0.0.1:8000/usuarios/usuarios/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useUsuarios = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: fetchUsuarios,
    });
};

const fetchInsumos = async (): Promise<Insumo[]>=> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await axios.get("http://127.0.0.1:8000/inventario/insumo/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useInsumos = () => {
    return useQuery({
        queryKey: ["insumos"],
        queryFn: fetchInsumos,
    });
};

const registrarActividad = async (actividad: Actividad) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
      throw new Error("No se encontró el token de autenticación.");
  }

  try {
      // Asegúrate de enviar los arrays correctamente
      const response = await axios.post(API_URL, {
          ...actividad,
          usuarios: actividad.usuarios, 
          insumos: actividad.insumos, 
          herramientas: actividad.herramientas, 
      }, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error: any) {
      console.error("Error en la API:", error.response?.data);
      throw error;
  }
};
const eliminarActividad = async (id: number) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
  
    return axios.delete(`${API_URL}${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const actualizarActividad = async (id: number, actividad: Actividad) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
  
    if (actividad.estado === 'COMPLETADA') {
      throw new Error("Use el método específico para finalizar actividades");
    }
  
    try {
      const response = await axios.put(`${API_URL}${id}/`, actividad, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error en la API:", error.response?.data);
      throw error;
    }
  };
  
export const useRegistrarActividad = () => {
    return useMutation({
        mutationFn: (actividad: Actividad) => registrarActividad(actividad),
        onSuccess: () => {
            addToast({
                title: "Éxito",
                description: "Actividad registrada con éxito",
            });
        },
        onError: () => {
            addToast({
                title: "Error",
                description: "Error al registrar la actividad",
            });
        },
    });
};


export const useActualizarActividad = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, actividad }: { id: number; actividad: Actividad }) => actualizarActividad(id, actividad),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["actividades"] });
            addToast({ title: "Éxito", description: "Actividad actualizada con éxito", timeout: 3000 });
        },
        onError: (error: any) => {
            addToast({ 
                title: "Error", 
                description: error.response?.data?.message || "Error al actualizar la actividad", 
                timeout: 3000 
            });
        },
    });
};
  export const useEliminarActividad = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number) => eliminarActividad(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Actividad"] });
        addToast({ title: "Éxito", description: "Tipo de actividad eliminado con éxito", timeout: 3000 });
      },
      onError: () => {
        addToast({ title: "Error", description: "Error al actividad el tipo de especie", timeout: 3000 });
      },
    });
  };


  const finalizarActividad = async (id: number, finalizacionData: {
    fecha_fin: string;
    herramientas: Array<{
      id: number;
      devuelta: boolean;
      fecha_devolucion?: string;
    }>;
    insumos: Array<{
      id: number;
      cantidad_devuelta: number;
    }>;
  }) => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No se encontró el token de autenticación.");
  
    try {
      const response = await axios.post(`${API_URL}${id}/finalizar/`, finalizacionData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error en la API:", error.response?.data);
      throw error;
    }
  };


  export const useFinalizarActividad = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, finalizacionData }: { 
        id: number; 
        finalizacionData: {
          fecha_fin: string;
          herramientas: Array<{
            id: number;
            devuelta: boolean;
            fecha_devolucion?: string;
          }>;
          insumos: Array<{
            id: number;
            cantidad_devuelta: number;
          }>;
        }
      }) => finalizarActividad(id, finalizacionData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["actividades"] });
        addToast({ 
          title: "Éxito", 
          description: "Actividad finalizada con éxito", 
          timeout: 3000 
        });
      },
      onError: (error: any) => {
        addToast({ 
          title: "Error", 
          description: error.response?.data?.message || "Error al finalizar la actividad", 
          timeout: 3000 
        });
      },
    });
  };