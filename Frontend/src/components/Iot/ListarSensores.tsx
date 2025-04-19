import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensoresRegistrados } from "@/hooks/iot/useSensoresRegistrados";
import { useNavigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import { Sensor } from "@/types/iot/type";
import { EditIcon, Trash2 } from "lucide-react";

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

export default function ListarSensores() {
  const { sensores, isLoading, error, updateSensor, deleteSensor } = useSensoresRegistrados();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Tipo", uid: "tipo_sensor" },
    { name: "Unidad", uid: "unidad_medida" },
    { name: "Acciones", uid: "acciones" },
  ];

  const formattedData = useMemo(() => {
    return sensores.map((sensor: Sensor) => ({
      id: sensor.id,
      nombre: sensor.nombre,
      tipo_sensor: sensorTypes.find((type) => type.value === sensor.tipo_sensor)?.label || sensor.tipo_sensor,
      unidad_medida: sensor.unidad_medida,
      acciones: (
        <>
          <button className="mr-2" onClick={() => handleEdit(sensor)}>
            <EditIcon size={22} color="black" />
          </button>
          <button onClick={() => handleDelete(sensor)}>
            <Trash2 size={22} color="red" />
          </button>
        </>
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
    setSelectedSensor((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: field === "medida_minima" || field === "medida_maxima" ? Number(value) : value,
      };
    });
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
            <button
              className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={() => navigate("/iot/sensores")}
            >
              Volver a Tiempo Real
            </button>
          </div>

          {isLoading ? (
            <p className="text-gray-600 text-center">Cargando sensores...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error.message}</p>
          ) : sensores.length === 0 ? (
            <p className="text-gray-600 text-center">No hay sensores registrados</p>
          ) : (
            <Tabla columns={columns} data={formattedData} />
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
        <ReuInput
          label="Unidad de Medida"
          type="text"
          value={selectedSensor?.unidad_medida || ""}
          onChange={(e) => handleChange("unidad_medida", e)}
        />
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