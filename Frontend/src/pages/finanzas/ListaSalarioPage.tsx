import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useSalario } from "@/hooks/finanzas/useSalario";
import { Salario } from "@/types/finanzas/Salario";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";

const ListaSalarioPage: React.FC = () => {
  // Estado para el salario seleccionado y para controlar modales
  const [selectedSalario, setSelectedSalario] = useState<Salario | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Hook para obtener, actualizar, eliminar y registrar salarios
  const { salarios, isLoading, actualizarSalario, eliminarSalario, isActualizando, isEliminando } = useSalario();
  const navigate = useNavigate();

  // Definición de columnas de la tabla
  const columns = [
    { name: "Fecha Implementación", uid: "fecha_implementacion" },
    { name: "Fecha Vencimiento", uid: "fecha_vencimiento" },
    { name: "Salario Mínimo", uid: "salario_minimo" },
    { name: "Auxilio Transporte", uid: "auxilio_transporte" },
    { name: "Horas Laborales", uid: "horas_laborales_mes" },
    { name: "Valor Hora Ordinaria", uid: "valor_hora_ordinaria" },
    { name: "Acciones", uid: "acciones" },
  ];

  // Función para abrir el modal de edición
  const handleEdit = (salario: Salario) => {
    setSelectedSalario(salario);
    setIsEditModalOpen(true);
  };

  // Función para abrir el modal de eliminación
  const handleDelete = (salario: Salario) => {
    setSelectedSalario(salario);
    setIsDeleteModalOpen(true);
  };

  // Confirmar eliminación
  const handleConfirmDelete = () => {
    if (selectedSalario && selectedSalario.id !== undefined) {
      eliminarSalario(selectedSalario.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  // Transformamos los salarios a la estructura requerida por la tabla.
  const transformedData = (salarios ?? []).map((salario) => ({
    id: salario.id?.toString() || "",
    fecha_implementacion: salario.fecha_de_implementacion,
    fecha_vencimiento: salario.fecha_de_vencimiento,
    salario_minimo: salario.salario_minimo,
    auxilio_transporte: salario.auxilio_transporte,
    horas_laborales_mes: salario.horas_laborales_mes,
    valor_hora_ordinaria: salario.valor_hora_ordinaria,
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(salario)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(salario)}
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Salarios</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => navigate("/finanzas/salario")}
                >
                  Registrar Salario
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal de Edición */}
        <ReuModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          title="Editar Salario"
          onConfirm={() => {
            if (selectedSalario && selectedSalario.id !== undefined) {
              actualizarSalario(selectedSalario, {
                onSuccess: () => {
                  setIsEditModalOpen(false);
                },
              });
            }
          }}
        >
          {selectedSalario && (
            <>
              <ReuInput
                label="Fecha de Implementación"
                type="date"
                value={selectedSalario.fecha_de_implementacion}
                onChange={(e) =>
                  setSelectedSalario((prev) => ({
                    ...prev!,
                    fecha_de_implementacion: e.target.value,
                  }))
                }
              />
              <ReuInput
                label="Fecha de Vencimiento"
                type="date"
                value={selectedSalario.fecha_de_vencimiento}
                onChange={(e) =>
                  setSelectedSalario((prev) => ({
                    ...prev!,
                    fecha_de_vencimiento: e.target.value,
                  }))
                }
              />
              <ReuInput
                label="Salario Mínimo"
                type="number"
                value={selectedSalario.salario_minimo?.toString() || ""}
                onChange={(e) =>
                  setSelectedSalario((prev) => ({
                    ...prev!,
                    salario_minimo: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Auxilio Transporte"
                type="number"
                value={selectedSalario.auxilio_transporte?.toString() || ""}
                onChange={(e) =>
                  setSelectedSalario((prev) => ({
                    ...prev!,
                    auxilio_transporte: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Horas Laborales por Mes"
                type="number"
                value={selectedSalario.horas_laborales_mes?.toString() || ""}
                onChange={(e) =>
                  setSelectedSalario((prev) => ({
                    ...prev!,
                    horas_laborales_mes: Number(e.target.value),
                  }))
                }
              />
              <ReuInput
                label="Valor Hora Ordinaria"
                type="number"
                value={selectedSalario.valor_hora_ordinaria?.toString() || ""}
                onChange={(e) =>
                  setSelectedSalario((prev) => ({
                    ...prev!,
                    valor_hora_ordinaria: Number(e.target.value),
                  }))
                }
              />
              {isActualizando && <p className="text-gray-600 mt-2">Actualizando...</p>}
            </>
          )}
        </ReuModal>

        {/* Modal de Eliminación */}
        <ReuModal
          isOpen={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="¿Estás seguro de eliminar este salario?"
          onConfirm={handleConfirmDelete}
        >
          <p>Esta acción es irreversible.</p>
          {isEliminando && <p className="text-gray-600 mt-2">Eliminando...</p>}
        </ReuModal>
      </div>
    </DefaultLayout>
  );
};

export default ListaSalarioPage;
