import React, { useEffect, useState, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTemperatureHigh, FaTint } from 'react-icons/fa';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SensorData, subscribeToMqtt } from '../../components/utils/mqttClient';
import DefaultLayout from '../../layouts/default';
import Plot from 'react-plotly.js';
import mqtt from 'mqtt';
import { addToast } from '@heroui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Tipos de datos
const dataTypes = [
  {
    label: 'Temperatura (°C)',
    key: 'temperatura',
    icon: <FaTemperatureHigh className="text-red-500" />,
    sensorId: 1,
  },
  {
    label: 'Humedad (%)',
    key: 'humedad_ambiente',
    icon: <FaTint className="text-blue-500" />,
    sensorId: 2,
  },
];

// Modos de visualización
const viewModes = [
  { id: 'realtime', label: 'Tiempo Real' },
  { id: 'allData', label: 'Todos los Datos' },
];

// Definición de columnas para la tabla
const columnHelper = createColumnHelper<SensorData>();
const columns = [
  columnHelper.accessor((row) => new Date(row.fecha_medicion).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }), {
    header: 'Fecha',
    id: 'fecha',
  }),
  columnHelper.accessor('temperatura', {
    header: 'Temperatura (°C)',
  }),
  columnHelper.accessor('humedad_ambiente', {
    header: 'Humedad (%)',
  }),
  columnHelper.accessor('fk_sensor', {
    header: 'Sensor ID',
  }),
];

const SensoresPage2: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);
  const [selectedDataType, setSelectedDataType] = useState(dataTypes[0]);
  const [selectedViewMode, setSelectedViewMode] = useState(viewModes[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
  const [sensorActive, setSensorActive] = useState(true);
  const navigate = useNavigate();

  // Configurar cliente MQTT para publicar
  useEffect(() => {
    const client = mqtt.connect('wss://92ae5e18dc884fefa81c4f3580a7485b.s1.eu.hivemq.cloud:8884/mqtt', {
      username: 'agrosoft',
      password: 'Agrosoft2025!',
    });

    client.on('connect', () => {
      console.log('Conectado a MQTT para publicar');
      setMqttClient(client);
    });

    client.on('error', (err) => {
      console.error('Error MQTT:', err);
      addToast({
        title: 'Error',
        description: 'No se pudo conectar al broker MQTT',
        timeout: 3000,
        color: 'danger',
      });
    });

    return () => {
      client.end();
    };
  }, []);

  // Suscribirse a datos MQTT
  useEffect(() => {
    const unsubscribe = subscribeToMqtt(({ realTimeData, isConnected, error }) => {
      setRealTimeData(realTimeData);
      setIsLoading(!isConnected && !error);
      setError(error);
    });
    return unsubscribe;
  }, []);

  // Publicar comandos MQTT
  const publishCommand = (command: string) => {
    if (!mqttClient || !mqttClient.connected) {
      addToast({
        title: 'Error',
        description: 'No hay conexión MQTT activa',
        timeout: 3000,
        color: 'danger',
      });
      return;
    }

    mqttClient.publish('sensor/control/command', command, { qos: 1 }, (err) => {
      if (err) {
        addToast({
          title: 'Error',
          description: `No se pudo enviar el comando: ${err.message}`,
          timeout: 3000,
          color: 'danger',
        });
      } else {
        addToast({
          title: 'Éxito',
          description: `Comando ${command} enviado`,
          timeout: 3000,
          color: 'success',
        });
        if (command === 'STOP_SENSOR') {
          setSensorActive(false);
        } else if (command === 'START_SENSOR') {
          setSensorActive(true);
        }
      }
    });
  };

  // Filtrar datos para gráficas en tiempo real
  const filteredData = realTimeData.filter(
    (dato: SensorData) =>
      dato[selectedDataType.key as keyof SensorData] != null &&
      dato.fk_sensor === selectedDataType.sensorId
  );

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

  // Calcular estadísticas para análisis
  const stats = useMemo(() => {
    const tempValues = realTimeData
      .filter((d) => d.fk_sensor === 1 && d.temperatura != null)
      .map((d) => d.temperatura!);
    const humValues = realTimeData
      .filter((d) => d.fk_sensor === 2 && d.humedad_ambiente != null)
      .map((d) => d.humedad_ambiente!);

    return {
      temp: {
        max: tempValues.length ? Math.max(...tempValues) : null,
        min: tempValues.length ? Math.min(...tempValues) : null,
        avg: tempValues.length ? tempValues.reduce((a, b) => a + b, 0) / tempValues.length : null,
      },
      hum: {
        max: humValues.length ? Math.max(...humValues) : null,
        min: humValues.length ? Math.min(...humValues) : null,
        avg: humValues.length ? humValues.reduce((a, b) => a + b, 0) / humValues.length : null,
      },
    };
  }, [realTimeData]);

  // Configurar tabla con paginación
  const table = useReactTable({
    data: realTimeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
          <p className="text-gray-700">Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="w-full flex flex-col items-center min-h-screen p-6 bg-gray-50">
          <p className="text-red-500 text-center">{error}</p>
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
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Datos del Sensor DHT22</h1>

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

        {/* Botones de control */}
        <div className="mb-6 flex flex-wrap gap-4">
          <motion.button
            className={`px-4 py-2 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg ${
              sensorActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={() => publishCommand(sensorActive ? 'STOP_SENSOR' : 'START_SENSOR')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sensorActive ? 'Apagar Sensor' : 'Encender Sensor'}
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700"
            onClick={() => publishCommand('RESTART_WIFI')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reiniciar WiFi
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-green-700"
            onClick={() => navigate('/iot/datosmeteorologicos')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Datos Históricos
          </motion.button>
        </div>

        {/* Selector de modo de visualización */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Modo de Visualización</h3>
          <Listbox value={selectedViewMode} onChange={setSelectedViewMode}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-blue-100 py-2 pl-3 pr-10 text-left text-gray-700 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm">
                <span className="block truncate">{selectedViewMode.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm z-10">
                  {viewModes.map((mode) => (
                    <Listbox.Option
                      key={mode.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                      value={mode}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {mode.label}
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

        {/* Selector de tipo de dato (solo en tiempo real) */}
        {selectedViewMode.id === 'realtime' && (
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
        )}

        {/* Contenido según el modo de visualización */}
        {selectedViewMode.id === 'realtime' ? (
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
              {barChartData.length === 0 && <p className="text-gray-600 text-center mt-4">No hay datos disponibles.</p>}
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
              {lineChartData.length === 0 && <p className="text-gray-600 text-center mt-4">No hay datos disponibles.</p>}
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Todos los Datos</h2>

            {/* Estadísticas */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Temperatura (°C)</h3>
                <p>Max: {stats.temp.max?.toFixed(2) ?? 'N/A'}</p>
                <p>Min: {stats.temp.min?.toFixed(2) ?? 'N/A'}</p>
                <p>Promedio: {stats.temp.avg?.toFixed(2) ?? 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Humedad (%)</h3>
                <p>Max: {stats.hum.max?.toFixed(2) ?? 'N/A'}</p>
                <p>Min: {stats.hum.min?.toFixed(2) ?? 'N/A'}</p>
                <p>Promedio: {stats.hum.avg?.toFixed(2) ?? 'N/A'}</p>
              </div>
            </div>

            {/* Tabla de datos */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Controles de paginación */}
            <div className="mt-4 flex items-center justify-between">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </button>
              <span>
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </span>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </button>
            </div>

            {realTimeData.length === 0 && <p className="text-gray-600 text-center mt-4">No hay datos disponibles.</p>}
          </motion.div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SensoresPage2;