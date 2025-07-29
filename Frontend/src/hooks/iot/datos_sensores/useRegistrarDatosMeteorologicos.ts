import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";
import { obtenerNuevoToken } from "@/components/utils/refresh";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.1.12:8000";
const API_URL = `${BASE_URL}/iot/datosmeteorologicos/`;

const registrarDatosMeteorologicos = async (data: any) => {
  console.log("[useRegistrarDatosMeteorologicos] Iniciando registro con datos:", data);
  if (!data.device_code) {
    console.error("[useRegistrarDatosMeteorologicos] device_code es obligatorio", data);
    throw new Error("El device_code es obligatorio");
  }

  const payload = {
    device_code: data.device_code,
    fk_bancal_id: data.fk_bancal_id || null,
    temperatura: data.temperatura != null && !isNaN(data.temperatura) ? parseFloat(data.temperatura.toFixed(2)) : null,
    humedad_ambiente: data.humedad_ambiente != null && !isNaN(data.humedad_ambiente) ? parseFloat(data.humedad_ambiente.toFixed(2)) : null,
    luminosidad: data.luminosidad != null && !isNaN(data.luminosidad) ? parseFloat(data.luminosidad.toFixed(2)) : null,
    lluvia: data.lluvia != null && !isNaN(data.lluvia) ? parseFloat(data.lluvia.toFixed(2)) : null,
    velocidad_viento: data.velocidad_viento != null && !isNaN(data.velocidad_viento) ? parseFloat(data.velocidad_viento.toFixed(2)) : null,
    direccion_viento: data.direccion_viento != null && !isNaN(data.direccion_viento) ? parseFloat(data.direccion_viento.toFixed(2)) : null,
    humedad_suelo: data.humedad_suelo != null && !isNaN(data.humedad_suelo) ? parseFloat(data.humedad_suelo.toFixed(2)) : null,
    ph_suelo: data.ph_suelo != null && !isNaN(data.ph_suelo) ? parseFloat(data.ph_suelo.toFixed(2)) : null,
    fecha_medicion: data.fecha_medicion || new Date().toISOString(),
  };

  // Validar que haya al menos un valor no nulo para registrar
  const hasValidData = Object.values(payload).some(
    (value) => value !== null && value !== undefined && !isNaN(value)
  );
  if (!hasValidData) {
    console.warn("[useRegistrarDatosMeteorologicos] No hay datos válidos para registrar:", payload);
    throw new Error("No hay datos válidos para registrar");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("[useRegistrarDatosMeteorologicos] No se encontró el token de autenticación.");
    throw new Error("No se encontró el token de autenticación.");
  }

  console.log("[useRegistrarDatosMeteorologicos] Enviando POST a", API_URL, "con payload:", payload);
  try {
    const response = await api.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("[useRegistrarDatosMeteorologicos] Respuesta exitosa:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("[useRegistrarDatosMeteorologicos] Error detallado en POST:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });

    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No se encontró el refresh token.");
      }
      try {
        const newToken = await obtenerNuevoToken(refreshToken);
        localStorage.setItem("access_token", newToken);
        console.log("[useRegistrarDatosMeteorologicos] Reintentando con nuevo token");
        const response = await api.post(API_URL, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
        });
        console.log("[useRegistrarDatosMeteorologicos] Respuesta de reintento:", response.data);
        return response.data;
      } catch (refreshError: any) {
        console.error("[useRegistrarDatosMeteorologicos] Error al refrescar token:", refreshError);
        throw new Error("No se pudo refrescar el token");
      }
    }

    const errorMessage = error.response?.data?.message || `Error al registrar los datos: ${error.message}`;
    throw new Error(errorMessage);
  }
};

export const useRegistrarDatosMeteorologicos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registrarDatosMeteorologicos,
    onSuccess: (data) => {
      console.log("[useRegistrarDatosMeteorologicos] Registro exitoso:", data);
      queryClient.invalidateQueries({ queryKey: ["datosMeteorologicos"] });
      addToast({
        title: "Éxito",
        description: "Datos meteorológicos registrados con éxito",
        timeout: 3000,
        color: "success",
      });
    },
    onError: (error: any) => {
      console.error("[useRegistrarDatosMeteorologicos] Error en registro:", error.message);
      addToast({
        title: "Error",
        description: error.message,
        timeout: 3000,
        color: "danger",
      });
    },
  });
};