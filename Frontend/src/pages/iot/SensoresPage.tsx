import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useNavigate } from "react-router-dom";
import { Sensor, SensorData } from "@/types/iot/type";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const dataTypes = [
  {
    label: "Temperatura (°C)",
    key: "temperatura",
    icon: <FaTemperatureHigh className="text-red-500" />,
    sensorId: 1,
    tipo_sensor: "temperatura",
  },
  {
    label: "Humedad (%)",
    key: "humedad_ambiente",
    icon: <FaTint className="text-blue-500" />,
    sensorId: 2,
    tipo_sensor: "ambient_humidity",
  },
];

export default function SensoresPage() {
  const [selectedDataType, setSelectedDataType] = useState<string>("temperatura");
  const [selectedSensorId, setSelectedSensorId] = useState<number>(1);
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);
  const { sensores = [], isLoading: sensoresLoading, error: sensoresError } =
    useSensoresRegistrados();
  const { isLoading: historicosLoading, error: historicosError } =
    useDatosMeteorologicosHistoricos();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.12:8000/ws/realtime/");
    ws.onopen = () => {
      console.log("Conexión WebSocket establecida");
    };
    ws.onmessage = (event) => {
      console.log("Mensaje recibido del WebSocket:", event.data);
      try {
        const message = JSON.parse(event.data);
        if (message.type === "weather_data") {
          const sensor = sensores.find((s: Sensor) => s.id === message.data.fk_sensor);
          if (sensor && sensor.estado === "activo") {
            const newData: SensorData = {
              id: message.data.id || Date.now(),
              fk_sensor: message.data.fk_sensor,
              temperatura: message.data.temperatura || null,
              humedad_ambiente: message.data.humedad_ambiente || null,
              fecha_medicion: message.data.fecha_medicion || new Date().toISOString(),
            };
            setRealTimeData((prev) => {
              const updated = [...prev, newData].slice(-50);
              console.log(`Datos actualizados para sensor ${newData.fk_sensor}:`, newData);
              return updated;
            });
          } else {
            console.log(
              `Datos ignorados para sensor ${message.data.fk_sensor} (inactivo o no encontrado)`
            );
          }
        }
      } catch (error) {
        console.error("Error al parsear mensaje WebSocket:", error);
      }
    };
    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
      addToast({
        title: "Error",
        description: "Error en la conexión WebSocket",
        color: "danger",
      });
    };
    ws.onclose = () => {
      console.log("Conexión WebSocket cerrada");
      addToast({
        title: "Info",
        description: "Conexión WebSocket cerrada, intentando reconectar...",
        color: "warning",
      });
    };
    return () => ws.close();
  }, [sensores]);

  const toggleSensor = async (sensorId: number, currentEnabled: boolean) => {
    try {
      const newEnabled = !currentEnabled;
      await api.patch(`/iot/sensores/${sensorId}/`, {
        estado: newEnabled ? "activo" : "inactivo",
      });
      await queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({
        title: "Éxito",
        description: `Sensor ${sensorId} ${newEnabled ? "activado" : "desactivado"} con éxito`,
        color: "success",
      });
    } catch (err: any) {
      console.error("Error en toggleSensor:", err.response || err);
      addToast({
        title: "Error",
        description: err.response?.data?.error || "Error al cambiar el estado del sensor",
        color: "danger",
      });
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleDataTypeClick = (type: { key: string; sensorId: number }) => {
    setSelectedDataType(type.key);
    setSelectedSensorId(type.sensorId);
  };

  const filteredData = realTimeData.filter((dato: SensorData) => {
    const value = dato[selectedDataType as keyof SensorData];
    return value != null && dato.fk_sensor === selectedSensorId;
  });

  const barChartData = filteredData
    .sort((a: SensorData, b: SensorData) =>
      new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime()
    )
    .slice(0, 10)
    .map((dato: SensorData, index: number) => ({
      id: `${dato.id}-${index}`,
      name: new Date(dato.fecha_medicion).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      value: dato[selectedDataType as keyof SensorData] ?? 0,
    }));

  const lineChartData = filteredData
    .sort((a: SensorData, b: SensorData) =>
      new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime()
    )
    .slice(0, 10)
    .map((dato: SensorData, index: number) => ({
      id: `${dato.id}-${index}`,
      fecha: new Date(dato.fecha_medicion).toLocaleString("es-ES", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: dato[selectedDataType as keyof SensorData] ?? 0,
    }));

  const selectedSensor = sensores.find((s: Sensor) => s.id === selectedSensorId);

  if (sensoresLoading || historicosLoading) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6">
          <p className="text-gray-700">Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (sensoresError || historicosError) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6">
          <p className="text-red-500 text-center">
            Error al cargar los datos: {(sensoresError || historicosError)?.message}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Datos en Tiempo Real
          </h2>

          <div className="mb-4 flex justify-start items-center gap-2">
            <motion.button
              className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg"
              onClick={() => navigate("/iot/datosmeteorologicos")}
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Datos Históricos
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dataTypes.map((type, index) => {
              const sensor = sensores.find((s: Sensor) => s.id === type.sensorId);
              const latestData =
                sensor && sensor.estado === "activo"
                  ? realTimeData
                      .filter((d) => d.fk_sensor === type.sensorId)
                      .sort(
                        (a, b) =>
                          new Date(b.fecha_medicion).getTime() -
                          new Date(a.fecha_medicion).getTime()
                      )[0]
                  : null;
              return (
                <motion.div
                  key={type.sensorId}
                  className="bg-blue-800 text-white p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold">{type.label}</h3>
                  <p className="text-2xl">
                    {latestData?.[type.key as keyof SensorData] ?? "N/A"} {type.key === "temperatura" ? "°C" : "%"}
                  </p>
                </motion.div>
              );
            })}
            <motion.div
              key="sensoresActivos"
              className="bg-orange-500 text-white p-4 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: dataTypes.length * 0.1 }}
            >
              <h3 className="text-lg font-semibold">Sensores Activos</h3>
              <p className="text-2xl">
                {sensores.filter((s: Sensor) => s.estado === "activo").length}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Seleccionar Tipo de Dato
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {dataTypes.map((type) => (
                <motion.button
                  key={type.sensorId}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg"
                  onClick={() => handleDataTypeClick(type)}
                  whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {selectedSensor && (
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Control de Sensor - {selectedSensor.nombre}
              </h3>
              <motion.button
                className={`px-4 py-2 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg ${
                  selectedSensor.estado === "activo" ? "bg-red-600" : "bg-green-600"
                }`}
                onClick={() =>
                  toggleSensor(selectedSensor.id, selectedSensor.estado === "activo")
                }
                whileHover={{
                  scale: 1.05,
                  backgroundColor:
                    selectedSensor.estado === "activo" ? "#dc2626" : "#059669",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedSensor.estado === "activo"
                  ? "Deshabilitar Sensor"
                  : "Habilitar Sensor"}
              </motion.button>
            </motion.div>
          )}

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Gráfica en Tiempo Real - {selectedDataType === "temperatura" ? "Temperatura" : "Humedad"}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
            {barChartData.length === 0 && (
              <p className="text-gray-600 text-center mt-4">
                No hay datos disponibles para {selectedDataType === "temperatura" ? "Temperatura" : "Humedad"}. Verifica si el sensor está activo.
              </p>
            )}
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Gráfica en Tiempo Real (Líneas) - {selectedDataType === "temperatura" ? "Temperatura" : "Humedad"}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1E3A8A" />
              </LineChart>
            </ResponsiveContainer>
            {lineChartData.length === 0 && (
              <p className="text-gray-600 text-center mt-4">
                No hay datos en tiempo real disponibles para {selectedDataType === "temperatura" ? "Temperatura" : "Humedad"}.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </DefaultLayout>
  );
}