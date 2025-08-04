from django.apps import AppConfig


class VentaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Finanzas.venta'


    def ready(self):
        import apps.Finanzas.venta.api.signals