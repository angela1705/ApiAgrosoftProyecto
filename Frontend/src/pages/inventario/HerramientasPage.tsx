import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useRegistrarHerramienta } from "@/hooks/inventario/useHerramientas";
import { ReuInput } from "@/components/globales/ReuInput";

interface Herramienta {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: string;
  activo: boolean;
}

const HerramientaPage: React.FC = () => {
  const [herramienta, setHerramienta] = useState<Herramienta>({
    id: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
    estado: "Disponible",
    activo: true,
  });

  const mutation = useRegistrarHerramienta();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(herramienta, {
      onSuccess: () => {
        setHerramienta({
          id: 0,
          nombre: "",
          descripcion: "",
          cantidad: 0,
          estado: "Disponible",
          activo: true,
        });
      },
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Herramienta</h2>
          <form onSubmit={handleSubmit}>
            <ReuInput
              label="Nombre"
              placeholder="Ingrese el nombre"
              type="text"
              value={herramienta.nombre}
              onChange={(e) =>
                setHerramienta({ ...herramienta, nombre: e.target.value })
              }
            />
            <ReuInput
              label="Descripción"
              placeholder="Ingrese la descripción"
              type="text"
              value={herramienta.descripcion}
              onChange={(e) =>
                setHerramienta({ ...herramienta, descripcion: e.target.value })
              }
            />
            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              value={herramienta.cantidad.toString()}
              onChange={(e) =>
                setHerramienta({
                  ...herramienta,
                  cantidad: Number(e.target.value),
                })
              }
            />
            <ReuInput
              label="Estado"
              placeholder="Ingrese el estado"
              type="text"
              value={herramienta.estado}
              onChange={(e) =>
                setHerramienta({ ...herramienta, estado: e.target.value })
              }
            />
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={herramienta.activo}
                onChange={(e) =>
                  setHerramienta({ ...herramienta, activo: e.target.checked })
                }
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
              onClick={() => navigate("/inventario/listarherramientas/")}
            >
              Listar Herramientas
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HerramientaPage;