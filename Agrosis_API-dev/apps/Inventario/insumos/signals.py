from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.Inventario.insumos.models import Insumo
from apps.Inventario.insumos.api.signals import notificar_insumo_estado

@receiver(post_save, sender=Insumo)
def handle_insumo_save(sender, instance, created, **kwargs):
    print(f"[DEBUG] Señal post_save disparada para Insumo {instance.id}, creado: {created}")
    previous_cantidad = None
    previous_fecha_caducidad = None
    
    if not created:
        # Obtener el estado anterior desde la base de datos
        try:
            previous_instance = Insumo.objects.get(id=instance.id)
            previous_cantidad = previous_instance.cantidad
            previous_fecha_caducidad = previous_instance.fecha_caducidad
        except Insumo.DoesNotExist:
            pass
    
    # Disparar notificación si es nuevo o si cambió cantidad/fecha_caducidad
    if created or previous_cantidad != instance.cantidad or previous_fecha_caducidad != instance.fecha_caducidad:
        print(f"[DEBUG] Insumo {instance.id} creado o cantidad/fecha_caducidad cambiados")
        notificar_insumo_estado(
            instance,
            previous_cantidad=previous_cantidad,
            previous_fecha_caducidad=previous_fecha_caducidad
        )