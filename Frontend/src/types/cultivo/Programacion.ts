export interface Programacion {
    id?: number;
    ubicacion: string;
    hora_prog: string; // Puedes usar `Date` si prefieres manejar fechas directamente
    fecha_prog: string; // Puedes usar `Date` si prefieres manejar fechas directamente
    estado: boolean;
}