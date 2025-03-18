import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useHerramientas, useActualizarHerramienta, useEliminarHerramienta } from "@/hooks/inventario/useHerramientas";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";

interface Herramienta {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: string;
  activo: boolean;
}

const ListaHerramientaPage: React.FC = () => {
  const [selectedHerramienta, setSelectedHerramienta] = useState<Herramienta | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: herramientas, isLoading, refetch } = useHerramientas();
  const actualizarMutation = useActualizarHerramienta();
  const eliminarMutation = useEliminarHerramienta();
  const navigate = useNavigate();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Estado", uid: "estado" },
    { name: "Activo", uid: "activo" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (herramienta: Herramienta) => {
    setSelectedHerramienta({ ...herramienta }); // Clonamos el objeto para edición
    setIsEditModalOpen(true);
  };

  const handleDelete = (herramienta: Herramienta) => {
    setSelectedHerramienta(herramienta);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedHerramienta && selectedHerramienta.id !== undefined) {
      eliminarMutation.mutate(selectedHerramienta.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          refetch();
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHerramienta && selectedHerramienta.id !== undefined) {
      actualizarMutation.mutate(selectedHerramienta, {
        onSuccess: () => {
          setIsEditModalOpen(false);
          refetch();
        },
      });
    }
  };

  const transformedData = (herramientas ?? []).map((herramienta) => ({
    id: herramienta.id?.toString() || "",
    nombre: herramienta.nombre,
    descripcion: herramienta.descripcion,
    cantidad: herramienta.cantidad,
    estado: herramienta.estado,
    activo: herramienta.activo ? "Sí" : "No",
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(herramienta)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(herramienta)}
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Herramientas</h2>

          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => navigate("/inventario/herramientas/")}
                >
                  Registrar Herramienta
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Herramienta"
      >
        {selectedHerramienta && (
          <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <ReuInput
                label="Nombre"
                placeholder="Ingrese el nombre"
                type="text"
                value={selectedHerramienta.nombre}
                onChange={(e) =>
                  setSelectedHerramienta({
                    ...selectedHerramienta,
                    nombre: e.target.value,
                  })
                }
              />
              <ReuInput
                label="Descripción"
                placeholder="Ingrese la descripción"
                type="text"
                value={selectedHerramienta.descripcion}
                onChange={(e) =>
                  setSelectedHerramienta({
                    ...selectedHerramienta,
                    descripcion: e.target.value,
                  })
                }
              />
              <ReuInput
                label="Cantidad"
                placeholder="Ingrese la cantidad"
                type="number"
                value={selectedHerramienta.cantidad.toString()}
                onChange={(e) =>
                  setSelectedHerramienta({
                    ...selectedHerramienta,
                    cantidad: Number(e.target.value),
                  })
                }
              />
              <ReuInput
                label="Estado"
                placeholder="Ingrese el estado"
                type="text"
                value={selectedHerramienta.estado}
                onChange={(e) =>
                  setSelectedHerramienta({
                    ...selectedHerramienta,
                    estado: e.target.value,
                  })
                }
              />
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="activo"
                  checked={selectedHerramienta.activo}
                  onChange={(e) =>
                    setSelectedHerramienta({
                      ...selectedHerramienta,
                      activo: e.target.checked,
                    })
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

      {/* Modal de Eliminación */}
      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar esta herramienta?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default ListaHerramientaPage;