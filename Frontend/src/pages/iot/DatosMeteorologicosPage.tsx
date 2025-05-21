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
import { addToast } from "@heroui/react";

export default function DatosMeteorologicosPage() {
  const [selectedDataType, setSelectedDataType] = useState<string>("humedad_ambiente");
  const [selectedDataId, setSelectedDataId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: historicos = [], isLoading, error } = useDatosMeteorologicosHistoricos();
  const { sensores = [], isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const navigate = useNavigate();

  console.log("Historical data received:", historicos);
  console.log("Sensors:", sensores);

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
    { name: "ID", uid: "id", className: "hidden sm:table-cell" },
    { name: "Sensor", uid: "sensor", className: "hidden sm:table-cell" },
    { name: dataTypes.find(dt => dt.key === selectedDataType)?.label || "Dato", uid: "value" },
    { name: "Fecha de Medición", uid: "fecha_medicion" },
  ];

  const tableData = useMemo(() => {
    let filtered = historicos;
    console.log("Selected data type:", selectedDataType);
    console.log("Filtered data before mapping:", filtered);
    if (selectedDataType) {
      filtered = filtered.filter((dato: SensorData) => {
        const value = dato[selectedDataType as keyof SensorData];
        return value !== null && value !== undefined;
      });
    }
    const result = filtered.map((dato: SensorData) => ({
      id: dato.id || "N/A",
      sensor: sensores.find((s: Sensor) => s.id === (dato.fk_sensor || dato.fk_sensor))?.nombre || (dato.fk_sensor || dato.fk_sensor) || "N/A",
      value: selectedDataType ? (dato[selectedDataType as keyof SensorData] ?? "N/A") : "N/A",
      fecha_medicion: dato.fecha_medicion ? new Date(dato.fecha_medicion).toLocaleString() : "N/A",
    }));
    console.log("Table data:", result);
    return result;
  }, [historicos, selectedDataType, sensores]);

  const mobileData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return tableData.slice(start, end);
  }, [tableData, page, rowsPerPage]);

  const pages = Math.ceil(tableData.length / rowsPerPage);

  const chartData = useMemo(() => {
    if (!selectedDataType) return [];
    const filteredData = historicos
      .filter((dato: SensorData) => {
        const value = dato[selectedDataType as keyof SensorData];
        return value !== null && value !== undefined;
      })
      .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime());

    if (!filteredData.length) return [];

    let selectedIndex = 0;
    if (selectedDataId) {
      selectedIndex = filteredData.findIndex(dato => String(dato.id) === selectedDataId) || 0;
    }

    const startIndex = Math.max(0, selectedIndex - 10);
    const endIndex = Math.min(filteredData.length, startIndex + 20);
    const slicedData = filteredData.slice(startIndex, endIndex);

    const result = slicedData.map((dato: SensorData, index: number) => ({
      id: `${dato.id}-${index}`,
      fecha: new Date(dato.fecha_medicion).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
      value: dato[selectedDataType as keyof SensorData] ?? 0,
    }));
    console.log("Chart data:", result);
    return result;
  }, [historicos, selectedDataType, selectedDataId]);

  const handleDataTypeClick = (type: { key: string; sensorId: number }) => {
    setSelectedDataType(type.key);
    setSelectedDataId(null);
    setPage(1); // Resetear la página al cambiar el tipo de dato
  };

  const handleRowClick = (row: any) => {
    setSelectedDataId(row.id);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  if (error || sensoresError) {
    addToast({
      title: "Error",
      description: error?.message || sensoresError?.message || "Error al cargar los datos",
      timeout: 3000,
      color: "danger",
    });
  }

  if (isLoading || sensoresLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner label="Cargando datos..." color="primary" variant="wave" className="text-blue-500" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto p-3 sm:p-4 bg-gray-50 min-h-screen">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">Datos Meteorológicos Históricos</h1>

        <div className="mb-4 flex justify-start">
          <motion.button
            className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 text-sm sm:text-base"
            onClick={() => navigate("/iot/sensores")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-2" size={14} />
            Volver a Tiempo Real
          </motion.button>
        </div>

        <motion.div
          className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Seleccionar Tipo de Dato</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {dataTypes.map((type) => (
              <motion.button
                key={type.sensorId}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg ${
                  selectedDataType === type.key ? "bg-blue-700" : "bg-blue-500"
                }`}
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

        {tableData.length === 0 ? (
          <p className="text-gray-600 text-center text-base sm:text-lg">
            No hay datos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label || "el tipo seleccionado"}.
          </p>
        ) : (
          <>
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Tabla de Datos</h3>
              <div className="block sm:hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-default-400 text-xs">
                    Total {tableData.length} registros
                  </span>
                  <label className="flex items-center text-default-400 text-xs">
                    Filas por página:
                    <select
                      className="bg-transparent outline-none text-default-400 text-xs ml-1"
                      onChange={onRowsPerPageChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </label>
                </div>
                {mobileData.map((row) => (
                  <motion.div
                    key={row.id}
                    className="border-b border-gray-200 p-3 mb-3 bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => handleRowClick(row)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {dataTypes.find(dt => dt.key === selectedDataType)?.label || "Dato"}: {row.value}
                    </p>
                    <p className="text-xs text-gray-500">Fecha: {row.fecha_medicion}</p>
                    <p className="text-xs text-gray-500">Sensor: {row.sensor}</p>
                  </motion.div>
                ))}
                <div className="flex justify-center mt-3">
                  <div className="flex gap-2">
                    <motion.button
                      className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 text-xs"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Anterior
                    </motion.button>
                    <motion.button
                      className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 text-xs"
                      onClick={() => setPage(page + 1)}
                      disabled={page === pages}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Siguiente
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block overflow-x-auto">
                <Tabla columns={columns} data={tableData} onRowClick={handleRowClick} />
              </div>
            </div>

            <motion.div
              className="bg-white p-3 sm:p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
                Gráfica Histórica - {dataTypes.find(dt => dt.key === selectedDataType)?.label || "Dato"}
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <XAxis
                    dataKey="fecha"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval="preserveStartEnd"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, padding: 8 }}
                    formatter={(value: number) => [value, dataTypes.find(dt => dt.key === selectedDataType)?.label || "Valor"]}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              {chartData.length === 0 && (
                <p className="text-gray-600 text-center mt-4 text-sm sm:text-base">
                  No hay datos históricos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label || "el tipo seleccionado"}.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
}