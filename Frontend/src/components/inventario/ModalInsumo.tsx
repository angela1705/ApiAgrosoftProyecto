import React, { useState } from "react";
import ReuModal from "../globales/ReuModal";
import { ReuInput } from "../globales/ReuInput";
import { useRegistrarInsumo, useUnidadesMedida, useTiposInsumo } from "@/hooks/inventario/useInsumo";
import { Insumo } from "@/types/inventario/Insumo";

interface ModalInsumoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ModalInsumo = ({ isOpen, onOpenChange, onSuccess }: ModalInsumoProps) => {
  const { data: unidadesMedida, isLoading: isLoadingUnidades } = useUnidadesMedida();
  const { data: tiposInsumo, isLoading: isLoadingTipos } = useTiposInsumo();
  const mutation = useRegistrarInsumo();

  const [insumo, setInsumo] = useState<Omit<Insumo, "id" | "unidad_medida" | "tipo_insumo"> & { unidad_medida_id?: number; tipo_insumo_id?: number }>({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    activo: true,
    tipo_empacado: null,
    fecha_registro: new Date().toISOString().slice(0, 16),
    fecha_caducidad: null,
    precio_insumo: 0,
    unidad_medida_id: undefined,
    tipo_insumo_id: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Verificar si el elemento es un checkbox
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const input = e.target as HTMLInputElement;
      setInsumo(prev => ({
        ...prev,
        [name]: input.checked
      }));
    } else {
      // Manejar otros tipos de inputs
      setInsumo(prev => ({
        ...prev,
        [name]: name === 'cantidad' || name === 'precio_insumo' ? (value ? Number(value) : 0) :
                name === 'unidad_medida_id' || name === 'tipo_insumo_id' ? (value ? Number(value) : undefined) :
                value
      }));
    }
  };

  const handleSubmit = () => {
    mutation.mutate(insumo, {
      onSuccess: () => {
        onOpenChange(false);
        setInsumo({
          nombre: "",
          descripcion: "",
          cantidad: 0,
          activo: true,
          tipo_empacado: null,
          fecha_registro: new Date().toISOString().slice(0, 16),
          fecha_caducidad: null,
          precio_insumo: 0,
          unidad_medida_id: undefined,
          tipo_insumo_id: undefined,
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
      title="Registrar Nuevo Insumo"
      onConfirm={handleSubmit}
      confirmText="Guardar"
      cancelText="Cancelar"
    >
      <div className="space-y-4">
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={insumo.nombre}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, nombre: e.target.value })}
        />
        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={insumo.descripcion}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, descripcion: e.target.value })}
        />
        <ReuInput
          label="Cantidad"
          placeholder="Ingrese la cantidad"
          type="number"
          value={insumo.cantidad.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, cantidad: Number(e.target.value) || 0 })}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
          <select
            name="unidad_medida_id"
            value={insumo.unidad_medida_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border disabled:opacity-50"
            disabled={isLoadingUnidades}
          >
            <option value="">Seleccione una unidad</option>
            {unidadesMedida?.map((unidad) => (
              <option key={unidad.id} value={unidad.id}>
                {unidad.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Insumo</label>
          <select
            name="tipo_insumo_id"
            value={insumo.tipo_insumo_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border disabled:opacity-50"
            disabled={isLoadingTipos}
          >
            <option value="">Seleccione un tipo</option>
            {tiposInsumo?.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <ReuInput
          label="Tipo de Empacado"
          placeholder="Ingrese el tipo de empacado"
          type="text"
          value={insumo.tipo_empacado || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, tipo_empacado: e.target.value || null })}
        />
        <ReuInput
          label="Fecha de Registro"
          type="datetime-local"
          value={insumo.fecha_registro}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, fecha_registro: e.target.value })}
        />
        <ReuInput
          label="Fecha de Caducidad"
          type="date"
          value={insumo.fecha_caducidad || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, fecha_caducidad: e.target.value || null })}
        />
        <ReuInput
          label="Precio (COP)"
          placeholder="Ingrese el precio"
          type="text"
          value={insumo.precio_insumo.toLocaleString("es-CO")}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setInsumo({ ...insumo, precio_insumo: formatPrice(e.target.value) })}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="activo"
            checked={insumo.activo}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Activo</span>
        </label>
      </div>
    </ReuModal>
  );
};