import { motion } from "framer-motion";
import { SensorData, TipoSensor } from "@/types/iot/type";

interface SensorDataCardsProps {
  realTimeData: SensorData[];
  selectedSensor: number | "todos";
  dataTypes: TipoSensor[];
}

export const SensorDataCards: React.FC<SensorDataCardsProps> = ({
  realTimeData,
  selectedSensor,
  dataTypes,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {dataTypes.map((type, index) => {
        const latest = realTimeData
          .filter(
            (d) => {
              const value = d[type.key];
              return (
                value !== null &&
                value !== undefined && 
                typeof value === "number" &&
                (selectedSensor === "todos" || Number(d.fk_sensor) === selectedSensor)
              );
            }
          )
          .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];
        const value = latest ? (latest[type.key] as number) : null;
        return (
          <motion.div
            key={type.key}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center h-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              {type.icon} {type.nombre}
            </p>
            <p
              className="text-2xl font-bold mt-2"
              style={{
                color:
                  type.key === "temperatura"
                    ? "#dc2626"
                    : type.key === "humedad_ambiente"
                    ? "#2563eb"
                    : type.key === "humedad_suelo"
                    ? "#10b981"
                    : type.key === "calidad_aire"
                    ? "#f59e0b"
                    : "#f59e0b",
              }}
            >
              {value !== null ? value.toFixed(type.decimals) : "N/A"}{" "}
              {type.unidad_medida}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};