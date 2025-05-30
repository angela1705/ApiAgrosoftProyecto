import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useNavigate } from "react-router-dom";
import { Sensor, SensorData, DataType } from "@/types/iot/type";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";
import { addToast } from "@heroui/react";
import Plot from "react-plotly.js";
import { DataTypeSelector } from "@/components/Iot/DataTypeSelector";

export default function SensoresPage() {
  const [selectedDataType, setSelectedDataType] = useState<DataType>({
    label: "Temperatura (°C)",
    key: "temperatura",
    icon: <FaTemperatureHigh className="text-red-500" />,
    sensorId: 1,
    decimals: 3,
  });
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);
  const { sensores, isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const { isLoading: historicosLoading, error: historicosError } = useDatosMeteorologicosHistoricos();
  const navigate = useNavigate();

  // Conexión WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://10.4.21.92:8000/ws/realtime/");
    ws.onopen = () => {
      console.log("Conexión WebSocket establecida");
      addToast({
        title: "Éxito",
        description: "Conexión WebSocket establecida",
        timeout: 3000,
        color: "success",
      });
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

  // Filtrado de datos según el tipo seleccionado
  const filteredData = realTimeData.filter(
    (dato: SensorData) =>
      dato[selectedDataType.key as keyof SensorData] !== null &&
      dato.fk_sensor === selectedDataType.sensorId
  );

  // Datos para la gráfica de barras
  const barChartData = [...filteredData]
    .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
    .slice(0, 10)
    .map((dato, i) => ({
      id: `${dato.id}-${i}`,
      name: new Date(dato.fecha_medicion).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      value: Number(dato[selectedDataType.key as keyof SensorData]) || 0,
    }));

  // Datos para la gráfica de líneas
  const lineChartData = [...filteredData]
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
      value: Number(dato[selectedDataType.key as keyof SensorData]) || 0,
    }));

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

          <div className="flex items-center justify-center gap-4 mb-4">
            {[
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
            ].map((type, index) => {
              const latest = realTimeData
                .filter((d) => d.fk_sensor === type.sensorId)
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
                    {latest?.[type.key as keyof SensorData] !== null &&
                    typeof latest?.[type.key as keyof SensorData] === "number"
                      ? Number(latest[type.key as keyof SensorData]).toFixed(type.decimals)
                      : "N/A"}{" "}
                    {type.key === "temperatura" ? "°C" : "%"}
                  </p>
                </motion.div>
              );
            })}
            <motion.div
              className="w-56 h-32 bg-white rounded-xl shadow-md flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DataTypeSelector
                selectedDataType={selectedDataType}
                setSelectedDataType={setSelectedDataType}
                className="w-full h-auto max-h-full text-sm font-semibold text-gray-700"
              />
            </motion.div>
            <motion.button
              className="w-56 h-32 bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg p-4 flex items-center justify-center"
              onClick={() => navigate("/iot/datosmeteorologicos")}
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Datos Históricos
            </motion.button>
          </div>

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
}