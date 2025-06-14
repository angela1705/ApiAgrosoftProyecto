# Generated by Django 5.1 on 2025-05-15 23:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('insumos', '0014_remove_insumo_es_compuesto_delete_insumocompuesto'),
        ('precio_producto', '0006_alter_precioproducto_options_and_more'),
        ('venta', '0007_venta_cambio_venta_monto_entregado_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='venta',
            name='cantidad',
        ),
        migrations.RemoveField(
            model_name='venta',
            name='producto',
        ),
        migrations.RemoveField(
            model_name='venta',
            name='total',
        ),
        migrations.RemoveField(
            model_name='venta',
            name='unidades_de_medida',
        ),
        migrations.AlterField(
            model_name='venta',
            name='fecha',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.CreateModel(
            name='DetalleVenta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField()),
                ('total', models.DecimalField(decimal_places=2, editable=False, max_digits=10)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='precio_producto.precioproducto')),
                ('unidades_de_medida', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='insumos.unidadmedida')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalles', to='venta.venta')),
            ],
        ),
    ]
