from rest_framework import serializers
from apps.Cultivo.Notificacion.models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'notification_type', 'message', 'data', 'is_read', 'created_at']