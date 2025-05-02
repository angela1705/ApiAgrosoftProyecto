import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import Formulario from "@/components/globales/Formulario";
import { useRegistrarLote } from "@/hooks/cultivo/uselotes";
import { Lote } from "@/types/cultivo/Lotes";

const LotesPage: React.FC = () => {
  const [lote, setLote] = useState<Omit<Lote, "id">>({
    nombre: "",
    descripcion: "",
    activo: false,
    tam_x: 0,
    tam_y: 0,
    pos_x: 0,
    pos_y: 0,
  });

  const mutation = useRegistrarLote();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(lote);
  };

  return (
    <DefaultLayout>
      <Formulario
        title="Registrar Lote"
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        buttonText="Guardar"
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={lote.nombre}
          onChange={(e) => setLote({ ...lote, nombre: e.target.value })}
        />
        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={lote.descripcion}
          onChange={(e) => setLote({ ...lote, descripcion: e.target.value })}
        />
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={lote.activo}
            onChange={(e) => setLote({ ...lote, activo: e.target.checked })}
          />
          <span>Activo</span>
        </label>

        <ReuInput
          label="Tamaño X"
          type="number"
          value={lote.tam_x}
          onChange={(e) => setLote({ ...lote, tam_x: Number(e.target.value) })}
        />
        <ReuInput
          label="Tamaño Y"
          type="number"
          value={lote.tam_y}
          onChange={(e) => setLote({ ...lote, tam_y: Number(e.target.value) })}
        />

        <div className="col-span-1 md:col-span-2 flex flex-col items-center gap-12">
          <button
            className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
            type="button"
            onClick={() => navigate("/cultivo/listarlotes/")}
          >
            Listar Lotes
          </button>
        </div>
      </Formulario>
    </DefaultLayout>
  );
};

export default LotesPage;
