from django.apps import AppConfig


class InsumosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Inventario.insumos'
    from django.apps import AppConfig
    
    def ready(self):
        import apps.Inventario.insumos.signals