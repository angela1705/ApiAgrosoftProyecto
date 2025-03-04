# Generated by Django 5.1 on 2024-12-06 05:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('salario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('horas_trabajadas', models.IntegerField()),
                ('total_a_pagar', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('salario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='salario.salario')),
            ],
        ),
    ]
