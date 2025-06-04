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
    latitud: 0,
    longitud: 0,
  });
    const [latitudStr, setLatitudStr] = useState("0");
    const [longitudStr, setLongitudStr] = useState("0");

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
     const latitud = parseFloat(latitudStr);
      const longitud = parseFloat(longitudStr);
    
      const loteFinal: Lote = {
        ...nuevoLote,
        latitud: isNaN(latitud) ? 0 : latitud,
        longitud: isNaN(longitud) ? 0 : longitud,
      };
    mutation.mutate(loteFinal, {
      onSuccess: () => {
        onOpenChange(false);
        setNuevoLote({
          nombre: "",
          descripcion: "",
          activo: false,
          tam_x: 0,
          tam_y: 0,
          latitud: 0,
          longitud: 0,
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
            label="Latitud"
            placeholder="Ingrese la latitud"
            type="text"
            value={latitudStr}
            onChange={(e) => setLatitudStr(e.target.value)}
          />

        <ReuInput
          label="Longitud"
          placeholder="Ingrese la longitud"
          type="text"
          value={longitudStr}
          onChange={(e) => setLongitudStr(e.target.value)}
          />
        </div>
      </div>
    </ReuModal>
  );
};