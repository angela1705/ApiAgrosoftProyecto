import { useState } from "react";
import { useDatosMeteorologicos } from "@/hooks/iot/useDatosMeteorologicos";
import DefaultLayout from "@/layouts/default";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function SensoresPage() {
  const { data: latestData = [], chartData = [], isLoading, error } = useDatosMeteorologicos();
  const [selectedMetric, setSelectedMetric] = useState<string>("");

  const metrics = [
    { value: "temperatura", label: "Temperatura (°C)", color: "#8884d8", icon: "🌡️" },
    { value: "humedad_ambiente", label: "Humedad Ambiente (%)", color: "#82ca9d", icon: "💧" },
    { value: "humedad_suelo", label: "Humedad Suelo (%)", color: "#ff7300", icon: "🌱" },
    { value: "luminosidad", label: "Luminosidad (lux)", color: "#ffc107", icon: "☀️" },
    { value: "lluvia", label: "Lluvia (mm/h)", color: "#00c4ff", icon: "🌧️" },
    { value: "velocidad_viento", label: "Velocidad Viento (m/s)", color: "#ff4d4f", icon: "💨" },
    { value: "direccion_viento", label: "Dirección Viento (grados)", color: "#a0d911", icon: "🧭" },
    { value: "ph_suelo", label: "pH Suelo (pH)", color: "#d81b60", icon: "🧪" },
  ];

  const graphData = chartData.map((sensor, index) => ({
    name: sensor.fecha_medicion ? new Date(sensor.fecha_medicion).toLocaleTimeString() : `Dato ${index + 1}`,
    temperatura: sensor.temperatura ?? null,
    humedad_ambiente: sensor.humedad_ambiente ?? null,
    humedad_suelo: sensor.humedad_suelo ?? null,
    luminosidad: sensor.luminosidad ?? null,
    lluvia: sensor.lluvia ?? null,
    velocidad_viento: sensor.velocidad_viento ?? null,
    direccion_viento: sensor.direccion_viento ?? null,
    ph_suelo: sensor.ph_suelo ?? null,
  }));

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Sensores Activos en Tiempo Real</h2>

          <div className="mb-2 flex justify-start gap-2">
            <Link
              to="/iot/registrar-sensor"
              className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              + Registrar Sensor
            </Link>
            <Link
              to="/iot/datos-meteorologicos"
              className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Ver Datos Históricos
            </Link>
            <Link
              to="/iot/listar-sensores"
              className="px-3 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Listar Sensores
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {metrics.map((metric) => (
              <button
                key={metric.value}
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 ${
                  selectedMetric === metric.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedMetric(metric.value)}
              >
                <span>{metric.icon}</span>
                <span>{metric.label}</span>
              </button>
            ))}
          </div>

          {isLoading ? (
            <p className="text-gray-600 text-center">Cargando datos...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error.message}</p>
          ) : selectedMetric ? (
            <LineChart width={600} height={300} data={graphData} className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={metrics.find((m) => m.value === selectedMetric)?.color}
                name={metrics.find((m) => m.value === selectedMetric)?.label}
              />
            </LineChart>
          ) : (
            <p className="text-gray-600 text-center">Seleccione una métrica para ver el gráfico</p>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}