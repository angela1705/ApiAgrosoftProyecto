import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../../components/globales/ReuInput";
import Formulario from "@/components/globales/Formulario";
import { Programacion } from "../../types/cultivo/Programacion";
import { useRegistrarProgramacion } from "../../hooks/cultivo/useProgramacion";

const ProgramacionPage: React.FC = () => {
  const [programacion, setProgramacion] = useState<Omit<Programacion, "id">>({
    ubicacion: "",
    hora_prog: "",
    fecha_prog: "",
    estado: false,
  });

  const mutation = useRegistrarProgramacion();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(programacion);
  };

  return (
    <DefaultLayout>
      <Formulario
        title="Registro de Programación"
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        buttonText="Guardar"
      >
        <ReuInput
          label="Ubicación"
          placeholder="Ingrese la ubicación"
          type="text"
          value={programacion.ubicacion}
          onChange={(e) => setProgramacion({ ...programacion, ubicacion: e.target.value })}
        />

        <ReuInput
          label="Hora Programada"
          placeholder="Ingrese la hora programada"
          type="datetime-local"
          value={programacion.hora_prog}
          onChange={(e) => setProgramacion({ ...programacion, hora_prog: e.target.value })}
        />

        <ReuInput
          label="Fecha Programada"
          placeholder="Ingrese la fecha programada"
          type="date"
          value={programacion.fecha_prog}
          onChange={(e) => setProgramacion({ ...programacion, fecha_prog: e.target.value })}
        />

        <div className="col-span-1 md:col-span-2 flex flex-col items-center gap-12">
          <button
            className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
            type="button"
            onClick={() => navigate("/cultivo/listarprogramaciones/")}
          >
            Listar Programaciones
          </button>

        </div>
      </Formulario>
    </DefaultLayout>
  );
};

export default ProgramacionPage;
