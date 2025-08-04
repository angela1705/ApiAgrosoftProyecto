from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.Cultivo.Notificacion.models import Notification
from rest_framework.permissions import IsAuthenticated

class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(recipient=request.user).order_by('-created_at')
        data = [
            {
                'id': str(notification.id),
                'notification_type': notification.notification_type,
                'message': notification.message,
                'data': notification.data,
                'created_at': notification.created_at.isoformat(),
                'is_read': notification.is_read,
            }
            for notification in notifications
        ]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        action = request.data.get('action')
        if action == 'mark_read':
            notification_id = request.data.get('notification_id')
            try:
                notification = Notification.objects.get(id=notification_id, recipient=request.user)
                notification.is_read = True
                notification.save()
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
            except Notification.DoesNotExist:
                return Response({'error': 'Notificación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        elif action == 'delete':
            notification_id = request.data.get('notification_id')
            try:
                notification = Notification.objects.get(id=notification_id, recipient=request.user)
                notification.delete()
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
            except Notification.DoesNotExist:
                return Response({'error': 'Notificación no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        elif action == 'clear_all':
            Notification.objects.filter(recipient=request.user).delete()
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        return Response({'error': 'Acción no válida'}, status=status.HTTP_400_BAD_REQUEST)