import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useCosechas, useEliminarCosecha } from "@/hooks/cultivo/usecosecha";
import Tabla from "@/components/globales/Tabla";
import ReuModal from "@/components/globales/ReuModal";

const ListaCosechasPage: React.FC = () => {
  const { data: cosechas, isLoading, refetch } = useCosechas();
  const [selectedCosechaId, setSelectedCosechaId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const eliminarMutation = useEliminarCosecha();
  const navigate = useNavigate();

  const columns = [
    { name: "ID Cultivo", uid: "id_cultivo" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Unidades", uid: "unidades_de_medida" },
    { name: "Fecha", uid: "fecha" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleDelete = (id: number) => {
    setSelectedCosechaId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCosechaId !== null) {
      eliminarMutation.mutate(selectedCosechaId, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          refetch();
        },
      });
    }
  };

  const transformedData = (cosechas ?? []).map((cosecha) => ({
    id: cosecha.id?.toString() || "",
    id_cultivo: cosecha.id_cultivo.toString(),
    cantidad: cosecha.cantidad.toString(),
    unidades_de_medida: cosecha.unidades_de_medida,
    fecha: cosecha.fecha,
    acciones: (
      <>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(cosecha.id!)}
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Cosechas</h2>

          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  onClick={() => navigate("/cultivo/cosecha/")}
                >
                  Registrar Cosecha
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar esta cosecha?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default ListaCosechasPage;