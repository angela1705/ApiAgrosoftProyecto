from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from apps.Finanzas.venta.models import DetalleVenta
from apps.Cultivo.cosechas.models import Cosecha
from apps.Finanzas.costo_beneficio.models import AnalisisCostoBeneficio
from apps.Finanzas.services.services import AnalisisCostoBeneficio as ServicioAnalisis

@receiver([post_save, post_delete], sender=DetalleVenta)
def actualizar_analisis_costo_beneficio(sender, instance, **kwargs):
    
    producto = instance.producto 
    cosecha = getattr(producto, 'Producto', None)

    if not cosecha or not isinstance(cosecha, Cosecha):
        return  

    resultado = ServicioAnalisis.calcular_para_cosecha(cosecha)

    AnalisisCostoBeneficio.objects.update_or_create(
        cosecha=cosecha,
        defaults={
            'mano_obra': resultado['costos']['mano_obra'],
            'insumos': resultado['costos']['insumos'],
            'total_costos': resultado['metricas']['total_costos'],
            'total_ingresos': resultado['metricas']['total_ingresos'],
            'rentabilidad': resultado['metricas']['rentabilidad'],
            'roi': resultado['metricas']['roi'],
        }
    )