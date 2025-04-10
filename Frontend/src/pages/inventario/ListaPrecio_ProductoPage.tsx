import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { usePreciosProductos, useActualizarPrecioProducto, useEliminarPrecioProducto } from "@/hooks/inventario/usePrecio_Producto";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";
import { EditIcon, Trash2 } from 'lucide-react';
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import { PrecioProducto } from "@/types/inventario/precio_producto";

const ListaPrecio_ProductoPage: React.FC = () => {
    const [selectedPrecioProducto, setSelectedPrecioProducto] = useState<PrecioProducto | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data: preciosProductos, isLoading, refetch } = usePreciosProductos();
    const { data: cultivos } = useCultivos();
    const actualizarMutation = useActualizarPrecioProducto();
    const eliminarMutation = useEliminarPrecioProducto();
    const navigate = useNavigate();

    const columns = [
        { name: "Cultivo", uid: "cultivo" },
        { name: "Unidad (gramos)", uid: "unidad_medida_gramos" },
        { name: "Precio", uid: "precio" },
        { name: "Fecha de Registro", uid: "fecha_registro" },
        { name: "Acciones", uid: "acciones" },
    ];

    const handleEdit = (precioProducto: PrecioProducto) => {
        setSelectedPrecioProducto({ ...precioProducto });
        setIsEditModalOpen(true);
    };

    const handleDelete = (precioProducto: PrecioProducto) => {
        setSelectedPrecioProducto(precioProducto);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedPrecioProducto && selectedPrecioProducto.id !== undefined) {
            eliminarMutation.mutate(selectedPrecioProducto.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setSelectedPrecioProducto(null);
                    refetch();
                },
                onError: (error: any) => {
                    console.error("Error en eliminación:", error);
                    setIsDeleteModalOpen(false);
                },
            });
        }
    };

    const transformedData = (preciosProductos ?? []).map((precioProducto) => {
        const cultivo = cultivos?.find((c) => c.id === precioProducto.cultivo);
        return {
            id: precioProducto.id.toString(),
            cultivo: cultivo ? cultivo.nombre : precioProducto.cultivo,
            unidad_medida_gramos: precioProducto.unidad_medida_gramos,
            precio: precioProducto.precio,
            fecha_registro: precioProducto.fecha_registro,
            acciones: (
                <>
                    <button className="text-green-500 hover:underline mr-2" onClick={() => handleEdit(precioProducto)}>
                        <EditIcon size={22} color="black" />
                    </button>
                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(precioProducto)}>
                        <Trash2 size={22} color="red" />
                    </button>
                </>
            ),
        };
    });

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center min-h-screen p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Lista de Precios de Productos Registrados</h2>
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 flex justify-start">
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            onClick={() => navigate("/inventario/preciosproductos/")}
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
                        title="Editar Precio de Producto"
                        onConfirm={() => {
                            if (selectedPrecioProducto && selectedPrecioProducto.id !== undefined) {
                                actualizarMutation.mutate(selectedPrecioProducto, {
                                    onSuccess: () => {
                                        setIsEditModalOpen(false);
                                        refetch();
                                    },
                                });
                            }
                        }}
                    >
                        {selectedPrecioProducto && (
                            <>
                                <label className="block text-sm font-medium text-gray-700">Cultivo</label>
                                <select
                                    name="cultivo"
                                    value={selectedPrecioProducto.cultivo || ""}
                                    onChange={(e) =>
                                        setSelectedPrecioProducto({
                                            ...selectedPrecioProducto,
                                            cultivo: Number(e.target.value),
                                        })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-2 border"
                                >
                                    <option value="">Seleccione un cultivo</option>
                                    {cultivos?.map((cultivo) => (
                                        <option key={cultivo.id} value={cultivo.id}>
                                            {cultivo.nombre}
                                        </option>
                                    ))}
                                </select>
                                <ReuInput
                                    label="Unidad (gramos)"
                                    placeholder="Ingrese la unidad en gramos"
                                    type="number"
                                    value={selectedPrecioProducto.unidad_medida_gramos.toString()}
                                    onChange={(e) =>
                                        setSelectedPrecioProducto({
                                            ...selectedPrecioProducto,
                                            unidad_medida_gramos: Number(e.target.value),
                                        })
                                    }
                                />
                                <ReuInput
                                    label="Precio"
                                    placeholder="Ingrese el precio"
                                    type="number"
                                    value={selectedPrecioProducto.precio.toString()}
                                    onChange={(e) =>
                                        setSelectedPrecioProducto({
                                            ...selectedPrecioProducto,
                                            precio: Number(e.target.value),
                                        })
                                    }
                                />
                                <ReuInput
                                    label="Fecha de Registro"
                                    type="date"
                                    value={selectedPrecioProducto.fecha_registro}
                                    onChange={(e) =>
                                        setSelectedPrecioProducto({
                                            ...selectedPrecioProducto,
                                            fecha_registro: e.target.value,
                                        })
                                    }
                                />
                            </>
                        )}
                    </ReuModal>

                    <ReuModal
                        isOpen={isDeleteModalOpen}
                        onOpenChange={setIsDeleteModalOpen}
                        title="¿Estás seguro de eliminar este precio de producto?"
                        onConfirm={handleConfirmDelete}
                    >
                        <p>Esta acción es irreversible.</p>
                    </ReuModal>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ListaPrecio_ProductoPage;