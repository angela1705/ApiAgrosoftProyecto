import React, { useState, FormEvent } from "react";
import { useRegistrarSensor } from "@/hooks/iot/useSensore";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";

const RegistrarSensorPage: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useRegistrarSensor();
  const [newSensor, setNewSensor] = useState({
    nombre: "",
    tipo_sensor: "",
    unidad_medida: "",
    descripcion: "",
    medida_minima: 0,
    medida_maxima: 0,
  });

  const handleNewSensorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSensor((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "medida_minima" || e.target.name === "medida_maxima"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(newSensor, {
      onSuccess: () => {
        alert("Sensor registrado con éxito");
        navigate("/iot/listar-sensores");
      },
      onError: (err: any) => {
        console.error("Error al registrar:", err);
        alert(`Error al registrar el sensor: ${err.message}`);
      },
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6 bg-white">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Registrar Sensor</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nombre"
              name="nombre"
              value={newSensor.nombre}
              onChange={handleNewSensorChange}
              required
              placeholder="Ej: Sensor de Temperatura"
            />
            <Input
              label="Tipo de Sensor"
              name="tipo_sensor"
              value={newSensor.tipo_sensor}
              onChange={handleNewSensorChange}
              required
              placeholder="Ej: Temperatura"
            />
            <Input
              label="Unidad de Medida"
              name="unidad_medida"
              value={newSensor.unidad_medida}
              onChange={handleNewSensorChange}
              required
              placeholder="Ej: °C"
            />
            <Input
              label="Descripción"
              name="descripcion"
              value={newSensor.descripcion}
              onChange={handleNewSensorChange}
              placeholder="Descripción opcional"
            />
            <Input
              label="Medida Mínima"
              name="medida_minima"
              type="number"
              value={newSensor.medida_minima.toString()}
              onChange={handleNewSensorChange}
              required
              placeholder="Ej: 0"
            />
            <Input
              label="Medida Máxima"
              name="medida_maxima"
              type="number"
              value={newSensor.medida_maxima.toString()}
              onChange={handleNewSensorChange}
              required
              placeholder="Ej: 100"
            />
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                color="primary"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Registrando..." : "Guardar"}
              </Button>
              <Button
                color="secondary"
                onClick={() => navigate("/iot/listar-sensores")}
                disabled={mutation.isPending}
              >
                Lista de Sensores
              </Button>
              <Button
                onClick={() => navigate("/iot/sensores")}
                className="bg-green-600 text-white hover:bg-green-700"
                disabled={mutation.isPending}
              >
                Sensores
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RegistrarSensorPage;