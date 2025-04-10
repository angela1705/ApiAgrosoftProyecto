import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { usePreciosProductos, useActualizarPrecioProducto, useEliminarPrecioProducto, useRegistrarVenta } from "@/hooks/inventario/usePrecio_Producto";
import { useCosechas } from "@/hooks/cultivo/usecosecha";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";
import { EditIcon, Trash2 } from 'lucide-react';
import { PrecioProducto } from "@/types/inventario/Precio_producto";

const ListaPrecio_ProductoPage: React.FC = () => {
    const [selectedPrecioProducto, setSelectedPrecioProducto] = useState<PrecioProducto | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isVentaModalOpen, setIsVentaModalOpen] = useState(false);
    const [cantidadVenta, setCantidadVenta] = useState<number>(0);

    const { data: preciosProductos, isLoading, refetch } = usePreciosProductos();
    const { data: cosechas } = useCosechas();
    const actualizarMutation = useActualizarPrecioProducto();
    const eliminarMutation = useEliminarPrecioProducto();
    const registrarVentaMutation = useRegistrarVenta();
    const navigate = useNavigate();

    const columns = [
        { name: "Producto", uid: "nombre" },
        { name: "Unidad (gramos)", uid: "unidad_medida_gramos" },
        { name: "Precio", uid: "precio" },
        { name: "Fecha Registro", uid: "fecha_registro" },
        { name: "Stock", uid: "stock" },
        { name: "Fecha Caducidad", uid: "fecha_caducidad" },
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

    const handleVenta = (precioProducto: PrecioProducto) => {
        setSelectedPrecioProducto(precioProducto);
        setCantidadVenta(0);
        setIsVentaModalOpen(true);
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

    const handleConfirmVenta = () => {
        if (selectedPrecioProducto && selectedPrecioProducto.id !== undefined) {
            registrarVentaMutation.mutate(
                { id: selectedPrecioProducto.id, cantidad: cantidadVenta },
                {
                    onSuccess: () => {
                        setIsVentaModalOpen(false);
                        setSelectedPrecioProducto(null);
                        refetch();
                    },
                }
            );
        }
    };

    const transformedData = (preciosProductos ?? []).map((precioProducto) => {
        const cosecha = cosechas?.find((c) => c.id === precioProducto.cultivo);
        return {
          id: precioProducto.id.toString(),
          nombre: String(cosecha ? `Cultivo ${cosecha.id_cultivo} - ${cosecha.fecha}` : precioProducto.cultivo),
          unidad_medida_gramos: String(precioProducto.unidad_medida_gramos),
          precio: String(precioProducto.precio.toFixed(2)),
          fecha_registro: String(precioProducto.fecha_registro),
          stock: String(precioProducto.stock), // Asegurar que sea string
          fecha_caducidad: String(precioProducto.fecha_caducidad || "N/A"),
          acciones: (
            <>
              <button className="text-green-500 hover:underline mr-2" onClick={() => handleEdit(precioProducto)}>
                <EditIcon size={22} color="black" />
              </button>
              <button className="text-red-500 hover:underline mr-2" onClick={() => handleDelete(precioProducto)}>
                <Trash2 size={22} color="red" />
              </button>
              <button className="text-blue-500 hover:underline" onClick={() => handleVenta(precioProducto)}>
                Vender
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
                                <div className="flex items-center space-x-2">
                                    <label className="text-sm font-medium text-gray-700 w-32">Producto</label>
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
                                        <option value="">Seleccione un producto</option>
                                        {cosechas?.map((cosecha) => (
                                            <option key={cosecha.id} value={cosecha.id}>
                                                {`Cultivo ${cosecha.id_cultivo} - ${cosecha.fecha}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                                <ReuInput
                                    label="Stock"
                                    placeholder="Ingrese el stock"
                                    type="number"
                                    value={selectedPrecioProducto.stock.toString()}
                                    onChange={(e) =>
                                        setSelectedPrecioProducto({
                                            ...selectedPrecioProducto,
                                            stock: Number(e.target.value),
                                        })
                                    }
                                />
                            
                                <ReuInput
                                    label="Fecha de Caducidad"
                                    type="date"
                                    value={selectedPrecioProducto.fecha_caducidad || ""}
                                    onChange={(e) =>
                                        setSelectedPrecioProducto({
                                            ...selectedPrecioProducto,
                                            fecha_caducidad: e.target.value || null,
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

                    <ReuModal
                        isOpen={isVentaModalOpen}
                        onOpenChange={setIsVentaModalOpen}
                        title="Registrar Venta"
                        onConfirm={handleConfirmVenta}
                    >
                        <ReuInput
                            label="Cantidad a vender"
                            placeholder="Ingrese la cantidad"
                            type="number"
                            value={cantidadVenta.toString()}
                            onChange={(e) => setCantidadVenta(Number(e.target.value))}
                        />
                    </ReuModal>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ListaPrecio_ProductoPage;