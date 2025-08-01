# Generated by Django 5.1 on 2025-04-30 22:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bodega_herramienta', '0005_alter_bodegaherramienta_cantidad'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bodegaherramienta',
            options={'verbose_name': 'Bodega Herramienta', 'verbose_name_plural': 'Bodega Herramientas'},
        ),
        migrations.AddField(
            model_name='bodegaherramienta',
            name='cantidad_prestada',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='bodegaherramienta',
            name='costo_total',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='bodegaherramienta',
            name='creador',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bodega_herramientas_creadas', to=settings.AUTH_USER_MODEL),
        ),
    ]
