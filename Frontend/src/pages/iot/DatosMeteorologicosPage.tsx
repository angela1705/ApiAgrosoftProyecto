import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/datos_sensores/useDatosMeteorologicosHistoricos";
import Tabla from "@/components/globales/Tabla";
import CustomSpinner from "@/components/globales/Spinner";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaTemperatureHigh, FaTint, FaLeaf, FaWind, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const dataTypes = [
  {
    label: "Temperatura (°C)",
    key: "temperatura",
    icon: <FaTemperatureHigh className="text-red-500" />,
    unit: "°C",
  },
  {
    label: "Humedad Ambiente (%)",
    key: "humedad_ambiente",
    icon: <FaTint className="text-blue-500" />,
    unit: "%",
  },
  {
    label: "Humedad Suelo (%)",
    key: "humedad_suelo",
    icon: <FaLeaf className="text-green-500" />,
    unit: "%",
  },
  {
    label: "Calidad Aire (PPM)",
    key: "calidad_aire",
    icon: <FaWind className="text-yellow-500" />,
    unit: "PPM",
  },
  {
    label: "Luminosidad (lux)",
    key: "luminosidad",
    icon: <FaLightbulb className="text-amber-500" />,
    unit: "lux",
  },
];

export default function DatosMeteorologicosPage() {
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0]);
  const { data: historicos = [], isLoading } = useDatosMeteorologicosHistoricos();

  // Datos para la tabla
  const tableData = useMemo(() => {
    return historicos
      .filter(dato => dato[selectedDataType.key] != null)
      .map(dato => ({
        id: (dato.id || "N/A").toString(),
        sensor: dato.sensor_nombre || "Desconocido",
        bancal: dato.bancal_nombre || "N/A",
        value: dato[selectedDataType.key] != null ? Number(dato[selectedDataType.key]).toFixed(2) : "N/A",
        fecha_medicion: new Date(dato.fecha_medicion).toLocaleString("es-ES", {
          year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
        })
      }));
  }, [historicos, selectedDataType]);

  // Datos para el gráfico (últimos 50 registros)
  const chartData = useMemo(() => {
    return [...tableData]
      .sort((a, b) => new Date(a.fecha_medicion).getTime() - new Date(b.fecha_medicion).getTime())
      .slice(-50)
      .map(dato => ({
        fecha: dato.fecha_medicion.split(',')[0], 
        hora: dato.fecha_medicion.split(',')[1].trim(), 
        value: dato.value !== "N/A" ? Number(dato.value) : null
      }));
  }, [tableData]);

  const columns = [
    { name: "ID", uid: "id", className: "hidden sm:table-cell" },
    { name: "Sensor", uid: "sensor" },
    { name: "Bancal", uid: "bancal" },
    { name: selectedDataType.label, uid: "value" },
    { name: "Fecha de Medición", uid: "fecha_medicion" },
  ];

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner label="Cargando datos..." color="primary" variant="default" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Datos Meteorológicos Históricos</h1>
        
        {/* Selector de tipo de dato */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Dato</label>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {dataTypes.map(type => (
              <motion.button
                key={type.key}
                className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                  selectedDataType.key === type.key ? "bg-blue-100 border-2 border-blue-500" : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDataType(type)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <span className="font-medium text-gray-800">{type.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tabla de datos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <Tabla columns={columns} data={tableData} />
        </div>

        {/* Gráfico */}
        {tableData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Evolución de {selectedDataType.label}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hora" angle={-45} textAnchor="end" height={50} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}${selectedDataType.unit}`} />
                <Tooltip formatter={(value) => `${value}${selectedDataType.unit}`} />
                <Line type="monotone" dataKey="value" stroke={selectedDataType.key === 'temperatura' ? "#ef4444" : "#3b82f6"} strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}