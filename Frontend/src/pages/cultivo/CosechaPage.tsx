import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarCosecha } from "@/hooks/cultivo/usecosecha";
import { Cosecha } from "@/types/cultivo/Cosecha";

const CosechaPage: React.FC = () => {
  const [cosecha, setCosecha] = useState<Cosecha>({
    id_cultivo: 0,
    cantidad: 0,
    unidades_de_medida: "",
    fecha: "",
  });

  const mutation = useRegistrarCosecha();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(cosecha, {
      onSuccess: () => {
        navigate("/cultivo/listarcosechas/");
      },
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Registrar Cosecha</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <ReuInput
              label="ID del Cultivo"
              placeholder="Ingrese el ID del cultivo"
              type="number"
              value={cosecha.id_cultivo.toString()}
              onChange={(e) =>
                setCosecha({ ...cosecha, id_cultivo: parseInt(e.target.value, 10) })
              }
            />

            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              value={cosecha.cantidad.toString()}
              onChange={(e) =>
                setCosecha({ ...cosecha, cantidad: parseInt(e.target.value, 10) })
              }
            />

            <ReuInput
              label="Unidades de Medida"
              placeholder="Ej: kg, g, unidades"
              type="text"
              value={cosecha.unidades_de_medida}
              onChange={(e) =>
                setCosecha({ ...cosecha, unidades_de_medida: e.target.value })
              }
            />

            <ReuInput
              label="Fecha"
              placeholder="Ingrese la fecha (YYYY-MM-DD)"
              type="date"
              value={cosecha.fecha}
              onChange={(e) => setCosecha({ ...cosecha, fecha: e.target.value })}
            />

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Guardar
            </button>
          </form>
          
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CosechaPage;