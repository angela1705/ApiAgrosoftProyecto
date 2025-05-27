import { useState, useMemo, Fragment } from "react";
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
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

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

export default function DatosMeteorologicosPage() {
  const [selectedDataType, setSelectedDataType] = useState("humedad_ambiente");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: historicos = [], isLoading, error } = useDatosMeteorologicosHistoricos();
  const { sensores = [], isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    return historicos.filter((dato: SensorData) => dato[selectedDataType as keyof SensorData] != null);
  }, [historicos, selectedDataType]);

  const tableData = useMemo(() => {
    return filteredData.map((dato: SensorData) => ({
      id: String(dato.id ?? "N/A"),
      sensor: sensores.find((s: Sensor) => s.id === dato.fk_sensor)?.nombre ?? "N/A",
      value: String(dato[selectedDataType as keyof SensorData] ?? "N/A"),
      fecha_medicion: dato.fecha_medicion ? new Date(dato.fecha_medicion).toLocaleString("es-ES") : "N/A",
    }));
  }, [filteredData, sensores, selectedDataType]);

  const chartData = useMemo(() => {
    return tableData
      .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
      .slice(0, 20)
      .map((row, index) => ({
        id: `${row.id}-${index}`,
        fecha: row.fecha_medicion,
        value: parseFloat(row.value) || 0,
      }));
  }, [tableData]);

  const columns = [
    { name: "ID", uid: "id", className: "hidden sm:table-cell" },
    { name: "Sensor", uid: "sensor", className: "hidden sm:table-cell" },
    { name: dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "Dato", uid: "value" },
    { name: "Fecha de Medición", uid: "fecha_medicion" },
  ];

  const mobileData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return tableData.slice(start, end);
  }, [tableData, page, rowsPerPage]);

  const pages = Math.ceil(tableData.length / rowsPerPage);

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  if (isLoading || sensoresLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner label="Cargando datos..." color="primary" />
        </div>
      </DefaultLayout>
    );
  }

  if (error || sensoresError) {
    addToast({
      title: "Error",
      description: error?.message || sensoresError?.message || "Error al cargar los datos",
      timeout: 3000,
      color: "danger",
    });
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6">
          <p className="text-red-500 text-center">{error?.message || sensoresError?.message}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
          <Listbox value={selectedDataType} onChange={setSelectedDataType}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-blue-100 py-2 pl-3 pr-10 text-left text-gray-700 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm">
                <span className="flex items-center gap-2">
                  {dataTypes.find(dt => dt.key === selectedDataType)?.icon}
                  {dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "Seleccionar"}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm z-10">
                  {dataTypes.map((type) => (
                    <Listbox.Option
                      key={type.key}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                      value={type.key}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            <div className="flex items-center gap-2">{type.icon} {type.label}</div>
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </motion.div>

        {tableData.length === 0 ? (
          <p className="text-gray-600 text-center text-base sm:text-lg">
            No hay datos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "el tipo seleccionado"}.
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
                    className="border-b border-gray-200 p-3 mb-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "Dato"}: {row.value}
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
                <Tabla columns={columns} data={tableData} />
              </div>
            </div>

            <motion.div
              className="bg-white p-3 sm:p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
                Gráfica Histórica - {dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "Dato"}
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
                    formatter={(value: number) => [value, dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "Valor"]}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              {chartData.length === 0 && (
                <p className="text-gray-600 text-center mt-4 text-sm sm:text-base">
                  No hay datos históricos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label ?? "el tipo seleccionado"}.
                </p>
              )}
            </motion.div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
}