# Generated by Django 5.1.2 on 2024-12-06 13:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='RolAccion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roles_acciones.accion')),
                ('rol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.roles')),
            ],
        ),
    ]
