import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTemperatureHigh, FaTint, FaLeaf, FaWind, FaLightbulb } from 'react-icons/fa';
import DefaultLayout from '@/layouts/default';
import { useSensores } from '@/hooks/iot/sensores/useSensores';
import { useDatosMeteorologicosHistoricos } from '@/hooks/iot/datos_sensores/useDatosMeteorologicosHistoricos';
import { useWebSocketData } from '@/hooks/iot/datos_sensores/useWebSocketData';
import { DataTypeSelector } from '@/components/Iot/DataTypeSelector';
import { SensorSelector } from '@/components/Iot/sensores/SensorSelector';
import { SensorCharts } from '@/components/Iot/sensores/SensorCharts';
import { SensorStats } from '@/components/Iot/sensores/SensorStats';
import { SensorTable } from '@/components/Iot/sensores/SensorTable'; 
import { GenerateReport } from '@/components/Iot/sensores/GenerateReport';
import { ViewModeSelector } from '@/components/Iot/sensores/ViewModeSelector';
import { Sensor, TipoSensor, ViewMode } from '@/types/iot/type';
import { debounce } from 'lodash';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const dataTypes: TipoSensor[] = [
  {
    label: 'Temperatura (°C)',
    nombre: 'Temperatura',
    key: 'temperatura',
    tipo_sensor: 'temperatura',
    icon: <FaTemperatureHigh className='text-red-500' />,
    tipo_sensor_id: 1,
    decimals: 2,
    unidad_medida: '°C',
    medida_minima: 10,
    medida_maxima: 40,
  },
  {
    label: 'Humedad Ambiente (%)',
    nombre: 'Humedad Ambiente',
    key: 'humedad_ambiente',
    tipo_sensor: 'humedad_ambiente',
    icon: <FaTint className='text-blue-500' />,
    tipo_sensor_id: 2,
    decimals: 1,
    unidad_medida: '%',
    medida_minima: 20,
    medida_maxima: 90,
  },
  {
    label: 'Humedad Suelo (%)',
    nombre: 'Humedad Suelo',
    key: 'humedad_suelo',
    tipo_sensor: 'humedad_suelo',
    icon: <FaLeaf className='text-green-500' />,
    tipo_sensor_id: 3,
    decimals: 1,
    unidad_medida: '%',
    medida_minima: 10,
    medida_maxima: 80,
  },
  {
    label: 'Calidad Aire (PPM)',
    nombre: 'Calidad Aire',
    key: 'calidad_aire',
    tipo_sensor: 'calidad_aire',
    icon: <FaWind className='text-yellow-500' />,
    tipo_sensor_id: 4,
    decimals: 0,
    unidad_medida: 'PPM',
    medida_minima: 0,
    medida_maxima: 1000,
  },
  {
    label: 'Luminosidad (lux)',
    nombre: 'Luminosidad',
    key: 'luminosidad',
    tipo_sensor: 'luminosidad',
    icon: <FaLightbulb className='text-amber-500' />,
    tipo_sensor_id: 5,
    decimals: 0,
    unidad_medida: 'lux',
    medida_minima: 0,
    medida_maxima: 10000,
  },
];

const viewModes: ViewMode[] = [
  { id: 'realtime', label: 'Tiempo Real' },
  { id: 'allData', label: 'Todos los Datos' },
];

