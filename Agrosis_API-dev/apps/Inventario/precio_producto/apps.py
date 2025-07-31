from django.apps import AppConfig


class PrecioProductoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Inventario.precio_producto'

    def ready(self):
        import apps.Inventario.precio_producto.api.signals