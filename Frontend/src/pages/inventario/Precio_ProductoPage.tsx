import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useRegistrarPrecioProducto } from "@/hooks/inventario/usePrecio_Producto";
import { ReuInput } from "@/components/globales/ReuInput";
import Formulario from "@/components/globales/Formulario";
import { useCosechas } from "@/hooks/cultivo/usecosecha";
import { addToast } from "@heroui/react";
import { PrecioProducto } from "@/types/inventario/Precio_producto";

const Precio_ProductoPage: React.FC = () => {
    const [precioProducto, setPrecioProducto] = useState<PrecioProducto>({
        id: 0,
        cultivo: 0,
        unidad_medida_gramos: 0,
        precio: 0,
        fecha_registro: new Date().toISOString().slice(0, 10),
        stock: 0,
        stock_disponible: 0,
        fecha_caducidad: null,
    });

    const mutation = useRegistrarPrecioProducto();
    const navigate = useNavigate();
    const { data: cosechas } = useCosechas();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!precioProducto.cultivo) {
            addToast({ title: "Error", description: "Seleccione un producto válido" });
            return;
        }
        mutation.mutate(precioProducto, {
            onSuccess: () => {
                setPrecioProducto({
                    id: 0,
                    cultivo: 0,
                    unidad_medida_gramos: 0,
                    precio: 0,
                    fecha_registro: new Date().toISOString().slice(0, 10),
                    stock: 0,
                    stock_disponible: 0,
                    fecha_caducidad: null,
                });
            },
        });
    };

    return (
        <DefaultLayout>
            <Formulario
                title="Registro de Precio de Producto"
                onSubmit={handleSubmit}
                buttonText="Guardar"
                isSubmitting={mutation.isPending}
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">Producto</label>
                    <select
                        name="cultivo"
                        value={precioProducto.cultivo || ""}
                        onChange={(e) => setPrecioProducto({ ...precioProducto, cultivo: Number(e.target.value) })}
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
                    label="Unidad de Medida (gramos)"
                    placeholder="Ingrese la unidad en gramos"
                    type="number"
                    value={precioProducto.unidad_medida_gramos.toString()}
                    onChange={(e) => setPrecioProducto({ ...precioProducto, unidad_medida_gramos: Number(e.target.value) })}
                />
                <ReuInput
                    label="Precio"
                    placeholder="Ingrese el precio"
                    type="number"
                    value={precioProducto.precio.toString()}
                    onChange={(e) => setPrecioProducto({ ...precioProducto, precio: Number(e.target.value) })}
                />
                <ReuInput
                    label="Fecha de Registro"
                    type="date"
                    value={precioProducto.fecha_registro}
                    onChange={(e) => setPrecioProducto({ ...precioProducto, fecha_registro: e.target.value })}
                />
                <ReuInput
                    label="Stock"
                    placeholder="Ingrese el stock inicial"
                    type="number"
                    value={precioProducto.stock.toString()}
                    onChange={(e) => setPrecioProducto({ ...precioProducto, stock: Number(e.target.value) })}
                />
                <ReuInput
                    label="Fecha de Caducidad"
                    type="date"
                    value={precioProducto.fecha_caducidad || ""}
                    onChange={(e) => setPrecioProducto({ ...precioProducto, fecha_caducidad: e.target.value || null })}
                />
                <div className="col-span-1 md:col-span-2 flex justify-center">
                    <button
                        type="button"
                        className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
                        onClick={() => navigate("/inventario/listarpreciosproductos/")}
                    >
                        Listar Precios de Productos
                    </button>
                </div>
            </Formulario>
        </DefaultLayout>
    );
};

export default Precio_ProductoPage;