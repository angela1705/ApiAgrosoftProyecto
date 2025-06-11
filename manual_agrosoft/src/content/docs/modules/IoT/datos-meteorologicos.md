---
title: "Datos Meteorológicos"
slug: modules/IoT/datos-meteorologicos
description: "Registro y visualización de datos meteorológicos en Agrosoft."
---

## Visualización de Datos Meteorológicos

Los **datos meteorológicos** son registros históricos recopilados por los sensores de Agrosoft, como temperatura y humedad, que te ayudan a monitorear las condiciones de tus cultivos. Este módulo te permite visualizar estos datos en una tabla y un gráfico para analizar tendencias y tomar decisiones informadas.

**¿Por qué es importante?**

- **Monitoreo de cultivos**: Los datos de temperatura y humedad te ayudan a entender el entorno de tus bancales y optimizar el riego o la ventilación.
- **Trazabilidad**: Los registros están vinculados a sensores y bancales, facilitando el seguimiento del proceso agrícola.
- **Tomas de decisión**: Los gráficos muestran tendencias claras, permitiéndote identificar patrones o anomalías.
- **Accesibilidad**: Todos los usuarios pueden consultar los datos históricos sin necesidad de permisos especiales, mejorando la transparencia.

Esta funcionalidad te permite mantener un control detallado de las condiciones de tus cultivos de manera sencilla.

## Acceso al Módulo de Datos Meteorológicos

Para visualizar los datos meteorológicos, sigue estos pasos:

1. Inicia sesión en Agrosoft.
2. En el **menú lateral izquierdo**, busca la sección **IoT** y haz clic en **Datos Meteorológicos**. Esto te llevará a la pantalla principal del módulo, donde podrás ver los datos históricos.

<img src="/public/iot/iot_DU_1-2.png" alt="Menú de datos meteorológicos" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

## Visualizar Datos Meteorológicos

En la pantalla principal de **Datos Meteorológicos**, encontrarás herramientas para explorar los datos:

- **Selector de Tipo de Dato**: Botones para elegir entre **Temperatura (°C)** o **Humedad (%)**.
- **Selector de Sensor**: Un menú desplegable para filtrar datos por un sensor específico o ver **Todos los sensores**.
- **Tabla de Datos**: Muestra los registros con:
  - **ID**: Identificador único del registro.
  - **Sensor**: Nombre del sensor que recopiló el dato.
  - **Bancal**: Bancal asociado (si aplica).
  - **Valor**: Valor medido (temperatura o humedad).
  - **Fecha de Medición**: Fecha y hora del registro.
- **Gráfico de Evolución**: Un gráfico de línea que muestra los últimos 50 registros, con la fecha/hora en el eje horizontal y el valor (temperatura o humedad) en el eje vertical.

<img src="/public/iot/iot_DU_1-3.png" alt="Pantalla de datos meteorológicos" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />
<img src="/public/iot/iot_DU_1-4.png" alt="Pantalla de datos meteorológicos" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />
## Seleccionar Tipo de Dato

Para elegir qué tipo de dato visualizar:

1. En la sección **Tipo de Dato**, haz clic en uno de los botones:
   - **Temperatura (°C)**: Muestra datos de temperatura con un ícono de termómetro rojo.
   - **Humedad (%)**: Muestra datos de humedad con un ícono de gota azul.
2. La tabla y el gráfico se actualizarán automáticamente para mostrar los datos correspondientes.

<img src="/public/iot/iot_DU_1-5.png" alt="Selector de tipo de dato" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />
<img src="/public/iot/iot_DU_1-6.png" alt="Selector de tipo de dato" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Filtrar por Sensor

Para enfocarte en un sensor específico:

1. En la sección **Seleccionar Sensor**, haz clic en el menú desplegable.
2. Elige un sensor de la lista (ej. "Sensor DHT22 Patio") o selecciona **Todos los sensores** para ver todos los datos disponibles.
3. La tabla y el gráfico se actualizarán para mostrar solo los datos del sensor seleccionado.

<img src="/public/iot/iot_DU_1-7.png" alt="Selector de sensor" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />
<img src="/public/iot/iot_DU_1-8.png" alt="Selector de sensor" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Consultar Datos en la Tabla

La tabla muestra los registros históricos de forma organizada:

1. Revisa la tabla para ver los detalles de cada registro (ID, sensor, bancal, valor, fecha).
2. Usa la barra de desplazamiento para explorar más registros si la lista es larga.

<img src="/public/iot/iot_DU_1-9.png" alt="Tabla de datos" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## Analizar Tendencias en el Gráfico

El gráfico te ayuda a visualizar cómo han cambiado los datos con el tiempo:

1. Observa el **gráfico de línea** para ver los últimos 50 registros.
2. Coloca el cursor sobre un punto del gráfico para ver el valor exacto y la fecha/hora correspondiente.
3. El eje horizontal muestra las fechas y horas, mientras que el eje vertical muestra los valores (en °C para temperatura o % para humedad).

<img src="/public/iot/iot_DU_1-10.png" alt="Gráfico de evolución" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## ¿Por qué importa la visualización de datos meteorológicos en la navegación?

El módulo de **Datos Meteorológicos** es esencial para entender el entorno de tus cultivos. Al visualizar estos datos, puedes:

1. **Monitorear condiciones**: Los datos históricos te permiten identificar cambios en temperatura o humedad que afecten tus cultivos.
2. **Integrar con otros módulos**: Los datos se usan en módulos como **Evapotranspiración** para calcular necesidades de riego.
3. **Generar reportes**: Los registros históricos pueden incluirse en reportes PDF o Excel para análisis detallados.
4. **Mejorar la toma de decisiones**: Las tendencias en el gráfico te ayudan a planificar acciones como ajustes en el riego o protección contra heladas.

## Experiencia por Tipo de Usuario

- **Aprendices y Pasantes**:
  - Pueden **ver** los datos meteorológicos en la tabla y el gráfico.
  - No pueden editar ni eliminar datos (funcionalidad no disponible en este módulo).
  - Pueden descargar reportes generados, si tienen permisos.

- **Instructores**:
  - Pueden **ver** los datos en la tabla y el gráfico.
  - Tienen acceso a reportes y pueden usar los datos para planificar actividades agrícolas.
  - No pueden editar ni eliminar datos, pero pueden gestionar sensores en el módulo correspondiente.

- **Administradores**:
  - Tienen **acceso total** a los datos meteorológicos.
  - Pueden visualizar datos, generar reportes, y gestionar sensores relacionados.
  - Pueden configurar parámetros globales (ej. tipos de sensores) en otros módulos.
 