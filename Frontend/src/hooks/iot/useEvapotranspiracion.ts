import { useQuery } from "@tanstack/react-query";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import { addToast } from "@heroui/react";
import { EvapotranspiracionData, SensorData } from "@/types/iot/type";
import { Cultivo } from "@/types/cultivo/Cultivo";

// Función para obtener bancales (nueva, para obtener latitud)
const fetchBancales = async (): Promise<{ id: number; posY: number | null }[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await fetch("http://127.0.0.1:8000/cultivo/Bancal/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Error al obtener bancales");
  return response.json();
};

// Función para calcular la radiación extraterrestre (Ra) basada en latitud y día del año
const calculateRa = (latitude: number, dayOfYear: number): number => {
  const latRad = (latitude * Math.PI) / 180;
  const dr = 1 + 0.033 * Math.cos((2 * Math.PI * dayOfYear) / 365);
  const delta = 0.409 * Math.sin((2 * Math.PI * dayOfYear) / 365 - 1.39);
  const ws = Math.acos(-Math.tan(latRad) * Math.tan(delta));
  const Ra =
    (24 * 60 / Math.PI) *
    0.082 *
    dr *
    (ws * Math.sin(latRad) * Math.sin(delta) +
      Math.cos(latRad) * Math.cos(delta) * Math.sin(ws));
  return Ra;
};

// Función para calcular ET0 usando el método de Hargreaves
const calculateET0 = (tMax: number, tMin: number, ra: number): number => {
  const tMean = (tMax + tMin) / 2;
  const et0 = 0.0023 * (tMean + 17.8) * Math.sqrt(tMax - tMin) * ra;
  return et0;
};

// Hook principal
export const useEvapotranspiracion = (cultivoId: number) => {
  const { data: datosMeteorologicos = [], isLoading: isLoadingDatos, error: errorDatos } =
    useDatosMeteorologicosHistoricos();
  const { data: cultivos = [], isLoading: isLoadingCultivos, error: errorCultivos } =
    useCultivos(false);
  const { data: bancales = [], isLoading: isLoadingBancales } = useQuery<
    { id: number; posY: number | null }[],
    Error
  >({
    queryKey: ["bancales"],
    queryFn: fetchBancales,
  });

  return useQuery<EvapotranspiracionData[], Error>({
    queryKey: ["evapotranspiracion", cultivoId],
    queryFn: async () => {
      if (errorDatos || errorCultivos) {
        addToast({
          title: "Error",
          description: "Error al cargar datos necesarios para el cálculo de evapotranspiración",
          color: "danger",
        });
        throw new Error("Error al cargar datos necesarios para el cálculo de evapotranspiración");
      }

      const cultivo = cultivos.find((c: Cultivo) => c.id === cultivoId);
      if (!cultivo) {
        addToast({ title: "Error", description: "Cultivo no encontrado", color: "danger" });
        throw new Error("Cultivo no encontrado");
      }

      const bancal = bancales.find((b) => b.id === cultivo.Bancal);
      if (!bancal) {
        addToast({ title: "Error", description: "Bancal no encontrado", color: "danger" });
        throw new Error("Bancal no encontrado");
      }

      const latitud = bancal.posY ?? 0; // Usar posY como latitud, con valor por defecto

      const et0Data: EvapotranspiracionData[] = datosMeteorologicos.map(
        (dato: SensorData, index: number) => {
          const fecha = new Date(dato.fecha_medicion); // Cambiado de dato.fecha
          const dayOfYear = Math.floor(
            (fecha.getTime() - new Date(fecha.getFullYear(), 0, 0).getTime()) /
              1000 /
              60 /
              60 /
              24
          );

          const ra = calculateRa(latitud, dayOfYear);
          const tAvg = dato.temperatura ?? 20; // Valor por defecto si null
          const tMax = tAvg + 2;
          const tMin = tAvg - 2;
          const et0 = calculateET0(tMax, tMin, ra);

          return {
            id: index + 1, // Generar ID único
            fk_bancal: cultivo.Bancal, // Usar Bancal como fk_bancal
            fecha: dato.fecha_medicion,
            valor: et0,
            creado: new Date().toISOString(),
          };
        }
      );

      addToast({
        title: "Éxito",
        description: "Evapotranspiración calculada con éxito",
        color: "success",
      });
      return et0Data;
    },
    enabled:
      !!datosMeteorologicos.length &&
      !!cultivos.length &&
      !!bancales.length &&
      !isLoadingDatos &&
      !isLoadingCultivos &&
      !isLoadingBancales,
  });
};