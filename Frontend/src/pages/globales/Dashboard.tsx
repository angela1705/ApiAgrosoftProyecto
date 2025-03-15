import React from "react";
import DefaultLayout from "@/layouts/default";

const Dashboard: React.FC = () => {
  // Placeholder para datos del clima general de Yamboro
  // Más adelante puedes usar una API como OpenWeatherMap o un endpoint de tu backend
  const climaGeneral = {
    location: "Yamboro",
    temperature: 28.5, // °C
    humidity: 70, // %
    condition: "Parcialmente nublado",
    lastUpdated: new Date().toLocaleTimeString(),
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Panel Principal</h1>

        {/* Contenedor principal con grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Programaciones (izquierda superior) */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Programaciones</h2>
            <div className="text-gray-600">
              <p>Programaciones relacionadas con el cultivo.</p>
              <ul className="mt-2 list-disc list-inside">
                <li>Riego automático - 6:00 AM</li>
                <li>Revisión de bancales - 10:00 AM</li>
              </ul>
            </div>
          </div>

          {/* Actividades (derecha superior) */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Actividades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-600">General</h3>
                <ul className="mt-1 text-gray-600 list-disc list-inside">
                  <li>Reunión equipo - 9:00 AM</li>
                  <li>Cosecha parcial - 3:00 PM</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600">Personal</h3>
                <ul className="mt-1 text-gray-600 list-disc list-inside">
                  <li>Revisar inventario - 11:00 AM</li>
                  <li>Planificación semanal - 4:00 PM</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Clima General - Yamboro (izquierda inferior) */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Clima General - Yamboro</h2>
            <div className="text-gray-600 space-y-2">
              <p>
                <strong>Temperatura:</strong> {climaGeneral.temperature}°C
              </p>
              <p>
                <strong>Humedad:</strong> {climaGeneral.humidity}%
              </p>
              <p>
                <strong>Condición:</strong> {climaGeneral.condition}
              </p>
              <p className="text-sm">
                Última actualización: {climaGeneral.lastUpdated}
              </p>
            </div>
          </div>

          {/* Productos (derecha inferior) */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-600">Disponibles</h3>
                <ul className="mt-1 text-gray-600 list-disc list-inside">
                  <li>Semillas de maíz</li>
                  <li>Fertilizante orgánico</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600">Pronto</h3>
                <ul className="mt-1 text-gray-600 list-disc list-inside">
                  <li>Semillas de soja</li>
                  <li>Herramientas de poda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Dashboard;