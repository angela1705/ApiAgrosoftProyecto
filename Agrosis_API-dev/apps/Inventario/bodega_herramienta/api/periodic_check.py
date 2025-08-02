import threading
import time
from django.utils import timezone
from apps.Inventario.bodega_herramienta.models import BodegaHerramienta
from apps.Inventario.bodega_herramienta.api.signals import notificar_herramienta_estado

def start_periodic_herramienta_check():
    print(f"[INFO] Iniciando verificación periódica de herramientas a las {timezone.now()}")
    
    def verificar_herramientas():
        print("[DEBUG] Hilo de verificación periódica de herramientas iniciado")
        while True:
            try:
                herramientas = BodegaHerramienta.objects.all()
                umbral_cantidad = 10
                
                print(f"[INFO] Verificando {herramientas.count()} herramientas a las {timezone.now()}")
                for herramienta in herramientas:
                    if herramienta.cantidad <= umbral_cantidad:
                        print(f"[INFO] Herramienta {herramienta.id} ({herramienta.herramienta.nombre}) tiene stock bajo: {herramienta.cantidad} unidades")
                        notificar_herramienta_estado(herramienta)
                    else:
                        print(f"[INFO] Herramienta {herramienta.id} ({herramienta.herramienta.nombre}) no está en el umbral de stock bajo")
                
                # Esperar 24 horas (86400 segundos)
                print("[DEBUG] Hilo de herramientas durmiendo por 24 horas")
                time.sleep(86400)
            except Exception as e:
                print(f"[ERROR] Error en verificar_herramientas: {str(e)}")
                time.sleep(60)  # Esperar 1 minuto antes de reintentar si hay error
    
    # Ejecutar en un hilo en segundo plano
    try:
        thread = threading.Thread(target=verificar_herramientas, daemon=True)
        thread.start()
        print("[DEBUG] Hilo de verificación periódica de herramientas creado y iniciado")
    except Exception as e:
        print(f"[ERROR] Error al iniciar el hilo de verificación de herramientas: {str(e)}")