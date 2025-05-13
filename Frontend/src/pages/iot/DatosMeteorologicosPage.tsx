import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useNavigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import { Sensor, SensorData } from "@/types/iot/type";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";
import { FaTemperatureHigh, FaTint, FaSun, FaCloudRain, FaWind, FaCompass, FaVial } from "react-icons/fa";
import CustomSpinner from "@/components/globales/Spinner";
import { motion } from "framer-motion";

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

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Sensor", uid: "sensor" },
    { name: selectedDataType ? dataTypes.find(dt => dt.key === selectedDataType)?.label || "Dato" : "Dato", uid: "value" },
    { name: "Fecha de Medición", uid: "fecha_medicion" },
  ];

  // Datos para la tabla (sin filtrar por rango de tiempo)
  const tableData = useMemo(() => {
    let filtered = historicos;
    if (selectedDataType) {
      filtered = filtered.filter((dato: SensorData) => {
        const value = dato[selectedDataType as keyof SensorData];
        return value !== null && value !== undefined;
      });
    }
    return filtered.map((dato: SensorData) => ({
      id: dato.id || "N/A",
      sensor: sensores.find((s: Sensor) => s.id === dato.sensor)?.nombre || dato.sensor || "N/A",
      value: selectedDataType ? dato[selectedDataType as keyof SensorData] ?? "N/A" : "N/A",
      fecha_medicion: dato.fecha_medicion ? new Date(dato.fecha_medicion).toLocaleString() : "N/A",
    }));
  }, [historicos, selectedDataType, sensores]);

  // Datos para la gráfica (agrupados por hora)
  const chartData = useMemo(() => {
    if (!selectedDataType) return null;
    const groupedData = historicos
      .filter((dato: SensorData) => {
        const value = dato[selectedDataType as keyof SensorData];
        return value !== null && value !== undefined;
      })
      .reduce((acc: { [key: string]: { sum: number; count: number } }, dato: SensorData) => {
        const date = new Date(dato.fecha_medicion);
        const hourKey = date.toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
        const value = dato[selectedDataType as keyof SensorData] as number;
        if (!acc[hourKey]) {
          acc[hourKey] = { sum: 0, count: 0 };
        }
        acc[hourKey].sum += value;
        acc[hourKey].count += 1;
        return acc;
      }, {});

    return Object.entries(groupedData)
      .map(([hour, { sum, count }]) => ({
        fecha: hour,
        value: (sum / count).toFixed(2),
      }))
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }, [historicos, selectedDataType]);

  if (isLoading || sensoresLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner label="Cargando datos..." color="primary" variant="wave" className="text-blue-500" />
        </div>
      </DefaultLayout>
    );
  }

  if (error || sensoresError) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          <p className="text-xl font-semibold">Error al cargar los datos</p>
          <p>{error?.message || sensoresError?.message}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Datos Meteorológicos Históricos</h1>

        <div className="mb-6 flex justify-start">
          <motion.button
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            onClick={() => navigate("/iot/sensores")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-2" size={16} />
            Volver a Tiempo Real
          </motion.button>
        </div>

        {selectedDataType ? (
          <div className="space-y-6">
            <motion.button
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
              onClick={() => setSelectedDataType(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="mr-2" size={16} />
              Volver a Tipos de Datos
            </motion.button>

            {tableData.length === 0 ? (
              <p className="text-gray-600 text-center text-lg">
                No hay datos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label}.
              </p>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Tabla de Datos</h3>
                  <Tabla columns={columns} data={tableData} />
                </div>

                {chartData && (
                  <motion.div
                    className="bg-white p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Gráfica Histórica - {dataTypes.find(dt => dt.key === selectedDataType)?.label}
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <XAxis dataKey="fecha" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </>
            )}
          </div>
        ) : (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Seleccionar Tipo de Dato</h3>
            <div className="bg-white rounded-lg shadow-lg p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {dataTypes.map((type) => (
                <motion.button
                  key={type.sensorId}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  onClick={() => setSelectedDataType(type.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DefaultLayout>
  );
}