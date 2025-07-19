import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import { Sensor, TipoSensor } from "@/types/iot/type";
import { useBancales } from "@/hooks/cultivo/usebancal";
import { useGetTipoSensores } from "@/hooks/iot/sensores/useGetTipoSensores";
import { useModalSensorForm } from "@/hooks/iot/sensores/useModalSensorForm";
import { addToast } from "@heroui/react";

interface ModalSensorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sensor: Sensor | null;
  onConfirm: (editedSensor: Sensor | null) => void;
  isDelete?: boolean;
}

export const ModalSensor = ({ isOpen, onOpenChange, sensor, onConfirm, isDelete = false }: ModalSensorProps) => {
  const { data: bancales, isLoading: isLoadingBancales } = useBancales();
  const { data: tipoSensores, isLoading: isLoadingTipoSensores, error: tipoSensoresError } = useGetTipoSensores();
  const { editedSensor, handleChange, handleConfirm, error: formError } = useModalSensorForm({
    sensor,
    tipoSensores,
    bancales,
    onConfirm,
    isDelete,
  });

  if (!isOpen) return null;

  if (isLoadingTipoSensores || isLoadingBancales) {
    return (
      <ReuModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Cargando..."
        confirmText="Cerrar"
        onConfirm={() => onOpenChange(false)}
      >
        <p>Cargando datos...</p>
      </ReuModal>
    );
  }

  if (tipoSensoresError || formError) {
    addToast({
      title: "Error",
      description: formError || tipoSensoresError?.message || "Error al cargar los datos.",
      timeout: 5000,
      color: "danger",
    });
    return (
      <ReuModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Error"
        confirmText="Cerrar"
        onConfirm={() => onOpenChange(false)}
      >
        <p>{formError || tipoSensoresError?.message || "Error al cargar los datos."}</p>
      </ReuModal>
    );
  }

  if (!tipoSensores?.length) {
    addToast({
      title: "Error",
      description: "No hay tipos de sensores disponibles.",
      timeout: 5000,
      color: "danger",
    });
    return (
      <ReuModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Error"
        confirmText="Cerrar"
        onConfirm={() => onOpenChange(false)}
      >
        <p>No hay tipos de sensores disponibles.</p>
      </ReuModal>
    );
  }

  if (!isDelete && (!sensor || !sensor.id || !sensor.tipo_sensor || !editedSensor)) {
    addToast({
      title: "Error",
      description: "Sensor no proporcionado o inválido.",
      timeout: 5000,
      color: "danger",
    });
    return (
      <ReuModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Error"
        confirmText="Cerrar"
        onConfirm={() => onOpenChange(false)}
      >
        <p>Sensor no proporcionado o inválido.</p>
      </ReuModal>
    );
  }

  return (
    <ReuModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={isDelete ? "Eliminar Sensor" : "Editar Sensor"}
      onConfirm={handleConfirm}
      confirmText={isDelete ? "Eliminar" : "Guardar"}
      cancelText="Cancelar"
    >
      {isDelete ? (
        <p>¿Estás seguro de eliminar este sensor? Esta acción es irreversible.</p>
      ) : (
        <div className="space-y-4">
          <ReuInput
            label="Nombre"
            type="text"
            value={editedSensor?.nombre ?? ""}
            onChange={(e) => handleChange("nombre", e)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Sensor</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={editedSensor?.tipo_sensor ?? ""}
              onChange={(e) => handleChange("tipo_sensor", e)}
              required
            >
              <option value="" disabled>
                Seleccione un tipo
              </option>
              {tipoSensores.map((tipo) => (
                <option key={tipo.id} value={tipo.label}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
          <ReuInput
            label="Unidad de Medida"
            type="text"
            value={editedSensor?.unidad_medida ?? ""}
            disabled
          />
          <ReuInput
            label="Descripción"
            type="text"
            value={editedSensor?.descripcion ?? ""}
            onChange={(e) => handleChange("descripcion", e)}
          />
          <ReuInput
            label="Código del Dispositivo"
            type="text"
            value={editedSensor?.device_code ?? ""}
            onChange={(e) => handleChange("device_code", e)}
          />
          <div className="grid grid-cols-2 gap-4">
            <ReuInput
              label="Medida Mínima"
              type="number"
              value={editedSensor?.medida_minima?.toString() ?? "0"}
              onChange={(e) => handleChange("medida_minima", e)}
            />
            <ReuInput
              label="Medida Máxima"
              type="number"
              value={editedSensor?.medida_maxima?.toString() ?? "0"}
              onChange={(e) => handleChange("medida_maxima", e)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bancal</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={editedSensor?.bancal_id?.toString() ?? ""}
              onChange={(e) => handleChange("bancal_id", e)}
            >
              <option value="">Sin bancal</option>
              {bancales?.map((bancal) => (
                <option key={bancal.id} value={bancal.id}>
                  {bancal.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </ReuModal>
  );
};