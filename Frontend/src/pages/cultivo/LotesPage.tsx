import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../../components/globales/ReuInput";
import { useRegistrarLote } from "../../hooks/cultivo/uselotes";
import { Lote } from "../../types/cultivo/Lotes";
import Formulario from "../../components/globales/Formulario";
import { useNavigate } from "react-router-dom";
const LotesPage: React.FC = () => {
  const [lote, setLote] = useState<Lote>({
    nombre: "",
    descripcion: "",
    activo: false,
    tam_x: 0,
    tam_y: 0,
    pos_x: 0,
    pos_y: 0,
  });

 

  const mutation = useRegistrarLote();
  const navigate = useNavigate()

  const handleSubmit=(e: React.FormEvent)=>{
    e.preventDefault()

    mutation.mutate(lote)
  }

  return (
    <DefaultLayout>
    <Formulario title="Registro de Lote" onSubmit={handleSubmit}>
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

      <div className="grid grid-cols-2 gap-4">
        <ReuInput
          label="Tamaño X"
          placeholder="Ingrese tamaño X"
          type="number"
          value={lote.tam_x.toString()}
          onChange={(e) => setLote({ ...lote, tam_x: parseFloat(e.target.value) })}
        />

        <ReuInput
          label="Tamaño Y"
          placeholder="Ingrese tamaño Y"
          type="number"
          value={lote.tam_y.toString()}
          onChange={(e) => setLote({ ...lote, tam_y: parseFloat(e.target.value) })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ReuInput
          label="Posición X"
          placeholder="Ingrese posición X"
          type="number"
          value={lote.pos_x.toString()}
          onChange={(e) => setLote({ ...lote, pos_x: parseFloat(e.target.value) })}
        />

        <ReuInput
          label="Posición Y"
          placeholder="Ingrese posición Y"
          type="number"
          value={lote.pos_y.toString()}
          onChange={(e) => setLote({ ...lote, pos_y: parseFloat(e.target.value) })}
        />
      </div>

      <label className="flex items-center space-x-2 text-gray-700">
        <input
          type="checkbox"
          className="w-5 h-5 text-red-600 border-gray-300 rounded"
          checked={lote.activo}
          onChange={(e) => setLote({ ...lote, activo: e.target.checked })}
        />
        <span>Activo</span>
      </label>

      <div className="col-span-1 md:col-span-2 flex justify-center">
        <button
          className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
          type="button"
          onClick={() => navigate("/cultivo/listarlotes/")}
        >
          Listar lotes 
        </button>
      </div>
    </Formulario>
</DefaultLayout>
  );
};

export default LotesPage;