const SensoresPage: React.FC = () => {
  const [selectedDataType, setSelectedDataType] = useState<TipoSensor>(dataTypes[0]);
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode>(viewModes[0]);
  const [selectedSensor, setSelectedSensor] = useState<number | 'todos'>('todos');
  const [resetCards, setResetCards] = useState(false);

  const { sensores, isLoading: sensoresLoading, error: sensoresError } = useSensores();
  const { isLoading: historicosLoading, error: historicosError } = useDatosMeteorologicosHistoricos();
  const { realTimeData } = useWebSocketData(sensores);
  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);

  const debouncedSetSelectedDataType = useCallback(
    debounce((type: TipoSensor) => setSelectedDataType(type), 300),
    []
  );

  // Temporizador para limpiar las tarjetas cada 12 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setResetCards(true);
      setTimeout(() => setResetCards(false), 100); // Restablece después de 100ms
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const filteredSensores = useMemo(() => {
    return sensores.filter((sensor: Sensor) => sensor.tipo_sensor === selectedDataType.tipo_sensor);
  }, [sensores, selectedDataType]);

  // Datos filtrados para gráficas y tabla, basados en selectedDataType y selectedSensor
  const filteredData = useMemo(() => {
    return realTimeData
      .filter((d) => {
        const value = d[selectedDataType.key];
        return (
          value !== null &&
          value !== undefined &&
          typeof value === 'number' &&
          (selectedSensor === 'todos' || Number(d.fk_sensor) === selectedSensor)
        );
      })
      .map((d) => ({
        ...d,
        device_code: sensores.find((s) => String(s.id) === String(d.fk_sensor))?.device_code || `sensor_${d.fk_sensor}`,
        nombre: selectedDataType.nombre,
      }));
  }, [realTimeData, selectedDataType, selectedSensor, sensores]);

  // Calcular los datos más recientes para las tarjetas, sin depender de selectedDataType ni selectedSensor
  const latestDataByType = useMemo(() => {
    if (resetCards) {
      return dataTypes.map((type) => ({ type, value: null }));
    }
    return dataTypes.map((type) => {
      const latest = realTimeData
        .filter((d) => {
          const value = d[type.key];
          return (
            value !== null &&
            value !== undefined &&
            typeof value === 'number'
          );
        })
        .sort((a, b) => new Date(b.fecha_medicion).getTime() - new Date(a.fecha_medicion).getTime())[0];
      return { type, value: latest ? (latest[type.key] as number) : null };
    });
  }, [realTimeData, resetCards]);

  if (sensoresLoading || historicosLoading) {
    return (
      <DefaultLayout>
        <div className='w-full flex flex-col items-center justify-center min-h-screen bg-gray-50'>
          <p className='text-gray-700'>Cargando datos...</p>
        </div>
      </DefaultLayout>
    );
  }

  if (sensoresError || historicosError) {
    return (
      <DefaultLayout>
        <div className='w-full flex flex-col items-center justify-center min-h-screen bg-gray-50'>
          <p className='text-red-500 text-center'>{sensoresError?.message || historicosError?.message}</p>
          <button
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
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
      <div className='w-full flex flex-col items-center bg-gray-50 px-4 py-6 min-h-screen'>
        <div className='w-full max-w-7xl flex flex-col items-center gap-8'>
          <h1 className='text-3xl font-bold text-gray-800'>Panel de Sensores (HTTP)</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
            {latestDataByType.map(({ type, value }, index) => (
              <motion.div
                key={type.key}
                className='bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center h-32'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className='text-sm font-semibold text-gray-600 flex items-center gap-2'>
                  {type.icon} {type.nombre}
                </p>
                <p
                  className='text-2xl font-bold mt-2'
                  style={{
                    color:
                      type.key === 'temperatura'
                        ? '#dc2626'
                        : type.key === 'humedad_ambiente'
                        ? '#2563eb'
                        : type.key === 'humedad_suelo'
                        ? '#10b981'
                        : type.key === 'calidad_aire'
                        ? '#f59e0b'
                        : '#f59e0b',
                  }}
                >
                  {value !== null ? value.toFixed(type.decimals) : 'N/A'} {type.unidad_medida}
                </p>
              </motion.div>
            ))}
          </div>

          <SensorStats
            realTimeData={realTimeData}
            selectedSensor={selectedSensor}
            selectedDataType={selectedDataType}
          />

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full'>
            <motion.button
              className='bg-white rounded-lg shadow-md p-2 flex items-center justify-center text-xs font-semibold text-gray-400 h-16 opacity-50 cursor-not-allowed'
              disabled
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apagar Sensor
            </motion.button>
            <motion.button
              className='bg-white rounded-lg shadow-md p-2 flex items-center justify-center text-xs font-semibold text-gray-400 h-16 opacity-50 cursor-not-allowed'
              disabled
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reiniciar WiFi
            </motion.button>
            <GenerateReport realTimeData={realTimeData} dataTypes={dataTypes} sensores={sensores} />
            <motion.button
              className='bg-green-600 text-white rounded-lg shadow-md p-2 flex items-center justify-center text-xs font-semibold h-16'
              onClick={() => navigate('/iot/datosmeteorologicos')}
              whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Datos Históricos
            </motion.button>
            <motion.button
              className='bg-blue-600 text-white rounded-lg shadow-md p-2 flex items-center justify-center text-xs font-semibold h-16'
              onClick={() => navigate('/iot/sensores-http')}
              whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Datos MQTT
            </motion.button>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full'>
            <DataTypeSelector
              selectedDataType={selectedDataType}
              setSelectedDataType={debouncedSetSelectedDataType}
              dataTypes={dataTypes}
            />
            <SensorSelector
              selectedSensor={selectedSensor}
              setSelectedSensor={setSelectedSensor}
              filteredSensores={filteredSensores}
            />
            <ViewModeSelector
              selectedViewMode={selectedViewMode}
              setSelectedViewMode={setSelectedViewMode}
            />
          </div>

          <div className='w-full' ref={chartRef}>
            {selectedViewMode.id === 'realtime' ? (
              <SensorCharts
                realTimeData={filteredData}
                selectedDataType={selectedDataType}
                selectedSensor={selectedSensor}
              />
            ) : (
              <div className='flex flex-col gap-6'>
                <SensorTable
                  realTimeData={filteredData}
                  selectedDataType={selectedDataType}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SensoresPage;