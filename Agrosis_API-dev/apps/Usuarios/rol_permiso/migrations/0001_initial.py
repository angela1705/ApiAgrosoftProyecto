# Generated by Django 5.1.2 on 2024-12-06 13:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('permisos', '0001_initial'),
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RolPermiso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permiso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='permisos.permiso')),
                ('rol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.roles')),
            ],
            options={
                'unique_together': {('rol', 'permiso')},
            },
        ),
    ]
