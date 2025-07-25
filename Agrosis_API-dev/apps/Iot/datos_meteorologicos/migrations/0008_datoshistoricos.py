# Generated by Django 5.1 on 2025-05-15 23:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bancal', '0003_alter_bancal_lote'),
        ('datos_meteorologicos', '0007_delete_evapotranspiracion'),
        ('sensores', '0006_sensor_estado'),
    ]

    operations = [
        migrations.CreateModel(
            name='DatosHistoricos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperatura', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('humedad_ambiente', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('luminosidad', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('lluvia', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('velocidad_viento', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('direccion_viento', models.DecimalField(blank=True, decimal_places=0, max_digits=3, null=True)),
                ('humedad_suelo', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('ph_suelo', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('fecha_promedio', models.DateTimeField()),
                ('cantidad_mediciones', models.IntegerField(default=0)),
                ('fk_bancal', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='bancal.bancal')),
                ('fk_sensor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='sensores.sensor')),
            ],
        ),
    ]
