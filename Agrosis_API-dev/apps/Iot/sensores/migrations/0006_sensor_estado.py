# Generated by Django 5.1 on 2025-05-13 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sensores', '0005_delete_sensores'),
    ]

    operations = [
        migrations.AddField(
            model_name='sensor',
            name='estado',
            field=models.CharField(choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')], default='inactivo', max_length=10),
        ),
    ]
