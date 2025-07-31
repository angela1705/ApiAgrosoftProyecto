import api from "@/components/utils/axios"; 

export const obtenerNuevoToken = async (refreshToken: string | null) => {
  if (!refreshToken) {
    throw new Error("El refresh token no está disponible.");
  }

  try {
    const response = await api.post("/auth/token/refresh/", {
      refresh: refreshToken,
    });

    return response.data.access; 
  } catch (error) { 
    throw new Error("No se pudo refrescar el token");
  }
};
