# Generated by Django 5.1.2 on 2024-12-06 13:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rol_permiso', '0002_alter_rolpermiso_rol'),
        ('usuarios', '0002_roles_alter_usuarios_rol'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rolpermiso',
            name='rol',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.roles'),
        ),
    ]
