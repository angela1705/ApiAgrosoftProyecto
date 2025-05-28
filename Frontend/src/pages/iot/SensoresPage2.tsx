import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import DefaultLayout from "@/layouts/default";
import { useSensores } from "@/hooks/iot/mqtt/useSensores";
import { usePublishCommand } from "@/hooks/iot/mqtt/usePublishCommand";
import { DataTypeSelector } from "@/components/Iot/mqtt/DataTypeSelector";
import { ViewModeSelector } from "@/components/Iot/mqtt/ViewModeSelector";
import { SensorStats } from "@/components/Iot/mqtt/SensorStats";
import { SensorCharts } from "@/components/Iot/mqtt/SensorCharts";
import { SensorTable } from "@/components/Iot/mqtt/SensorTable";
import { DataType, ViewMode } from "@/types/iot/iotmqtt";

// Definición de tipos de datos
const dataTypes: DataType[] = [
  {
    label: "Temperatura (°C)",
    key: "temperatura",
    icon: <FaTemperatureHigh className="text-red-500" />,
    sensorId: 1,
    decimals: 3,
  },
  {
    label: "Humedad (%)",
    key: "humedad_ambiente",
    icon: <FaTint className="text-blue-500" />,
    sensorId: 2,
    decimals: 1,
  },
];

const viewModes: ViewMode[] = [
  { id: "realtime", label: "Tiempo Real" },
  { id: "allData", label: "Todos los Datos" },
];

const SensoresPage: React.FC = () => {
  const { realTimeData, isLoading, error, mqttClient } = useSensores();
  const [sensorActive, setSensorActive] = useState(true);
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0]);
  const [selectedViewMode, setSelectedViewMode] = useState(viewModes[0]);
  const publishCommand = usePublishCommand(mqttClient, sensorActive, setSensorActive);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
          <p className="text-gray-700">Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
          <p className="text-red-500 text-center">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Datos del Sensor DHT22</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          {dataTypes.map((type, index) => {
            const latest = realTimeData
              .filter((d) => d.fk_sensor === type.sensorId)
              .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];
 
            const value = latest && type.key in latest ? latest[type.key as keyof typeof latest] : null;

            return (
              <motion.div
                key={type.key}
                className="bg-white rounded-xl shadow-md p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
                  {type.icon} {type.label}
                </p>
                <p
                  className="text-4xl font-bold mt-2"
                  style={{ color: type.key === "temperatura" ? "#dc2626" : "#2563eb" }}
                >
                  {value !== null && typeof value === "number"
                    ? value.toFixed(type.decimals)
                    : "N/A"}{" "}
                  {type.key === "temperatura" ? "°C" : "%"}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Resto del componente (botones, selectores, gráficos, etc.) */}
        <div className="mb-6 flex flex-wrap gap-4">
          <motion.button
            className={`px-4 py-2 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg ${
              sensorActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={() => publishCommand(sensorActive ? "STOP_SENSOR" : "START_SENSOR")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sensorActive ? "Apagar Sensor" : "Encender Sensor"}
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700"
            onClick={() => publishCommand("RESTART_WIFI")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reiniciar WiFi
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-green-700"
            onClick={() => navigate("/iot/datosmeteorologicos")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Datos Históricos
          </motion.button>
        </div>

        <ViewModeSelector selectedViewMode={selectedViewMode} setSelectedViewMode={setSelectedViewMode} />

        {selectedViewMode.id === "realtime" && (
          <DataTypeSelector selectedDataType={selectedDataType} setSelectedDataType={setSelectedDataType} />
        )}

        {selectedViewMode.id === "realtime" ? (
          <SensorCharts realTimeData={realTimeData} selectedDataType={selectedDataType} />
        ) : (
          <>
            <SensorStats realTimeData={realTimeData} />
            <SensorTable realTimeData={realTimeData} />
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SensoresPage;