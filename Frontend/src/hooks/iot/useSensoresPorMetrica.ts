import { useState, useEffect } from "react";
import { Sensor } from "@/types/iot/type";

export const useSensoresPorMetrica = (metrica: string) => {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchSensores = async () => {
      if (!token) {
        setError(new Error("No autenticado"));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/iot/sensores/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          // Token probablemente expirado, intentar refrescar el token
          const refreshToken = localStorage.getItem("refresh_token");
          if (refreshToken) {
            const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
              const { access } = await refreshResponse.json();
              localStorage.setItem("access_token", access);
              // Reintentar la solicitud original con el nuevo token
              const retryResponse = await fetch("http://127.0.0.1:8000/iot/sensores/", {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${access}`,
                  "Content-Type": "application/json",
                },
              });
              if (!retryResponse.ok) throw new Error(`Error ${retryResponse.status}: ${retryResponse.statusText}`);
              const result: Sensor[] = await retryResponse.json();
              const filteredSensores = result.filter(
                (sensor) => sensor.tipo_sensor.toLowerCase() === metrica.toLowerCase()
              );
              setSensores(filteredSensores);
              setIsLoading(false);
            } else {
              throw new Error("No se pudo refrescar el token");
            }
          } else {
            throw new Error("No se encontró un refresh token");
          }
        } else if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        } else {
          const result: Sensor[] = await response.json();
          const filteredSensores = result.filter(
            (sensor) => sensor.tipo_sensor.toLowerCase() === metrica.toLowerCase()
          );
          setSensores(filteredSensores);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido"));
        setIsLoading(false);
      }
    };

    fetchSensores();
  }, [metrica, token]);

  return { sensores, isLoading, error };
};