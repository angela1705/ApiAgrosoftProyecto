from django.db import models
from apps.Usuarios.usuarios.models import Usuarios

class Notification(models.Model):
    TYPE_CHOICES = (
        ('ACTIVIDAD_ASIGNADA', 'Actividad Asignada'),
        ('INSUMO_AGOTADO', 'Insumo Agotado'),
        ('INSUMO_CADUCANDO', 'Insumo Caducando'),
        ('PEST_ALERT', 'Alerta de Plagas'),
        ('HERRAMIENTA_EN_USO', 'Herramienta en Uso'),
        ('HERRAMIENTA_BAJA_STOCK', 'Herramienta Baja de Stock'),
        ('OTHER', 'Otro'),
    )

    recipient = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    message = models.TextField()
    data = models.JSONField(default=dict, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.recipient.nombre}: {self.message}"