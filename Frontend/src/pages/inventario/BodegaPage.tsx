import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useRegistrarBodega } from "@/hooks/inventario/useBodega";
import { ReuInput } from "@/components/globales/ReuInput";

interface Bodega {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  direccion: string;
  telefono: string;
  activo: boolean;
}

const BodegaPage: React.FC = () => {
  const [bodega, setBodega] = useState<Bodega>({
    id: 0,
    nombre: "",
    ubicacion: "",
    capacidad: 0,
    direccion: "",
    telefono: "",
    activo: true,
  });

  const mutation = useRegistrarBodega();
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega</h2>

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={bodega.nombre}
            onChange={(e) => setBodega({ ...bodega, nombre: e.target.value })}
          />
          <ReuInput
            label="Ubicación"
            placeholder="Ingrese la ubicación"
            type="text"
            value={bodega.ubicacion}
            onChange={(e) => setBodega({ ...bodega, ubicacion: e.target.value })}
          />
          <ReuInput
            label="Capacidad"
            placeholder="Ingrese la capacidad"
            type="number"
            value={String(bodega.capacidad)}
            onChange={(e) => setBodega({ ...bodega, capacidad: Number(e.target.value) })}
          />
          <ReuInput
            label="Dirección"
            placeholder="Ingrese la dirección"
            type="text"
            value={bodega.direccion}
            onChange={(e) => setBodega({ ...bodega, direccion: e.target.value })}
          />
          <ReuInput
            label="Teléfono"
            placeholder="Ingrese el teléfono"
            type="text"
            value={bodega.telefono}
            onChange={(e) => setBodega({ ...bodega, telefono: e.target.value })}
          />
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={bodega.activo}
              onChange={(e) => setBodega({ ...bodega, activo: e.target.checked })}
              className="mr-2 leading-tight"
            />
            <label className="text-gray-700 text-sm font-bold">Activo</label>
          </div>

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700"
            type="submit"
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(bodega, {
                onSuccess: () => {
                  setBodega({
                    id: 0,
                    nombre: "",
                    ubicacion: "",
                    capacidad: 0,
                    direccion: "",
                    telefono: "",
                    activo: true,
                  });
                },
              });
            }}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700"
            onClick={() => navigate("/inventario/listarbodega/")}
          >
            Listar Bodegas
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BodegaPage;