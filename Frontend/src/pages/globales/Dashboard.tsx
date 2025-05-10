import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Droplet, Wind, Sunrise, Sunset } from "lucide-react";
import CustomSpinner from "@/components/globales/Spinner";
import { useAnalisisPorCosecha } from "@/hooks/finanzas/useCostoBeneficio";
import { useDatosMeteorologicosHistoricos } from "@/hooks/iot/useDatosMeteorologicosHistoricos";
import { useActividades } from "@/hooks/cultivo/useActividad";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useInsumos } from "@/hooks/inventario/useInsumo";

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const currentDate = new Date("2025-04-03");

  // Hooks para obtener datos
  const { data: analisis, isLoading: loadingAnalisis, error: errorAnalisis } = useAnalisisPorCosecha();
  const { data: historicos, isLoading: loadingHistoricos, error: errorHistoricos } = useDatosMeteorologicosHistoricos();
  const { data: actividades, isLoading: loadingActividades, error: errorActividades } = useActividades();
  const { data: sensores, isLoading: loadingSensores, error: errorSensores } = useSensoresRegistrados();
  const { data: insumos, isLoading: loadingInsumos, error: errorInsumos } = useInsumos();

  // Procesar datos de actividades
  const activities = actividades?.map((actividad) => ({
    title: actividad.descripcion || "Actividad sin descripción",
    date: actividad.fecha_inicio?.split("T")[0] || "2025-04-01",
    time: actividad.fecha_inicio?.split("T")[1]?.slice(0, 5) || "00:00",
    estado: actividad.estado || "PENDIENTE",
  })) || [];

  const pastActivities = activities.filter((activity) => new Date(activity.date) < currentDate);
  const futureActivities = activities.filter((activity) => new Date(activity.date) >= currentDate);

  // Datos para las tarjetas superiores
  const ganancias = analisis?.metricas?.total_ingresos || 628;
  const totalInsumos = insumos?.length || 0;
  const sensoresActivos = sensores?.filter((sensor) => sensor.estado === "ACTIVO").length || 16;

  // Datos para el gráfico de barras (ingresos y costos por mes)
  const barChartData = analisis?.analisis_mensual?.map((mes) => ({
    mes: new Date(mes.mes).toLocaleDateString("es-ES", { month: "short", year: "numeric" }),
    ingresos: mes.ingresos || 0,
    costos: mes.costos || 0,
  })) || [];

  // Datos para el gráfico de líneas (temperatura a lo largo del tiempo)
  const lineChartData = historicos?.map((dato) => ({
    fecha: new Date(dato.fecha_medicion).toLocaleDateString(),
    temperatura: dato.temperatura || 0,
  })) || [];

  // Datos para el gráfico circular (progreso de actividades)
  const completedActivities = activities.filter((a) => a.estado === "COMPLETADA").length;
  const pendingActivities = activities.filter((a) => a.estado === "PENDIENTE").length;
  const pieChartData = [
    { name: "Completado", value: completedActivities },
    { name: "Pendiente", value: pendingActivities },
  ];

  const COLORS = ["#FF8C00", "#1E3A8A"];

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Pitalito&appid=1912de4d8f25e4b41824e3920aed0598&units=metric&lang=es`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeather(data);
        } else {
          throw new Error("No se pudieron obtener los datos meteorológicos");
        }
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  // Mostrar spinner si algún dato está cargando
  if (loadingAnalisis || loadingHistoricos || loadingActividades || loadingSensores || loadingInsumos) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner
            label="Cargando datos..."
            color="primary"
            variant="wave"
            className="text-primary"
          />
        </div>
      </DefaultLayout>
    );
  }

  // Mostrar errores si ocurren
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
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-blue-800 text-white p-3 sm:p-4 rounded-lg text-center">
            <h2 className="text-sm sm:text-lg">Ganancias</h2>
            <p className="text-lg sm:text-2xl">${ganancias}</p>
          </div>
          <div className="bg-green-500 text-white p-3 sm:p-4 rounded-lg text-center">
            <h2 className="text-sm sm:text-lg">Insumos</h2>
            <p className="text-lg sm:text-2xl">{totalInsumos}</p>
          </div>
          <div className="bg-orange-500 text-white p-3 sm:p-4 rounded-lg text-center">
            <h2 className="text-sm sm:text-lg">Sensores Activos</h2>
            <p className="text-lg sm:text-2xl">{sensoresActivos}</p>
          </div>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-lg font-semibold mb-2">Clima</h2>
          {weather ? (
            <div className="flex flex-wrap justify-around space-y-2 text-xs sm:text-sm">
              <p><Droplet className="inline w-4 h-4 sm:w-5 sm:h-5 text-blue-600" /> Humedad: {weather.main.humidity}%</p>
              <p><Wind className="inline w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> Viento: {weather.wind.speed} m/s</p>
              <p><Sunrise className="inline w-4 h-4 sm:w-5 sm:h-5 text-orange-600" /> Amanecer: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p><Sunset className="inline w-4 h-4 sm:w-5 sm:h-5 text-purple-600" /> Atardecer: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          ) : (
            <p className="text-gray-500">Cargando...</p>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
              <h2 className="text-sm sm:text-lg font-semibold mb-2">Gráfica Ganancias</h2>
              <BarChart width={window.innerWidth < 640 ? 300 : 700} height={200} data={barChartData}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ingresos" fill="#FF8C00" />
                <Bar dataKey="costos" fill="#1E3A8A" />
              </BarChart>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
              <h2 className="text-sm sm:text-lg font-semibold mb-2">Datos Meteorológicos del Mes</h2>
              <LineChart width={window.innerWidth < 640 ? 300 : 700} height={250} data={lineChartData}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperatura" stroke="#10B981" />
              </LineChart>
            </div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <h2 className="text-sm sm:text-lg font-semibold mb-2">Progreso de Actividades</h2>
            <PieChart width={window.innerWidth < 640 ? 250 : 300} height={200}>
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
            <p className="text-center text-sm sm:text-base mt-2">
              {completedActivities + pendingActivities > 0
                ? `${((completedActivities / (completedActivities + pendingActivities)) * 100).toFixed(1)}%`
                : "0%"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <h2 className="text-sm sm:text-lg font-semibold mb-2">Actividades Futuras</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-xs sm:text-sm">
              {futureActivities.slice(0, 3).map((activity, index) => (
                <li key={index}>
                  {activity.title} - {activity.date}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
            <h2 className="text-sm sm:text-lg font-semibold mb-2">Actividades Vencidas</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-xs sm:text-sm">
              {pastActivities.slice(0, 3).map((activity, index) => (
                <li key={index}>
                  {activity.title} - {activity.date}
                </li>
              ))}
            </ul>
            <button className="mt-3 sm:mt-4 bg-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm">
              Revisar Ahora
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;