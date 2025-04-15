import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useRegistrarInsumo, useUnidadesMedida, useCrearUnidadMedida } from "@/hooks/inventario/useInsumo";
import { ReuInput } from "@/components/globales/ReuInput";
import Formulario from "@/components/globales/Formulario";
import ReuModal from "@/components/globales/ReuModal";
import { Insumo, UnidadMedida } from "@/types/inventario/Insumo";
import InsumoNotifications from "@/components/inventario/InsumoNotifications";
import { useAuth } from "@/context/AuthContext";

const InsumoPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: unidadesMedida, isLoading: isLoadingUnidades } = useUnidadesMedida();
    const registrarInsumo = useRegistrarInsumo();
    const crearUnidadMedida = useCrearUnidadMedida();

    const [insumo, setInsumo] = useState<Omit<Insumo, "id" | "unidad_medida"> & { unidad_medida_id?: number }>({
        nombre: "",
        descripcion: "",
        cantidad: 0,
        activo: true,
        tipo_empacado: null,
        fecha_registro: new Date().toISOString(),
        fecha_caducidad: null,
        precio_insumo: 0,
        unidad_medida_id: undefined,
    });

    const [nuevaUnidad, setNuevaUnidad] = useState<Omit<UnidadMedida, "id" | "fecha_creacion" | "creada_por_usuario">>({
        nombre: "",
        descripcion: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitInsumo = (e: React.FormEvent) => {
        e.preventDefault();
        registrarInsumo.mutate(insumo, {
            onSuccess: () => {
                setInsumo({
                    nombre: "",
                    descripcion: "",
                    cantidad: 0,
                    activo: true,
                    tipo_empacado: null,
                    fecha_registro: new Date().toISOString(),
                    fecha_caducidad: null,
                    precio_insumo: 0,
                    unidad_medida_id: undefined,
                });
            },
        });
    };

    const handleSubmitUnidadMedida = () => {
        crearUnidadMedida.mutate(nuevaUnidad, {
            onSuccess: () => {
                setIsModalOpen(false);
                setNuevaUnidad({ nombre: "", descripcion: "" });
            },
        });
    };

    // Formatear fechas para inputs
    const formatDateTimeLocal = (isoString: string) => {
        return isoString.slice(0, 16); // YYYY-MM-DDTHH:mm
    };

    const formatDate = (date: string | null) => {
        return date || "";
    };

    return (
        <DefaultLayout>
            <Formulario
                title="Registro de Insumo"
                onSubmit={handleSubmitInsumo}
                buttonText="Guardar"
                isSubmitting={registrarInsumo.isPending}
            >
                <ReuInput
                    label="Nombre"
                    placeholder="Ingrese el nombre"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={insumo.nombre}
                    onChange={(e) => setInsumo({ ...insumo, nombre: e.target.value })}
                />
                <ReuInput
                    label="Descripción"
                    placeholder="Ingrese la descripción"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={insumo.descripcion}
                    onChange={(e) => setInsumo({ ...insumo, descripcion: e.target.value })}
                />
                <ReuInput
                    label="Cantidad"
                    placeholder="Ingrese la cantidad"
                    type="number"
                    variant="bordered"
                    radius="md"
                    value={insumo.cantidad}
                    onChange={(e) => setInsumo({ ...insumo, cantidad: Number(e.target.value) })}
                />
                <div className="flex items-end gap-2">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unidad de Medida</label>
                        <select
                            value={insumo.unidad_medida_id || ""}
                            onChange={(e) => setInsumo({ ...insumo, unidad_medida_id: e.target.value ? Number(e.target.value) : undefined })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                            disabled={isLoadingUnidades}
                        >
                            <option value="">Seleccione una unidad</option>
                            {unidadesMedida?.map((unidad) => (
                                <option key={unidad.id} value={unidad.id}>
                                    {unidad.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Nueva Unidad
                    </button>
                </div>
                <ReuInput
                    label="Tipo de Empacado"
                    placeholder="Ingrese el tipo de empacado"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={insumo.tipo_empacado || ""}
                    onChange={(e) => setInsumo({ ...insumo, tipo_empacado: e.target.value || null })}
                />
                <ReuInput
                    label="Fecha de Registro"
                    type="datetime-local"
                    variant="bordered"
                    radius="md"
                    value={formatDateTimeLocal(insumo.fecha_registro)}
                    onChange={(e) => setInsumo({ ...insumo, fecha_registro: new Date(e.target.value).toISOString() })}
                />
                <ReuInput
                    label="Fecha de Caducidad"
                    type="date"
                    variant="bordered"
                    radius="md"
                    value={formatDate(insumo.fecha_caducidad)}
                    onChange={(e) => setInsumo({ ...insumo, fecha_caducidad: e.target.value || null })}
                />
                <ReuInput
                    label="Precio del Insumo"
                    placeholder="Ingrese el precio del insumo"
                    type="number"
                    variant="bordered"
                    radius="md"
                    step="0.01"
                    value={insumo.precio_insumo}
                    onChange={(e) => setInsumo({ ...insumo, precio_insumo: Number(e.target.value) })}
                />
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={insumo.activo}
                        onChange={(e) => setInsumo({ ...insumo, activo: e.target.checked })}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Activo</label>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center">
                    <button
                        type="button"
                        className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
                        onClick={() => navigate("/inventario/listarinsumos/")}
                    >
                        Listar Insumos
                    </button>
                </div>
            </Formulario>

            <ReuModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                title="Crear Nueva Unidad de Medida"
                onConfirm={handleSubmitUnidadMedida}
            >
                <ReuInput
                    label="Nombre"
                    placeholder="Ej. kg, L"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={nuevaUnidad.nombre}
                    onChange={(e) => setNuevaUnidad({ ...nuevaUnidad, nombre: e.target.value })}
                />
                <ReuInput
                    label="Descripción"
                    placeholder="Descripción de la unidad"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={nuevaUnidad.descripcion || ""}
                    onChange={(e) => setNuevaUnidad({ ...nuevaUnidad, descripcion: e.target.value })}
                />
            </ReuModal>

            {user && <InsumoNotifications userId1={user.id} />}
        </DefaultLayout>
    );
};

export default InsumoPage;