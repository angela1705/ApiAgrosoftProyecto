---
title: "Datos Meteorológicos en Tiempo Real"
slug: modules/IoT/sensores-en-tiemporeal
description: "Registro y visualización de datos meteorológicos Tiempo Real en Agrosoft."
---
# Datos Meteorológicos en Tiempo Real

## Visualización de Datos Meteorológicos en Tiempo Real

Los **datos meteorológicos en tiempo real** son mediciones actuales recopiladas por los sensores de Agrosoft, como temperatura y humedad, que te permiten monitorear las condiciones de tus cultivos al instante. Este módulo muestra los datos en tarjetas informativas y un gráfico dinámico, ayudándote a analizar las condiciones actuales y tomar decisiones rápidas.

**¿Por qué es importante?**

- **Monitoreo instantáneo**: Observa las condiciones actuales de tus cultivos para reaccionar ante cambios en temperatura o humedad.
- **Trazabilidad**: Los datos están vinculados a sensores y bancales, facilitando el seguimiento.
- **Tomas de decisión**: Las tarjetas y gráficos muestran información clara para identificar anomalías o patrones.
- **Accesibilidad**: Todos los usuarios pueden consultar los datos en tiempo real sin permisos especiales, mejorando la transparencia.

Esta funcionalidad te ayuda a mantener un control inmediato y detallado de las condiciones de tus cultivos.

## Acceso al Módulo de Datos Meteorológicos en Tiempo Real

Para visualizar los datos meteorológicos en tiempo real, sigue estos pasos:

1. Inicia sesión en Agrosoft.
2. En el **menú lateral izquierdo**, busca la sección **IoT** y haz clic en **Datos en Tiempo Real**. Esto te llevará a la pantalla principal del módulo, donde verás los datos actuales.

<img src="/public/iot/iot_DU_2-1.png" alt="Menú de datos en tiempo real" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

## Visualizar Datos Meteorológicos en Tiempo Real

En la pantalla principal de **Datos Meteorológicos en Tiempo Real**, encontrarás herramientas para explorar los datos:

- **Selector de Tipo de Dato**: Botones para elegir entre **Temperatura (°C)** o **Humedad (%)**.
- **Selector de Sensor**: Un menú desplegable para filtrar datos por un sensor específico o ver **Todos los sensores**.
- **Tarjetas de Datos**: Muestran los valores actuales con: 
  - **Valor**: Valor medido (temperatura o humedad). 

<img src="/public/iot/iot_DU_2-2.png" alt="Pantalla de datos en tiempo real" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## Seleccionar Tipo de Dato

Para elegir qué tipo de dato visualizar:

1. En la sección **Tipo de Dato**, haz clic en uno de los botones:
   - **Temperatura (°C)**: Muestra datos de temperatura con un ícono de termómetro rojo.
   - **Humedad (%)**: Muestra datos de humedad con un ícono de gota azul.
2. Las tarjetas y el gráfico se actualizarán automáticamente para mostrar los datos correspondientes.

<img src="/public/iot/iot_DU_2-3.png" alt="Selector de tipo de dato" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Filtrar por Sensor

Para enfocarte en un sensor específico:

1. En la sección **Seleccionar Sensor**, haz clic en el menú desplegable.
2. Elige un sensor de la lista (ej. "Sensor DHT22 Patio") o selecciona **Todos los sensores** para ver todos los datos disponibles.
3. Las tarjetas y el gráfico se actualizarán para mostrar solo los datos del sensor seleccionado.

<img src="/public/iot/iot_DU_2-4.png" alt="Selector de sensor" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Consultar Datos en las Tarjetas

Las tarjetas muestran los datos en tiempo real de forma clara:

1. Revisa las tarjetas para ver los detalles de cada sensor (Valor).
2. Cada tarjeta presenta la información más reciente del sensor seleccionado.

<img src="/public/iot/iot_DU_2-5.png" alt="Tarjetas de datos" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## Analizar Tendencias en el Gráfico

El gráfico te ayuda a visualizar cómo cambian los datos en tiempo real:

1. Observa el **gráfico de línea** para ver los datos más recientes.
2. Coloca el cursor sobre un punto del gráfico para ver el valor exacto y la fecha/hora correspondiente.
3. El eje horizontal muestra el tiempo, mientras que el eje vertical muestra los valores (en °C para temperatura o % para humedad).

<img src="/public/iot/iot_DU_2-6.png" alt="Gráfico de evolución" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## ¿Por qué importa la visualización de datos meteorológicos en tiempo real?

El módulo de **Datos Meteorológicos en Tiempo Real** es clave para mantener tus cultivos bajo control. Al visualizar estos datos, puedes:

1. **Monitorear condiciones**: Los datos en tiempo real te permiten reaccionar rápidamente ante cambios en temperatura o humedad.
2. **Integrar con otros módulos**: Los datos se usan en módulos como **Evapotranspiración** para calcular necesidades de riego.
3. **Generar reportes**: Los datos en tiempo real pueden incluirse en reportes PDF o Excel para análisis detallados.
4. **Mejorar la toma de decisiones**: Los gráficos y tarjetas te ayudan a planificar acciones como ajustes en el riego o protección contra cambios climáticos.

## Experiencia por Tipo de Usuario

- **Aprendices y Pasantes**:
  - Pueden **ver** los datos en tiempo real en las tarjetas y el gráfico.
  - No pueden editar ni eliminar datos (funcionalidad no disponible en este módulo).
  - Pueden descargar reportes generados, si tienen permisos.

- **Instructores**:
  - Pueden **ver** los datos en tiempo real en las tarjetas y el gráfico.
  - Tienen acceso a reportes y pueden usar los datos para planificar actividades agrícolas.
  - No pueden editar ni eliminar datos, pero pueden gestionar sensores en el módulo correspondiente.

- **Administradores**:
  - Tienen **acceso total** a los datos en tiempo real.
  - Pueden visualizar datos, generar reportes, y gestionar sensores relacionados.
  - Pueden configurar parámetros globales (ej. tipos de sensores) en otros módulos.
  