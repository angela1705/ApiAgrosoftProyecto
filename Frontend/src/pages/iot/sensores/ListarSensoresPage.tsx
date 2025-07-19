import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useSensores } from "@/hooks/iot/sensores/useSensores";
import { useUpdateSensor } from "@/hooks/iot/sensores/usePutSensor";
import { useDeleteSensor } from "@/hooks/iot/sensores/useDeleteSensor";
import { useToggleSensor } from "@/hooks/iot/sensores/useToggleSensor";
import { useBancales } from "@/hooks/cultivo/usebancal";
import { useNavigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import { ModalSensor } from "@/components/Iot/ModalSensor";
import GuideModal from "@/components/Iot/GuideModal";
import { Sensor } from "@/types/iot/type";
import { EditIcon, Trash2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Switcher from "@/components/switch";
import { addToast } from "@heroui/react";
import ErrorBoundary from "@/components/globales/ErrorBoundary";

export default function ListarSensoresPage() {
  const { sensores, isLoading, error } = useSensores();
  const updateSensor = useUpdateSensor();
  const deleteSensor = useDeleteSensor();
  const toggleSensor = useToggleSensor();
  const { data: bancales } = useBancales();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Tipo", uid: "tipo_sensor" },
    { name: "Unidad", uid: "unidad_medida" },
    { name: "Código", uid: "device_code" },
    { name: "Bancal", uid: "bancal_nombre" },
    { name: "Estado", uid: "estado" },
    { name: "Acciones", uid: "acciones" },
  ];

  const formattedData = useMemo(() => {
    return sensores
      .filter((sensor) => sensor.id && sensor.tipo_sensor)
      .map((sensor) => ({
        id: sensor.id.toString(),
        nombre: sensor.nombre || "Sin nombre",
        tipo_sensor: sensor.tipo_sensor || "Desconocido",
        unidad_medida: sensor.unidad_medida || "N/A",
        device_code: sensor.device_code || "N/A",
        bancal_nombre: sensor.bancal_nombre || "Sin bancal",
        estado: (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              sensor.estado === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {sensor.estado === "activo" ? "Activo" : "Inactivo"}
          </span>
        ),
        acciones: (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => {
                if (sensor.id && sensor.tipo_sensor) {
                  setSelectedSensor(sensor);
                  setIsEditModalOpen(true);
                } else {
                  addToast({
                    title: "Error",
                    description: "Sensor inválido para edición.",
                    timeout: 3000,
                    color: "danger",
                  });
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <EditIcon size={20} color="black" />
            </motion.button>
            <motion.button
              onClick={() => {
                if (sensor.id) {
                  setSelectedSensor(sensor);
                  setIsDeleteModalOpen(true);
                } else {
                  addToast({
                    title: "Error",
                    description: "Sensor inválido para eliminación.",
                    timeout: 3000,
                    color: "danger",
                  });
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 size={20} color="red" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Switcher
                size="sm"
                isSelected={sensor.estado === "activo"}
                color={sensor.estado === "activo" ? "success" : "danger"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const activo = e.target.checked;
                  toggleSensor.mutate(
                    { sensorId: sensor.id, activo },
                    {
                      onSuccess: () => {
                        addToast({
                          title: "Éxito",
                          description: `Sensor ${activo ? "activado" : "desactivado"}.`,
                          timeout: 3000,
                          color: "success",
                        });
                      },
                    }
                  );
                }}
              />
            </motion.div>
          </div>
        ),
      }));
  }, [sensores, toggleSensor]);

  const handleConfirmEdit = (editedSensor: Sensor | null) => {
    if (editedSensor && editedSensor.id && editedSensor.tipo_sensor) {
      updateSensor.mutate(editedSensor, {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedSensor(null);
          addToast({
            title: "Éxito",
            description: "Sensor actualizado correctamente.",
            timeout: 3000,
            color: "success",
          });
        },
      });
    } else {
      addToast({
        title: "Error",
        description: "Datos del sensor inválidos.",
        timeout: 3000,
        color: "danger",
      });
    }
  };

  const handleConfirmDelete = (sensor: Sensor | null) => {
    if (sensor && sensor.id) {
      deleteSensor.mutate(sensor.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedSensor(null);
          addToast({
            title: "Éxito",
            description: "Sensor eliminado correctamente.",
            timeout: 3000,
            color: "success",
          });
        },
      });
    } else {
      addToast({
        title: "Error",
        description: "ID del sensor inválido.",
        timeout: 3000,
        color: "danger",
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <motion.button
              onClick={() => setIsGuideModalOpen(true)}
              className="p-2 bg-orange-500 text-white rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HelpCircle size={24} />
            </motion.button>
            <h2 className="text-2xl font-bold text-gray-800">Lista de Sensores</h2>
            <div className="w-10"></div>
          </div>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded-lg mb-4"
            onClick={() => navigate("/iot/registrar-sensor")}
          >
            + Registrar Sensor
          </button>
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <Tabla columns={columns} data={formattedData} responsiveColumns={["nombre", "estado"]} />
          )}
        </div>
        <ErrorBoundary>
          {isEditModalOpen && selectedSensor && (
            <ModalSensor
              isOpen={isEditModalOpen}
              onOpenChange={(open) => {
                setIsEditModalOpen(open);
                if (!open) setSelectedSensor(null);
              }}
              sensor={selectedSensor}
              onConfirm={handleConfirmEdit}
            />
          )}
          {isDeleteModalOpen && selectedSensor && (
            <ModalSensor
              isOpen={isDeleteModalOpen}
              onOpenChange={(open) => {
                setIsDeleteModalOpen(open);
                if (!open) setSelectedSensor(null);
              }}
              sensor={selectedSensor}
              onConfirm={handleConfirmDelete}
              isDelete
            />
          )}
        </ErrorBoundary>
        <GuideModal
          isOpen={isGuideModalOpen}
          onClose={() => setIsGuideModalOpen(false)}
        />
      </div>
    </DefaultLayout>
  );
};