from django.db import models
from apps.Usuarios.usuarios.models import Usuarios

class Notification(models.Model):
    TYPE_CHOICES = (
        ('ACTIVIDAD_ASIGNADA', 'Actividad Asignada'),
        ('INSUMO_AGOTADO', 'Insumo Agotado'),
        ('INSUMO_CADUCANDO', 'Insumo Caducando'),
        ('PEST_ALERT', 'Alerta de Plagas'),
        ('OTHER', 'Otro'),
    )

    recipient = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    message = models.TextField()
    data = models.JSONField(default=dict, blank=True)  # Para datos adicionales (ej. actividad_id, insumo_id)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.recipient.nombre}: {self.message}"