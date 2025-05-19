import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Droplet, Wind } from "lucide-react";
import CustomSpinner from "@/components/globales/Spinner";
import { useAnalisisPorCosecha } from "@/hooks/finanzas/useCostoBeneficio";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useActividades } from "@/hooks/cultivo/useActividad";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useInsumos } from "@/hooks/inventario/useInsumo";
import { FaTemperatureHigh, FaTint, FaSun, FaCloudRain, FaWind, FaCompass, FaVial } from "react-icons/fa";

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

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState<string>("temperatura");
  const currentDate = new Date();

  // Hooks para obtener datos
  const { data: analisis, isLoading: loadingAnalisis, error: errorAnalisis } = useAnalisisPorCosecha();
  const { data: historicos = [], isLoading: loadingHistoricos, error: errorHistoricos } = useDatosMeteorologicosHistoricos();
  const { data: actividades, isLoading: loadingActividades, error: errorActividades } = useActividades();
  const { data: sensores = [], isLoading: loadingSensores, error: errorSensores } = useSensoresRegistrados();
  const { data: insumos, isLoading: loadingInsumos, error: errorInsumos } = useInsumos();

  // Procesar datos de actividades
  const activities = actividades?.map((actividad) => ({
    id: actividad.id || `${actividad.descripcion}-${actividad.fecha_inicio}`, // Clave única
    title: actividad.descripcion || "Actividad sin descripción",
    date: actividad.fecha_inicio?.split("T")[0] || currentDate.toISOString().split("T")[0],
    time: actividad.fecha_inicio?.split("T")[1]?.slice(0, 5) || "00:00",
    estado: actividad.estado || "PENDIENTE",
  })) || [];

  const pastActivities = activities.filter((activity) => new Date(activity.date) < currentDate);
  const futureActivities = activities.filter((activity) => new Date(activity.date) >= currentDate);

  // Datos para las tarjetas superiores
  const ganancias = analisis?.metricas?.total_ingresos || 0;
  const totalInsumos = insumos?.length || 0;
  const sensoresActivos = sensores?.filter((sensor) => sensor.estado === "activo").length || 0;

  // Datos para el gráfico de barras (ingresos y costos por mes)
  const barChartData = analisis?.analisis_mensual?.map((mes, index) => ({
    id: `mes-${index}`, // Clave única
    mes: new Date(mes.mes).toLocaleDateString("es-ES", { month: "short", year: "numeric" }),
    ingresos: mes.ingresos || 0,
    costos: mes.costos || 0,
  })) || [];

  // Datos para el gráfico de líneas (datos históricos, últimos 7 días)
  const lineChartData = historicos
    .filter((dato) => {
      const value = dato[selectedDataType as keyof SensorData];
      const date = new Date(dato.fecha_medicion).getTime();
      const sevenDaysAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
      return value !== null && value !== undefined && date >= sevenDaysAgo;
    })
    .sort((a, b) => new Date(a.fecha_medicion).getTime() - new Date(b.fecha_medicion).getTime())
    .slice(-50) // Limitar a 50 puntos para evitar saturación
    .map((dato, index) => ({
      id: `dato-${dato.id}-${index}`, // Clave única
      fecha: new Date(dato.fecha_medicion).toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
      value: dato[selectedDataType as keyof SensorData] ?? 0,
    }));

  // Datos para el gráfico circular (progreso de actividades)
  const completedActivities = activities.filter((a) => a.estado === "COMPLETADA").length;
  const pendingActivities = activities.filter((a) => a.estado === "PENDIENTE").length;
  const pieChartData = [
    { name: "Completado", value: completedActivities },
    { name: "Pendiente", value: pendingActivities },
  ];

  const COLORS = ["#10B981", "#1E3A8A"];

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Pitalito&appid=1912de4d8f25e4b41824e3920aed0598&units=metric&lang=es`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setWeather(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      });
  }, []);

  if (loadingAnalisis || loadingHistoricos || loadingActividades || loadingSensores || loadingInsumos) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner label="Cargando datos..." color="primary" variant="wave" className="text-primary" />
        </div>
      </DefaultLayout>
    );
  }

  if (errorAnalisis || errorHistoricos || errorActividades || errorSensores || errorInsumos) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          <p className="text-xl">Error al cargar los datos</p>
          <p>{errorAnalisis?.message || errorHistoricos?.message || errorActividades?.message || errorSensores?.message || errorInsumos?.message}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            className="bg-blue-800 text-white p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm sm:text-lg">Ganancias</h2>
            <p className="text-lg sm:text-2xl">${ganancias.toLocaleString()}</p>
          </motion.div>
          <motion.div
            className="bg-green-500 text-white p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-sm sm:text-lg">Insumos</h2>
            <p className="text-lg sm:text-2xl">{totalInsumos}</p>
          </motion.div>
          <motion.div
            className="bg-orange-500 text-white p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-sm sm:text-lg">Sensores Activos</h2>
            <p className="text-lg sm:text-2xl">{sensoresActivos}</p>
          </motion.div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-xl mb-6">
          <h2 className="text-lg font-semibold mb-2">Clima Actual</h2>
          {weather ? (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="flex items-center gap-1">
                <Droplet className="w-4 h-4 text-blue-600" /> {weather.main.humidity}%
              </p>
              <p className="flex items-center gap-1">
                <Wind className="w-4 h-4 text-green-600" /> {weather.wind.speed} m/s
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No se pudo cargar el clima</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-2">Ganancias y Costos</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ingresos" fill="#10B981" />
                  <Bar dataKey="costos" fill="#1E3A8A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <h2 className="text-lg font-semibold mb-2">Datos Meteorológicos (Últimos 7 Días)</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {dataTypes.map((type) => (
                  <button
                    key={type.sensorId}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      selectedDataType === type.key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-all duration-300`}
                    onClick={() => setSelectedDataType(type.key)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineChartData}>
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
              {lineChartData.length === 0 && (
                <p className="text-gray-600 text-center mt-4">
                  No hay datos disponibles para {dataTypes.find(dt => dt.key === selectedDataType)?.label}.
                </p>
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Progreso de Actividades</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center text-sm mt-2">
              {completedActivities + pendingActivities > 0
                ? `${((completedActivities / (completedActivities + pendingActivities)) * 100).toFixed(1)}% Completado`
                : "0% Completado"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Actividades Futuras</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              {futureActivities.slice(0, 3).map((activity) => (
                <li key={activity.id}>
                  {activity.title} - {activity.date}
                </li>
              ))}
              {futureActivities.length === 0 && (
                <li className="text-gray-500">No hay actividades futuras</li>
              )}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Actividades Vencidas</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              {pastActivities.slice(0, 3).map((activity) => (
                <li key={activity.id}>
                  {activity.title} - {activity.date}
                </li>
              ))}
              {pastActivities.length === 0 && (
                <li className="text-gray-500">No hay actividades vencidas</li>
              )}
            </ul>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600 transition-all">
              Revisar Ahora
            </button>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default Dashboard;