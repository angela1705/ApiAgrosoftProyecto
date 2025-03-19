import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useInsumos, useActualizarInsumo, useEliminarInsumo } from "@/hooks/inventario/useInsumo";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";

interface Insumo {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad_medida: string;
  activo: boolean;
}

const ListaInsumoPage: React.FC = () => {
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: insumos, isLoading, refetch } = useInsumos();
  const actualizarMutation = useActualizarInsumo();
  const eliminarMutation = useEliminarInsumo();
  const navigate = useNavigate();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Unidad de Medida", uid: "unidad_medida" },
    { name: "Activo", uid: "activo" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (insumo: Insumo) => {
    setSelectedInsumo({ ...insumo });
    setIsEditModalOpen(true);
  };

  const handleDelete = (insumo: Insumo) => {
    setSelectedInsumo(insumo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedInsumo && selectedInsumo.id !== undefined) {
      eliminarMutation.mutate(selectedInsumo.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedInsumo(null);
          refetch();
        },
      });
    }
  };

  const transformedData = (insumos ?? []).map((insumo) => ({
    id: insumo.id?.toString() || "",
    nombre: insumo.nombre,
    descripcion: insumo.descripcion,
    cantidad: insumo.cantidad,
    unidad_medida: insumo.unidad_medida,
    activo: insumo.activo ? "Sí" : "No",
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(insumo)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(insumo)}
        >
          Eliminar
        </button>
      </>
    ),
  }));

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Insumos</h2>

          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => navigate("/inventario/insumos/")}
                >
                  Registrar Insumo
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Insumo"
      >
        {selectedInsumo && (
          <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedInsumo && selectedInsumo.id !== undefined) {
                  actualizarMutation.mutate(selectedInsumo, {
                    onSuccess: () => {
                      setIsEditModalOpen(false);
                      refetch();
                    },
                  });
                }
              }}
            >
              <ReuInput
                label="Nombre"
                placeholder="Ingrese el nombre"
                type="text"
                value={selectedInsumo.nombre}
                onChange={(e) =>
                  setSelectedInsumo({ ...selectedInsumo, nombre: e.target.value })
                }
              />
              <ReuInput
                label="Descripción"
                placeholder="Ingrese la descripción"
                type="text"
                value={selectedInsumo.descripcion}
                onChange={(e) =>
                  setSelectedInsumo({ ...selectedInsumo, descripcion: e.target.value })
                }
              />
              <ReuInput
                label="Cantidad"
                placeholder="Ingrese la cantidad"
                type="number"
                value={selectedInsumo.cantidad.toString()}
                onChange={(e) =>
                  setSelectedInsumo({
                    ...selectedInsumo,
                    cantidad: Number(e.target.value),
                  })
                }
              />
              <ReuInput
                label="Unidad de Medida"
                placeholder="Ingrese la unidad de medida"
                type="text"
                value={selectedInsumo.unidad_medida}
                onChange={(e) =>
                  setSelectedInsumo({ ...selectedInsumo, unidad_medida: e.target.value })
                }
              />
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedInsumo.activo}
                  onChange={(e) =>
                    setSelectedInsumo({ ...selectedInsumo, activo: e.target.checked })
                  }
                  className="mr-2 leading-tight"
                />
                <label className="text-gray-700 text-sm font-bold">Activo</label>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white w-full px-4 py-2 rounded-lg"
                disabled={actualizarMutation.isPending}
              >
                {actualizarMutation.isPending ? "Actualizando..." : "Actualizar"}
              </button>
            </form>
          </div>
        )}
      </ReuModal>

      
      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar este insumo?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default ListaInsumoPage;