import ReuModal from "../globales/ReuModal";
import { ReuInput } from "../globales/ReuInput";
import { useRegistrarBancal } from "@/hooks/cultivo/usebancal";
import { useLotes } from "@/hooks/cultivo/uselotes";
import { Bancal } from "@/types/cultivo/Bancal";
import { useState } from "react";

interface ModalBancalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ModalBancal = ({ isOpen, onOpenChange, onSuccess }: ModalBancalProps) => {
  const [nuevoBancal, setNuevoBancal] = useState<Bancal>({
    nombre: "",
    TamX: 0,
    TamY: 0,
    posX: 0,
    posY: 0,
    lote: 0,
  });

  const { data: lotes } = useLotes();
  const mutation = useRegistrarBancal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoBancal(prev => ({
      ...prev,
      [name]: name === "nombre" ? value : Number(value)
    }));
  };

  const handleSubmit = () => {
    mutation.mutate(nuevoBancal, {
      onSuccess: () => {
        onOpenChange(false);
        setNuevoBancal({
          nombre: "",
          TamX: 0,
          TamY: 0,
          posX: 0,
          posY: 0,
          lote: 0,
        });
        onSuccess?.();
      }
    });
  };

  return (
    <ReuModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Registrar Nuevo Bancal"
      onConfirm={handleSubmit}
      confirmText="Guardar"
      cancelText="Cancelar"
    >
      <div className="space-y-4">
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={nuevoBancal.nombre}
          onChange={(e) => setNuevoBancal({...nuevoBancal, nombre: e.target.value})}
        />

        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Tamaño X"
            placeholder="Ingrese tamaño X"
            type="number"
            value={nuevoBancal.TamX.toString()}
            onChange={(e) => setNuevoBancal({...nuevoBancal, TamX: parseFloat(e.target.value)})}
          />

          <ReuInput
            label="Tamaño Y"
            placeholder="Ingrese tamaño Y"
            type="number"
            value={nuevoBancal.TamY.toString()}
            onChange={(e) => setNuevoBancal({...nuevoBancal, TamY: parseFloat(e.target.value)})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Posición X"
            placeholder="Ingrese posición X"
            type="number"
            value={nuevoBancal.posX.toString()}
            onChange={(e) => setNuevoBancal({...nuevoBancal, posX: parseFloat(e.target.value)})}
          />

          <ReuInput
            label="Posición Y"
            placeholder="Ingrese posición Y"
            type="number"
            value={nuevoBancal.posY.toString()}
            onChange={(e) => setNuevoBancal({...nuevoBancal, posY: parseFloat(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lote</label>
          <select
            name="lote"
            value={nuevoBancal.lote || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          >
            <option value="0">Seleccione un lote</option>
            {lotes?.map((lote) => (
              <option key={lote.id} value={lote.id}>{lote.nombre}</option>
            ))}
          </select>
        </div>
      </div>
    </ReuModal>
  );
};