---
title: "Especificación de Requerimientos de Software - AgroSis"
slug: modules/Configuracion_Tecnica/especificacion_requerimiento
description: "Documentación completa de la Especificación de Requerimientos de Software para el sistema AgroSis versión 1.0"
version: "1.0"
---s

# Especificación de Requerimientos de Software
## AgroSis
### Versión: 1.0

---

## Historial de Revisión

| Versión | Elaboración | | Revisión | |
|---------|-------------|---|----------|---|
| | **Fecha** | **Responsable** | **Fecha** | **Responsable** |
| 1 | 2025/22/05 | Haison Leandro Toro Lopez | | |

---

## Cambios Respecto a la Versión Anterior

| Versión | Modificación Respecto Versión Anterior |
|---------|---------------------------------------|
| | |

---

## Tabla de Contenidos

1. [Introducción](#introducción)
   - [Propósito](#propósito)
   - [Alcance](#alcance)
   - [Responsables e Involucrados](#responsables-e-involucrados)
2. [Descripción General](#descripción-general)
   - [Perspectiva del Producto](#perspectiva-del-producto)
   - [Características del Producto](#características-del-producto)
   - [Características del Usuario](#características-del-usuario)
3. [Especificación de Requisitos](#especificación-de-requisitos)
   - [Requisitos Funcionales](#requisitos-funcionales)
   - [Requisitos Técnicos](#requisitos-técnicos)
   - [Requisitos No Funcionales](#requisitos-no-funcionales)
4. [Aspectos Legales](#aspectos-legales)
5. [Restricciones del Software](#restricciones-del-software)
6. [Anexos](#anexos)

---

## 1. Introducción

En el ámbito del desarrollo de software, resulta esencial establecer desde el inicio una base documental que permita definir con claridad qué debe hacer el sistema y bajo qué condiciones debe funcionar. La Especificación de Requerimientos de Software (ERS) constituye un instrumento clave en este proceso, al proporcionar una descripción estructurada y precisa de las funcionalidades, restricciones y condiciones del sistema (Pressman & Maxim, 2021).

Este documento tiene como propósito detallar los requerimientos necesarios para el diseño e implementación del sistema, abordando tanto requisitos funcionales —relacionados con las operaciones que el sistema debe realizar— como no funcionales, entre los que se encuentran la seguridad, el rendimiento y la usabilidad. Esta especificación contribuye a una mejor comunicación entre los actores del proyecto, reduce ambigüedades y facilita la planificación técnica del desarrollo (Sommerville, 2016).

Asimismo, se hace énfasis en la claridad y la precisión en la redacción de los requerimientos, con el fin de asegurar que el producto final cumpla con las expectativas de los usuarios y se alinee con los estándares de calidad establecidos. Una especificación bien elaborada permite anticipar riesgos, optimizar el proceso de desarrollo y asegurar la entrega de un sistema robusto, confiable y eficiente.

### 1.1 Propósito

El presente documento tiene como finalidad establecer de forma clara y estructurada los requerimientos funcionales y no funcionales que guiarán el desarrollo del sistema de software. Su objetivo principal es asegurar que la solución tecnológica propuesta responda de manera efectiva a las necesidades específicas de los usuarios, al tiempo que cumple con los estándares de calidad definidos para el proyecto.

Esta especificación funcionará como una guía esencial para el equipo de desarrollo, ya que delimita con precisión las funcionalidades, restricciones técnicas y operativas que el sistema debe contemplar. Se espera que el sistema proporcione una arquitectura sólida, acompañada de herramientas intuitivas que promuevan una interacción fluida y eficiente con la plataforma.

Asimismo, se busca garantizar una adecuada gestión de la información, preservando su integridad, seguridad y disponibilidad. A través de estas funcionalidades, el sistema contribuirá a la optimización de los procesos operativos, mejorará la experiencia del usuario y facilitará la toma de decisiones mediante la generación de reportes y análisis detallados (Sommerville, 2016).

Por último, la correcta especificación de los requerimientos permitirá mitigar riesgos, evitar ambigüedades y sentar las bases para una planificación, implementación y validación más eficiente del software.

### 1.2 Alcance

El sistema de software descrito en este documento ha sido concebido como una solución integral orientada a cumplir con los requerimientos funcionales y no funcionales definidos en etapas previas. Su desarrollo contempla la implementación de funcionalidades clave que aseguren una gestión efectiva, un monitoreo constante y un control confiable de los procesos asociados al entorno donde será desplegado.

El sistema se organizará en módulos interrelacionados, entre los que se incluyen la gestión de usuarios, control de accesos, administración de datos y generación de reportes analíticos. Estos módulos estarán diseñados para ofrecer eficiencia, seguridad y facilidad de uso, garantizando una experiencia satisfactoria para los diferentes tipos de usuarios.

Además, se incorporarán mecanismos de protección de la información, con el fin de asegurar la integridad y confidencialidad de los datos tratados. La solución estará orientada a mejorar la operatividad general del entorno, facilitando la interacción mediante una interfaz intuitiva y adaptable.

El enfoque modular adoptado permitirá que el sistema pueda escalar y evolucionar conforme surjan nuevas necesidades, sin comprometer la estabilidad ni el rendimiento general de la plataforma.

### 1.3 Responsables e Involucrados

| Nombre | Tipo (Responsable/Involucrado) | Rol |
|--------|--------------------------------|-----|
| Mauricio Audor Bernal | Aprendiz | Líder y desarrollador |
| Giovany Estiven Velasco Tunubala | Aprendiz | Desarrollador |
| Juan José Manrique | Aprendiz | Desarrollador |
| Haison Leandro Toro Lopez | Aprendiz | Desarrollador |

---

## 2. Descripción General

### 2.1 Perspectiva del Producto

El sistema de software propuesto ha sido diseñado como una solución integral que facilite la gestión eficiente de los procesos definidos en el marco del proyecto. Su finalidad principal es optimizar la administración de la información, fortalecer la toma de decisiones estratégicas y mejorar la experiencia del usuario por medio de una plataforma intuitiva, accesible y de alto rendimiento (Sommerville, 2016).

La solución se compone de diversos módulos que cubren funciones esenciales como la gestión de usuarios, el almacenamiento y procesamiento de datos, la generación de reportes y el cumplimiento de estándares de seguridad. Asimismo, se prevé la capacidad de integración con tecnologías existentes y la posibilidad de escalar sus funcionalidades conforme evolucionen las necesidades del entorno de implementación (Pressman & Maxim, 2021).

Desde una perspectiva global, el sistema actuará como un habilitador de procesos, asegurando que los datos se gestionen de manera organizada, segura y accesible. Su desarrollo está orientado por principios de usabilidad, rendimiento y eficiencia, lo cual permitirá que los usuarios interactúen de manera fluida y productiva en el cumplimiento de sus tareas.

Este documento complementa secciones anteriores al proporcionar una visión estructurada del sistema, permitiendo una comprensión clara de su funcionamiento y su contexto de uso, y sentando así las bases para su correcta planificación, diseño y ejecución.

#### 2.1.1 Interfaces del Usuario

A continuación, se describen las interfaces principales que conformarán la experiencia del usuario dentro del sistema:

**Ventana de inicio de sesión (Login):**
Permite el acceso al sistema mediante la autenticación de credenciales y asignación de roles (administrador, agricultor, entre otros).

**Panel principal (Dashboard):**
Muestra un resumen visual e informativo de elementos clave como estadísticas de cultivos, estado del riego y notificaciones relevantes.

**Gestión de cultivos:**
Facilita el registro y monitoreo de cultivos, incluyendo datos como tipo, fecha de siembra, estado de crecimiento y observaciones.

**Gestión de riego:**
Permite la programación y el control de los sistemas de riego, buscando un uso eficiente del recurso hídrico.

**Aplicación de fertilizantes e insumos:**
Módulo destinado al registro y control de insumos agrícolas aplicados, como fertilizantes, pesticidas y suplementos.

**Gestión de inventario:**
Proporciona un control detallado sobre los recursos disponibles en la finca, incluyendo herramientas, insumos y materiales.

**Gestión de usuarios y roles:**
Permite la administración de los usuarios del sistema, asignando roles y estableciendo niveles de acceso y permisos.

**Reportes y análisis:**
Genera informes relacionados con la producción, el uso de recursos y otros indicadores clave para la toma de decisiones.

**Alertas y notificaciones:**
Sistema de avisos sobre eventos críticos o acciones requeridas, como alertas de riego, detección de enfermedades o escasez de insumos.

**Configuración del sistema:**
Sección para ajustar parámetros generales del sistema, preferencias del usuario, unidades de medida y formatos de presentación.

#### 2.1.2 Mapa de Navegación

<img src="/public/database/MapaNavegacionAgroSis.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

### 2.2 Características del Producto

**Desarrollo web:**
AGROSIS será implementado como una aplicación web de acceso universal, lo que permitirá a los usuarios interactuar desde cualquier dispositivo con conexión a internet, sin requerir instalación adicional.

**Lenguajes de programación:**
La lógica del sistema será desarrollada en PHP para el backend, mientras que JavaScript será utilizado para dotar de interactividad al frontend, garantizando una experiencia de usuario dinámica.

**Gestión de usuarios y roles:**
El sistema contará con un módulo para administrar usuarios, permitiendo su creación, edición y eliminación. Cada usuario tendrá asignado un rol que definirá su nivel de acceso y permisos dentro de la plataforma (administrador, agricultor, técnico, entre otros).

**Monitoreo y gestión agrícola:**
Se incluirán funcionalidades para el seguimiento de cultivos, la programación del riego y la administración de fertilizantes e insumos, permitiendo un control efectivo sobre las actividades agrícolas.

**Generación de reportes:**
AGROSIS dispondrá de herramientas para la creación de reportes detallados, los cuales reflejarán datos sobre producción, consumo de recursos y otros indicadores relevantes para la toma de decisiones estratégicas.

**Alertas y notificaciones:**
El sistema enviará notificaciones automáticas sobre eventos críticos o pendientes, como niveles bajos de inventario, tareas agendadas o condiciones climáticas desfavorables.

**Interfaz amigable y responsiva:**
El diseño de la interfaz será intuitivo, permitiendo una navegación sencilla desde dispositivos móviles y de escritorio, con adaptación automática a distintos tamaños de pantalla.

**Base de datos centralizada:**
Toda la información se almacenará en una base de datos estructurada y centralizada, garantizando eficiencia en el acceso, recuperación y gestión segura de los datos.

**Seguridad y autenticación:**
El sistema incluirá mecanismos de autenticación de usuarios, cifrado de datos sensibles y restricciones de acceso basadas en los roles asignados a cada perfil.

**Escalabilidad y mantenimiento:**
Se implementará una arquitectura basada en módulos independientes, lo cual permitirá realizar actualizaciones o integrar nuevas funciones sin afectar el rendimiento general del sistema.

#### 2.2.1 Funciones del Producto

##### 2.2.1.1 Gestión de Inventario
Permite controlar el ingreso y salida de productos, administrar proveedores y generar reportes sobre el estado del inventario.

##### 2.2.1.2 Gestión de Sanidad
Ofrece herramientas para realizar controles de calidad, dar seguimiento al cumplimiento de normativas sanitarias y registrar inspecciones realizadas.

##### 2.2.1.3 Gestión de Usuarios
Facilita las operaciones de registro, consulta, actualización y eliminación de usuarios dentro del sistema.

##### 2.2.1.4 Gestión Financiera
Administra transacciones económicas, controla presupuestos y permite la generación de reportes financieros detallados.

##### 2.2.1.5 IoT
Incorpora dispositivos inteligentes para monitorear variables agrícolas en tiempo real y emitir alertas automáticas según parámetros predefinidos.

### 2.3 Características del Usuario

#### 2.3.1 Administrador
Cuenta con acceso total al sistema. Puede gestionar usuarios, configurar parámetros generales, monitorear actividades y generar reportes globales.

#### 2.3.2 Instructor
Tiene la capacidad de gestionar contenidos de capacitación, hacer seguimiento al avance de pasantes o aprendices, y evaluar su desempeño.

#### 2.3.3 Pasante
Su acceso estará limitado a módulos específicos relacionados con su área de práctica. Podrá registrar información, consultar datos relevantes y emitir reportes conforme a sus permisos.

#### 2.3.4 Aprendiz
Tendrá un acceso restringido a funciones básicas del sistema. Podrá consultar información, registrar actividades formativas y participar en procesos de evaluación y capacitación.

---

## 3. Especificación de Requisitos

### 3.1 Requisitos Funcionales

| Funcionalidad | Tipo (esencial, ideal, opcional) |
|---------------|----------------------------------|
| RF01 - Registro de usuario | Esencial |
| RF02 - Autenticación y gestión de roles | Esencial |
| RF03 - Gestión de inventario (agregar, actualizar, eliminar productos) | Esencial |
| RF04 - Control de stock y generación de alertas | Ideal |
| RF05 - Registro de inspecciones sanitarias | Esencial |
| RF06 - Generación de reportes de calidad y normativas | Ideal |
| RF07 - Administración de transacciones financieras | Esencial |
| RF08 - Generación de informes financieros | Ideal |
| RF09 - Monitoreo en tiempo real con IoT | Opcional |
| RF10 - Envío de notificaciones y alertas automatizadas | Opcional |

#### 3.1.1 Clasificación de Requisitos Funcionales

**Gestión de Usuarios:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF01 | El sistema debe permitir al usuario iniciar sesión | El sistema ofrecerá un formulario con los campos Correo y Contraseña. Tras la validación de estos datos, el usuario podrá acceder al sistema, garantizando un control seguro y eficiente. | Alta |
| RF02 | El sistema debe permitir el registro de usuarios | Se dispondrá de un formulario con campos como Tipo y Número de Documento, Nombre, Teléfono, Correo, Contraseña y Rol. Tras validar los datos, el sistema registrará al usuario con los privilegios adecuados según su rol. | Alta |
| RF03 | El sistema debe permitir listar a los usuarios agregados por el administrador | La interfaz mostrará una lista con los usuarios registrados, su estado (activo/inactivo) y permitirá editar sus datos, asegurando precisión y actualización constante de la información. | Alta |
| RF04 | El sistema debe permitir editar los usuarios | Solo el administrador podrá editar o eliminar usuarios. Esta restricción asegura la integridad y protección de la información del sistema. | Alta |

**Gestión de Insumos:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF05 | Registro de insumos agrícolas para cultivos | Se habilitará una opción que permitirá ingresar los distintos insumos utilizados en los cultivos. El usuario podrá gestionar estos registros (visualizar, editar o eliminar) desde una interfaz que facilite el control y organización de los recursos agrícolas. | Alta |
| RF06 | Visualización de insumos registrados previamente | El sistema proporcionará un listado estructurado de todos los insumos agrícolas previamente registrados, permitiendo a los usuarios revisar información detallada de cada elemento para su consulta y gestión efectiva. | Alta |
| RF07 | Edición y actualización de insumos | Se mostrará un listado editable con los insumos existentes, permitiendo modificar la información registrada. Esto asegurará que los datos permanezcan actualizados y confiables dentro del sistema. | Alta |

**Gestión de Herramientas:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF08 | Registro de herramientas agrícolas utilizadas en cultivos | Se habilitará una interfaz específica para el ingreso de herramientas utilizadas en las labores agrícolas. Esta incluirá opciones para agregar nuevas herramientas, visualizar las ya registradas, y realizar acciones como editar o eliminar, promoviendo una administración eficiente del inventario. | Alta |
| RF09 | Visualización de herramientas registradas previamente | El sistema proporcionará un listado estructurado de las herramientas previamente ingresadas. A través de esta funcionalidad, el usuario podrá consultar los detalles técnicos de cada herramienta, lo que facilitará su control, análisis y disponibilidad. | Alta |
| RF10 | Modificación y actualización de herramientas existentes en el sistema | Se permitirá al usuario modificar la información de herramientas ya existentes en la base de datos. Esto asegurará que los registros se mantengan actualizados, reflejando fielmente los recursos disponibles y su estado actual. | Alta |

**Gestión IoT:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF11 | Visualización en tiempo real de sensores en pantalla IoT | El sistema mostrará de manera continua y actualizada los datos recolectados por sensores agrícolas, organizados por categorías como temperatura, humedad, lluvia, viento, y luz solar. Cada métrica será presentada en tarjetas individuales con íconos que faciliten su identificación visual. | Alta |
| RF12 | Visualización de humedad del suelo (eras) | Se integrará una interfaz donde se expongan los niveles de humedad en las eras agrícolas, extraídos en tiempo real desde sensores IoT, brindando al usuario una herramienta clara para tomar decisiones en el riego. | Alta |
| RF13 | Consulta de humedad ambiental en áreas de cultivo | A través del sistema, se presentarán los niveles actuales de humedad ambiental, obtenidos automáticamente mediante dispositivos IoT, ofreciendo precisión y actualización constante de las condiciones del entorno. | Alta |
| RF14 | Visualización de datos de luminosidad | Los sensores recolectarán información sobre la intensidad de la luz solar. El sistema interpretará y mostrará esta información de forma visual para facilitar el seguimiento de las condiciones de iluminación en el terreno agrícola. | Alta |
| RF15 | Medición de lluvia en campo mediante sensores | Mediante el uso de pluviómetros conectados, el sistema capturará datos sobre precipitaciones, incluyendo frecuencia, intensidad y duración, permitiendo un seguimiento detallado del comportamiento climático en el área de cultivo. | Alta |
| RF16 | Monitoreo de temperatura en zonas agrícolas | El sistema mostrará de manera clara los valores de temperatura ambiente obtenidos desde sensores, asegurando al usuario una lectura confiable y en tiempo real para una mejor planificación de cultivos. | Alta |
| RF17 | Seguimiento de velocidad y dirección del viento | Los sensores instalados en campo enviarán datos sobre la velocidad y orientación del viento. El sistema procesará esta información y la mostrará visualmente para alertas o ajustes en labores agrícolas sensibles al viento. | Alta |
| RF18 | Visualización de datos de pH del suelo | Se habilitará una sección donde se presenten los valores de pH del suelo extraídos desde sensores especializados. Esta funcionalidad permitirá conocer las condiciones de acidez o alcalinidad que afectan la nutrición de los cultivos. | Alta |
| RF19 | Cálculo y monitoreo de evapotranspiración | El sistema integrará sensores y modelos para calcular la evapotranspiración, proporcionando datos clave sobre la pérdida de agua por evaporación del suelo y transpiración de las plantas, fundamentales para una gestión eficiente del recurso hídrico. | Alta |
| RF20 | Almacenamiento y análisis histórico de datos de sensores | Todos los datos recolectados serán almacenados en una base de datos organizada, permitiendo la consulta histórica, visualización de tendencias y generación de reportes que faciliten la toma de decisiones a largo plazo. | Alta |

**Gestión de Cultivos:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF21 | Registro y gestión de nombres y tipos de cultivos | El sistema contará con un formulario sencillo que permitirá a los usuarios registrar y modificar el nombre y tipo de los cultivos disponibles, con el fin de estandarizar esta información para futuras asignaciones dentro de los procesos agrícolas. | Alta |
| RF22 | Registro de semilleros a través de formulario interactivo | Los usuarios podrán ingresar datos clave de semilleros como número de unidades, fecha de siembra y fecha estimada de salida a producción mediante un formulario intuitivo, facilitando el control del proceso de germinación. | Alta |
| RF23 | Registro y edición de lotes agrícolas | Se permitirá a los usuarios crear y actualizar registros de lotes en el sistema. Esta funcionalidad será vital para mantener información precisa, permitiendo ediciones según sea necesario por cambios en la planificación agrícola. | Alta |
| RF24 | Gestión de eras implementadas en lotes | El sistema brindará herramientas para registrar y administrar las eras en los distintos lotes de cultivo, permitiendo un uso eficiente del espacio y facilitando su mantenimiento y monitoreo. | Alta |
| RF25 | Formulario para registro, consulta y edición de cultivos | A través de un formulario dedicado, los usuarios podrán registrar nuevos cultivos, listar los existentes y editar su información. Esta funcionalidad busca optimizar el flujo de trabajo y mantener una base de datos agrícola ordenada. | Alta |
| RF26 | Registro y actualización de actividades en los cultivos | Se implementará una interfaz para registrar actividades agrícolas, con detalles como nombre, descripción y fecha de creación. Esto permitirá planificar tareas y generar historial de actividades asociadas a cada cultivo. | Alta |
| RF27 | Asignación y gestión de actividades asociadas a cultivos | Los instructores podrán asignar actividades detalladas a cultivos específicos, incluyendo información como fechas, personal involucrado, herramientas e insumos requeridos, y estado de la actividad. Estas actividades también podrán ser consultadas y editadas posteriormente. | Alta |
| RF28 | Finalización de actividades asignadas | Al concluir una actividad, el sistema permitirá al usuario cambiar su estado a "finalizada", ingresando datos como el tiempo invertido, cantidad de insumos usados y el nuevo estado, utilizando un botón específico con ícono de actualización para completar el proceso. | Alta |
| RF29 | Registro de producción obtenida tras la cosecha | Los usuarios podrán registrar el resultado de una cosecha, especificando el cultivo recolectado, cantidad, unidad de medida, fecha de recolección y una fotografía como evidencia. Esto permitirá tener un control eficiente de la producción agrícola. | Alta |
| RF30 | Registro de plagas, enfermedades y arvenses en cultivos | Se dispondrá de un módulo para registrar amenazas agrícolas, incluyendo detalles como el nombre científico y común del organismo, su ubicación en el cultivo, nivel de daño, descripción, métodos de erradicación y observaciones, con el fin de realizar un control efectivo. | Alta |
| RF31 | Control fitosanitario específico por cultivo | El sistema permitirá llevar un registro de las acciones fitosanitarias implementadas en respuesta a plagas o enfermedades detectadas, documentando medidas de eliminación, seguimiento del tratamiento y evolución del estado del cultivo. | Alta |

**Administración del Sistema:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF36 | Asignación de roles y permisos por parte del administrador | El sistema permitirá al administrador gestionar los roles de los usuarios, asignándoles perfiles como administrador, instructor, pasante, operario o visitante. Cada rol contará con permisos específicos que controlarán el acceso a módulos y funcionalidades del sistema. | Alta |

**Gestión Financiera:**

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF37 | Registro y actualización de precios de productos | El sistema permitirá registrar el precio base de cada producto al momento de su creación, incluyendo datos como moneda, impuestos aplicables y vigencia inicial. Asimismo, ofrecerá una interfaz para actualizar los precios de productos ya registrados. | Alta |
| RF38 | Control de configuraciones de Arduinos | El sistema permitirá a los usuarios gestionar el control de microcontroladores Arduino, facilitando la selección, almacenamiento y alternancia entre configuraciones de software predefinidas, optimizando su flexibilidad y funcionalidad. | Alta |
| RF39 | Registro detallado de ventas | El sistema llevará un registro completo de cada venta realizada, capturando información como fecha, producto vendido, cantidad, valor total de la transacción y cliente asociado. Esto facilitará la trazabilidad y el análisis de las operaciones comerciales. | Alta |
| RF40 | Cálculo y visualización de rentabilidad de cultivos | El sistema permitirá calcular la rentabilidad de cada cultivo, teniendo en cuenta los ingresos y egresos relacionados. Los resultados se presentarán en porcentajes y valores absolutos, organizados por actividad y bancal, con opción de exportar informes en formato PDF o Excel. | Alta |

#### 3.1.2 Requerimientos Módulo Reportes

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RF41 | Generación de reportes de usuarios | El sistema permitirá generar reportes detallados sobre la actividad de los usuarios registrados, analizando su comportamiento, nivel de satisfacción y posibles inconvenientes, con el fin de optimizar su experiencia. | Alta |
| RF42 | Reporte de insumos registrados | El sistema permitirá generar un reporte que muestre los insumos registrados, detallando nombre, cantidad disponible, fecha de caducidad y otras características relevantes. | Alta |
| RF43 | Reporte de herramientas registradas | El sistema generará un reporte con la información de las herramientas, incluyendo nombre, estado, ubicación y características clave para una gestión eficiente. | Alta |
| RF44 | Reporte de datos en tiempo real (sensores) | El sistema permitirá visualizar datos recolectados por sensores en tiempo real (humedad, temperatura, viento, pH, luminosidad, etc.) mediante gráficas organizadas, facilitando el análisis ambiental de los cultivos. | Alta |
| RF45 | Reporte de especies y tipos registrados | El sistema generará un reporte que incluya todas las especies y tipos de cultivos registrados, facilitando su consulta y gestión. | Alta |
| RF46 | Reporte de semilleros activos | El sistema generará un reporte en formato PDF con información detallada sobre los semilleros activos, como fecha de siembra, estado, fecha estimada de salida y observaciones. | Alta |
| RF47 | Reporte de lotes registrados | El sistema generará un informe completo de los lotes activos, incluyendo datos como fecha de registro, dimensiones, tipo de suelo y fechas estimadas de siembra. | Alta |
| RF48 | Reporte del historial de eras | El sistema permitirá generar reportes con el historial de las eras registradas, detallando disponibilidad, estado, tipo de suelo, dimensiones y lote asociado. | Alta |
| RF49 | Reporte de cultivos activos | El sistema generará un informe PDF con los cultivos activos registrados, incluyendo información como nombre, ubicación, estado, fecha de siembra y cosecha estimada. | Alta |
| RF50 | Reporte de actividades realizadas | El sistema permitirá generar un reporte de las actividades ejecutadas en los cultivos, ayudando a monitorear el historial de mantenimiento y manejo agrícola. | Alta |
| RF51 | Reporte mensual de plagas, enfermedades y arvenses | El sistema generará reportes mensuales detallados sobre las incidencias fitosanitarias, especificando ubicación, nivel de afectación, acciones tomadas y fechas de ocurrencia. | Alta |
| RF52 | Reporte de controles fitosanitarios aplicados | El sistema permitirá generar un informe en PDF sobre los tratamientos aplicados a plagas, enfermedades o arvenses, facilitando el seguimiento de acciones correctivas. | Alta |
| RF53 | Informe de ingresos por producto vendido | El sistema permitirá generar un reporte que detalle las ventas por producto, incluyendo unidades vendidas, ingresos y márgenes de ganancia, para evaluar su desempeño comercial. | Alta |

### 3.2 Requisitos Técnicos

| Funcionalidad | Tipo |
|---------------|------|
| RT01 - Acceso a Internet estable para el correcto funcionamiento del sistema | Esencial |
| RT02 - Uso de una base de datos relacional para almacenamiento seguro de la información (ej. MySQL, PostgreSQL) | Esencial |
| RT03 - Compatibilidad con los navegadores web más utilizados (Chrome, Firefox, Edge) | Esencial |
| RT04 - Infraestructura escalable en la nube para soportar múltiples usuarios simultáneamente | Ideal |
| RT05 - Integración con dispositivos IoT para captura y monitoreo de datos en tiempo real | Opcional |

#### 3.2.1 Clasificación de Requisitos Técnicos

| ID del Requerimiento | Nombre del Requerimiento | Descripción | Prioridad |
|---------------------|---------------------------|-------------|-----------|
| RT01 | Acceso a Internet | El sistema requiere una conexión estable a Internet para garantizar el acceso en línea a la plataforma, sincronización de datos y comunicación con servidores. | Alta |
| RT02 | Base de Datos Relacional | Se requiere una base de datos relacional (MySQL, PostgreSQL) para el almacenamiento seguro de la información, garantizando la integridad de los datos y permitiendo consultas eficientes. | Alta |
| RT03 | Compatibilidad con Navegadores Web | La plataforma debe ser compatible con los navegadores más utilizados (Chrome, Firefox, Edge) para garantizar una experiencia de usuario óptima. | Alta |
| RT04 | Infraestructura Escalable en la Nube | Se recomienda el uso de servicios en la nube como AWS, Azure o Google Cloud para garantizar escalabilidad y disponibilidad del sistema. | Media |
| RT05 | Integración con Dispositivos IoT | El sistema debe permitir la conexión con sensores y dispositivos IoT para la captura y monitoreo de datos en tiempo real. | Alta |

### 3.3 Requisitos No Funcionales

#### Confiabilidad

| Código - Nombre | Descripción |
|-----------------|-------------|
| RNF04 - Disponibilidad | El sistema deberá estar disponible el 99.5% del tiempo, con un tiempo máximo de inactividad programada de 2 horas mensuales. |
| RNF05 - Recuperación ante fallos | En caso de fallo, el sistema deberá recuperar su funcionamiento en un tiempo no mayor a 10 minutos mediante protocolos de respaldo. |

#### Seguridad

| Código - Nombre | Descripción |
|-----------------|-------------|
| RNF06 - Control de acceso | El sistema deberá gestionar accesos mediante credenciales únicas y autenticación en dos pasos para usuarios administrativos. |
| RNF07 - Privacidad de datos | Toda la información del usuario deberá estar cifrada con un estándar AES-256 para garantizar su protección. |

#### Eficiencia

| Código - Nombre | Descripción |
|-----------------|-------------|
| RNF08 - Tiempo de respuesta | El tiempo de respuesta del sistema no debe superar los 2 segundos en operaciones críticas. |
| RNF09 - Capacidad de usuarios | El sistema debe soportar hasta 500 usuarios concurrentes sin degradación del rendimiento. |

#### Portabilidad

| Código - Nombre | Descripción |
|-----------------|-------------|
| RNF10 - Compatibilidad multiplataforma | El sistema debe poder ejecutarse en Windows, MacOS y Linux sin modificaciones significativas. |
| RNF11 - Adaptabilidad a dispositivos móviles | Debe contar con una versión optimizada para dispositivos móviles y tablets. |

#### Mantenibilidad

| Código - Nombre | Descripción |
|-----------------|-------------|
| RNF12 - Actualizaciones automáticas | El sistema debe contar con un mecanismo de actualización automática para correcciones y mejoras. |
| RNF13 - Registro de errores | Todas las fallas del sistema deben ser registradas en un log para su análisis y resolución. |

#### Soportabilidad y Operatividad

| Código - Nombre | Descripción |
|-----------------|-------------|
| RNF14 - Soporte técnico | Se debe garantizar soporte técnico en línea con un tiempo de respuesta menor a 24 horas. |
| RNF15 - Operatividad en la nube | El sistema deberá ser capaz de ejecutarse en un entorno de nube para garantizar su disponibilidad global. |

---

## 4. Aspectos Legales (Normas o Leyes)

El sistema debe cumplir con las regulaciones y normativas vigentes en materia de protección de datos y tecnología. Entre las principales leyes aplicables se encuentra la Ley de Protección de Datos Personales, la cual garantiza la seguridad y privacidad de la información de los usuarios, regulando el uso y tratamiento de datos sensibles.

Asimismo, se deberán seguir los lineamientos de la norma ISO/IEC 27001, orientada a la implementación de buenas prácticas para la gestión de la seguridad de la información, incluyendo políticas de acceso, respaldo y prevención de riesgos tecnológicos.

En caso de realizar transacciones digitales, el sistema debe ajustarse a los reglamentos de comercio electrónico, lo que implica cumplir con normativas sobre facturación electrónica, protección al consumidor, y trazabilidad de las operaciones comerciales.

Se recomienda realizar revisiones periódicas del marco legal vigente para asegurar el cumplimiento de nuevas disposiciones, especialmente aquellas relacionadas con tecnologías emergentes y protección de datos.

**Principales normas aplicables:**

- **Ley 1581 de 2012** - Protección de Datos Personales en Colombia
- **ISO/IEC 27001:2013** - Gestión de Seguridad de la Información
- **Ley 527 de 1999** - Comercio Electrónico en Colombia
- **Decreto 1377 de 2013** - Reglamentación de la Ley de Protección de Datos
- **RGPD (Reglamento General de Protección de Datos)** - Para operaciones internacionales

---

## 5. Restricciones del Software

Durante el desarrollo del sistema se han identificado ciertas limitaciones técnicas que deben considerarse durante la implementación:

**Dependencia de conectividad:**
Una de las principales restricciones es la dependencia de conexión a internet, ya que el sistema requiere conectividad estable para su operación, sincronización de datos y acceso a los servidores remotos.

**Requisitos mínimos de hardware:**
Existen requisitos mínimos de hardware recomendados para garantizar un buen desempeño. Se sugiere el uso de un equipo con procesador de al menos 2.0 GHz y 8 GB de memoria RAM para evitar problemas de lentitud o fallos.

**Compatibilidad con sistemas operativos:**
También se ha detectado una compatibilidad limitada con sistemas operativos antiguos, lo que podría afectar el uso de algunas funcionalidades en dispositivos desactualizados. Esta situación debe considerarse al momento de planificar la distribución y el entorno de ejecución de la plataforma.

**Limitaciones específicas:**

### Restricciones Técnicas

| Categoría | Restricción | Descripción |
|-----------|-------------|-------------|
| **Conectividad** | Internet obligatorio | Requiere conexión estable a internet para todas las funcionalidades |
| **Hardware mínimo** | Procesador 2.0 GHz | Procesador mínimo requerido para operación óptima |
| **Memoria RAM** | 8 GB mínimo | Memoria RAM necesaria para evitar problemas de rendimiento |
| **Navegadores** | Versiones actualizadas | Solo compatible con navegadores modernos y actualizados |
| **Dispositivos IoT** | Protocolo específico | Limitado a dispositivos compatibles con el protocolo implementado |

### Restricciones de Desarrollo

| Aspecto | Limitación | Impacto |
|---------|------------|---------|
| **Tiempo de desarrollo** | 6 meses máximo | Debe completarse en el período académico establecido |
| **Presupuesto** | Recursos limitados | Uso de tecnologías open source y gratuitas |
| **Equipo de desarrollo** | 4 desarrolladores | Capacidad limitada del equipo de trabajo |
| **Infraestructura** | Servidor compartido | Recursos de servidor limitados para pruebas |

---

## 6. Anexos

En esta sección se recopilan los documentos y evidencias que respaldan el proceso de desarrollo y validación del sistema.

### 6.1 Documentos de Soporte

**Resultados de pruebas:**
Se incluyen los resultados de pruebas realizadas, tales como pruebas unitarias, de integración y de usuario, las cuales permitieron validar el correcto funcionamiento de los módulos del sistema.

**Registro de entrevistas:**
También se presentan los registros de entrevistas y encuestas aplicadas a usuarios y partes interesadas, con el fin de recoger información clave para el diseño de funcionalidades adaptadas a sus necesidades.

**Manuales y guías:**
Adicionalmente, se integran los manuales y guías diseñados para facilitar el uso del sistema, tanto para usuarios finales como para administradores, así como la documentación técnica, que detalla la arquitectura, especificaciones y modelos utilizados durante el desarrollo.


### 6.3 Evidencias de Validación

| Tipo de Prueba | Estado | Fecha de Ejecución | Responsable |
|----------------|--------|-------------------|-------------|
| Pruebas Unitarias | Completado | 2025-05-15 | Equipo de Desarrollo |
| Pruebas de Integración | En Progreso | 2025-05-20 | Líder Técnico |
| Pruebas de Usuario | Pendiente | 2025-05-25 | Instructor |
| Pruebas de Rendimiento | Pendiente | 2025-05-30 | Administrador |

### 6.4 Referencias Bibliográficas

**Referencias técnicas:**
- Pressman, R. S., & Maxim, B. R. (2021). Ingeniería de software: un enfoque práctico (8.ª ed.). McGraw-Hill Education.
- Sommerville, I. (2016). Ingeniería de software (10.ª ed.). Pearson Education.
- IEEE. (2011). IEEE Std 830-1998: IEEE Recommended Practice for Software Requirements Specifications.

**Normativas aplicables:**
- ISO/IEC 25010:2011 - Calidad del producto de software
- ISO/IEC 27001:2013 - Sistemas de gestión de seguridad de la información
- Ley 1581 de 2012 - Protección de Datos Personales (Colombia)

Estos anexos representan un respaldo formal del trabajo realizado y fortalecen la trazabilidad del proyecto desde su concepción hasta su implementación final.

---

## Conclusión

Esta Especificación de Requerimientos de Software para AgroSis versión 1.0 establece las bases fundamentales para el desarrollo de un sistema integral de gestión agrícola. La documentación proporciona una guía clara y estructurada que garantiza que todos los involucrados en el proyecto comprendan los objetivos, funcionalidades y restricciones del sistema.

El enfoque modular adoptado permitirá una implementación escalable y mantenible, mientras que los requerimientos funcionales y no funcionales especificados aseguran que el sistema cumpla con los estándares de calidad, seguridad y rendimiento esperados.

La correcta implementación de estos requerimientos resultará en una plataforma robusta que optimizará los procesos agrícolas, mejorará la toma de decisiones y proporcionará una herramienta valiosa para la gestión moderna de cultivos.

---

**Fecha de elaboración:** 22 de mayo de 2025  
**Versión del documento:** 1.0  
**Estado:** En desarrollo  
**Próxima revisión:** 22 de agosto de 2025
