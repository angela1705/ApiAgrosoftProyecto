import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useNavigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import { Sensor } from "@/types/iot/type";
import { EditIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { addToast } from "@heroui/react";

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

export default function ListarSensores() {
  const { sensores, isLoading, error, updateSensor, deleteSensor, toggleSensor } = useSensoresRegistrados();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Tipo", uid: "tipo_sensor" },
    { name: "Unidad", uid: "unidad_medida" },
    { name: "Estado", uid: "estado" },
    { name: "Acciones", uid: "acciones" },
  ];

  const formattedData = useMemo(() => {
    return sensores.map((sensor: Sensor) => ({
      id: sensor.id,
      nombre: sensor.nombre,
      tipo_sensor: sensorTypes.find((type) => type.value === sensor.tipo_sensor)?.label || sensor.tipo_sensor,
      unidad_medida: sensor.unidad_medida,
      estado: (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            sensor.estado === "activo"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {sensor.estado === "activo" ? "Activo" : "Inactivo"}
        </span>
      ),
      acciones: (
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => handleEdit(sensor)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <EditIcon size={20} color="black" />
          </motion.button>
          <motion.button
            onClick={() => handleDelete(sensor)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={20} color="red" />
          </motion.button>
          <motion.label
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={sensor.estado === "activo"}
              onChange={() =>
                handleToggleSensor(
                  sensor.id,
                  sensor.estado === "activo" ? "inactivo" : "activo"
                )
              }
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </motion.label>
        </div>
      ),
    }));
  }, [sensores]);

  const handleEdit = (sensor: Sensor) => {
    setSelectedSensor({ ...sensor });
    setIsEditModalOpen(true);
  };

  const handleDelete = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    setIsDeleteModalOpen(true);
  };

  const handleToggleSensor = (sensorId: number, newEstado: string) => {
    toggleSensor.mutate(
      { sensorId, newEstado },
      {
        onSuccess: () => {
          addToast({
            title: "Éxito",
            description: `Sensor ${sensorId} ${newEstado === "activo" ? "activado" : "desactivado"} con éxito`,
            timeout: 3000,
            color: "success",
          });
        },
        onError: (err: any) => {
          if (err.response?.status === 403) {
            addToast({
              title: "Acceso denegado",
              description: "No tienes permiso para realizar esta acción, contacta a un administrador.",
              timeout: 3000,
              color: "warning",
            });
          } else {
            addToast({
              title: "Error",
              description: err.response?.data?.message || "Error al cambiar el estado del sensor",
              timeout: 3000,
              color: "danger",
            });
          }
        },
      }
    );
  };

  const handleConfirmDelete = () => {
    if (selectedSensor?.id) {
      deleteSensor.mutate(selectedSensor.id);
      setIsDeleteModalOpen(false);
      setSelectedSensor(null);
    }
  };

  const handleChange = (
    field: keyof Sensor,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    if (field === "tipo_sensor") {
      const config = sensorConfigurations[value] || { unidad_medida: "", medida_minima: 0, medida_maxima: 0 };
      setSelectedSensor((prev) =>
        prev
          ? {
              ...prev,
              tipo_sensor: value,
              unidad_medida: config.unidad_medida,
              medida_minima: config.medida_minima,
              medida_maxima: config.medida_maxima,
            }
          : null
      );
    } else {
      setSelectedSensor((prev) =>
        prev
          ? {
              ...prev,
              [field]: field === "medida_minima" || field === "medida_maxima" ? Number(value) : value,
            }
          : null
      );
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Lista de Sensores Registrados</h2>

          <div className="mb-2 flex justify-start gap-2">
            <button
              className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/iot/registrar-sensor")}
            >
              + Registrar Sensor
            </button>
          </div>

          {isLoading ? (
            <p className="text-gray-600 text-center">Cargando sensores...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error.message}</p>
          ) : (
            <>
              <Tabla columns={columns} data={formattedData} responsiveColumns={["nombre", "estado"]} />
              {sensores.length === 0 && (
                <p className="text-gray-600 text-center mt-4">No hay sensores registrados</p>
              )}
            </>
          )}
        </div>
      </div>

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Sensor"
        onConfirm={() => {
          if (selectedSensor?.id) {
            updateSensor.mutate(selectedSensor);
            setIsEditModalOpen(false);
          }
        }}
      >
        <ReuInput
          label="Nombre"
          type="text"
          value={selectedSensor?.nombre || ""}
          onChange={(e) => handleChange("nombre", e)}
        />
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Tipo de Sensor</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSensor?.tipo_sensor || ""}
            onChange={(e) => handleChange("tipo_sensor", e)}
          >
            <option value="">Seleccione un tipo de sensor</option>
            {sensorTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
          <p className="mt-1 text-sm text-gray-900">{selectedSensor?.unidad_medida || ""}</p>
        </div>
        <ReuInput
          label="Descripción"
          type="text"
          value={selectedSensor?.descripcion || ""}
          onChange={(e) => handleChange("descripcion", e)}
        />
        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Medida Mínima"
            type="number"
            value={selectedSensor?.medida_minima?.toString() || "0"}
            onChange={(e) => handleChange("medida_minima", e)}
          />
          <ReuInput
            label="Medida Máxima"
            type="number"
            value={selectedSensor?.medida_maxima?.toString() || "0"}
            onChange={(e) => handleChange("medida_maxima", e)}
          />
        </div>
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar este sensor?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
}