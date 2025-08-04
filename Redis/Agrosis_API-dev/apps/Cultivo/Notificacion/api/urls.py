from django.urls import path
from apps.Cultivo.Notificacion.api.views import NotificationListView

app_name = 'notificaciones'

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification-list'),
]