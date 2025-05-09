import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useVenta } from "@/hooks/finanzas/useVenta";
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import { Venta } from "@/types/finanzas/Venta";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";
import { Trash2, EditIcon } from 'lucide-react';

const ListaVentaPage: React.FC = () => {
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { ventas, isLoading, actualizarVenta, eliminarVenta, isActualizando, isEliminando } = useVenta();
  const { data: cultivos, isLoading: cultivosLoading } = useCultivos();
  const navigate = useNavigate();

  const columns = [
    { name: "Producto", uid: "producto" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Total", uid: "total" },
    { name: "Fecha", uid: "fecha" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (venta: Venta) => {
    console.log("Editando venta:", venta);
    setSelectedVenta(venta);
    setIsEditModalOpen(true);
  };

  const handleDelete = (venta: Venta) => {
    setSelectedVenta(venta);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedVenta && selectedVenta.id !== undefined) {
      eliminarVenta(selectedVenta.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  const transformedData = (ventas ?? []).map((venta) => ({
    id: venta.id?.toString() || "",
    producto: cultivos?.find((c) => c.id === venta.producto)?.nombre || "Desconocido",
    cantidad: venta.cantidad,
    precio: venta.precio,
    total: venta.total,
    fecha: venta.fecha,
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(venta)}
        >
          <EditIcon size={20} color='black'/>
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(venta)}
        >
          <Trash2 size={20}  color='red'/>
        </button>
      </>
    ),
  }));

  return (
    <DefaultLayout>
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Lista de Ventas</h2>
          <div className="mb-6 flex justify-between items-center">
              <button
                className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg 
                                          hover:bg-green-700 transition-all duration-300 ease-in-out 
                                          shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={() => navigate('/finanzas/ventas/')}
              >
                + Registrar
              </button>
            </div>
          {isLoading || cultivosLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
            </>
          )}

        <ReuModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          title="Editar Venta"
          onConfirm={() => {
            if (selectedVenta && selectedVenta.id !== undefined) {
              actualizarVenta(
                { ...selectedVenta, total: selectedVenta.cantidad * selectedVenta.precio },
                {
                  onSuccess: () => {
                    setIsEditModalOpen(false);
                  },
                }
              );
            }
          }}
        >
          {selectedVenta && (
            <>
              <label className="block text-sm font-medium text-gray-700 mt-4">Producto</label>
              <select
                name="producto"
                value={selectedVenta.producto}
                onChange={(e) =>
                  setSelectedVenta((prev) => ({
                    ...prev!,
                    producto: Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={cultivosLoading}
              >
                <option value="0">Seleccione un producto</option>
                {cultivos?.map((cultivo) => (
                  <option key={cultivo.id} value={cultivo.id}>
                    {cultivo.nombre}
                  </option>
                ))}
              </select>
              <ReuInput
  label="Cantidad"
  placeholder="Ingrese la cantidad"
  type="number"
  value={(selectedVenta.cantidad ?? "").toString()}
  onChange={(e) =>
    setSelectedVenta((prev) => ({
      ...prev!,
      cantidad: Number(e.target.value),
    }))
  }
/>

<ReuInput
  label="Precio Unitario"
  placeholder="Ingrese el precio unitario"
  type="number"
  value={(selectedVenta.precio ?? "").toString()}
  onChange={(e) =>
    setSelectedVenta((prev) => ({
      ...prev!,
      precio: Number(e.target.value),
    }))
  }
/>

<ReuInput
  label="Fecha"
  placeholder="Seleccione la fecha"
  type="date"
  value={selectedVenta.fecha ?? ""}
  onChange={(e) =>
    setSelectedVenta((prev) => ({
      ...prev!,
      fecha: e.target.value,
    }))
  }
/>

              {isActualizando && <p className="text-gray-600 mt-2">Actualizando...</p>}
            </>
          )}
        </ReuModal>

        <ReuModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="¿Estás seguro de eliminar este registro?"
          onConfirm={handleConfirmDelete}
        >
          <p>Esta acción es irreversible.</p>
          {isEliminando && <p className="text-gray-600 mt-2">Eliminando...</p>}
        </ReuModal>
    </DefaultLayout>
  );
};

export default ListaVentaPage;