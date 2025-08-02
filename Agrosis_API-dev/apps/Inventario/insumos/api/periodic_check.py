import threading
import time
from django.utils import timezone
from apps.Inventario.insumos.models import Insumo
from apps.Inventario.insumos.api.signals import notificar_insumo_estado

def start_periodic_insumo_check():
    print(f"[INFO] Iniciando verificación periódica de insumos a las {timezone.now()}")
    
    def verificar_insumos():
        while True:
            hoy = timezone.now().date()
            dias_caducidad = 7
            insumos = Insumo.objects.filter(fecha_caducidad__isnull=False)
            
            print(f"[INFO] Verificando insumos a las {timezone.now()}")
            for insumo in insumos:
                dias_para_caducar = (insumo.fecha_caducidad - hoy).days
                if 0 < dias_para_caducar <= dias_caducidad:
                    print(f"[INFO] Insumo {insumo.id} ({insumo.nombre}) está próximo a caducar en {dias_para_caducar} días")
                    notificar_insumo_estado(insumo)
                else:
                    print(f"[INFO] Insumo {insumo.id} ({insumo.nombre}) no está en el umbral de caducidad")
            
            # Esperar 24 horas (86400 segundos)
            time.sleep(86400)
    
    # Ejecutar en un hilo en segundo plano
    thread = threading.Thread(target=verificar_insumos, daemon=True)
    thread.start()