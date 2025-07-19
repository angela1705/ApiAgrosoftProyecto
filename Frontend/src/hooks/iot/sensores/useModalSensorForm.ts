import { useState, useEffect } from "react";
import { addToast } from "@heroui/react";
import { Sensor, TipoSensor } from "@/types/iot/type";
import { Bancal } from "@/types/cultivo/Bancal";

interface UseModalSensorFormProps {
  sensor: Sensor | null;
  tipoSensores: TipoSensor[] | undefined;
  bancales: Bancal[] | undefined;
  onConfirm: (editedSensor: Sensor | null) => void;
  isDelete?: boolean;
}

export const useModalSensorForm = ({
  sensor,
  tipoSensores,
  bancales,
  onConfirm,
  isDelete = false,
}: UseModalSensorFormProps) => {
  const [editedSensor, setEditedSensor] = useState<Sensor | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isDelete && (!sensor || !sensor.id || !sensor.tipo_sensor)) {
      console.error("[useModalSensorForm] Sensor inválido:", sensor);
      setError("Sensor no proporcionado o datos incompletos.");
      setEditedSensor(null);
      return;
    }

    if (!isDelete && (!tipoSensores || tipoSensores.length === 0)) {
      console.error("[useModalSensorForm] tipoSensores no disponible:", tipoSensores);
      setError("No hay tipos de sensores disponibles.");
      addToast({
        title: "Error",
        description: "No se encontraron tipos de sensores.",
        timeout: 5000,
        color: "danger",
      });
      return;
    }

    if (isDelete || !sensor || !sensor.tipo_sensor) {
      setEditedSensor(sensor);
      return;
    }

    const tipoSensor = tipoSensores?.find(
      (type) => type.label.toLowerCase() === sensor.tipo_sensor?.toLowerCase()
    );

    if (!tipoSensor) {
      console.warn("[useModalSensorForm] No se encontró tipoSensor para:", sensor.tipo_sensor);
      addToast({
        title: "Advertencia",
        description: `Tipo de sensor "${sensor.tipo_sensor}" no encontrado. Seleccione uno válido.`,
        timeout: 5000,
        color: "warning",
      });
    }

    const updatedSensor: Sensor = {
      ...sensor,
      tipo_sensor_id: tipoSensor?.id ?? sensor.tipo_sensor_id ?? 0,
      tipo_sensor: tipoSensor?.label ?? sensor.tipo_sensor,
      unidad_medida: tipoSensor?.unidad_medida ?? sensor.unidad_medida ?? "",
      medida_minima: Number(sensor.medida_minima) ?? 0,
      medida_maxima: Number(sensor.medida_maxima) ?? 0,
      nombre: sensor.nombre ?? "",
      descripcion: sensor.descripcion ?? "",
      device_code: sensor.device_code ?? null,
      estado: sensor.estado ?? "inactivo",
      bancal_id: sensor.bancal_id ?? null,
      bancal_nombre: sensor.bancal_nombre ?? "",
    };

    console.log("[useModalSensorForm] Inicializando editedSensor:", updatedSensor);
    setEditedSensor(updatedSensor);
    setError(null);
  }, [sensor, tipoSensores, isDelete]);

  const handleChange = (
    field: keyof Sensor,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setEditedSensor((prev) => {
      if (!prev) return prev;
      if (field === "tipo_sensor") {
        const tipoSensor = tipoSensores?.find(
          (type) => type.label.toLowerCase() === value.toLowerCase()
        );
        if (!tipoSensor) {
          addToast({
            title: "Error",
            description: `Tipo de sensor "${value}" no válido.`,
            timeout: 3000,
            color: "danger",
          });
          return prev;
        }
        return {
          ...prev,
          tipo_sensor: tipoSensor.label,
          tipo_sensor_id: tipoSensor.id ?? 0,
          unidad_medida: tipoSensor.unidad_medida ?? "",
          medida_minima: Number(tipoSensor.medida_minima) ?? prev.medida_minima,
          medida_maxima: Number(tipoSensor.medida_maxima) ?? prev.medida_maxima,
        };
      }
      return {
        ...prev,
        [field]:
          field === "medida_minima" || field === "medida_maxima"
            ? Number(value) || 0
            : field === "bancal_id"
            ? value === "" ? null : Number(value)
            : value,
      };
    });
  };

  const handleConfirm = () => {
    if (isDelete) {
      onConfirm(editedSensor);
      return;
    }
    if (!editedSensor || !editedSensor.id || !editedSensor.tipo_sensor || !editedSensor.nombre) {
      console.error("[useModalSensorForm] Validación fallida:", editedSensor);
      addToast({
        title: "Error",
        description: "Por favor, complete todos los campos obligatorios.",
        timeout: 3000,
        color: "danger",
      });
      return;
    }
    if (editedSensor.bancal_id && !bancales?.some((b) => b.id === editedSensor.bancal_id)) {
      addToast({
        title: "Error",
        description: "El bancal seleccionado no existe.",
        timeout: 3000,
        color: "danger",
      });
      return;
    }
    onConfirm(editedSensor);
  };

  return { editedSensor, handleChange, handleConfirm, error };
};