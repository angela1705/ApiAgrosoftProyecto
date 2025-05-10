from django.db.models import Sum
from decimal import Decimal
from collections import defaultdict
from apps.Cultivo.actividades.models import Actividad, PrestamoInsumo
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.venta.models import Venta
from apps.Inventario.precio_producto.models import PrecioProducto


class AnalisisCostoBeneficio:
    @staticmethod
    def calcular_para_cosecha(cosecha):
        resultados = {
            'cosecha': {
                'id': cosecha.id,
                'cantidad': cosecha.cantidad,
                'fecha': cosecha.fecha,
                'cultivo': str(cosecha.id_cultivo)
            },
            'costos': defaultdict(Decimal),
            'ingresos': defaultdict(Decimal),
            'metricas': {}
        }

        actividades = Actividad.objects.filter(cultivo=cosecha.id_cultivo)


        pagos = Pago.objects.filter(actividades__in=actividades).distinct()
        resultados['costos']['mano_obra'] = pagos.aggregate(
            total=Sum('total_pago')
        )['total'] or Decimal('0')

        prestamos_insumos = PrestamoInsumo.objects.filter(
            actividad__in=actividades
        ).select_related('insumo')

        for prestamo in prestamos_insumos:
            cantidad_consumida = prestamo.cantidad_usada - prestamo.cantidad_devuelta
            resultados['costos']['insumos'] += cantidad_consumida * prestamo.insumo.precio_insumo

        
        ventas = Venta.objects.filter(
        producto__Producto=cosecha
        )
        
        for venta in ventas:
            resultados['ingresos']['ventas'] += venta.cantidad * venta.producto.precio

        precio_actual = PrecioProducto.objects.filter(
            Producto=cosecha
        ).order_by('-fecha_registro').first()

        if precio_actual:
            resultados['ingresos']['stock_valorizado'] = precio_actual.stock * precio_actual.precio
        else:
            resultados['ingresos']['stock_valorizado'] = Decimal('0')

        total_costos = sum(resultados['costos'].values())
        total_ingresos = resultados['ingresos'].get('ventas', Decimal('0'))

        resultados['metricas']['total_costos'] = total_costos
        resultados['metricas']['total_ingresos'] = total_ingresos
        resultados['metricas']['rentabilidad'] = total_ingresos - total_costos
        resultados['metricas']['roi'] = ((total_ingresos - total_costos) / total_costos * 100) if total_costos > 0 else float('inf')

        return resultados