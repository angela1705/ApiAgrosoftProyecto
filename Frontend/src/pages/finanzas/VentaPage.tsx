import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useVentas, useRegistrarVenta, useActualizarVenta, useEliminarVenta } from "@/hooks/finanzas/useVentas";
import { useCultivos } from "@/hooks/finanzas/useCultivos";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const VentaPage: React.FC = () => {
    const [venta, setVenta] = useState({
        producto: 0,
        cantidad: 0,
        precio: 0,
        fecha: new Date().toISOString().split("T")[0], 
    });

    const mutation = useRegistrarVenta();
    const { data: ventas, isLoading } = useVentas();
    const { data: cultivos } = useCultivos();

    const columns = [
        { name: "Producto", uid: "producto" },
        { name: "Cantidad", uid: "cantidad" },
        { name: "Precio Unitario", uid: "precio" },
        { name: "Total", uid: "total" },
        { name: "Fecha", uid: "fecha" },
        { name: "Acciones", uid: "acciones" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVenta((prev) => ({
            ...prev,
            [name]: name === "cantidad" || name === "precio" ? Number(value) : value,
        }));
    };

    const calcularTotal = (cantidad: number, precio: number): number => {
        return cantidad * precio;
    };

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center min-h-screen p-6">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Registrar Venta</h2>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Producto</label>
                    <select name="producto" value={venta.producto || ""} onChange={handleChange}>
                        <option value="">Seleccione un producto</option>
                        {cultivos?.map((cultivo) => (
                            <option key={cultivo.id} value={cultivo.id}>{cultivo.nombre}</option>
                        ))}
                    </select>

                    <ReuInput
                        label="Cantidad"
                        type="number"
                        value={venta.cantidad}
                        onChange={handleChange}
                        name="cantidad"
                    />

                    <ReuInput
                        label="Precio Unitario"
                        type="number"
                        value={venta.precio}
                        onChange={handleChange}
                        name="precio"
                    />

                    <ReuInput
                        label="Fecha"
                        type="date"
                        value={venta.fecha}
                        onChange={handleChange}
                        name="fecha"
                    />

                    <button
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            const total = calcularTotal(venta.cantidad, venta.precio);
                            mutation.mutate({ ...venta, total });
                        }}
                    >
                        {mutation.isPending ? "Registrando..." : "Guardar"}
                    </button>
                </div>

                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Ventas</h2>
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
                                {(ventas ?? []).map((venta) => (
                                    <TableRow key={venta.id}>
                                        <TableCell>{venta.producto}</TableCell>
                                        <TableCell>{venta.cantidad}</TableCell>
                                        <TableCell>{venta.precio}</TableCell>
                                        <TableCell>{venta.total}</TableCell>
                                        <TableCell>{venta.fecha}</TableCell>
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
            <VentaNotifications userId={1} />
        </DefaultLayout>
    );
};

export default VentaPage;