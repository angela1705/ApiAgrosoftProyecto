from django.apps import AppConfig
import os

class InsumosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Inventario.insumos'

    def ready(self):
        print(f"[DEBUG] Ejecutando ready() en InsumosConfig, RUN_MAIN={os.environ.get('RUN_MAIN')}")
        try:
            from apps.Inventario.insumos.api.signals import handle_insumo_save
            print("[DEBUG] Señal handle_insumo_save importada correctamente")
            from apps.Inventario.insumos.api.periodic_check import start_periodic_insumo_check
            print("[DEBUG] start_periodic_insumo_check importado correctamente")
            # Quitar la condición RUN_MAIN para pruebas
            start_periodic_insumo_check()
            print("[DEBUG] start_periodic_insumo_check iniciado")
        except Exception as e:
            print(f"[ERROR] Error en ready(): {str(e)}")