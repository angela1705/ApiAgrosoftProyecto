import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useBodegas, useActualizarBodega, useEliminarBodega } from "@/hooks/inventario/useBodega";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";
import { EditIcon, Trash2 } from 'lucide-react';
import { Switch } from "@heroui/react";

interface Bodega {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  telefono: string;
  activo: boolean;
}

const ListaBodegaPage: React.FC = () => {
  const [selectedBodega, setSelectedBodega] = useState<Bodega | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: bodegas, isLoading, refetch } = useBodegas();
  const actualizarMutation = useActualizarBodega();
  const eliminarMutation = useEliminarBodega();
  const navigate = useNavigate();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Ubicación", uid: "ubicacion" },
    { name: "Capacidad", uid: "capacidad" },
    { name: "Teléfono", uid: "telefono" },
    { name: "Activo", uid: "activo" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (bodega: Bodega) => {
    setSelectedBodega({ ...bodega });
    setIsEditModalOpen(true);
  };

  const handleDelete = (bodega: Bodega) => {
    setSelectedBodega(bodega);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBodega && selectedBodega.id !== undefined) {
      eliminarMutation.mutate(selectedBodega.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedBodega(null);
          refetch();
        },
      });
    }
  };

  const transformedData = (bodegas ?? []).map((bodega) => ({
    id: bodega.id?.toString() || "",
    nombre: bodega.nombre,
    ubicacion: bodega.ubicacion,
    capacidad: bodega.capacidad,
    telefono: bodega.telefono,
    activo: bodega.activo ? "Sí" : "No",
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(bodega)}
        >
          <EditIcon size={22} color="black" />
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(bodega)}
        >
          <Trash2 size={22} color="red" />
        </button>
      </>
    ),
  }));

  return (
    <DefaultLayout>
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Lista de Bodegas Registradas</h2><br /><br />
      <div className="mb-2 flex justify-start">
        <button
          className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg 
                     hover:bg-green-700 transition-all duration-300 ease-in-out 
                     shadow-md hover:shadow-lg transform hover:scale-105"
          onClick={() => navigate("/inventario/bodega/")}
        >
          + Registrar
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <Tabla columns={columns} data={transformedData} />
      )}

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Bodega"
        onConfirm={() => {
          if (selectedBodega && selectedBodega.id !== undefined) {
            const { id, ...bodegaWithoutId } = selectedBodega;
            actualizarMutation.mutate({ id, bodega: bodegaWithoutId }, {
              onSuccess: () => {
                setIsEditModalOpen(false);
                refetch();
              },
            });
          }
        }}
      >
        {selectedBodega && (
          <>
            <ReuInput
              label="Nombre"
              placeholder="Ingrese el nombre"
              type="text"
              value={selectedBodega.nombre}
              onChange={(e) =>
                setSelectedBodega({ ...selectedBodega, nombre: e.target.value })
              }
            />
            <ReuInput
              label="Ubicación"
              placeholder="Ingrese la ubicación"
              type="text"
              value={selectedBodega.ubicacion}
              onChange={(e) =>
                setSelectedBodega({ ...selectedBodega, ubicacion: e.target.value })
              }
            />
            <ReuInput
              label="Capacidad"
              placeholder="Ingrese la capacidad"
              type="number"
              value={selectedBodega.capacidad.toString()}
              onChange={(e) =>
                setSelectedBodega({
                  ...selectedBodega,
                  capacidad: Number(e.target.value),
                })
              }
            />
            <ReuInput
              label="Teléfono"
              placeholder="Ingrese el teléfono"
              type="text"
              value={selectedBodega.telefono}
              onChange={(e) =>
                setSelectedBodega({ ...selectedBodega, telefono: e.target.value })
              }
            />
            <div className="mb-4 flex items-center">
            <Switch
                color="success"
                size="sm"
                isSelected={selectedBodega.activo}
                onChange={(e) => setSelectedBodega({ ...selectedBodega, activo: e.target.checked })}
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Activo</label>
            </div>
          </>
        )}
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar esta bodega?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default ListaBodegaPage;