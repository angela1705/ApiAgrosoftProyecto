import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Droplet, Wind, Sunrise, Sunset, DollarSign, AlertCircle } from "lucide-react";

// Importar las imágenes
import backgroundImage from "../../assets/4-ventajas-del-cultivo-de-hortalizas-en-invernadero.jpg";
import weatherBackgroundImage from "../../assets/agricultura-campo-campos-de-cultivo-221016.jpg";

interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
  dt: number;
  name: string;
}

interface Activity {
  title: string;
  date: string;
  time: string;
}

const Dashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const currentDate = new Date("2025-04-03");

  const activities: Activity[] = [
    { title: "Riego automático", date: "2025-03-30", time: "06:00 AM" },
    { title: "Revisión de bancales", date: "2025-04-05", time: "10:00 AM" },
    { title: "Fertilización", date: "2025-04-10", time: "08:00 AM" },
    { title: "Cosecha parcial", date: "2025-03-25", time: "09:00 AM" },
  ];

  const pastActivities = activities.filter(
    (activity) => new Date(activity.date) < currentDate
  );
  const futureActivities = activities.filter(
    (activity) => new Date(activity.date) >= currentDate
  );

  const notifications = [
    "Recordatorio: Revisar inventario de herramientas esta semana.",
    "Alerta: Posible lluvia fuerte mañana por la tarde.",
  ];

  const salesData = [
    { day: "Lun", amount: 1200 },
    { day: "Mar", amount: 1500 },
    { day: "Mié", amount: 800 },
    { day: "Jue", amount: 1250 },
    { day: "Vie", amount: 1100 },
  ];

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Pitalito&appid=1912de4d8f25e4b41824e3920aed0598&units=metric&lang=es`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  // Verificar si las imágenes están cargadas
  const getBackgroundStyle = (image: any) => {
    const isLoaded = image && typeof image === "object" && image.default;
    return isLoaded ? `url(${image.default})` : "linear-gradient(to bottom, #e0f7fa, #ffffff)";
  };

  return (
    <DefaultLayout>
      <section
        className="flex flex-col items-center justify-center gap-8 py-10 px-4 min-h-screen bg-cover bg-center"
        style={{ backgroundImage: getBackgroundStyle(backgroundImage) }}
      >
        {/* Hero Section: Clima con Fondo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-4xl text-center bg-cover bg-center relative"
          style={{ backgroundImage: getBackgroundStyle(weatherBackgroundImage) }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold font-poppins text-gray-800 mb-4">Clima en Pitalito</h1>
            {weather ? (
              <div className="space-y-4">
                <div className="flex justify-center items-center space-x-4">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="w-20 h-20"
                  />
                  <div>
                    <p className="text-5xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</p>
                    <p className="text-xl capitalize text-gray-600">{weather.weather[0].description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Droplet className="w-6 h-6 text-blue-600" />
                    <p>{weather.main.humidity}%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-6 h-6 text-green-600" />
                    <p>{weather.wind.speed} m/s</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sunrise className="w-6 h-6 text-orange-600" />
                    <p>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sunset className="w-6 h-6 text-purple-600" />
                    <p>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Cargando...</p>
            )}
          </div>
        </motion.div>

        {/* Tarjetas Compactas en 2 Filas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Actividades Futuras</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {futureActivities.slice(0, 3).map((activity, index) => (
                <li key={index}>
                  {activity.title} - {activity.date}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ventas Diarias</h2>
            <LineChart width={200} height={150} data={salesData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notificaciones</h2>
            <ul className="list-none text-gray-700 space-y-2">
              {notifications.map((notification, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  <p className="text-sm">{notification}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Cultivos Activos:</strong> 5</p>
              <p><strong>Tareas Pendientes:</strong> 3</p>
            </div>
          </motion.div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Dashboard;