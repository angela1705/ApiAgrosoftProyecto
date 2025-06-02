import { useState, useMemo, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensores } from "@/hooks/iot/sensores/useSensores";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/datos_sensores/useDatosMeteorologicosHistoricos";
import { useNavigate } from "react-router-dom";
import { Sensor, SensorData } from "@/types/iot/type";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";
import { addToast } from "@heroui/react";
import Plot from "react-plotly.js";

// Definición de tipos para los datos
interface DataType {
  label: string;
  key: "temperatura" | "humedad_ambiente";
  icon: JSX.Element;
  decimals: number;
}

const dataTypes: DataType[] = [
  {
    label: "Temperatura (°C)",
    key: "temperatura",
    icon: <FaTemperatureHigh className="text-red-500" />,
    decimals: 3,
  },
  {
    label: "Humedad (%)",
    key: "humedad_ambiente",
    icon: <FaTint className="text-blue-500" />,
    decimals: 1,
  },
];

const SensoresPage: React.FC = () => {
  const [selectedDataType, setSelectedDataType] = useState<DataType>(dataTypes[0]);
  const [selectedSensor, setSelectedSensor] = useState<number | "todos">("todos");
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);
  const { sensores, isLoading: sensoresLoading, error: sensoresError } = useSensores();
  const { isLoading: historicosLoading, error: historicosError } = useDatosMeteorologicosHistoricos();
  const navigate = useNavigate();

  // Filtrar sensores por el tipo seleccionado
  const filteredSensores = useMemo(() => {
    return sensores.filter((sensor: Sensor) => sensor.tipo_sensor === selectedDataType.key);
  }, [sensores, selectedDataType]);

  // Conexión WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.12:8000/ws/realtime/");
    ws.onopen = () => {
      console.log("Conexión WebSocket establecida");
      addToast({
        title: "Éxito",
        description: "Conexión WebSocket establecida",
        timeout: 3000,
        color: "success",
      });
    };
    ws.onmessage = (event: MessageEvent) => {
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
            setRealTimeData((prev) => [...prev, newData].slice(-50));
          }
        }
      } catch (error) {
        console.error("Error al parsear mensaje WebSocket:", error);
        addToast({
          title: "Error",
          description: "Error al procesar datos en tiempo real",
          timeout: 3000,
          color: "danger",
        });
      }
    };
    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
      addToast({
        title: "Error",
        description: "Error en la conexión WebSocket",
        timeout: 3000,
        color: "danger",
      });
    };
    ws.onclose = () => {
      console.log("Conexión WebSocket cerrada");
      addToast({
        title: "Advertencia",
        description: "Conexión WebSocket cerrada, intentando reconectar...",
        timeout: 3000,
        color: "warning",
      });
    };
    return () => ws.close();
  }, [sensores]);

  // Filtrado de datos según tipo y sensor seleccionado
  const filteredData = useMemo(() => {
    return realTimeData.filter(
      (dato: SensorData) =>
        dato[selectedDataType.key] !== null &&
        (selectedSensor === "todos" || dato.fk_sensor === selectedSensor)
    );
  }, [realTimeData, selectedDataType, selectedSensor]);

  // Datos para la gráfica de barras
  const barChartData = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
      .slice(0, 10)
      .map((dato, i) => ({
        id: `${dato.id}-${i}`,
        name: new Date(dato.fecha_medicion).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        value: Number(dato[selectedDataType.key]) || 0,
      }));
  }, [filteredData]);

  // Datos para la gráfica de líneas
  const lineChartData = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
      .slice(0, 10)
      .map((dato, i) => ({
        id: `${dato.id}-${i}`,
        fecha: new Date(dato.fecha_medicion).toLocaleString("es-ES", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        value: Number(dato[selectedDataType.key]) || 0,
      }));
  }, [filteredData]);

  // Estados de carga y error
  if (sensoresLoading || historicosLoading) {
    return (
      <DefaultLayout>
        <div className="w-full flex items-center justify-center h-screen bg-gray-50">
          <p className="text-gray-700 text-lg">Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (sensoresError || historicosError) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-50">
          <p className="text-red-500 text-center mb-4">{sensoresError?.message || historicosError?.message}</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
      <div className="w-full flex flex-col items-center bg-gray-50 px-3 py-2">
        <div className="w-full max-w-6xl flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Datos en Tiempo Real</h1>

          {/* Selectores en la misma fila con tamaño de tarjeta */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <motion.div
              className="bg-white rounded-xl shadow-md p-4 w-56 h-32 flex flex-col justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Dato</label>
              <div className="grid grid-cols-2 gap-2 w-full">
                {dataTypes.map((type) => (
                  <motion.button
                    key={type.key}
                    className={`p-2 rounded-lg flex flex-col items-center justify-center text-xs transition-all ${
                      selectedDataType.key === type.key
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedDataType(type);
                      setSelectedSensor("todos");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-lg">{type.icon}</div>
                    <span className="font-medium">{type.label.split(" ")[0]}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md p-4 w-56 h-32 flex flex-col justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Sensor</label>
              <select
                value={selectedSensor}
                onChange={(e) =>
                  setSelectedSensor(e.target.value === "todos" ? "todos" : Number(e.target.value))
                }
                className="p-2 border rounded w-full text-sm"
              >
                <option value="todos">Todos los sensores</option>
                {filteredSensores.map((sensor: Sensor) => (
                  <option key={sensor.id} value={sensor.id}>
                    {sensor.nombre}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Tarjetas de datos en tiempo real */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {dataTypes.map((type, index) => {
              const latest = realTimeData
                .filter((d) => selectedSensor === "todos" || d.fk_sensor === selectedSensor)
                .filter((d) => d[type.key] !== null)
                .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];

              return (
                <motion.div
                  key={type.key}
                  className="bg-white rounded-xl shadow-md p-4 text-center w-56 h-32 flex flex-col justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-base font-semibold text-gray-700 flex items-center justify-center gap-2">
                    {type.icon} {type.label}
                  </p>
                  <p
                    className="text-3xl font-bold mt-2"
                    style={{ color: type.key === "temperatura" ? "#dc2626" : "#2563eb" }}
                  >
                    {latest?.[type.key] !== null && typeof latest?.[type.key] === "number"
                      ? Number(latest[type.key]).toFixed(type.decimals)
                      : "N/A"}{" "}
                    {type.key === "temperatura" ? "°C" : "%"}
                  </p>
                </motion.div>
              );
            })}
            <motion.button
              className="w-56 h-32 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg p-4 flex items-center justify-center"
              onClick={() => navigate("/iot/datosmeteorologicos")}
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Datos Históricos
            </motion.button>
          </div>

          {/* Gráficas */}
          <div className="w-full max-w-6xl h-[300px] grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-semibold text-gray-800 mb-1">{selectedDataType.label} por Hora</h2>
              <div className="flex-1 w-full">
                <Plot
                  data={[
                    {
                      x: barChartData.map((d) => d.name),
                      y: barChartData.map((d) => d.value),
                      type: "bar",
                      name: selectedDataType.label,
                      marker: { color: "#3b82f6" },
                    },
                  ]}
                  layout={{
                    margin: { t: 20, b: 50, l: 50, r: 20 },
                    xaxis: { title: { text: "Hora", font: { size: 10 } }, tickfont: { size: 8 }, tickangle: 45 },
                    yaxis: { title: { text: selectedDataType.label, font: { size: 10 } }, tickfont: { size: 8 } },
                    showlegend: false,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  config={{ responsive: true }}
                />
              </div>
              {barChartData.length === 0 && (
                <p className="text-gray-600 text-center text-xs mt-2">No hay datos disponibles.</p>
              )}
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-sm font-semibold text-gray-800 mb-1">{selectedDataType.label} en el Tiempo</h2>
              <div className="flex-1 w-full">
                <Plot
                  data={[
                    {
                      x: lineChartData.map((d) => d.fecha),
                      y: lineChartData.map((d) => d.value),
                      type: "scatter",
                      mode: "lines+markers",
                      name: selectedDataType.label,
                      line: { color: "#10b981" },
                    },
                  ]}
                  layout={{
                    margin: { t: 20, b: 50, l: 50, r: 20 },
                    xaxis: { title: { text: "Fecha", font: { size: 10 } }, tickfont: { size: 8 }, tickangle: 45 },
                    yaxis: { title: { text: selectedDataType.label, font: { size: 10 } }, tickfont: { size: 8 } },
                    showlegend: false,
                  }}
                  style={{ width: "100%", height: "100%" }}
                  config={{ responsive: true }}
                />
              </div>
              {lineChartData.length === 0 && (
                <p className="text-gray-600 text-center text-xs mt-2">No hay datos disponibles.</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SensoresPage;