from apps.Cultivo.Notificacion.api.signals import send_notification
from apps.Inventario.insumos.api.serializers import InsumoSerializer
from apps.Usuarios.usuarios.models import Usuarios
from django.utils import timezone

def notificar_insumo_estado(insumo, usuarios_ids=None, previous_cantidad=None, previous_fecha_caducidad=None):
    serializer = InsumoSerializer(insumo)
    insumo_data = serializer.data
    
    nombre_insumo = insumo_data.get('nombre', 'Desconocido')
    cantidad = insumo_data.get('cantidad', 0)
    unidad_medida = insumo_data.get('unidad_medida', {}).get('nombre', 'Sin asignar')
    tipo_insumo = insumo_data.get('tipo_insumo', {}).get('nombre', 'Sin asignar')
    fecha_caducidad = insumo.fecha_caducidad
    umbral_cantidad = 10  # Umbral para considerar el insumo agotado o bajo
    dias_caducidad = 7    # Días para considerar que el insumo está próximo a caducar

    # Si no se proporcionan usuarios_ids, obtener administradores e instructores
    if usuarios_ids is None:
        usuarios_ids = list(Usuarios.objects.filter(rol__nombre__in=['administrador', 'instructor']).values_list('id', flat=True))
    
    # Eliminar duplicados
    usuarios_ids = list(set(usuarios_ids))
    
    # Verificar si los usuarios_ids son válidos (solo administradores e instructores)
    usuarios_ids = [uid for uid in usuarios_ids if Usuarios.objects.filter(id=uid, rol__nombre__in=['administrador', 'instructor']).exists()]
    if not usuarios_ids:
        print(f"[DEBUG] No hay administradores ni instructores válidos para notificar sobre insumo {insumo.id}")
        return

    # Verificar si el insumo está agotado o bajo de stock
    if cantidad <= umbral_cantidad and (previous_cantidad is None or previous_cantidad > umbral_cantidad):
        mensaje = (
            f"El insumo {nombre_insumo} está bajo de stock.\n"
            f"Cantidad actual: {cantidad} {unidad_medida}\n"
            f"Tipo de insumo: {tipo_insumo}\n"
        )
        print(f"[DEBUG] Enviando notificación INSUMO_AGOTADO para insumo {insumo.id} a usuarios: {usuarios_ids}")
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
        should_notify_caducidad = 0 < dias_para_caducar <= dias_caducidad
        if previous_fecha_caducidad:
            previous_dias = (previous_fecha_caducidad - hoy).days
            should_notify_caducidad = should_notify_caducidad and (previous_dias > dias_caducidad or previous_dias <= 0)
        if should_notify_caducidad:
            mensaje = (
                f"El insumo {nombre_insumo} está próximo a caducar.\n"
                f"Fecha de caducidad: {fecha_caducidad.strftime('%Y-%m-%d')}\n"
                f"Días restantes: {dias_para_caducar}\n"
                f"Tipo de insumo: {tipo_insumo}\n"
            )
            print(f"[DEBUG] Enviando notificación INSUMO_CADUCANDO para insumo {insumo.id} a usuarios: {usuarios_ids}")
            send_notification(
                recipient_ids=usuarios_ids,
                notification_type='INSUMO_CADUCANDO',
                message=mensaje,
                data={'insumo_id': insumo.id, 'insumo': insumo_data}
            )

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender='insumos.Insumo')
def manejar_notificacion_insumo(sender, instance, created, **kwargs):
    # Obtener los valores anteriores de cantidad y fecha_caducidad (si existen)
    previous_cantidad = instance._original_cantidad if hasattr(instance, '_original_cantidad') else None
    previous_fecha_caducidad = instance._original_fecha_caducidad if hasattr(instance, '_original_fecha_caducidad') else None
    
    # Llamar al manejador de notificaciones
    notificar_insumo_estado(
        instance,
        previous_cantidad=previous_cantidad,
        previous_fecha_caducidad=previous_fecha_caducidad
    )