from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import BodegaPrecioProductoViewSet

bodegaPrecioProductoRouter = DefaultRouter()
bodegaPrecioProductoRouter.register(prefix='bodega_precio_producto', viewset=BodegaPrecioProductoViewSet, basename='bodega_precio_producto')

urlpatterns = [
    path('bodega_precio_producto/reporte_pdf/', BodegaPrecioProductoViewSet.as_view({'get': 'reporte_pdf'}), name='reporte-precios-productos'),
]

urlpatterns += bodegaPrecioProductoRouter.urls