import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useNavigate } from "react-router-dom";
import { Sensor } from "@/types/iot/type";
import api from "@/components/utils/axios";
import { addToast } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { obtenerNuevoToken } from "@/components/utils/refresh";

const sensorTypes = [
  { value: "temperatura", label: "Temperatura (°C)" },
  { value: "ambient_humidity", label: "Humedad Ambiente (%)" },
  { value: "soil_humidity", label: "Humedad Suelo (%)" },
  { value: "luminosidad", label: "Luminosidad (lux)" },
  { value: "lluvia", label: "Lluvia (mm/h)" },
  { value: "velocidad_viento", label: "Velocidad Viento (m/s)" },
  { value: "direccion_viento", label: "Dirección Viento (grados)" },
  { value: "ph_suelo", label: "pH Suelo (pH)" },
];

const sensorConfigurations: { [key: string]: { unidad_medida: string; medida_minima: number; medida_maxima: number } } = {
  temperatura: { unidad_medida: "°C", medida_minima: -40, medida_maxima: 85 },
  ambient_humidity: { unidad_medida: "%", medida_minima: 0, medida_maxima: 100 },
  soil_humidity: { unidad_medida: "%", medida_minima: 0, medida_maxima: 100 },
  luminosidad: { unidad_medida: "lux", medida_minima: 0, medida_maxima: 100000 },
  lluvia: { unidad_medida: "mm/h", medida_minima: 0, medida_maxima: 50 },
  velocidad_viento: { unidad_medida: "m/s", medida_minima: 0, medida_maxima: 60 },
  direccion_viento: { unidad_medida: "grados", medida_minima: 0, medida_maxima: 360 },
  ph_suelo: { unidad_medida: "pH", medida_minima: 0, medida_maxima: 14 },
};

const RegistrarSensorPage: React.FC = () => {
  const [sensor, setSensor] = useState<Partial<Sensor>>({
    nombre: "",
    tipo_sensor: "",
    unidad_medida: "",
    descripcion: "",
    medida_minima: 0,
    medida_maxima: 0,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "tipo_sensor") {
      const config = sensorConfigurations[value] || { unidad_medida: "", medida_minima: 0, medida_maxima: 0 };
      setSensor((prev) => ({
        ...prev,
        tipo_sensor: value,
        unidad_medida: config.unidad_medida,
        medida_minima: config.medida_minima,
        medida_maxima: config.medida_maxima,
      }));
    } else {
      setSensor((prev) => ({
        ...prev,
        [name]: name === "medida_minima" || name === "medida_maxima" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      addToast({
        title: "Sesión expirada",
        description: "No se encontró el token de autenticación, por favor inicia sesión nuevamente.",
        timeout: 3000,
        color: "danger",
      });
      return;
    }

    try {
      const response = await api.post("http://127.0.0.1:8000/iot/sensores/", sensor, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["sensores"] });
      addToast({
        title: "Éxito",
        description: "Sensor registrado con éxito",
        timeout: 3000,
        color: "success",
      });
      navigate("/iot/listar-sensores");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          addToast({
            title: "Sesión expirada",
            description: "No se encontró el refresh token, por favor inicia sesión nuevamente.",
            timeout: 3000,
            color: "danger",
          });
          return;
        }
        try {
          const newToken = await obtenerNuevoToken(refreshToken);
          localStorage.setItem("access_token", newToken);
          const response = await api.post("http://127.0.0.1:8000/iot/sensores/", sensor, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          });
          queryClient.invalidateQueries({ queryKey: ["sensores"] });
          addToast({
            title: "Éxito",
            description: "Sensor registrado con éxito",
            timeout: 3000,
            color: "success",
          });
          navigate("/iot/listar-sensores");
          return response.data;
        } catch (refreshError) {
          addToast({
            title: "Sesión expirada",
            description: "No se pudo refrescar el token, por favor inicia sesión nuevamente.",
            timeout: 3000,
            color: "danger",
          });
          return;
        }
      } else if (error.response?.status === 403) {
        addToast({
          title: "Acceso denegado",
          description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
          timeout: 3000,
          color: "danger",
        });
      } else {
        addToast({
          title: "Error",
          description: error.response?.data?.message || "Error al registrar el sensor",
          timeout: 3000,
          color: "danger",
        });
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-3 sm:p-4">
        <div className="w-full max-w-md bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 text-center">Registro de Sensor</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="text-sm">
              <ReuInput
                label="Nombre"
                placeholder="Ingrese el nombre del sensor"
                type="text"
                value={sensor.nombre || ""}
                onChange={(e) => setSensor({ ...sensor, nombre: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">Tipo de Sensor</label>
              <select
                className="w-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                name="tipo_sensor"
                value={sensor.tipo_sensor || ""}
                onChange={handleChange}
              >
                <option value="">Seleccione un tipo de sensor</option>
                {sensorTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm">
              <ReuInput
                label="Unidad de Medida"
                placeholder="Ej: °C, %, lux"
                type="text"
                value={sensor.unidad_medida || ""}
                onChange={(e) => setSensor({ ...sensor, unidad_medida: e.target.value })}
              />
            </div>

            <div className="text-sm">
              <ReuInput
                label="Descripción"
                placeholder="Descripción del sensor"
                type="text"
                value={sensor.descripcion || ""}
                onChange={(e) => setSensor({ ...sensor, descripcion: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="text-sm">
                <ReuInput
                  label="Medida Mínima"
                  placeholder="Valor mínimo"
                  type="number"
                  value={sensor.medida_minima?.toString() || "0"}
                  onChange={(e) => setSensor({ ...sensor, medida_minima: Number(e.target.value) })}
                />
              </div>

              <div className="text-sm">
                <ReuInput
                  label="Medida Máxima"
                  placeholder="Valor máximo"
                  type="number"
                  value={sensor.medida_maxima?.toString() || "0"}
                  onChange={(e) => setSensor({ ...sensor, medida_maxima: Number(e.target.value) })}
                />
              </div>
            </div>

            <button
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-sm"
              type="submit"
            >
              Guardar
            </button>
            <button
              className="w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-sm"
              type="button"
              onClick={() => navigate("/iot/listar-sensores")}
            >
              Ir a Lista de Sensores
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RegistrarSensorPage;