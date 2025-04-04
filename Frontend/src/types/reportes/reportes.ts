export const opcionesModulos = [
    { nombre: "Cultivo", modulo: "cultivo" },
    { nombre: "Inventario", modulo: "inventario" },
    { nombre: "Usuarios", modulo: "usuarios" },
    { nombre: "IoT", modulo: "iot" },
    { nombre: "Finanzas", modulo: "finanzas" },
];

export const reportesPorModulo: Record<string, { nombre: string; reporte: string }[]> = {
    cultivo: [
        { nombre: "Reporte de Cosechas", reporte: "cosechas" },
    ],
    inventario: [
        { nombre: "Reporte de Herramientas", reporte: "bodega_herramienta" },
        { nombre: "Reporte de Insumos", reporte: "bodega_insumo" },
    ],
    usuarios: [
        { nombre: "Reporte de Usuarios Activos", reporte: "usuarios_activos" },
    ],
    iot: [
        { nombre: "Reporte de Sensores", reporte: "sensores" },
    ],
    finanzas: [
        { nombre: "Reporte de Ingresos", reporte: "ingresos" },
        { nombre: "Reporte de Gastos", reporte: "gastos" },
    ],
};
