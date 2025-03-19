import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useSalarios, useRegistrarSalario, useActualizarSalario, useEliminarSalario } from "@/hooks/finanzas/useSalarios";
import SalarioNotifications from "@/components/finanzas/SalarioNotifications";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const SalarioPage: React.FC = () => {
    const [salario, setSalario] = useState({
        salario_base: 0,
        valor_por_hora: 0,
    });

    const mutation = useRegistrarSalario();
    const { data: salarios, isLoading } = useSalarios();

    const columns = [
        { name: "Salario Base", uid: "salario_base" },
        { name: "Valor por Hora", uid: "valor_por_hora" },
        { name: "Acciones", uid: "acciones" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSalario((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
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
                        onChange={handleChange}
                        name="salario_base"
                    />

                    <ReuInput
                        label="Valor por Hora"
                        type="number"
                        value={salario.valor_por_hora}
                        onChange={handleChange}
                        name="valor_por_hora"
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
                                                onClick={() => {
                                                    // Lógica para editar
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="text-red-500 hover:underline"
                                                onClick={() => {
                                                    // Lógica para eliminar
                                                }}
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
            <SalarioNotifications userId={1} />
        </DefaultLayout>
    );
};

export default SalarioPage;