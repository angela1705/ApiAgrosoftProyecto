from django.apps import AppConfig


class NotificacionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Cultivo.Notificacion'
    def ready(self):
        import apps.Cultivo.Notificacion.api.signals
