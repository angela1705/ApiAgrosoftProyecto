import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { usePagos, useRegistrarPago, useActualizarPago, useEliminarPago} from "@/hooks/finanzas/usePago";
import { useSalarios } from "@/hooks/finanzas/useSalario";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import PagoNotifications from "@/components/finanzas/PagoNotifications";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const PagoPage: React.FC = () => {
    const [pago, setPago] = useState({
        horas_trabajadas: 0,
        salario: 0,
        usuario: 0,
    });

    const mutation = useRegistrarPago();
    const { data: pagos, isLoading } = usePagos();
    const { data: salarios} = useSalarios();
    const { data: usuarios } = useUsuarios();

    const columns = [
        { name: "Usuario", uid: "usuario" },
        { name: "Horas Trabajadas", uid: "horas_trabajadas" },
        { name: "Salario", uid: "salario" },
        { name: "Total a Pagar", uid: "total_a_pagar" },
        { name: "Acciones", uid: "acciones" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPago((prev) => ({
            ...prev,
            [name]: name === "horas_trabajadas" || name === "salario" ? Number(value) : value,
        }));
    };

    const calcularTotalAPagar = (horasTrabajadas: number, salario: number): number => {
        return horasTrabajadas * salario;
    };

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center min-h-screen p-6">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Registrar Pago</h2>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Usuario</label>
                    <select name="usuario" value={pago.usuario || ""} onChange={handleChange}>
                        <option value="">Seleccione un usuario</option>
                        {usuarios?.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                        ))}
                    </select>

                    <ReuInput
                        label="Horas Trabajadas"
                        type="number"
                        value={pago.horas_trabajadas}
                        onChange={(e) => setPago({ ...pago, horas_trabajadas: Number(e.target.value) })}
                    />

                    <ReuInput
                        label="Salario"
                        type="number"
                        value={pago.salario}
                        onChange={(e) => setPago({ ...pago, salario: Number(e.target.value) })}
                    />

                    <button
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            const totalAPagar = calcularTotalAPagar(pago.horas_trabajadas, pago.salario);
                            mutation.mutate({ ...pago, total_a_pagar: totalAPagar });
                        }}
                    >
                        {mutation.isPending ? "Registrando..." : "Guardar"}
                    </button>
                </div>

                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Pagos</h2>
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
                                {(pagos ?? []).map((pago) => (
                                    <TableRow key={pago.id}>
                                        <TableCell>{pago.usuario}</TableCell>
                                        <TableCell>{pago.horas_trabajadas}</TableCell>
                                        <TableCell>{pago.salario}</TableCell>
                                        <TableCell>{pago.total_a_pagar}</TableCell>
                                        <TableCell>
                                            <button className="text-green-500 hover:underline mr-2">Editar</button>
                                            <button className="text-red-500 hover:underline">Eliminar</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
            <PagoNotifications userId={1} />
        </DefaultLayout>
    );
};

export default PagoPage;