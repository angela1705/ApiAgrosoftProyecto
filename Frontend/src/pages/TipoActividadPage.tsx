import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../components/ReuInput";
import { TipoActividad } from "@/types/cultivo/TipoActividad";
import { useRegistrarTipoActividad } from "../hooks/cultivo/usetipoactividad";

const TipoActividadPage: React.FC = () => {
  const [tipoActividad, setTipoActividad] = useState<TipoActividad>({
    nombre: "",
    descripcion: "",
  });

  const mutation = useRegistrarTipoActividad();


  return (
    <DefaultLayout>
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Tipo de Actividad</h2>

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={tipoActividad.nombre}
            onChange={(e) => setTipoActividad({ ...tipoActividad, nombre: e.target.value })}
          />

          <ReuInput
            label="Descripción"
            placeholder="Ingrese la descripción"
            type="text"
            value={tipoActividad.descripcion}
            onChange={(e) => setTipoActividad({ ...tipoActividad, descripcion: e.target.value })}
          />

          <button
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="submit"
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(tipoActividad);
            }}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TipoActividadPage;
