import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useSalarios, useRegistrarSalario, useActualizarSalario, useEliminarSalario } from "@/hooks/finanzas/useSalario";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";

const SalarioPage: React.FC = () => {
    const [salario, setSalario] = useState({
        salario_base: 0,
        valor_por_hora: 0,
    });

    const [selectedSalario, setSelectedSalario] = useState<any>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const mutation = useRegistrarSalario();
    const actualizarMutation = useActualizarSalario();
    const eliminarMutation = useEliminarSalario();
    
    const { data: salarios, isLoading } = useSalarios();

    const columns = [
        { name: "Salario Base", uid: "salario_base" },
        { name: "Valor por Hora", uid: "valor_por_hora" },
        
    ];


    const handleEdit = (salario: any) => {
        setSelectedSalario(salario);
        setSalario(salario);
        setIsEditModalOpen(true);
    };

    const handleDelete = (salario: any) => {
        setSelectedSalario(salario);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedSalario && selectedSalario.id !== undefined) {
            eliminarMutation.mutate(selectedSalario.id);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center min-h-screen p-6">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Registrar Salario</h2>

                    <ReuInput
                        label="Salario Base"
                        type="number"
                        value={salario.salario_base}
                        onChange={(e) => setSalario({ ...salario, salario_base:Number(e.target.value ) })}
                
                    />

                    <ReuInput
                        label="Valor por Hora"
                        type="number"
                        value={salario.valor_por_hora}
                        onChange={(e) => setSalario({ ...salario, valor_por_hora: Number(e.target.value) })}
                        
                    />

                    <button
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            mutation.mutate(salario);
                        }}
                    >
                        {mutation.isPending ? "Registrando..." : "Guardar"}
                    </button>
                </div>

                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Salarios</h2>
                    {isLoading ? (
                        <p className="text-gray-600">Cargando...</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                {columns.map((col) => (
                                    <TableColumn key={col.uid}>{col.name}</TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {(salarios ?? []).map((salario) => (
                                    <TableRow key={salario.id}>
                                        <TableCell>{salario.salario_base}</TableCell>
                                        <TableCell>{salario.valor_por_hora}</TableCell>
                                        <TableCell>
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>


            <ReuModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                title="Editar Salario"
                onConfirm={() => {
                    if (selectedSalario && selectedSalario.id !== undefined) {
                        actualizarMutation.mutate({
                            id: selectedSalario.id,
                            salario,
                        });
                        setIsEditModalOpen(false);
                    }
                }}
            >
                 <ReuInput
                        label="Salario Base"
                        type="number"
                        value={salario.salario_base}
                        onChange={(e) => setSalario({ ...salario, salario_base:Number(e.target.value ) })}
                
                    />

                    <ReuInput
                        label="Valor por Hora"
                        type="number"
                        value={salario.valor_por_hora}
                        onChange={(e) => setSalario({ ...salario, valor_por_hora: Number(e.target.value) })}
                        
                    />
            </ReuModal>
                
                    


            <ReuModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                title="¿Estás seguro de eliminar este salario?"
                onConfirm={handleConfirmDelete}
            >
                <p>Esta acción es irreversible.</p>
            </ReuModal>



            
        </DefaultLayout>
    );
};

export default SalarioPage;