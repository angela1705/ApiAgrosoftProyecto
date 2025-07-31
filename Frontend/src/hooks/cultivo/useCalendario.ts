import api from "@/components/utils/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { CalendarioEventos } from "@/types/cultivo/Calendario";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/cultivo/eventos/`;

const fetchEventos = async (): Promise<CalendarioEventos[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  const response = await api.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Transformar los datos del backend al formato esperado por FullCalendar
  return response.data.map((event: any) => ({
    id: String(event.id), // Convertir id a string
    title: event.titulo,
    start: event.inicio,
    allDay: event.todo_el_dia,
    backgroundColor: event.color_fondo,
    description: event.descripcion,
  }));
};

const registrarEvento = async (evento: Omit<CalendarioEventos, "id">) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  // Transformar los datos al formato esperado por el backend
  const payload = {
    titulo: evento.title,
    inicio: evento.start,
    todo_el_dia: evento.allDay,
    color_fondo: evento.backgroundColor,
    descripcion: evento.description,
  };

  return api.post(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const actualizarEvento = async (id: string, evento: Omit<CalendarioEventos, "id">) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  const payload = {
    titulo: evento.title,
    inicio: evento.start,
    todo_el_dia: evento.allDay,
    color_fondo: evento.backgroundColor,
    descripcion: evento.description,
  };

  return api.put(`${API_URL}${id}/`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const eliminarEvento = async (id: string) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");

  return api.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const useEventosCalendario = () => {
  return useQuery<CalendarioEventos[], Error>({
    queryKey: ["eventosCalendario"],
    queryFn: fetchEventos,
    // ...
  });
};

export const useRegistrarEvento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registrarEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventosCalendario"] });
      addToast({
        title: "Éxito",
        description: "Evento registrado con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "warning",
        });
      } else {
        addToast({
          title: "Error",
          description: error.message || "Error al registrar el evento",
          timeout: 3000,
          color: "danger",
        });
      }
    },
  });
};

export const useActualizarEvento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, evento }: { id: string; evento: Omit<CalendarioEventos, "id"> }) =>
      actualizarEvento(id, evento),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventosCalendario"] });
      addToast({
        title: "Éxito",
        description: "Evento actualizado con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "warning",
        });
      } else {
        addToast({
          title: "Error",
          description: error.message || "Error al actualizar el evento",
          timeout: 3000,
          color: "danger",
        });
      }
    },
  });
};

export const useEliminarEvento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventosCalendario"] });
      addToast({
        title: "Éxito",
        description: "Evento eliminado con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "warning",
        });
      } else {
        addToast({
          title: "Error",
          description: error.message || "Error al eliminar el evento",
          timeout: 3000,
          color: "danger",
        });
      }
    },
  });
};
