import ReuModal from "../globales/ReuModal";
import { ReuInput } from "../globales/ReuInput";
import { useRegistrarLote } from "@/hooks/cultivo/uselotes";
import { Lote } from "@/types/cultivo/Lotes";
import { useState } from "react";



interface ModalLoteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ModalLote = ({ isOpen, onOpenChange, onSuccess }: ModalLoteProps) => {
  const [nuevoLote, setNuevoLote] = useState<Lote>({
    nombre: "",
    descripcion: "",
    activo: false,
    tam_x: 0,
    tam_y: 0,
    pos_x: 0,
    pos_y: 0,
  });

  const mutation = useRegistrarLote();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setNuevoLote(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = () => {
    mutation.mutate(nuevoLote, {
      onSuccess: () => {
        onOpenChange(false);
        setNuevoLote({
          nombre: "",
          descripcion: "",
          activo: false,
          tam_x: 0,
          tam_y: 0,
          pos_x: 0,
          pos_y: 0,
        });
        onSuccess?.();
      }
    });
  };

  return (
    <ReuModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Registrar Nuevo Lote"
      onConfirm={handleSubmit}
      confirmText="Guardar"
      cancelText="Cancelar"
    >
      <div className="space-y-4">
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={nuevoLote.nombre}
          onChange={(e) => setNuevoLote({... nuevoLote, nombre: e.target.value})}
        />

        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={nuevoLote.descripcion}
          onChange={(e) => setNuevoLote({... nuevoLote, descripcion: e.target.value})}
        />

        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            name="activo"
            className="w-5 h-5 text-red-600 border-gray-300 rounded"
            checked={nuevoLote.activo}
            onChange={handleChange}
          />
          <span>Activo</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Tamaño X"
            placeholder="Ingrese tamaño X"
            type="number"
            value={nuevoLote.tam_x.toString()}
            onChange={(e) => setNuevoLote({... nuevoLote, tam_x: parseFloat(e.target.value)})}
            />

          <ReuInput
            label="Tamaño Y"
            placeholder="Ingrese tamaño Y"
            type="number"
            value={nuevoLote.tam_y.toString()}
            onChange={(e) => setNuevoLote({... nuevoLote, tam_y: parseFloat (e.target.value)})}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Posición X"
            placeholder="Ingrese posición X"
            type="number"
            value={nuevoLote.pos_x.toString()}
            onChange={(e) => setNuevoLote({... nuevoLote, pos_x: parseFloat(e.target.value)})}
            />

          <ReuInput
            label="Posición Y"
            placeholder="Ingrese posición Y"
            type="number"
            value={nuevoLote.pos_y.toString()}
            onChange={(e) => setNuevoLote({... nuevoLote, pos_y: parseFloat(e.target.value)})}
            />
        </div>
      </div>
    </ReuModal>
  );
};