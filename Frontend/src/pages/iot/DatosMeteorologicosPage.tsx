import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useNavigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import { Sensor, SensorData } from "@/types/iot/type";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";
import {
  FaTemperatureHigh,
  FaTint,
  FaSun,
  FaCloudRain,
  FaWind,
  FaCompass,
  FaVial,
} from "react-icons/fa";
import CustomSpinner from "@/components/globales/Spinner";

export default function DatosMeteorologicosPage() {
  const [selectedDataType, setSelectedDataType] = useState<string | null>(null);
  const { data: historicos = [], isLoading, error } = useDatosMeteorologicosHistoricos();
  const { sensores = [], isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const navigate = useNavigate();

  const dataTypes = [
    { label: "Temperatura (°C)", key: "temperatura", icon: <FaTemperatureHigh className="text-red-500" />, sensorId: 1 },
    { label: "Humedad (%)", key: "humedad_ambiente", icon: <FaTint className="text-blue-500" />, sensorId: 2 },
    { label: "Humedad Suelo (%)", key: "humedad_suelo", icon: <FaTint className="text-blue-700" />, sensorId: 3 },
    { label: "Luminosidad (lux)", key: "luminosidad", icon: <FaSun className="text-yellow-500" />, sensorId: 4 },
    { label: "Lluvia (mm)", key: "lluvia", icon: <FaCloudRain className="text-gray-500" />, sensorId: 5 },
    { label: "Velocidad Viento (m/s)", key: "velocidad_viento", icon: <FaWind className="text-teal-500" />, sensorId: 6 },
    { label: "Dirección Viento (grados)", key: "direccion_viento", icon: <FaCompass className="text-green-500" />, sensorId: 7 },
    { label: "pH Suelo", key: "ph_suelo", icon: <FaVial className="text-purple-500" />, sensorId: 8 },
  ];

  // Últimos valores para las tarjetas
  const latestData = dataTypes.reduce((acc, type) => {
    const sensorData = historicos.filter((d: SensorData) => d.sensor === type.sensorId && d[type.key as keyof SensorData] != null);
    const latest = sensorData.sort((a: SensorData, b: SensorData) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];
    acc[type.key] = latest ? latest[type.key as keyof SensorData] ?? "N/A" : "N/A";
    return acc;
  }, {} as Record<string, string | number>);

  latestData.sensoresActivos = sensores.filter((s: Sensor) => s.estado === "activo").length || 0;

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Sensor", uid: "sensor" },
    { name: selectedDataType ? dataTypes.find(dt => dt.key === selectedDataType)?.label || "Dato" : "Dato", uid: "value" },
    { name: "Fecha de Medición", uid: "fecha_medicion" },
  ];

  const filteredHistoricos = useMemo(() => {
    let filtered = historicos;
    if (selectedDataType) {
      filtered = filtered.filter((dato: SensorData) => {
        const value = dato[selectedDataType as keyof SensorData];
        return value !== null && value !== undefined;
      });
    }
    return filtered;
  }, [historicos, selectedDataType]);

  const formattedData = useMemo(() => {
    return filteredHistoricos.map((dato: SensorData) => ({
      id: dato.id || "N/A",
      sensor: sensores.find((s: Sensor) => s.id === dato.sensor)?.nombre || dato.sensor || "N/A",
      value: selectedDataType ? dato[selectedDataType as keyof SensorData] ?? "N/A" : "N/A",
      fecha_medicion: dato.fecha_medicion ? new Date(dato.fecha_medicion).toLocaleString() : "N/A",
    }));
  }, [filteredHistoricos, sensores, selectedDataType]);

  const chartData = useMemo(() => {
    if (!selectedDataType) return null;
    return filteredHistoricos
      .sort((a: SensorData, b: SensorData) => new Date(a.fecha_medicion).getTime() - new Date(b.fecha_medicion).getTime())
      .map((dato: SensorData) => ({
        fecha: new Date(dato.fecha_medicion).toLocaleString(),
        value: dato[selectedDataType as keyof SensorData] ?? 0,
      }));
  }, [filteredHistoricos, selectedDataType]);

  if (isLoading || sensoresLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner label="Cargando datos..." color="primary" variant="wave" className="text-primary" />
        </div>
      </DefaultLayout>
    );
  }

  if (error || sensoresError) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          <p className="text-xl">Error al cargar los datos</p>
          <p>{error?.message || sensoresError?.message}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Datos Meteorológicos Históricos</h1>

        <div className="mb-6 flex justify-start items-center gap-2">
          <button
            className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => navigate("/iot/sensores")}
          >
            Volver a Tiempo Real
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {dataTypes.map((type, index) => (
            <div
              key={type.sensorId}
              className="bg-blue-800 text-white p-4 rounded-lg text-center"
            >
              <h2 className="text-lg">{type.label}</h2>
              <p className="text-2xl">{latestData[type.key]} {type.label.includes("(%)") ? "%" : type.label.includes("°C") ? "°C" : type.label.includes("(lux)") ? "lux" : type.label.includes("(mm)") ? "mm" : type.label.includes("(m/s)") ? "m/s" : type.label.includes("(grados)") ? "°" : ""}</p>
            </div>
          ))}
          <div className="bg-orange-500 text-white p-4 rounded-lg text-center">
            <h2 className="text-lg">Sensores Activos</h2>
            <p className="text-2xl">{latestData.sensoresActivos}</p>
          </div>
        </div>

        {selectedDataType ? (
          <div className="mb-6">
            <button
              className="flex items-center px-3 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105 mb-4"
              onClick={() => setSelectedDataType(null)}
            >
              <ArrowLeft className="mr-2" size={16} />
              Volver a Tipos de Datos
            </button>

            {formattedData.length === 0 ? (
              <p className="text-gray-600 text-center">
                No hay datos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label}
              </p>
            ) : (
              <>
                <Tabla columns={columns} data={formattedData} />
                {chartData && (
                  <div className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Gráfica Histórica - {dataTypes.find(dt => dt.key === selectedDataType)?.label}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#10B981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Seleccionar Tipo de Dato</h3>
            <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {dataTypes.map((type) => (
                <button
                  key={type.key}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => setSelectedDataType(type.key)}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}