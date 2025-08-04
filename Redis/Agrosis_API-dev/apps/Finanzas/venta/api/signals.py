from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from apps.Finanzas.venta.models import DetalleVenta
from apps.Cultivo.cosechas.models import Cosecha
from apps.Finanzas.costo_beneficio.models import AnalisisCostoBeneficio
from apps.Finanzas.services.services import AnalisisCostoBeneficio as ServicioAnalisis
from decimal import Decimal, InvalidOperation

def safe_decimal(value):
    try:
        val = Decimal(value)
        if val.is_infinite() or val.is_nan():
            return Decimal("0.0")
        return val
    except (InvalidOperation, TypeError):
        return Decimal("0.0")

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
            'mano_obra': safe_decimal(resultado['costos']['mano_obra']),
            'insumos': safe_decimal(resultado['costos']['insumos']),
            'total_costos': safe_decimal(resultado['metricas']['total_costos']),
            'total_ingresos': safe_decimal(resultado['metricas']['total_ingresos']),
            'rentabilidad': safe_decimal(resultado['metricas']['rentabilidad']),
            'roi': safe_decimal(resultado['metricas']['roi']),
        }
    )
