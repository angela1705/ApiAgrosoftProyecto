import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../../components/globales/ReuInput";
import { useRegistrarTipoControl } from "../../hooks/cultivo/usetipocontrol";
import { TipoControl } from "@/types/cultivo/TipoControl";
import Formulario from "@/components/globales/Formulario";

const TipoControlPage: React.FC = () => {
  const [tipoControl, setTipoControl] = useState<TipoControl>({
    nombre: "",
    descripcion: "",
  });

  const navigate = useNavigate();
  const mutation = useRegistrarTipoControl();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(tipoControl);
  };

  return (
    <DefaultLayout>
      <Formulario
        title="Registro de Tipo de Control"
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        buttonText="Guardar"
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={tipoControl.nombre}
          onChange={(e) =>
            setTipoControl({ ...tipoControl, nombre: e.target.value })
          }
        />

        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={tipoControl.descripcion}
          onChange={(e) =>
            setTipoControl({ ...tipoControl, descripcion: e.target.value })
          }
        />

        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
            type="button"
            onClick={() => navigate("/cultivo/listartipocontrol/")}
          >
            Listar Tipos de Control
          </button>
        </div>
      </Formulario>
    </DefaultLayout>
  );
};

export default TipoControlPage;
