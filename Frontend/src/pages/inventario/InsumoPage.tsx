import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useRegistrarInsumo } from "@/hooks/inventario/useInsumo";
import { ReuInput } from "@/components/globales/ReuInput";

interface Insumo {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad_medida: string;
  activo: boolean;
}

const InsumoPage: React.FC = () => {
  const [insumo, setInsumo] = useState<Insumo>({
    id: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
    unidad_medida: "",
    activo: true,
  });

  const mutation = useRegistrarInsumo();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(insumo, {
      onSuccess: () => {
        setInsumo({
          id: 0,
          nombre: "",
          descripcion: "",
          cantidad: 0,
          unidad_medida: "",
          activo: true,
        });
      },
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Insumo</h2>
          <form onSubmit={handleSubmit}>
            <ReuInput
              label="Nombre"
              placeholder="Ingrese el nombre"
              type="text"
              value={insumo.nombre}
              onChange={(e) => setInsumo({ ...insumo, nombre: e.target.value })}
            />
            <ReuInput
              label="Descripción"
              placeholder="Ingrese la descripción"
              type="text"
              value={insumo.descripcion}
              onChange={(e) => setInsumo({ ...insumo, descripcion: e.target.value })}
            />
            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              value={insumo.cantidad.toString()}
              onChange={(e) =>
                setInsumo({ ...insumo, cantidad: Number(e.target.value) })
              }
            />
            <ReuInput
              label="Unidad de Medida"
              placeholder="Ingrese la unidad de medida"
              type="text"
              value={insumo.unidad_medida}
              onChange={(e) => setInsumo({ ...insumo, unidad_medida: e.target.value })}
            />
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={insumo.activo}
                onChange={(e) => setInsumo({ ...insumo, activo: e.target.checked })}
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700 text-sm font-bold">Activo</label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Registrando..." : "Guardar"}
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700"
              onClick={() => navigate("/inventario/listarinsumos/")}
            >
              Listar Insumos
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default InsumoPage;