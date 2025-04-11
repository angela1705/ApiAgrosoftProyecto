import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { usePago } from "@/hooks/finanzas/usePago";
import { Pago } from "@/types/finanzas/Pago";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";

const ListaPagoPage: React.FC = () => {
 
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { pagos, isLoading, actualizarPago, eliminarPago, isActualizando, isEliminando } = usePago();
  const navigate = useNavigate();


  const columns = [
    { name: "Horas Trabajadas", uid: "horas_trabajadas" },
    { name: "Salario", uid: "salario" },
    { name: "Total a Pagar", uid: "total_a_pagar" },
    { name: "Usuario", uid: "usuario" },
    { name: "Periodo Inicio", uid: "periodo_inicio" },
    { name: "Periodo Fin", uid: "periodo_fin" },
    { name: "Horas Extras", uid: "horas_extras" },
    { name: "Auxilio Transporte", uid: "auxilio_transporte" },
    { name: "Acciones", uid: "acciones" },
  ];


  const handleEdit = (pago: Pago) => {
    setSelectedPago(pago);
    setIsEditModalOpen(true);
  };

  const handleDelete = (pago: Pago) => {
    setSelectedPago(pago);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPago && selectedPago.id !== undefined) {
      eliminarPago(selectedPago.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
        },
      });
    }
  };


  const transformedData = (pagos ?? []).map((pago) => ({
    id: pago.id?.toString() || "",
    horas_trabajadas: pago.horas_trabajadas,
    salario: pago.salario,
    total_a_pagar: pago.total_a_pagar,
    usuario: pago.usuario,
    periodo_inicio: pago.periodo_inicio,
    periodo_fin: pago.periodo_fin,
    horas_extras: pago.horas_extras,
    auxilio_transporte: pago.auxilio_transporte,
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(pago)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(pago)}
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Pagos</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => navigate("/finanzas/pago/")}
                >
                  Registrar Pago
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal de edición */}
        <ReuModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          title="Editar Pago"
          onConfirm={() => {
            if (selectedPago && selectedPago.id !== undefined) {
              actualizarPago(selectedPago, {
                onSuccess: () => {
                  setIsEditModalOpen(false);
                },
              });
            }
          }}
        >
          {selectedPago && (
            <>
              <ReuInput
                label="Horas Trabajadas"
                type="number"
                value={selectedPago.horas_trabajadas.toString()}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    horas_trabajadas: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Salario"
                type="number"
                value={selectedPago.salario.toString()}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    salario: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Total a Pagar"
                type="number"
                value={selectedPago.total_a_pagar?.toString() || ""}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    total_a_pagar: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Usuario"
                type="number"
                value={selectedPago.usuario.toString()}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    usuario: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Periodo Inicio"
                type="date"
                value={selectedPago.periodo_inicio}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    periodo_inicio: e.target.value,
                  }))
                }
              />
              <ReuInput
                label="Periodo Fin"
                type="date"
                value={selectedPago.periodo_fin}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    periodo_fin: e.target.value,
                  }))
                }
              />
              <ReuInput
                label="Horas Extras"
                type="number"
                value={selectedPago.horas_extras.toString()}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    horas_extras: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Auxilio Transporte"
                type="number"
                value={selectedPago.auxilio_transporte?.toString() || ""}
                onChange={(e) =>
                  setSelectedPago((prev) => ({
                    ...prev!,
                    auxilio_transporte: Number(e.target.value),
                  }))
                }
              />
              {isActualizando && <p className="text-gray-600 mt-2">Actualizando...</p>}
            </>
          )}
        </ReuModal>

        {/* Modal de eliminación */}
        <ReuModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="¿Estás seguro de eliminar este pago?"
          onConfirm={handleConfirmDelete}
        >
          <p>Esta acción es irreversible.</p>
          {isEliminando && <p className="text-gray-600 mt-2">Eliminando...</p>}
        </ReuModal>
      </div>
    </DefaultLayout>
  );
};

export default ListaPagoPage;
