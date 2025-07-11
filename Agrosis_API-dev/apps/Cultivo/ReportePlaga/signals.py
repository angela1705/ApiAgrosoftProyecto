from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.Cultivo.ReportePlaga.models import ReportePlaga
from apps.Cultivo.ReportePlaga.api.signals import notificar_reporte_plaga, notificar_cambio_estado_plaga

@receiver(post_save, sender=ReportePlaga)
def handle_reporte_plaga_save(sender, instance, created, **kwargs):
    if created:
        # Notificar cuando se crea un nuevo reporte
        notificar_reporte_plaga(instance)
    else:
        # Notificar cuando se actualiza el estado
        notificar_cambio_estado_plaga(instance)