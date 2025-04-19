import { useState, useEffect } from "react";
import { SensorData } from "../../types/iot/type";

export const useDatosMeteorologicosHistoricos = (sensorId: number = 0, date: string = "") => {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://127.0.0.1:8000/iot/datosmeteorologicos/";
        if (sensorId !== 0 && date) {
          url += `?fk_sensor=${sensorId}&date=${date}`;
        } else if (sensorId !== 0) {
          url += `?fk_sensor=${sensorId}`;
        } else if (date) {
          url += `?date=${date}`;
        }

        console.log("Solicitando datos históricos desde:", url);
        console.log("Token de autenticación:", token || "No token encontrado");

        if (!token) {
          throw new Error("No se encontró un token de autenticación");
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Estado de la respuesta:", response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Detalles del error:", errorText);
          throw new Error(`Error ${response.status}: ${errorText || "No se recibió mensaje de error"}`);
        }

        const result = await response.json();
        console.log("Datos recibidos:", result);

        // Validar que los datos tengan el formato esperado
        if (!Array.isArray(result)) {
          throw new Error("Los datos recibidos no son un array");
        }

        // Validar que los datos tengan los campos esperados
        if (result.length > 0) {
          const firstItem = result[0];
          const requiredFields = ["id", "fk_sensor", "temperatura", "humedad_ambiente", "fecha_medicion"];
          const missingFields = requiredFields.filter(field => !(field in firstItem));
          if (missingFields.length > 0) {
            console.warn("Campos faltantes en los datos:", missingFields);
          }
        }

        setData(result);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        console.error("Error al obtener datos históricos:", errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sensorId, date, token]);

  return { data, isLoading, error };
};