# apps/Finanzas/precio_producto/api/router.py
from rest_framework.routers import DefaultRouter
from apps.Finanzas.precio_producto.api.views import PrecioProductoViewSet

precioProductoRouter = DefaultRouter()
precioProductoRouter.register(prefix='precios', viewset=PrecioProductoViewSet, basename='precios')