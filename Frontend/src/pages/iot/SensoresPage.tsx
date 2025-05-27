import { useState, useEffect, Fragment } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useNavigate } from "react-router-dom";
import { Sensor, SensorData } from "@/types/iot/type";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";
import { addToast } from "@heroui/react";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Plot from 'react-plotly.js';

// Definición de tipos de datos
const dataTypes = [
  {
    label: "Temperatura (°C)",
    key: "temperatura",
    icon: <FaTemperatureHigh className="text-red-500" />,
    sensorId: 1,
    tipo_sensor: "temperatura",
  },
  {
    label: "Humedad (%)",
    key: "humedad_ambiente",
    icon: <FaTint className="text-blue-500" />,
    sensorId: 2,
    tipo_sensor: "ambient_humidity",
  },
];

export default function SensoresPage() {
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0]);
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);
  const { sensores, isLoading: sensoresLoading, error: sensoresError } = useSensoresRegistrados();
  const { isLoading: historicosLoading, error: historicosError } = useDatosMeteorologicosHistoricos();
  const navigate = useNavigate();

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
      dato[selectedDataType.key as keyof SensorData] != null &&
      dato.fk_sensor === selectedDataType.sensorId
  );

  // Datos para la gráfica de barras
  const barChartData = [...filteredData]
    .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
    .slice(0, 10)
    .map((dato, i) => ({
      id: `${dato.id}-${i}`,
      name: new Date(dato.fecha_medicion).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      value: dato[selectedDataType.key as keyof SensorData] ?? 0,
    }));

  // Datos para la gráfica de líneas
  const lineChartData = [...filteredData]
    .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())
    .slice(0, 10)
    .map((dato, i) => ({
      id: `${dato.id}-${i}`,
      fecha: new Date(dato.fecha_medicion).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: dato[selectedDataType.key as keyof SensorData] ?? 0,
    }));

  // Estados de carga y error
  if (sensoresLoading || historicosLoading) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
          <p className="text-gray-700">Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (sensoresError || historicosError) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
          <p className="text-red-500 text-center">{sensoresError?.message || historicosError?.message}</p>
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
      <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Datos en Tiempo Real</h1>

        {/* Tarjetas resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          {dataTypes.map((type, index) => {
            const latest = realTimeData
              .filter((d) => d.fk_sensor === type.sensorId)
              .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];

            return (
              <motion.div
                key={type.key}
                className="bg-white rounded-xl shadow-md p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2">
                  {type.icon} {type.label}
                </p>
                <p className="text-4xl font-bold mt-2" style={{ color: type.key === 'temperatura' ? '#dc2626' : '#2563eb' }}>
                  {latest?.[type.key as keyof SensorData] ?? 'N/A'} {type.key === 'temperatura' ? '°C' : '%'}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Botón de redirección */}
        <div className="mb-6">
          <motion.button
            className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg"
            onClick={() => navigate('/iot/datosmeteorologicos')}
            whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Datos Históricos
          </motion.button>
        </div>

        {/* Selector visual (Listbox) */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Seleccionar Tipo de Dato</h3>
          <Listbox value={selectedDataType} onChange={setSelectedDataType}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-blue-100 py-2 pl-3 pr-10 text-left text-gray-700 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm">
                <span className="flex items-center gap-2">
                  {selectedDataType.icon}
                  {selectedDataType.label}
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
                      value={type}
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

        {/* Gráficas en dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Gráfica de barras */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedDataType.label} por Hora
            </h2>
            <Plot
              data={[
                {
                  x: barChartData.map(d => d.name),
                  y: barChartData.map(d => d.value),
                  type: 'bar',
                  name: selectedDataType.label,
                  marker: { color: '#3b82f6' },
                },
              ]}
              layout={{
                title: '',
                xaxis: { title: 'Hora' },
                yaxis: { title: selectedDataType.label },
                showlegend: false,
              }}
              style={{ width: '100%', height: '400px' }}
            />
            {barChartData.length === 0 && (
              <p className="text-gray-600 text-center mt-4">No hay datos disponibles.</p>
            )}
          </motion.div>

          {/* Gráfica de líneas */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedDataType.label} en el Tiempo
            </h2>
            <Plot
              data={[
                {
                  x: lineChartData.map(d => d.fecha),
                  y: lineChartData.map(d => d.value),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: selectedDataType.label,
                  line: { color: '#10b981' },
                },
              ]}
              layout={{
                title: '',
                xaxis: { title: 'Fecha' },
                yaxis: { title: selectedDataType.label },
                showlegend: false,
              }}
              style={{ width: '100%', height: '400px' }}
            />
            {lineChartData.length === 0 && (
              <p className="text-gray-600 text-center mt-4">No hay datos disponibles.</p>
            )}
          </motion.div>
        </div>
      </div>
    </DefaultLayout>
  );
}