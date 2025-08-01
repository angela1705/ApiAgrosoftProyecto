import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useInsumos, useActualizarInsumo, useEliminarInsumo, useUnidadesMedida, useCrearUnidadMedida, useTiposInsumo, useCrearTipoInsumo } from "@/hooks/inventario/useInsumo";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";
import { EditIcon, Trash2 } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { Insumo, UnidadMedida, TipoInsumo } from "@/types/inventario/Insumo";
import { Plus } from 'lucide-react';
import { Switch } from "@heroui/react";

const formatCOPNumber = (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/\./g, '')) : value;
    if (isNaN(num)) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseCOPNumber = (value: string): number => {
    return parseFloat(value.replace(/\./g, '')) || 0;
};

const ListaInsumoPage: React.FC = () => {
    const {} = useAuth();
    const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUnidadModalOpen, setIsUnidadModalOpen] = useState(false);
    const [isTipoModalOpen, setIsTipoModalOpen] = useState(false);
    const [nuevaUnidad, setNuevaUnidad] = useState<Omit<UnidadMedida, "id" | "fecha_creacion" | "creada_por_usuario">>({
        nombre: "",
        descripcion: "",
    });
    const [nuevoTipo, setNuevoTipo] = useState<Omit<TipoInsumo, "id" | "fecha_creacion" | "creada_por_usuario">>({
        nombre: "",
        descripcion: "",
    });

    const { data: insumos, isLoading, error } = useInsumos();
    const { data: unidadesMedida, isLoading: isLoadingUnidades } = useUnidadesMedida();
    const { data: tiposInsumo, isLoading: isLoadingTipos } = useTiposInsumo();
    const actualizarMutation = useActualizarInsumo();
    const eliminarMutation = useEliminarInsumo();
    const crearUnidadMedida = useCrearUnidadMedida();
    const crearTipoInsumo = useCrearTipoInsumo();
    const navigate = useNavigate();

    const columns = [
        { name: "Nombre", uid: "nombre" },
        { name: "Descripción", uid: "descripcion" },
        { name: "Cantidad", uid: "cantidad" },
        { name: "Unidad de Medida", uid: "unidad_medida" },
        { name: "Tipo de Insumo", uid: "tipo_insumo" },
        { name: "Activo", uid: "activo" },
        { name: "Tipo de Empacado", uid: "tipo_empacado" },
        { name: "Fecha de Registro", uid: "fecha_registro" },
        { name: "Fecha de Caducidad", uid: "fecha_caducidad" },
        { name: "Precio del Insumo", uid: "precio_insumo" },
        { name: "Acciones", uid: "acciones" },
    ];

    const transformedData = (insumos ?? []).map((insumo) => ({
        id: insumo.id?.toString() || "",
        nombre: insumo.nombre,
        descripcion: insumo.descripcion,
        cantidad: insumo.cantidad,
        unidad_medida: insumo.unidad_medida ? insumo.unidad_medida.nombre : "Sin asignar",
        tipo_insumo: insumo.tipo_insumo ? insumo.tipo_insumo.nombre : "Sin asignar",
        activo: insumo.activo ? "Sí" : "No",
        tipo_empacado: insumo.tipo_empacado || "No especificado",
        fecha_registro: insumo.fecha_registro.slice(0, 10),
        fecha_caducidad: insumo.fecha_caducidad || "No especificada",
        precio_insumo: insumo.precio_insumo !== null && insumo.precio_insumo !== undefined 
            ? formatCOPNumber(insumo.precio_insumo)
            : "0.00",
        acciones: (
            <>
                <button className="text-green-500 hover:underline mr-2" onClick={() => { 
                    setSelectedInsumo({ ...insumo }); 
                    setIsEditModalOpen(true); 
                }}>
                    <EditIcon size={22} color="black" />
                </button>
                <button className="text-red-500 hover:underline mr-2" onClick={() => { setSelectedInsumo(insumo); setIsDeleteModalOpen(true); }}>
                    <Trash2 size={22} color="red" />
                </button>
            </>
        ),
    }));

    const handleSubmitUnidadMedida = () => {
        crearUnidadMedida.mutate(nuevaUnidad, {
            onSuccess: () => {
                setIsUnidadModalOpen(false);
                setNuevaUnidad({ nombre: "", descripcion: "" });
            },
        });
    };

    const handleSubmitTipoInsumo = () => {
        crearTipoInsumo.mutate(nuevoTipo, {
            onSuccess: () => {
                setIsTipoModalOpen(false);
                setNuevoTipo({ nombre: "", descripcion: "" });
            },
        });
    };

    const formatDateTimeLocal = (isoString: string) => {
        return isoString.slice(0, 16);
    };

    const formatDate = (date: string | null) => {
        return date || "";
    };

    return (
        <DefaultLayout>
            <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Lista de Insumos Registrados</h2>
            <div className="mb-2 flex justify-start">
                <button
                    className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700"
                    onClick={() => navigate("/inventario/insumos/")}
                >
                    + Registrar
                </button>
            </div>

            {isLoading ? (
                <p className="text-gray-600">Cargando...</p>
            ) : error ? (
                <p className="text-red-600">Error al cargar los insumos: {error.message}</p>
            ) : (
                <Tabla columns={columns} data={transformedData} />
            )}

            <ReuModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                title="Editar Insumo"
                onConfirm={() => {
                    if (selectedInsumo && selectedInsumo.id !== undefined) {
                        actualizarMutation.mutate({ 
                            id: selectedInsumo.id, 
                            insumo: {
                                ...selectedInsumo,
                                unidad_medida_id: selectedInsumo.unidad_medida?.id || undefined,
                                tipo_insumo_id: selectedInsumo.tipo_insumo?.id || undefined,
                            }
                        });
                    }
                }}
            >
                {selectedInsumo && (
                    <>
                        <ReuInput
                            label="Nombre"
                            placeholder="Ingrese el nombre"
                            type="text"
                            variant="bordered"
                            radius="md"
                            value={selectedInsumo.nombre}
                            onChange={(e) => setSelectedInsumo({ ...selectedInsumo, nombre: e.target.value })}
                        />
                        <ReuInput
                            label="Descripción"
                            placeholder="Ingrese la descripción"
                            type="text"
                            variant="bordered"
                            radius="md"
                            value={selectedInsumo.descripcion}
                            onChange={(e) => setSelectedInsumo({ ...selectedInsumo, descripcion: e.target.value })}
                        />
                        <ReuInput
                            label="Cantidad"
                            placeholder="Ingrese la cantidad"
                            type="number"
                            variant="bordered"
                            radius="md"
                            value={selectedInsumo.cantidad}
                            onChange={(e) => setSelectedInsumo({ ...selectedInsumo, cantidad: Number(e.target.value) })}
                        />
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
                                <select
                                    value={selectedInsumo.unidad_medida?.id || ""}
                                    onChange={(e) => setSelectedInsumo({
                                        ...selectedInsumo,
                                        unidad_medida: unidadesMedida?.find(u => u.id === Number(e.target.value)) || null
                                    })}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled.opacity-50"
                                    disabled={isLoadingUnidades}
                                >
                                    <option value="">Seleccione una unidad</option>
                                    {unidadesMedida?.map((unidad: UnidadMedida) => (
                                        <option key={unidad.id} value={unidad.id}>
                                            {unidad.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="p-1 h-6 w-6 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={() => setIsUnidadModalOpen(true)}
                                type="button"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-end gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Insumo</label>
                                <select
                                    value={selectedInsumo.tipo_insumo?.id || ""}
                                    onChange={(e) => setSelectedInsumo({
                                        ...selectedInsumo,
                                        tipo_insumo: tiposInsumo?.find(t => t.id === Number(e.target.value)) || null
                                    })}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled.opacity-50"
                                    disabled={isLoadingTipos}
                                >
                                    <option value="">Seleccione un tipo</option>
                                    {tiposInsumo?.map((tipo: TipoInsumo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className="p-1 h-6 w-6 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={() => setIsTipoModalOpen(true)}
                                type="button"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <Switch
                                color="success"
                                size="sm"
                                isSelected={selectedInsumo.activo}
                                onChange={(e) => setSelectedInsumo({ ...selectedInsumo, activo: e.target.checked })}
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">Activo</label>
                        </div>
                        <ReuInput
                            label="Tipo de Empacado"
                            placeholder="Ingrese el tipo de empacado"
                            type="text"
                            variant="bordered"
                            radius="md"
                            value={selectedInsumo.tipo_empacado || ""}
                            onChange={(e) => setSelectedInsumo({ ...selectedInsumo, tipo_empacado: e.target.value || null })}
                        />
                        <ReuInput
                            label="Fecha de Registro"
                            type="datetime-local"
                            variant="bordered"
                            radius="md"
                            value={formatDateTimeLocal(selectedInsumo.fecha_registro)}
                            onChange={(e) => setSelectedInsumo({ ...selectedInsumo, fecha_registro: new Date(e.target.value).toISOString() })}
                        />
                        <ReuInput
                            label="Fecha de Caducidad"
                            type="date"
                            variant="bordered"
                            radius="md"
                            value={formatDate(selectedInsumo.fecha_caducidad)}
                            onChange={(e) => setSelectedInsumo({ ...selectedInsumo, fecha_caducidad: e.target.value || null })}
                        />
                        <ReuInput
                            label="Precio del Insumo"
                            placeholder="Ingrese el precio del insumo"
                            type="text"
                            variant="bordered"
                            radius="md"
                            value={selectedInsumo.precio_insumo !== null && selectedInsumo.precio_insumo !== undefined 
                                ? formatCOPNumber(selectedInsumo.precio_insumo) 
                                : ""}
                            onChange={(e) => setSelectedInsumo({ 
                                ...selectedInsumo, 
                                precio_insumo: parseCOPNumber(e.target.value) 
                            })}
                        />
                    </>
                )}
            </ReuModal>

            <ReuModal
                isOpen={isUnidadModalOpen}
                onOpenChange={setIsUnidadModalOpen}
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
                    value={nuevaUnidad.descripcion ?? ""}
                    onChange={(e) => setNuevaUnidad({ ...nuevaUnidad, descripcion: e.target.value })}
                />
            </ReuModal>

            <ReuModal
                isOpen={isTipoModalOpen}
                onOpenChange={setIsTipoModalOpen}
                title="Crear Nuevo Tipo de Insumo"
                onConfirm={handleSubmitTipoInsumo}
            >
                <ReuInput
                    label="Nombre"
                    placeholder="Ej. Fertilizante"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={nuevoTipo.nombre}
                    onChange={(e) => setNuevoTipo({ ...nuevoTipo, nombre: e.target.value })}
                />
                <ReuInput
                    label="Descripción"
                    placeholder="Descripción del tipo"
                    type="text"
                    variant="bordered"
                    radius="md"
                    value={nuevoTipo.descripcion ?? ""}
                    onChange={(e) => setNuevoTipo({ ...nuevoTipo, descripcion: e.target.value })}
                />
            </ReuModal>

            <ReuModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                title="¿Estás seguro de eliminar este insumo?"
                onConfirm={() => {
                    if (selectedInsumo && selectedInsumo.id !== undefined) {
                        eliminarMutation.mutate(selectedInsumo.id);
                    }
                }}
            >
                <p>Esta acción es irreversible.</p>
            </ReuModal>
        </DefaultLayout>
    );
};

export default ListaInsumoPage;