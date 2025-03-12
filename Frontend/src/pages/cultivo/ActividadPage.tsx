import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarActividad, useActividades, useInsumos, useUsuarios } from "@/hooks/cultivo/useActividad";
import { useTipoActividad } from "@/hooks/cultivo/usetipoactividad";
import { useProgramaciones } from "@/hooks/cultivo/useProgramacion";
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import ActividadNotifications from "@/components/cultivo/ActividadNotifications";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const ActividadPage: React.FC = () => {
    const [actividad, setActividad] = useState({
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        tipo_actividad: 0,
        programacion: 0,
        usuario: 0,
        cultivo: 0,
        insumo: 0,
        cantidadUsada: 0,
    });

    const mutation = useRegistrarActividad();
    const { data: actividades, isLoading } = useActividades();
    const { data: tiposActividad } = useTipoActividad();
    const { data: programaciones } = useProgramaciones();
    const { data: usuarios } = useUsuarios();
    const { data: cultivos } = useCultivos();
    const { data: insumos } = useInsumos();

    const columns = [
        { name: "Descripción", uid: "descripcion" },
        { name: "Fecha Inicio", uid: "fecha_inicio" },
        { name: "Fecha Fin", uid: "fecha_fin" },
        { name: "Tipo Actividad", uid: "tipo_actividad" },
        { name: "Programación", uid: "programacion" },
        { name: "Usuario", uid: "usuario" },
        { name: "Cultivo", uid: "cultivo" },
        { name: "Insumo", uid: "insumo" },
        { name: "Cantidad Usada", uid: "cantidadUsada" },
        { name: "Acciones", uid: "acciones" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setActividad((prev) => ({
            ...prev,
            [name]: name === "descripcion" || name === "fecha_inicio" || name === "fecha_fin" ? value : Number(value),
        }));
    };

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center min-h-screen p-6">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Asignar actividad</h2>

                    <ReuInput
                        label="Descripción"
                        placeholder="Ingrese la descripción"
                        type="text"
                        value={actividad.descripcion}
                        onChange={(e) => setActividad({ ...actividad, descripcion: e.target.value })}
                    />

                    <ReuInput
                        label="Fecha de Inicio"
                        type="date"
                        value={actividad.fecha_inicio}
                        onChange={(e) => setActividad({ ...actividad, fecha_inicio: e.target.value })}
                    />

                    <ReuInput
                        label="Fecha de Fin"
                        type="date"
                        value={actividad.fecha_fin}
                        onChange={(e) => setActividad({ ...actividad, fecha_fin: e.target.value })}
                    />

                    <label className="block text-sm font-medium text-gray-700 mt-4">Tipo de Actividad</label>
                    <select name="tipo_actividad" value={actividad.tipo_actividad || ""} onChange={handleChange}>
                        <option value="">Seleccione un tipo de actividad</option>
                        {tiposActividad?.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Programación</label>
                    <select name="programacion" value={actividad.programacion || ""} onChange={handleChange}>
                        <option value="">Seleccione una programación</option>
                        {programaciones?.map((programacion) => (
                            <option key={programacion.id} value={programacion.id}>{programacion.nombre}</option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Usuario</label>
                    <select name="usuario" value={actividad.usuario || ""} onChange={handleChange}>
                        <option value="">Seleccione un usuario</option>
                        {usuarios?.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Cultivo</label>
                    <select name="cultivo" value={actividad.cultivo || ""} onChange={handleChange}>
                        <option value="">Seleccione un cultivo</option>
                        {cultivos?.map((cultivo) => (
                            <option key={cultivo.id} value={cultivo.id}>{cultivo.nombre}</option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mt-4">Insumo</label>
                    <select name="insumo" value={actividad.insumo || ""} onChange={handleChange}>
                        <option value="">Seleccione un insumo</option>
                        {insumos?.map((insumo) => (
                            <option key={insumo.id} value={insumo.id}>{insumo.nombre}</option>
                        ))}
                    </select>

                    <ReuInput
                        label="Cantidad Usada"
                        type="number"
                        value={actividad.cantidadUsada}
                        onChange={(e) => setActividad({ ...actividad, cantidadUsada: Number(e.target.value) })}
                    />

                    <button
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
                        type="submit"
                        disabled={mutation.isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            mutation.mutate(actividad);
                        }}
                    >
                        {mutation.isPending ? "Registrando..." : "Guardar"}
                    </button>
                </div>

                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Actividades</h2>
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
                                {(actividades ?? []).map((actividad) => (
                                    <TableRow key={actividad.id}>
                                        <TableCell>{actividad.descripcion}</TableCell>
                                        <TableCell>{actividad.fecha_inicio}</TableCell>
                                        <TableCell>{actividad.fecha_fin}</TableCell>
                                        <TableCell>{actividad.tipo_actividad}</TableCell>
                                        <TableCell>{actividad.programacion}</TableCell>
                                        <TableCell>{actividad.usuario}</TableCell>
                                        <TableCell>{actividad.cultivo}</TableCell>
                                        <TableCell>{actividad.insumo}</TableCell>
                                        <TableCell>{actividad.cantidadUsada}</TableCell>
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
            <ActividadNotifications userId={1} />
        </DefaultLayout>
    );
};

export default ActividadPage;