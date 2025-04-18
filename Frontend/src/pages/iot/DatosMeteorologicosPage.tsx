import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useNavigate } from "react-router-dom";
import { ReuInput } from "@/components/globales/ReuInput";
import { Sensor, SensorData } from "@/types/iot/type";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function DatosMeteorologicosPage() {
  const [sensorId, setSensorId] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const { data: historicos = [], isLoading, error } = useDatosMeteorologicosHistoricos(sensorId, date);
  const { sensores = [], isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const navigate = useNavigate();

  const metrics = [
    { value: "temperatura", label: "Temperatura (°C)", color: "#8884d8" },
    { value: "humedad_ambiente", label: "Humedad Ambiente (%)", color: "#82ca9d" },
    { value: "humedad_suelo", label: "Humedad Suelo (%)", color: "#ff7300" },
    { value: "luminosidad", label: "Luminosidad (lux)", color: "#ffc107" },
    { value: "lluvia", label: "Lluvia (mm/h)", color: "#00c4ff" },
    { value: "velocidad_viento", label: "Velocidad Viento (m/s)", color: "#ff4d4f" },
    { value: "direccion_viento", label: "Dirección Viento (grados)", color: "#a0d911" },
    { value: "ph_suelo", label: "pH Suelo (pH)", color: "#d81b60" },
  ];

  const graphData = useMemo(() => {
    return historicos.map((dato: SensorData, index: number) => ({
      name: dato.fecha_medicion ? new Date(dato.fecha_medicion).toLocaleTimeString() : `Dato ${index + 1}`,
      temperatura: dato.temperatura ?? null,
      humedad_ambiente: dato.humedad_ambiente ?? null,
      humedad_suelo: dato.humedad_suelo ?? null,
      luminosidad: dato.luminosidad ?? null,
      lluvia: dato.lluvia ?? null,
      velocidad_viento: dato.velocidad_viento ?? null,
      direccion_viento: dato.direccion_viento ?? null,
      ph_suelo: dato.ph_suelo ?? null,
    }));
  }, [historicos]);

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Datos Meteorológicos Históricos</h2>

          <div className="mb-2 flex justify-start gap-2">
            <button
              className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/iot/sensores")}
            >
              Volver a Tiempo Real
            </button>
            <button
              className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/iot/listar-sensores")}
            >
              Listar Sensores
            </button>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700">Sensor</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sensorId}
                onChange={(e) => setSensorId(Number(e.target.value))}
              >
                <option value={0}>Todos los sensores</option>
                {sensores.map((sensor: Sensor) => (
                  <option key={sensor.id} value={sensor.id}>
                    {sensor.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <ReuInput
                label="Fecha"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {metrics.map((metric) => (
              <button
                key={metric.value}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 ${
                  selectedMetric === metric.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedMetric(metric.value)}
              >
                {metric.label}
              </button>
            ))}
          </div>

          {isLoading || sensoresLoading ? (
            <p className="text-gray-600 text-center">Cargando datos históricos...</p>
          ) : error || sensoresError ? (
            <p className="text-red-500 text-center">Error: {error?.message || sensoresError?.message}</p>
          ) : historicos.length === 0 ? (
            <p className="text-gray-600 text-center">No hay datos históricos disponibles</p>
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