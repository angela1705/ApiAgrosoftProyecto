import ReuModal from "../globales/ReuModal";
import { ReuInput } from "../globales/ReuInput";
import { useRegistrarHerramienta } from "@/hooks/inventario/useHerramientas";
import { useState } from "react";
import { Herramienta } from "@/types/inventario/Herramientas";
import { Switch } from "@heroui/react";

interface ModalHerramientaProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ModalHerramienta = ({ isOpen, onOpenChange, onSuccess }: ModalHerramientaProps) => {
  const [herramienta, setHerramienta] = useState<Herramienta>({
    id: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
    estado: "Disponible",
    fecha_registro: new Date().toISOString().slice(0, 16),
    activo: true,
    precio: 0,
    cantidad_disponible: 0,
  });

  const mutation = useRegistrarHerramienta();


  const handleSubmit = () => {
    mutation.mutate({
      ...herramienta,
    }, {
      onSuccess: () => {
        onOpenChange(false);
        setHerramienta({
          id: 0,  
          nombre: "",
          descripcion: "",
          cantidad: 0,
          estado: "Disponible",
          fecha_registro: new Date().toISOString().slice(0, 16),
          activo: true,
          precio: 0,
          cantidad_disponible: 0,
        });
        onSuccess?.();
      }
    });
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue ? Number(numericValue) : 0;
  };

  return (
    <ReuModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Registrar Nueva Herramienta"
      onConfirm={handleSubmit}
      confirmText="Guardar"
      cancelText="Cancelar"
    >
      <div className="space-y-4">
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={herramienta.nombre}
          onChange={(e)=> setHerramienta({...herramienta, nombre: e.target.value})}
        />

        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={herramienta.descripcion}
          onChange={(e)=> setHerramienta({...herramienta, descripcion: e.target.value})}
        />

        <ReuInput
          label="Cantidad"
          placeholder="Ingrese la cantidad"
          type="number"
          value={herramienta.cantidad.toString()}
          onChange={(e)=> setHerramienta({...herramienta, cantidad: parseInt(e.target.value)})}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={herramienta.estado}
            onChange={(e) => setHerramienta({...herramienta, estado: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
          >
            <option value="Disponible">Disponible</option>
            <option value="En uso">En uso</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Dañada">Dañada</option>
          </select>
        </div>
        <ReuInput
          label="Precio (COP)"
          placeholder="Ingrese el precio"
          type="text"
          value={herramienta.precio.toLocaleString("es-CO")}
          onChange={(e) =>
            setHerramienta({
              ...herramienta,
              precio: formatPrice(e.target.value),
            })
          }
        />

        <ReuInput
          label="Fecha de Registro"
          type="datetime-local"
          value={herramienta.fecha_registro}
          onChange={(e)=> setHerramienta({...herramienta, fecha_registro: e.target.value})}
        />

        <div className="flex items-center">
            <Switch
                color="success"
                size="sm"
                isSelected={herramienta.activo}
                onChange={(e) => setHerramienta({ ...herramienta, activo: e.target.checked })}
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Activo</label>
        </div>
      </div>
    </ReuModal>
  );
};