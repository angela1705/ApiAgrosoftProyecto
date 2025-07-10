from apps.Inventario.insumos.api.serializers import InsumoSerializer
from apps.Cultivo.Notificacion.api.signals import send_notification
from django.utils import timezone
from apps.Usuarios.usuarios.models import Usuarios

def notificar_insumo_estado(insumo, usuarios_ids):
    serializer = InsumoSerializer(insumo)
    insumo_data = serializer.data
    
    nombre_insumo = insumo_data.get('nombre', 'Desconocido')
    cantidad = insumo_data.get('cantidad', 0)
    unidad_medida = insumo_data.get('unidad_medida', {}).get('nombre', 'Sin asignar')
    tipo_insumo = insumo_data.get('tipo_insumo', {}).get('nombre', 'Sin asignar')
    fecha_caducidad = insumo.fecha_caducidad
    umbral_cantidad = 10  # Umbral para considerar el insumo agotado o bajo
    dias_caducidad = 7    # Días para considerar que el insumo está próximo a caducar

    # Verificar si los usuarios_ids son válidos
    usuarios_ids = [uid for uid in usuarios_ids if Usuarios.objects.filter(id=uid, rol='ADMIN').exists()]
    if not usuarios_ids:
        return  # No enviar notificaciones si no hay usuarios válidos

    # Verificar si el insumo está agotado o bajo de stock
    if cantidad <= umbral_cantidad:
        mensaje = (
            f"El insumo {nombre_insumo} está bajo de stock.\n"
            f"Cantidad actual: {cantidad} {unidad_medida}\n"
            f"Tipo de insumo: {tipo_insumo}\n"
        )
        send_notification(
            recipient_ids=usuarios_ids,
            notification_type='INSUMO_AGOTADO',
            message=mensaje,
            data={'insumo_id': insumo.id, 'insumo': insumo_data}
        )

    # Verificar si el insumo está próximo a caducar
    if fecha_caducidad:
        hoy = timezone.now().date()
        dias_para_caducar = (fecha_caducidad - hoy).days
        if 0 < dias_para_caducar <= dias_caducidad:
            mensaje = (
                f"El insumo {nombre_insumo} está próximo a caducar.\n"
                f"Fecha de caducidad: {fecha_caducidad.strftime('%Y-%m-%d')}\n"
                f"Días restantes: {dias_para_caducar}\n"
                f"Tipo de insumo: {tipo_insumo}\n"
            )
            send_notification(
                recipient_ids=usuarios_ids,
                notification_type='INSUMO_CADUCANDO',
                message=mensaje,
                data={'insumo_id': insumo.id, 'insumo': insumo_data}
            )