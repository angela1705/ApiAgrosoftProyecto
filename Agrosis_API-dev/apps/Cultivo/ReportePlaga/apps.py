from django.apps import AppConfig


class ReporteplagaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.Cultivo.ReportePlaga'
    def ready(self):
        import apps.Cultivo.ReportePlaga.signals