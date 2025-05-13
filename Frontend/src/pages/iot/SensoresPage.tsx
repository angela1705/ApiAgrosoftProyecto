import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useDatosMeteorologicos } from "@/hooks/iot/useDatosMeteorologicos";
import { useNavigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import { Sensor, SensorData } from "@/types/iot/type";
import { FaTemperatureHigh, FaTint, FaSun, FaCloudRain, FaWind, FaCompass, FaVial } from "react-icons/fa";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dataTypes = [
  { label: "Temperatura (°C)", key: "temperatura", icon: <FaTemperatureHigh className="text-red-500" />, sensorId: 1, tipo_sensor: "temperatura" },
  { label: "Humedad (%)", key: "humedad_ambiente", icon: <FaTint className="text-blue-500" />, sensorId: 2, tipo_sensor: "ambient_humidity" },
  { label: "Humedad Suelo (%)", key: "humedad_suelo", icon: <FaTint className="text-blue-700" />, sensorId: 3, tipo_sensor: "soil_humidity" },
  { label: "Luminosidad (lux)", key: "luminosidad", icon: <FaSun className="text-yellow-500" />, sensorId: 4, tipo_sensor: "luminosity" },
  { label: "Lluvia (mm)", key: "lluvia", icon: <FaCloudRain className="text-gray-500" />, sensorId: 5, tipo_sensor: "rainfall" },
  { label: "Velocidad Viento (m/s)", key: "velocidad_viento", icon: <FaWind className="text-teal-500" />, sensorId: 6, tipo_sensor: "wind_speed" },
  { label: "Dirección Viento (grados)", key: "direccion_viento", icon: <FaCompass className="text-green-500" />, sensorId: 7, tipo_sensor: "wind_direction" },
  { label: "pH Suelo", key: "ph_suelo", icon: <FaVial className="text-purple-500" />, sensorId: 8, tipo_sensor: "soil_ph" },
];

const timePeriods = [
  { label: "30 min", value: 30 * 60 * 1000 },
  { label: "1 h", value: 60 * 60 * 1000 },
  { label: "6 h", value: 6 * 60 * 1000 },
];

export default function SensoresPage() {
  const [selectedDataType, setSelectedDataType] = useState<string>("temperatura");
  const [selectedSensorId, setSelectedSensorId] = useState<number>(1);
  const [timePeriod, setTimePeriod] = useState<number>(30 * 60 * 1000);
  const { sensores = [], isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Obtener datos en tiempo real para cada sensor
  const realTimeQueries = dataTypes.map((type) =>
    useDatosMeteorologicos(type.sensorId)
  );

  const realTimeData = realTimeQueries.map((query) => query.data || []);
  const isLoading = realTimeQueries.some((query) => query.isLoading);
  const error = realTimeQueries.find((query) => query.error)?.error;

  // Últimos valores para cada tipo de dato
  const latestData = dataTypes.reduce((acc, type) => {
    const sensorData = realTimeData[dataTypes.indexOf(type)] || [];
    const latest = sensorData
      .filter((d: SensorData) => d[type.key as keyof SensorData] != null)
      .sort((a: SensorData, b: SensorData) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];
    acc[type.key] = latest ? latest[type.key as keyof SensorData] ?? "N/A" : "N/A";
    return acc;
  }, {} as Record<string, string | number>);

  latestData.sensoresActivos = sensores.filter((s: Sensor) => s.estado === "activo").length || 0;

  const toggleSensor = async (sensorId: number, currentEnabled: boolean) => {
    try {
      const newEnabled = !currentEnabled;
      const response = await api.patch(`/iot/sensores/${sensorId}/`, {
        estado: newEnabled ? "activo" : "inactivo",
      });
      console.log("PATCH response:", response.data);
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

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Sensor", uid: "sensor" },
    { name: dataTypes.find(dt => dt.key === selectedDataType)?.label || "Dato", uid: "value" },
    { name: "Fecha de Medición", uid: "fecha_medicion" },
  ];

  const selectedData = realTimeData[dataTypes.findIndex(dt => dt.sensorId === selectedSensorId)] || [];
  const filteredData = selectedData.filter((dato: SensorData) => {
    const value = dato[selectedDataType as keyof SensorData];
    const date = new Date(dato.fecha_medicion).getTime();
    const now = new Date().getTime();
    const isValidDate = !isNaN(date);
    return isValidDate && dato.sensor === selectedSensorId && value != null && date >= now - timePeriod;
  });
 
  const formattedData = filteredData.map((dato: SensorData, index: number) => ({
    id: `${dato.sensor}-${dato.id}-${index}`,  
    sensor: sensores.find((s: Sensor) => s.id === dato.sensor)?.nombre || dato.sensor || "N/A",
    value: dato[selectedDataType as keyof SensorData] ?? "N/A",
    fecha_medicion: dato.fecha_medicion ? new Date(dato.fecha_medicion).toLocaleString() : "N/A",
  }));
 
  const barChartData = filteredData
    .sort((a: SensorData, b: SensorData) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
    .slice(0, 10)
    .map((dato: SensorData, index: number) => ({
      name: `Dato ${index + 1}`,
      value: dato[selectedDataType as keyof SensorData] ?? 0,
    }));

  const selectedSensor = sensores.find((s: Sensor) => s.id === selectedSensorId);

  if (sensoresLoading || isLoading) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6">
          <p className="text-gray-700">Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (sensoresError || error) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6">
          <p className="text-red-500 text-center">
            Error al cargar los datos: {(sensoresError || error)?.message}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Datos en Tiempo Real</h2>

          <div className="mb-4 flex justify-start items-center gap-2">
            <button
              className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/iot/datosmeteorologicos")}
            >
              Ver Datos Históricos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dataTypes.map((type, index) => (
              <motion.div
                key={type.sensorId} // Usar sensorId como clave única
                className="bg-blue-800 text-white p-4 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold">{type.label}</h3>
                <p className="text-2xl">
                  {latestData[type.key]}{" "}
                  {type.label.includes("(%)") ? "%" : 
                   type.label.includes("°C") ? "°C" : 
                   type.label.includes("(lux)") ? "lux" : 
                   type.label.includes("(mm)") ? "mm" : 
                   type.label.includes("(m/s)") ? "m/s" : 
                   type.label.includes("(grados)") ? "°" : ""}
                </p>
              </motion.div>
            ))}
            <motion.div
              key="sensoresActivos"
              className="bg-orange-500 text-white p-4 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: dataTypes.length * 0.1 }}
            >
              <h3 className="text-lg font-semibold">Sensores Activos</h3>
              <p className="text-2xl">{latestData.sensoresActivos}</p>
            </motion.div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Seleccionar Tipo de Dato</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {dataTypes.map((type) => (
                <button
                  key={type.sensorId} // Usar sensorId como clave única
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => handleDataTypeClick(type)}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedSensor && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Control de Sensor - {selectedSensor.nombre}
              </h3>
              <button
                className={`px-4 py-2 text-white text-sm font-semibold rounded-lg ${
                  selectedSensor.estado === "activo" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                } transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105`}
                onClick={() => toggleSensor(selectedSensor.id, selectedSensor.estado === "activo")}
              >
                {selectedSensor.estado === "activo" ? "Deshabilitar Sensor" : "Habilitar Sensor"}
              </button>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Período de Visualización</h3>
            <div className="flex gap-4">
              {timePeriods.map((period) => (
                <button
                  key={period.value}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                    timePeriod === period.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-all duration-300 ease-in-out`}
                  onClick={() => setTimePeriod(period.value)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Datos en Tiempo Real</h3>
            {formattedData.length > 0 ? (
              <>
                <Tabla columns={columns} data={formattedData} />
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Gráfica en Tiempo Real - {dataTypes.find(dt => dt.key === selectedDataType)?.label}
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <p className="text-gray-600 text-center">
                No hay datos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label}. Verifica si el sensor está activo.
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}