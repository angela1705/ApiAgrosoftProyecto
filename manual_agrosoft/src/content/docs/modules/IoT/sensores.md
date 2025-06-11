---
title: "Módulo de IoT - Gestión de Sensores"  
slug: modules/IoT/sensores  
description: "Cómo administrar sensores en el módulo de IoT de Agrosoft para monitoreo en tiempo real de condiciones meteorológicas en cultivos."  
---

## Gestión de Sensores

Los **sensores** son dispositivos clave en Agrosoft que recopilan información en tiempo real sobre las condiciones de tus cultivos, como temperatura, humedad, luminosidad, y más. Gestionar tus sensores te permite monitorear tus bancales de forma eficiente y garantizar que los datos sean precisos.

**¿Por qué es importante?**

- **Monitoreo en tiempo real**: Los sensores activos envían datos continuos para que tomes decisiones informadas sobre el riego, fertilización, y otros cuidados.
- **Trazabilidad**: Vincular sensores a bancales asegura que los datos se asocien correctamente con tus cultivos, mejorando el control del proceso agrícola.
- **Flexibilidad**: Puedes registrar nuevos sensores, editar su información, o desactivarlos si ya no son necesarios.
- **Seguridad y control**: Solo los usuarios autorizados (instructores y administradores) pueden modificar sensores, garantizando la integridad de los datos.

Esta funcionalidad te ayuda a mantener tus sensores organizados y optimiza la gestión de tus cultivos.

## Acceso al Módulo de Sensores

Para gestionar tus sensores, sigue estos pasos:

1. Inicia sesión en Agrosoft.
2. En el **menú lateral izquierdo**, busca la sección **IoT** y haz clic en **Lista de sensores**. Esto te llevará a la pantalla principal del módulo de sensores, donde podrás ver la lista de sensores registrados.

<img src="/public/iot/iot_DU_1.png" alt="Menú de sensores" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

## Lista de Sensores

En la pantalla principal de **Sensores**, encontrarás una tabla con la siguiente información para cada sensor:

- **ID**: Identificador único del sensor.
- **Nombre**: Nombre descriptivo (ej. "Sensor DHT22 Patio").
- **Tipo**: Tipo de sensor (ej. "DHT22").
- **Unidad**: Unidad de medida (ej. "°C/%").
- **Código Dispositivo**: Código único del dispositivo físico.
- **Bancal**: Bancal asociado (si aplica).
- **Estado**: Indica si el sensor está **Activo** o **Inactivo**.
- **Acciones**: Opciones para editar, eliminar, o cambiar el estado del sensor.

<img src="/public/iot/iot_DU_2.png" alt="Lista de sensores" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

En la parte superior derecha, encontrarás un ícono de **ayuda** (un signo de interrogación) que abre una **guía de uso** con instrucciones adicionales.

## Registrar un Nuevo Sensor

Para agregar un sensor al sistema:

1. En la pantalla de **Sensores**, haz clic en el botón **+ Registrar Sensor** ubicado en la parte superior izquierda.
<img src="/public/iot/iot_DU_3.png" alt="Lista de sensores" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />
2. Completa el formulario con la siguiente información:
   - **Nombre**: Un nombre único para identificar el sensor (ej. "Sensor DHT22 Patio").
   - **Tipo de Sensor**: Selecciona el tipo (ej. "DHT22").
   - **Descripción**: Información adicional (opcional).
   - **Medida Mínima**: Valor mínimo que el sensor puede registrar.
   - **Medida Máxima**: Valor máximo que el sensor puede registrar. 
   - **Código Dispositivo**: Código único del dispositivo físico (ej. "DHT22_001").
   - **Bancal**: Selecciona un bancal para asociarlo (opcional).
3. Haz clic en **Guardar** para registrar el sensor.

<img src="/public/iot/iot_DU_4.png" alt="Formulario de registro" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Editar un Sensor

Para modificar la información de un sensor existente:

1. En la tabla de sensores, busca el sensor que deseas editar.
2. Haz clic en el ícono de **Editar** (un lápiz) en la columna **Acciones**.
3. Actualiza los campos necesarios en el formulario que aparece (nombre, descripción, bancal, etc.).
4. Haz clic en **Guardar** para confirmar los cambios.

<img src="/public/iot/iot_DU_5.png" alt="Editar sensor" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Cambiar el Estado de un Sensor

Puedes activar o desactivar un sensor para controlar si envía datos al sistema:

1. En la tabla de sensores, localiza el sensor.
2. En la columna **Acciones**, usa el **interruptor** (Switcher) para cambiar el estado:
   - **Verde**: Sensor activo (envía datos).
   - **Rojo**: Sensor inactivo (no envía datos).
3. El cambio se guarda automáticamente.

## Eliminar un Sensor

Para eliminar un sensor que ya no necesitas:

1. En la tabla de sensores, busca el sensor.
2. Haz clic en el ícono de **Eliminar** (un basurero rojo) en la columna **Acciones**.
3. Confirma la eliminación en el mensaje que aparece.
4. El sensor será eliminado del sistema.

<img src="/public/iot/iot_DU_6.png" alt="Confirmar eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

**Nota**: Solo los sensores inactivos o sin datos asociados pueden eliminarse fácilmente. Contacta a un administrador si encuentras problemas.

## ¿Por qué importa la gestión de sensores en la navegación?

El módulo de **Sensores** es fundamental para el monitoreo de tus cultivos. Al gestionar sensores correctamente, puedes:

1. **Monitorear condiciones**: Los datos de los sensores te ayudan a tomar decisiones sobre el cuidado de tus cultivos.
2. **Integrar con otros módulos**: Los sensores están vinculados a módulos como **Datos Meteorológicos** y **Evapotranspiración**, que dependen de ellos.
3. **Generar reportes**: Los datos de sensores activos se usan para crear reportes en PDF o Excel.
4. **Optimizar recursos**: Aseguras que solo los sensores necesarios estén activos, ahorrando energía y mejorando el rendimiento.

## Experiencia por Tipo de Usuario

- **Aprendices y Pasantes**:
  - Pueden **ver** la lista de sensores y sus datos.
  - No pueden registrar, editar, eliminar, ni cambiar el estado de sensores.
  - Pueden descargar reportes generados por sensores (si tienen permisos).

- **Instructores**:
  - Pueden **ver**, **registrar**, **editar**, y **cambiar el estado** de sensores.
  - Pueden eliminar sensores, salvo restricciones del sistema.
  - Tienen acceso a reportes y datos en tiempo real.

- **Administradores**:
  - Tienen **acceso total** al módulo de sensores.
  - Pueden realizar todas las acciones (registrar, editar, eliminar, cambiar estado).
  - Gestionan permisos de otros usuarios y resuelven conflictos (ej. eliminación de sensores con datos asociados). 