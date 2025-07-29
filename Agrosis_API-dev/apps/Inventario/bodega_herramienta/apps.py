from django.apps import AppConfig


class BodegaHerramientaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Inventario.bodega_herramienta'

    def ready(self):
        import apps.Inventario.bodega_herramienta.api.signals