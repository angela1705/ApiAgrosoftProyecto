# Generated by Django 5.1.2 on 2024-12-06 13:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rol_permiso', '0001_initial'),
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rolpermiso',
            name='rol',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.rol'),
        ),
    ]
