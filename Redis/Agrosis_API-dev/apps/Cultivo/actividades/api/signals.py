from apps.Cultivo.actividades.api.serializers import ActividadSerializer
from apps.Cultivo.Notificacion.api.signals import send_notification 

def notificar_asignacion_actividad(actividad, usuarios_ids):
    serializer = ActividadSerializer(actividad)
    actividad_data = serializer.data
    
    tipo_actividad = actividad_data.get('tipo_actividad_nombre', 'Desconocido')
    cultivo = actividad_data.get('cultivo_nombre', 'Desconocido')
    descripcion = actividad_data.get('descripcion', '')
    usuarios = ', '.join([u['nombre'] for u in actividad_data.get('usuarios_data', [])])
    insumos = ', '.join([f"{i['insumo_nombre']} ({i['cantidad_usada']})" 
                         for i in actividad_data.get('prestamos_insumos', [])])
    herramientas = ', '.join([f"{h['herramienta_nombre']} ({h['cantidad_entregada']})" 
                             for h in actividad_data.get('prestamos_herramientas', [])])
    
    mensaje = (
        f"Se te ha asignado una nueva actividad: {tipo_actividad}\n"
        f"Cultivo: {cultivo}\n"
        f"Descripción: {descripcion}\n"
        f"Usuarios asignados: {usuarios or 'Ninguno'}\n"
        f"Insumos: {insumos or 'Ninguno'}\n"
        f"Herramientas: {herramientas or 'Ninguna'}\n"
    )
    
    send_notification(
        recipient_ids=usuarios_ids,
        notification_type='ACTIVIDAD_ASIGNADA',
        message=mensaje,
        data={'actividad_id': actividad.id, 'actividad': actividad_data}
    )