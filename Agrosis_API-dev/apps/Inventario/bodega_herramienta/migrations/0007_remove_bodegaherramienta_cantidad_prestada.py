# Generated by Django 5.1 on 2025-05-01 23:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bodega_herramienta', '0006_alter_bodegaherramienta_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bodegaherramienta',
            name='cantidad_prestada',
        ),
    ]
