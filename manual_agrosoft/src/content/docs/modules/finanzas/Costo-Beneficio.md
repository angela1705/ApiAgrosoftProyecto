---
title: Gestión de Costo-Beneficio
slug: modules/finanzas/Costo-Beneficio
---

# Análisis de Costo-Beneficio

## Visualización de Costos y Beneficios por Cosecha

El módulo **Análisis de Costo-Beneficio** de Agrosoft permite a los usuarios consultar y analizar los costos, ingresos y métricas financieras de las cosechas registradas. Este módulo muestra un listado de cosechas en tarjetas interactivas y, al seleccionar una, presenta un detalle completo de su análisis financiero, incluyendo costos, ingresos, rentabilidad y retorno de inversión (ROI). Es una herramienta clave para evaluar la rentabilidad de los cultivos y tomar decisiones informadas.

**¿Por qué es importante?**

- **Evaluación financiera**: Proporciona un resumen claro de los costos e ingresos de cada cosecha, ayudando a entender su desempeño económico.
- **Toma de decisiones**: Las métricas como rentabilidad y ROI permiten identificar cuáles cultivos son más rentables y planificar futuras siembras.
- **Búsqueda eficiente**: Permite filtrar cosechas por nombre o fecha para encontrar rápidamente la información deseada.
- **Accesibilidad**: Todos los usuarios pueden consultar los análisis financieros sin necesidad de permisos especiales, fomentando la transparencia.

Este módulo ayuda a los agricultores a gestionar sus recursos de manera más eficiente y a maximizar la rentabilidad de sus cultivos.

## Acceso al Módulo de Análisis de Costo-Beneficio

Para consultar los análisis financieros:

1. Inicia sesión en Agrosoft.
2. En el **menú lateral izquierdo**, busca la sección **Finanzas** y haz clic en **Costo-Beneficio**. Esto te llevará a la pantalla principal del módulo, donde podrás ver el listado de cosechas.

<img src="/public/finanzas/costo_beneficio_menu.png" alt="Menú de costo-beneficio" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

## Visualizar Listado de Cosechas

En la pantalla principal de **Análisis de Costo-Beneficio**, encontrarás herramientas para explorar las cosechas:

- **Filtros de búsqueda**:
  - **Nombre**: Ingresa el nombre de la cosecha para filtrar los resultados.
  - **Fecha**: Selecciona una fecha específica para buscar cosechas registradas en ese período.
  - Haz clic en **Buscar** para actualizar la lista según los filtros aplicados.
- **Tarjetas de cosechas**: Cada cosecha se muestra en una tarjeta que incluye:
  - **Número de cosecha**: Identificador único (ej. "Cosecha #1").
  - **Nombre del cultivo**: Nombre del cultivo asociado (ej. "Maíz").
  - **Imagen**: Una imagen representativa de la cosecha (por defecto, si no se personaliza).

<img src="/public/finanzas/costo_beneficio_lista.png" alt="Listado de cosechas" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## Consultar Análisis de una Cosecha

Para ver el análisis financiero de una cosecha específica:

1. Haz clic en una tarjeta de cosecha en el listado.
2. Se abrirá un modal con el título **Análisis de Costo-Beneficio - Cosecha #X**, donde se mostrará la información detallada.

<img src="/public/finanzas/costo_beneficio_modal.png" alt="Modal de análisis financiero" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

El modal incluye tres secciones:

### 1. Costos
- Muestra un desglose de los costos asociados a la cosecha (ej. "Semillas", "Fertilizantes", "Mano de obra").
- Cada costo se presenta con su valor en pesos colombianos (COP), formateado con separadores de miles (ej. "COP 1.500.000").
- Esta sección está resaltada en un fondo azul claro para facilitar su identificación.

<img src="/public/finanzas/costo_beneficio_costos.png" alt="Sección de costos" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

### 2. Ingresos
- Muestra los ingresos generados por la cosecha (ej. "Venta de maíz", "Subsidios").
- Cada ingreso se presenta con su valor en COP, formateado de manera similar a los costos.
- Esta sección está resaltada en un fondo verde claro.

<img src="/public/finanzas/costo_beneficio_ingresos.png" alt="Sección de ingresos" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

### 3. Métricas Clave
- Presenta indicadores financieros importantes:
  - **Total Costos**: Suma de todos los costos (en rojo).
  - **Total Ingresos**: Suma de todos los ingresos (en verde).
  - **Rentabilidad**: Diferencia entre ingresos y costos (en verde si es positiva, en rojo si es negativa).
  - **ROI**: Retorno de inversión, expresado como porcentaje (en verde si es positivo, en rojo si es negativo).
- Los valores están formateados en COP o porcentajes, según corresponda.

<img src="/public/finanzas/costo_beneficio_metricas.png" alt="Sección de métricas clave" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## Filtrar Cosechas

Para buscar cosechas específicas:

1. En la sección de filtros, ingresa:
   - El **nombre** del cultivo en el campo de texto.
   - La **fecha** en el campo de selección de fecha.
2. Haz clic en el botón **Buscar** para actualizar el listado de cosechas según los criterios ingresados.
3. Si no se encuentran resultados, aparecerá un mensaje: *“No hay cosechas para mostrar”*.

<img src="/public/finanzas/costo_beneficio_filtros.png" alt="Filtros de búsqueda" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## Manejo de Errores y Carga

- **Cargando datos**: Mientras se obtienen las cosechas o el análisis, se muestra un mensaje de carga con un ícono animado.
- **Error al cargar**: Si ocurre un problema al obtener los datos, se muestra un mensaje en rojo (ej. “Error al buscar las cosechas” o “Error al cargar el análisis”).
- **Sin datos**: Si no hay cosechas que coincidan con los filtros, se muestra un mensaje informativo.

<img src="/public/finanzas/costo_beneficio_cargando.png" alt="Pantalla de carga" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

## ¿Por qué importa el análisis de costo-beneficio?

El módulo de **Análisis de Costo-Beneficio** es fundamental para:

1. **Evaluar rentabilidad**: Permite conocer si una cosecha generó ganancias o pérdidas, ayudando a priorizar cultivos más rentables.
2. **Planificar recursos**: Los desgloses de costos e ingresos ayudan a identificar áreas de mejora en la gestión financiera.
3. **Integrar con otros módulos**: Los datos financieros se pueden usar en módulos como **Reportes** para generar informes detallados.
4. **Apoyar decisiones estratégicas**: Las métricas como ROI guían la planificación de futuras siembras y la asignación de recursos.

## Experiencia por Tipo de Usuario

- **Aprendices y Pasantes**:
  - Pueden **ver** el listado de cosechas y consultar los análisis financieros en el modal.
  - No pueden editar ni eliminar datos (funcionalidad no disponible en este módulo).
  - Pueden descargar reportes generados, si tienen permisos.

- **Instructores**:
  - Pueden **ver** los análisis financieros y usarlos para planificar actividades agrícolas o capacitaciones.
  - Tienen acceso a reportes basados en los datos financieros.
  - No pueden modificar los datos de las cosechas.

- **Administradores**:
  - Tienen **acceso total** al módulo, pudiendo consultar todos los análisis financieros.
  - Pueden generar reportes y usar los datos para gestionar cosechas y recursos.
  - Pueden configurar parámetros relacionados en otros módulos (ej. registro de cosechas).