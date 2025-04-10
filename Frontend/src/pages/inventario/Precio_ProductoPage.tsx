import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useRegistrarPrecioProducto } from "@/hooks/inventario/usePrecio_Producto";
import { ReuInput } from "@/components/globales/ReuInput";
import Formulario from "@/components/globales/Formulario";
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import { addToast } from "@heroui/react";
import { PrecioProducto } from "@/types/inventario/precio_producto";

const Precio_ProductoPage: React.FC = () => {
    const [precioProducto, setPrecioProducto] = useState<PrecioProducto>({
        id: 0,
        cultivo: 0,
        unidad_medida_gramos: 0,
        precio: 0,
        fecha_registro: new Date().toISOString().slice(0, 10),
    });

    const mutation = useRegistrarPrecioProducto();
    const navigate = useNavigate();
    const { data: cultivos } = useCultivos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!precioProducto.cultivo) {
            addToast({ title: "Error", description: "Seleccione un cultivo válido" });
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
                <label className="block text-sm font-medium text-gray-700">Cultivo</label>
                <select
                    name="cultivo"
                    value={precioProducto.cultivo || ""}
                    onChange={(e) => setPrecioProducto({ ...precioProducto, cultivo: Number(e.target.value) })}
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