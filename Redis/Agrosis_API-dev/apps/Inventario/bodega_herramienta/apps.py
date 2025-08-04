from django.apps import AppConfig
import os

class BodegaHerramientaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Inventario.bodega_herramienta'

    def ready(self):
        print(f"[DEBUG] Ejecutando ready() en BodegaHerramientaConfig, RUN_MAIN={os.environ.get('RUN_MAIN')}")
        try:
            from apps.Inventario.bodega_herramienta.api.signals import manejar_notificacion_herramienta
            print("[DEBUG] Señal manejar_notificacion_herramienta importada correctamente")
            from apps.Inventario.bodega_herramienta.api.periodic_check import start_periodic_herramienta_check
            print("[DEBUG] start_periodic_herramienta_check importado correctamente")
            # Iniciar solo si no es un proceso hijo
            if os.environ.get('RUN_MAIN') == 'true' or os.environ.get('DJANGO_SETTINGS_MODULE'):
                start_periodic_herramienta_check()
                print("[DEBUG] start_periodic_herramienta_check iniciado")
        except Exception as e:
            print(f"[ERROR] Error en ready(): {str(e)}")