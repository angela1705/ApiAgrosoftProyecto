---
title: "Especificación de Requerimientos de Software - Agrosoft"
slug: modules/Configuracion_Tecnica/Informe_General_Del_Sistema
description: "Documentación completa de la Especificación de Requerimientos de Software para el sistema AgroSis versión 1.0"
version: "1.0"
---


# Informe General del Sistema AgroSoft

**Autores**:  
- Haison Leandro Toro Lopez 
- Juan Jose Manrique Sosa  
- Mauricio Audor Bernal  
- Giovani Velasco  

**Institución**: Centro de Gestión y Desarrollo Sostenible Surcolombiano, SENA  
**Programa**: Análisis y Desarrollo de Software  
**Ubicación**: Pitalito, Huila  
**Año**: 2025  

---

## Tabla de Contenidos

- [Introducción](#introducción)
- [Justificación](#justificación)
- [Descripción](#descripción)
- [Objetivo](#objetivo)
- [Alcance](#alcance)
- [Características del Sistema](#características-del-sistema)
- [Arquitectura de Información](#arquitectura-de-información)
- [Funcionalidades](#funcionalidades)
- [Usuarios y Roles](#usuarios-y-roles)
- [Diagrama de Casos de Uso](#diagrama-de-casos-de-uso)
  - [General](#general)
  - [Específicos](#específicos)

---

## Introducción

El presente documento proporciona una descripción general del sistema **AgroSoft**, una aplicación web desarrollada para fortalecer la gestión agrícola en la unidad productiva PAE mediante soluciones tecnológicas innovadoras. Está dirigido a todos los involucrados en el proyecto, desde desarrolladores y administradores hasta instructores y usuarios finales, con el propósito de ofrecer una visión clara y completa de sus objetivos, justificación, alcance y características principales. Este texto sirve como una guía esencial para comprender el contexto funcional y técnico de AgroSoft, facilitando su adopción, implementación y uso como herramienta clave para mejorar la eficiencia y productividad en las operaciones agrícolas.

---

## Justificación

En el contexto actual de la agricultura, donde la optimización de recursos, la trazabilidad de procesos y la sostenibilidad se han convertido en pilares esenciales, las soluciones tecnológicas desempeñan un rol crucial para transformar y fortalecer los sistemas productivos. **AgroSoft** surge como una plataforma innovadora diseñada para centralizar, organizar y gestionar la información agrícola de manera integral, promoviendo una administración eficiente de los cultivos y habilitando la toma de decisiones fundamentadas en datos precisos y oportunos.

### Beneficios Clave

- **Monitoreo en tiempo real**: A través de la integración con sensores IoT, AgroSoft permite supervisar variables ambientales críticas, como temperatura, humedad y precipitaciones, proporcionando información actualizada para optimizar las condiciones de cultivo.
- **Gestión eficiente de recursos**: Facilita el registro y control detallado de insumos y herramientas agrícolas, asegurando su uso adecuado y reduciendo desperdicios.
- **Seguimiento integral del ciclo productivo**: Desde la siembra hasta la cosecha, el sistema ofrece una trazabilidad completa de las actividades, permitiendo un control exhaustivo de cada etapa del proceso agrícola.
- **Mejora en la productividad**: Al optimizar la gestión operativa y minimizar pérdidas, AgroSoft contribuye a maximizar el rendimiento de los cultivos y los recursos disponibles.

Como resultado, AgroSoft no solo incrementa la precisión en la gestión operativa mediante la generación automática de informes analíticos, sino que también proporciona una plataforma intuitiva y accesible que apoya tanto el aprendizaje de aprendices y técnicos como la operación eficiente de administradores agrícolas. Esta herramienta representa un avance significativo hacia la modernización y sostenibilidad de la unidad productiva PAE, fortaleciendo su capacidad para enfrentar los desafíos del sector agrícola actual.

---

## Descripción

**AgroSoft** es una solución web compuesta por módulos que trabajan de forma conjunta para facilitar la gestión completa del entorno agrícola. A través de sus diferentes componentes, permite manejar inventarios, supervisar actividades del campo, gestionar usuarios, analizar condiciones ambientales, llevar un control fitosanitario y registrar los aspectos financieros relacionados con los cultivos.

El objetivo central de la plataforma es brindar a los usuarios una herramienta tecnológica accesible y moderna, que facilite el registro, consulta y análisis de toda la información vinculada al proceso productivo. Gracias a su integración con sensores a través de tecnología IoT, también ofrece datos en tiempo real que respaldan decisiones más informadas.

### Ventajas Principales

- Interfaz fácil de usar, adaptable a diversos dispositivos.
- Estructura escalable que se ajusta a las necesidades cambiantes de cada unidad productiva.

---

## Objetivo

El objetivo general de **AgroSoft** es fortalecer la gestión agrícola en la unidad productiva PAE mediante la implementación de una aplicación web innovadora. El sistema busca centralizar, organizar y administrar de manera integral la información de los cultivos para facilitar una toma de decisiones basada en datos precisos y actualizados. De esta forma, se pretende optimizar los recursos, mejorar la trazabilidad de los procesos productivos y, en última instancia, aumentar la eficiencia y la productividad de las operaciones agrícolas.

---

## Alcance

**AgroSoft** es una aplicación web diseñada para la gestión de los procesos agrícolas dentro de la unidad productiva PAE. El alcance del sistema abarca un ciclo productivo completo, desde la siembra hasta la cosecha, y se enfoca en las siguientes áreas clave:

- **Gestión de Recursos**: Incluye el registro y control de insumos y herramientas agrícolas.
- **Monitoreo y Control**: Permite la supervisión de variables ambientales a través de sensores IoT y el seguimiento de plagas.
- **Administración de Inventarios**: Facilita la gestión de bodegas y el almacenamiento de insumos y herramientas.
- **Análisis de Rentabilidad**: Ofrece herramientas para registrar y analizar la relación costo-beneficio de las cosechas.

El sistema está dirigido a los usuarios dentro de la unidad productiva, incluyendo administradores, instructores y pasantes, cada uno con diferentes niveles de acceso y funcionalidades específicas a su rol.

---

## Características del Sistema

- **Aplicación Web**: Plataforma web accesible para los diferentes usuarios involucrados en el proyecto.
- **Integración con IoT**: Capacidad de integrarse con sensores de Internet de las Cosas (IoT) para el monitoreo en tiempo real de variables ambientales como temperatura y humedad.
- **Gestión por Roles**: Define roles de usuario específicos (Administrador, Instructor, Pasante e Invitado), cada uno con permisos y accesos diferenciados para garantizar la seguridad y la correcta asignación de tareas.
- **Interfaz Intuitiva**: Diseñada para ser accesible y fácil de usar, apoyando tanto el aprendizaje de los pasantes como la operación eficiente de los administradores.
- **Generación de Reportes**: Genera informes analíticos de forma automática para una gestión operativa más precisa.
- **Trazabilidad Completa**: Ofrece un seguimiento detallado de todas las etapas del ciclo productivo, desde la siembra hasta la cosecha.

---

## Arquitectura de Información

 <img src="/public/informe_general/img1.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
as
---

## Funcionalidades

A continuación, se presenta una tabla con las funcionalidades del sistema, representando los requisitos de la aplicación:

| **ID** | **Funcionalidad** | **Descripción** | **Usuario** | **Tipo** |
|--------|-------------------|-----------------|-------------|----------|
| RF1 | Registrar Usuario | Permite registrar nuevos usuarios mediante un formulario con datos como nombre, documento, correo, teléfono y rol. Solo el administrador podrá realizar esta acción. | Administrador | Esencial |
| RF2 | Editar Usuario | Solo el administrador podrá editar y eliminar usuarios registrados, garantizando la seguridad y la integridad de la información. | Administrador | Esencial |
| RF3 | Listar Usuarios | Permite listar a los usuarios agregados por el administrador, mostrando su estado (activo/inactivo) y permitiendo su edición. | Administrador | Esencial |
| RF4 | Iniciar Sesión | Ofrece a los usuarios un formulario de inicio de sesión con correo y contraseña, validando sus credenciales para acceder. | Todos los Usuarios | Esencial |
| RF5 | Asignar Roles y Permisos | El administrador podrá asignar roles como instructor, pasante, operario o visitante, definiendo los permisos de acceso correspondientes. | Administrador | Esencial |
| RF6 | Registrar Insumos | Permite registrar insumos agrícolas indicando nombre, cantidad, tipo, fecha de caducidad, precio, unidad, etc. | Administrador/Pasante | Esencial |
| RF7 | Listar y Editar Insumos | Permite visualizar y actualizar la información de insumos previamente registrados, manteniendo los datos actualizados. | Administrador/Pasante | Esencial |
| RF8 | Registrar Herramientas | Permite registrar herramientas necesarias para el cultivo, incluyendo nombre, cantidad, estado, precio y fecha de registro. | Administrador/Pasante | Esencial |
| RF9 | Listar y Editar Herramientas | Permite visualizar y editar la información de herramientas registradas. | Administrador/Pasante | Esencial |
| RF10 | Registrar Actividades | Permite al instructor registrar actividades agrícolas (siembra, fertilización, etc.) indicando nombre, descripción y fecha. | Instructor | Esencial |
| RF11 | Asignar Actividades | Los instructores podrán asignar actividades a los cultivos, indicando cultivo, fecha, pasantes asignados, insumos y herramientas necesarias. | Instructor | Esencial |
| RF12 | Finalizar Actividad | Una vez realizada una actividad, el pasante podrá finalizarla ingresando el tiempo utilizado, insumos consumidos y el nuevo estado. | Usuario Asignado | Esencial |
| RF13 | Control Fitosanitario | Permite registrar acciones para erradicar plagas, enfermedades o arvenses en los cultivos, incluyendo evidencias y descripciones. | Pasante/Aprendiz/Instructor | Esencial |
| RF14 | Información Sensores en Tiempo Real | Visualización en tiempo real de datos de sensores IoT (temperatura, humedad, lluvia, etc.) en un panel organizado. | Todos los usuarios | Ideal |
| RF15 | Calendario con Recordatorios | Permite a los usuarios registrar y gestionar eventos importantes como fertilización o cosechas con recordatorios. | Usuario | Opcional |
| RF16 | Visualizar Fases Lunares | Muestra información de las fases lunares y su influencia en el cultivo mediante un calendario interactivo. | Usuario | Opcional |
| RF17 | Reportes e Informes | Genera reportes PDF o Excel de actividades, insumos, herramientas, cultivos, sensores, usuarios, rentabilidad, entre otros, para análisis y toma de decisiones. | Administrador, Instructor | Ideal |
| RF18 | Registrar Semilleros | Registro de semilleros con nombre de semilla, tipo, unidades, fecha de siembra y estimada de salida. | Pasante/Instructor | Esencial |
| RF19 | Registrar, Listar y Editar Lotes | Registro y edición de lotes incluyendo nombre, dimensiones, ubicación (latitud/longitud), estado y eras ocupadas. | Administrador/Pasante | Esencial |
| RF20 | Registrar, Listar y Editar Eras | Registro de eras con dimensiones, estado y lote asignado. | Administrador/Pasante | Esencial |
| RF21 | Registrar, Listar y Editar Cultivos | Registro de nuevos cultivos con especie, cantidad, fechas y ubicación (semillero, lote, era). | Administrador/Pasante | Esencial |
| RF22 | Registrar Producción de Cultivo | Registro de producción con tiempo, cantidad recolectada, fecha y fotografía. | Pasante, Instructor | Esencial |
| RF23 | Registrar Plagas y Enfermedades | Registro de plagas/enfermedades con nombre, ubicación, daño, observaciones y georreferencia. | Pasante, Instructor | Esencial |
| RF24 | Mostrar Humedad de Eras | Muestra en tiempo real la humedad del suelo por era, con fecha y hora de medición. | Todos los usuarios | Ideal |
| RF25 | Mostrar Humedad Ambiente | Muestra en tiempo real la humedad ambiente registrada por sensores. | Todos los usuarios | Ideal |
| RF26 | Mostrar Luminosidad | Muestra en tiempo real la luminosidad del ambiente en lúmenes. | Todos los usuarios | Ideal |
| RF27 | Mostrar Lluvia | Muestra cantidad, intensidad, duración y frecuencia de lluvia por sensores. | Todos los usuarios | Ideal |
| RF28 | Mostrar Temperatura | Visualiza temperatura en grados °C desde sensores IoT en tiempo real. | Todos los usuarios | Ideal |
| RF29 | Mostrar Viento | Muestra velocidad y dirección del viento, velocidad máxima/mínima por era. | Todos los usuarios | Ideal |
| RF30 | Mostrar pH del Suelo | Muestra lecturas de pH en el suelo por era en tiempo real. | Todos los usuarios | Ideal |
| RF31 | Monitorear Evapotranspiración | Muestra información estimada sobre la evapotranspiración, basada en múltiples sensores. | Todos los usuarios | Ideal |
| RF32 | Gestión Histórica de Sensores | Guarda los datos recolectados por sensores para consulta futura y análisis histórico. | Administrador, Instructor | Ideal |
| RF33 | Registrar Fases Lunares | El administrador podrá registrar fases lunares y recomendaciones de cultivo asociadas. | Administrador | Opcional |
| RF34 | Mostrar Fases Lunares | Muestra fases lunares en un calendario interactivo con recomendaciones para el cultivo. | Usuario | Opcional |
| RF35 | Calendario de Eventos | Permite registrar y consultar eventos importantes como fertilización, riegos, podas, cosechas, etc. | Usuario | Opcional |
| RF36 | Mapa Interactivo de Cultivos | Visualiza en mapa los cultivos activos, su ubicación (lote/era) e historial. | Todos los usuarios | Ideal |
| RF37 | Gestión de Perfil Personal | Permite a los usuarios editar nombre, correo, teléfono, contraseña y foto de perfil. | Administrador | Esencial |
| RF38 | Registrar Salario Mínimo | Permite registrar salarios mínimos por periodo o región según la normativa. | Administrador | Ideal |
| RF39 | Registrar Precio de Productos | Permite ingresar y actualizar precios base de productos, con impuestos y vigencias. | Administrador | Ideal |
| RF40 | Configurar Sensores | Permite configurar umbrales máximos y mínimos para sensores con alertas automáticas. | Administrador | Ideal |
| RF41 | Control de Arduinos | Permite gestionar configuraciones de software en microcontroladores (por ejemplo, en riego automático). | Administrador | Opcional |
| RF42 | Calcular Pago a Trabajadores | Calcula el pago en función del tiempo trabajado y el valor por hora, mostrando el total a pagar. | Administrador | Ideal |
| RF43 | Registrar Ventas | Registro detallado de ventas por producto, precio, cantidad, cliente y fecha. | Administrador | Esencial |
| RF44 | Calcular Rentabilidad de Cultivos | Calcula y muestra la rentabilidad de cada cultivo según ingresos y egresos. | Administrador, Instructor | Ideal |
| RF45 | Reporte Histórico de Precios | Muestra y exporta un informe con los cambios de precio de productos con fechas de vigencia. | Administrador | Ideal |
| RF46 | Reporte Histórico de Salarios | Muestra los salarios mínimos registrados en el sistema con su vigencia. | Administrador | Ideal |
| RF47 | Gráfico de Tiempo por Actividad | Muestra gráfica con horas trabajadas por actividad durante un periodo. | Administrador, Instructor | Ideal |
| RF48 | Rentabilidad por Actividad | Gráfico de barras con rentabilidad de actividades agrícolas, filtrado por fecha. | Administrador, Instructor | Ideal |
| RF49 | Costo Total por Actividad | Muestra desglose de insumos utilizados y su costo total por actividad. | Administrador | Ideal |
| RF50 | Rendimiento de Ventas | Muestra estadísticas y gráficos de productos vendidos e ingresos por producto. | Administrador, Instructor | Ideal |
| RF51 | Informe Mano de Obra | Desglose de tiempo trabajado y costos laborales por actividad, exportable a PDF o Excel. | Administrador | Ideal |
| RF52 | Reporte de Usuarios | Informe sobre la actividad, satisfacción y uso del sistema por parte de aprendices. | Administrador | Ideal |
| RF53 | Reporte de Insumos | Muestra información completa de los insumos registrados. | Administrador | Ideal |
| RF54 | Reporte de Herramientas | Muestra el estado y detalles de todas las herramientas registradas. | Administrador | Ideal |
| RF55 | Reporte de Sensores en Tiempo Real | Informe gráfico con datos de sensores como humedad, temperatura, pH, luz, etc. | Administrador | Ideal |
| RF56 | Reporte de Especies y Tipos | Lista todas las especies y tipos registrados. | Administrador | Ideal |
| RF57 | Reporte de Semilleros Activos | Genera un informe PDF con semilleros activos, estado y fechas clave. | Administrador | Ideal |
| RF58 | Reporte de Lotes | Informe detallado de lotes activos con dimensiones, tipo de suelo, rotaciones, etc. | Administrador | Ideal |
| RF59 | Reporte de Eras | Muestra dimensiones, estado, tipo de cultivo previo y disponibilidad de eras. | Administrador | Ideal |
| RF60 | Reporte de Cultivos Activos | Muestra información de cultivos activos con ubicación, estado, fechas y descripción. | Administrador | Ideal |
| RF61 | Reporte de Actividades Realizadas | Detalla historial de actividades realizadas por cultivo con fecha, recursos e instrucciones. | Administrador | Ideal |
| RF62 | Reporte Mensual de Plagas | Reporte mensual en PDF con nombre de organismos, ubicación, grado de afectación y acciones tomadas. | Administrador | Ideal |
| RF63 | Reporte de Controles Fitosanitarios | Detalla los controles aplicados a plagas/enfermedades por cultivo. | Administrador | Ideal |
| RF64 | Reporte de Egresos por Insumos | Reporte detallado del consumo de insumos y costos por actividad. | Administrador | Ideal |
| RF65 | Registrar Sensores | Permite registrar los dispositivos físicos (sensores) en el sistema, especificando su nombre, tipo, bancal asociado, rangos de medición y un código de dispositivo (device_code) único para la comunicación. | Administrador/Instructor | Esencial |
| RF66 | Gestionar Sensores | Permite visualizar, editar la información y cambiar el estado (activo/inactivo) de los sensores previamente registrados para mantener el inventario de hardware actualizado. | Administrador/Instructor | Esencial |
| RF67 | Recibir Datos Meteorológicos | El sistema es capaz de recibir y almacenar datos enviados desde los sensores IoT a través de peticiones HTTP (para datos históricos) y conexiones WebSocket (para monitoreo en tiempo real). | Administrador/Instructor/Pasante | Esencial |
| RF68 | Visualizar Datos Históricos | Permite a los usuarios consultar y filtrar los datos meteorológicos almacenados por sensor, bancal o rango de fechas, para analizar las condiciones pasadas de los cultivos. | Administrador/Instructor/Pasante | Esencial |
| RF69 | Generar Reporte PDF de Datos Meteorológicos | Genera un reporte en formato PDF que resume los datos meteorológicos, incluyendo tablas de los últimos registros, promedios diarios y un resumen general. | Administrador/Instructor | Ideal |
| RF70 | Calcular Evapotranspiración (ETo) | Calcula y guarda el valor de la evapotranspiración diaria (ETo) para un bancal específico, basándose en los datos meteorológicos recopilados y la latitud del lugar. | Administrador/Instructor | Esencial |
| RF71 | Gestionar Registros de ETo | Permite visualizar, filtrar y editar los registros históricos de evapotranspiración para llevar un control sobre la necesidad de riego de los cultivos. | Administrador/Instructor | Opcional |
| RF72 | Generar Reporte PDF de Evapotranspiración | Genera un reporte en formato PDF con los datos históricos de evapotranspiración filtrados por un rango de fechas. | Administrador/Instructor | Ideal |

---

## Usuarios y Roles

A continuación, se describen los distintos tipos de usuarios que interactúan con el sistema, indicando sus responsabilidades y niveles de acceso:

### Administrador
- **Acceso**: Total al sistema.
- **Responsabilidades**: Gestionar usuarios, roles, insumos, configuraciones generales y realizar tareas administrativas clave.

### Instructor
- **Acceso**: Casi todas las funcionalidades, excepto la gestión de insumos y usuarios.
- **Responsabilidades**: Supervisar y apoyar procesos técnicos y formativos.

### Pasante
- **Acceso**: Permisos limitados para actividades específicas.
- **Responsabilidades**: Registrar actividades, plagas y generar reportes relacionados con sus tareas.

### Invitado
- **Acceso**: Limitado, sin interacción con módulos hasta que un administrador asigne un rol.
- **Responsabilidades**: Usado para cuentas nuevas no configuradas.

---

## Diagrama de Casos de Uso

### General
*Placeholder: El diagrama general de casos de uso muestra la interacción de los roles con el sistema. A continuación, un ejemplo en Mermaid:*

 
### Específicos
1. Registro de usuarios

<img src="/public/informe_general/img1.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Editar usuarios
<img src="/public/informe_general/img2.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. Desactivar usuarios  
   <img src="/public/informe_general/img3.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

4. Registrar, editar y desactivación de bancales  
   <img src="/public/informe_general/img4.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

5. Registrar, editar y desactivación de Lotes  
   <img src="/public/informe_general/img5.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

6. Registrar, editar y seguimiento de Controles  
   <img src="/public/informe_general/img6.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

7. Asignar una actividad  
   <img src="/public/informe_general/img7.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

8. Registrar, editar Cultivos  
   <img src="/public/informe_general/img8.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

9. Registrar y editar cosecha  
   <img src="/public/informe_general/img9.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

10. Registrar recordatorios  
    <img src="/public/informe_general/img10.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

11. Registrar y editar tipo de plaga  
    <img src="/public/informe_general/img11.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

12. Registrar y editar plaga  
    <img src="/public/informe_general/img12.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

13. Registrar y editar una afección  
    <img src="/public/informe_general/img13.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

14. Registro y edición de salario mínimo  
    <img src="/public/informe_general/img14.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

15. Registrar una venta  
    <img src="/public/informe_general/img15.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

16. Calcular Costo beneficio  
    <img src="/public/informe_general/img16.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

17. Calcular pago  
    <img src="/public/informe_general/img17.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

18. Registrar Insumos  
    <img src="/public/informe_general/img18.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

19. Registrar Herramientas  
    <img src="/public/informe_general/img19.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

20. Registrar Bodegas  
    <img src="/public/informe_general/img20.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

21. Registrar Bodega Insumo  
    <img src="/public/informe_general/img21.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

22. Registrar Bodega Herramienta  
    <img src="/public/informe_general/img22.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

23. Registrar Producto  
    <img src="/public/informe_general/img23.png" alt="Mapa de navegación del sistema AgroSis" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />


 # Historias de Usuario - AgroSoft

## 1. Registro de usuario

**ID Historia**: HU 1  
**Nombre**: Registro de usuario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo registrarme en el sistema  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema  
El sistema presenta el registro  
El usuario ingresa el nombre, apellido, numero de documento y correo  
El sistema valida la información y permite al usuario registrarse

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos son validos | Cuando se presione el botón de registrar en el formulario de registro de usuarios | Se permitirá la creación de una cuenta con rol de “Invitado”, un usuario administrado asignará otro rol posteriormente |
| 2 | Ingreso fallido | Si los datos son inválidos | Cuando se presione el botón de registrar en el formulario de registro | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Ingreso fallido | Si el nombre de usuario es inválido | Cuando se presione el botón de ingresar en el formulario de registro | Se presentará un mensaje de advertencia indicando que el nombre de usuario es inválido. |
| 4 | Ingreso fallido | Si el apellido de usuario es inválido | Cuando se presione el botón de ingresar en el formulario de registro | Se presentará un mensaje de advertencia indicando que el apellido de usuario es inválido. |
| 5 | Ingreso fallido | Si el número de documento contiene caracteres especiales eso ya fue usado en otro registro. | Cuando se presione el botón de ingresar en el formulario de registro. | Se presentará un mensaje de advertencia indicando que el número de documento ya está en uso o es inválido |
| 6 | Ingreso fallido | Si el correo no es inválido o ya fue usado en otro registro. | Cuando se presione el botón de ingresar en el formulario de registro. | Se presentará un mensaje de advertencia indicando que el correo ya está en uso o es inválido. |

## 2. Ingreso al Sistema

**ID Historia**: HU 2  
**Nombre**: Ingreso al Sistema  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo iniciar sesión en la aplicación  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema  
El sistema presenta la ventana de login  
El usuario ingresa el número de documento y contraseña  
El sistema valida la información y permite el ingreso asignando los permisos de usuario.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Ingreso exitoso | Si los datos son validos | Cuando se presione el botón de ingresar en el formulario de login | Se permitirá el ingreso al sistema y se mostrará el panel principal. |
| 2 | Ingreso fallido | Si el usuario esta desactivado en su estado de cuenta | Cuando se presione el botón de ingresar en el formulario de login | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Ingreso fallido | Si el número de documento de usuario es inválido | Cuando se presione el botón de ingresar en el formulario de login | Se presentará un mensaje de advertencia indicando que el número de documento de usuario es inválido. |
| 4 | Ingreso fallido | Si la contraseña es invalida | Cuando se presione el botón de ingresar en el formulario de login | Se presentará un mensaje de advertencia indicando que la contraseña es inválida. |

## 3. Administrador edita usuario

**ID Historia**: HU 3  
**Nombre**: Administrador edita usuario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario administrador  
**FUNCIONALIDAD**: Deseo editar un usuario  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de usuarios.  
El usuario remplaza la información que desea cambiar el EJ. nombre, apellido, etc.  
El sistema valida la información y permite al usuario realizar el cambio.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se permitirá realizar los respectivos cambios al usuario |
| 2 | Actualización fallida | Si los datos son inválidos | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si el nombre de usuario es inválido | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el nombre de usuario es inválido. |
| 4 | Actualización fallida | Si el apellido de usuario es inválido | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el apellido de usuario es inválido. |
| 5 | Actualización fallida | Si el número de documento del usuario no contiene números, caracteres especiales o ya fue usado en otro registro. | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el número de documento no es inválido. |
| 6 | Actualización fallida | Si el correo no es inválido. | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el correo no eses inválida. |

## 4. Usuario edita su información

**ID Historia**: HU 4  
**Nombre**: Usuario edita su información  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo editar mi información  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa a su perfil.  
El usuario remplaza la información que desea cambiar el EJ. nombre, apellido, etc.  
El sistema valida la información y permite al usuario realizar el cambio.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se permitirá realizar los respectivos cambios al usuario |
| 2 | Actualización fallida | Si los datos son inválidos | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si el nombre de usuario es inválido | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el nombre de usuario es inválido. |
| 4 | Actualización fallida | Si el apellido de usuario es inválido | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el apellido de usuario es inválido. |
| 5 | Actualización fallida | Si el número de documento ya eta en uso o es inválido. | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el número de documento ya está en uso o es inválido |
| 6 | Actualización fallida | Si el correo ya está en uso o no es inválido. | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el correo ya está en uso o es inválido. |

## 5. Desactivar usuario

**ID Historia**: HU 5  
**Nombre**: Desactivar usuario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo desactivar un usuario  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de usuarios.  
El administrador elige a un usuario y cambia su estado en la tabla de usuarios.  
El sistema valida la información y permite al usuario realizar el cambio.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se permitirá realizar los respectivos cambios al usuario |
| 2 | Actualización fallida | Si los datos son inválidos | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si el nombre de usuario es inválido | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el nombre de usuario es inválido. |
| 4 | Actualización fallida | Si el apellido de usuario es inválido | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el apellido de usuario es inválido. |
| 5 | Actualización fallida | Si el número de documento es inválido. | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el número de documento no es inválido. |
| 6 | Actualización fallida | Si el correo no es inválido. | Cuando se presione el botón de confirmar en el formulario de editar usuarios | Se presentará un mensaje de advertencia indicando que el correo no eses inválida. |

## 6. Visualizar usuario

**ID Historia**: HU 6  
**Nombre**: Visualizar usuario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo desactivar un usuario  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de usuarios.  
El administrador visualiza a los usuarios registrados con sus respectivos datos.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el usuario tiene el rol adecuado para ver el listado de usuarios. | Cuando se presione el botón de listar usuarios. | Se permitirá realizar los respectivos cambios al usuario |
| 2 | Visualización fallida | Si no tienes el rol requerido para ver el listado de usuarios | Cuando se presione el botón de listar usuarios. | Se presentará un mensaje de advertencia indicando que no tienes el rol requerido para ver el listado de usuarios, |

## 7. Recuperar contraseña

**ID Historia**: HU 6  
**Nombre**: Recuperar contraseña  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo recuperar contraseña  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al log-in.  
El usuario ingresa a ¿olvidaste tu contraseña?  
El sistema le pide al usuario un correo para enviar el enlace de recuperación.  
El usuario ingresa el correo.  
El sistema envía enlace de recuperación.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Recuperación exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de correo de recuperación. | Se enviará un enlace de recuperación al correo dispuesto por el usuario. |
| 2 | Recuperación fallida | Si el correo proporcionado no es válido. | Cuando se presione el botón de confirmar en el formulario de correo de recuperación. | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Recuperación fallida | Si el tiempo de validez del enlace ya expiró. | Cuando se presione el botón de confirmar en el formulario de cambio de contraseña | Se presentará un mensaje de advertencia indicando que el token no es válido, tiempo expirado. |

## 8. Registro de un Lote

**ID Historia**: HU 7  
**Nombre**: Registro de un Lote  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo registrar un lote  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo Lote.  
El usuario se dirige al formulario de registro de lotes e ingresa la información solicitada; nombre, descripción, estado, longitud x, longitud y, etc.  
El sistema valida la información y permite al usuario realizar el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se permitirá realizar el registro del lote. |
| 2 | Registro fallido | Si hay algún campo vacío. | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se presentará un mensaje de advertencia indicando que hay campos sin completar. |
| 3 | Registro fallido | Si el nombre del tipo de control no contiene números, caracteres especiales o ya fue usado en otro registro. | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se presentará un mensaje de advertencia indicando que el nombre del lote es inválido. |
| 4 | Registro fallido | Si la descripción del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se presentará un mensaje de advertencia indicando que la descripción del lote es inválida. |
| 5 | Registro fallido | Si la longitud X del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se presentará un mensaje de advertencia indicando que la longitud X del lote es inválida. |
| 6 | Registro fallido | Si la longitud Y del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se presentará un mensaje de advertencia indicando que la longitud Y del lote es inválida. |

## 9. Visualizar Lotes

**ID Historia**: HU 7  
**Nombre**: Visualizar Lotes  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo visualizar un lote  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo Lote.  
El usuario se dirige a la tabla de lotes,  
El sistema valida la información y permite al usuario ver los lotes.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el usuario cuente con el rol requerido. | Cuando se presione el botón de ver lista de usuarios. | Se permitirá realizar la visualización. |
| 2 | Visualización fallida | Si el usuario NO cuenta con el rol requerido. | Cuando se presione el botón de confirmar en el formulario de registrar lotes. | Se presentará una redirección del usuario a su perfil. |

## 10. Editar un Lote

**ID Historia**: HU 10  
**Nombre**: Editar un Lote  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo editar un lote  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo Lote.  
El usuario se dirige a la tabla de lotes, selecciona la opción de editar un lote en específico.  
se despliega el formulario de editar lotes y remplaza la información deseada; nombre, descripción, estado, longitud x, longitud y, etc.  
El sistema valida la información y permite al usuario realizar la actualización.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de actualizar lotes. | Se permitirá realizar el registro del lote. |
| 2 | Registro fallido | Si hay algún campo vacío | Cuando se presione el botón de confirmar en el formulario de actualizar lotes. | Se presentará un mensaje de advertencia indicando que hay campos vacíos |
| 3 | Registro fallido | Si el nombre del tipo de control es inválido o ya fue usado. | Cuando se presione el botón de confirmar en el formulario de actualizar lotes. | Se presentará un mensaje de advertencia indicando que el nombre del lote es inválido. |
| 4 | Registro fallido | Si la descripción del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de actualizar lotes. | Se presentará un mensaje de advertencia indicando que la descripción del lote es inválida. |
| 5 | Registro fallido | Si la longitud X del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de actualizar lotes. | Se presentará un mensaje de advertencia indicando que la longitud X del lote es inválida. |
| 6 | Registro fallido | Si la longitud Y del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de actualizar lotes. | Se presentará un mensaje de advertencia indicando que la longitud Y del lote es inválida. |

## 11. Eliminar un Lote

**ID Historia**: HU 11  
**Nombre**: Eliminar un Lote  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo eliminar un lote  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo Lote.  
El usuario se dirige a la tabla de lotes, selecciona la opción de editar un lote en específico.  
se despliega el formulario de eliminar lotes.  
El sistema valida la información y permite al usuario realizar la eliminación.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Eliminación exitosa | Si el usuario cuenta con los permisos necesarios. | Cuando se presione el botón de confirmar en recuadro de advertencia para eliminar. | Se permitirá realizar la eliminación del lote. |
| 2 | Eliminación fallida | Si el usuario NO cuenta con los permisos necesarios. | Cuando se presione el botón de confirmar en recuadro de advertencia para eliminar. | Se presentará un mensaje de advertencia indicando que no se tienen permisos para la acción. |

## 12. Registro de un Bancal

**ID Historia**: HU 12  
**Nombre**: Registro de un Bancal  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo registrar un bancal  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo bancal.  
El usuario se dirige al formulario de registro de bancales e ingresa la información solicitada; nombre, descripción, estado, Lote, longitud x, longitud y, etc.  
El sistema valida la información y permite al usuario realizar el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de registrar bancales. | Se permitirá realizar el registro del bancal. |
| 2 | Registro fallido | Si hay algún campo vacío. | Cuando se presione el botón de confirmar en el formulario de registrar bancales. | Se presentará un mensaje de advertencia indicando que hay campos sin completar. |
| 3 | Registro fallido | Si el nombre del tipo de control no contiene números, caracteres especiales o ya fue usado en otro registro. | Cuando se presione el botón de confirmar en el formulario de registrar bancales. | Se presentará un mensaje de advertencia indicando que el nombre del bancal es inválido. |
| 4 | Registro fallido | Si la descripción del bancal es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar bancales. | Se presentará un mensaje de advertencia indicando que la descripción del bancal es inválida. |
| 5 | Registro fallido | Si la longitud X del lote es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar bancales | Se presentará un mensaje de advertencia indicando que la longitud X del bancal es inválida. |
| 6 | Registro fallido | Si la longitud Y del bancal es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar bancales | Se presentará un mensaje de advertencia indicando que la longitud Y del bancal es inválida. |
| 7 | Registro Fallido | Si no hay lotes registrados | Cuando se presione el botón de confirmar en el formulario de registrar bancales | Se presentará un mensaje de advertencia indicando que no hay lotes registrados. |

## 13. Visualizar bancales

**ID Historia**: HU 13  
**Nombre**: Visualizar bancales  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo visualizar los bancales  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de bancales.  
El usuario se dirige a la tabla de bancal,  
El sistema valida la información y permite al usuario ver los bancales.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el usuario cuente con el rol requerido. | Cuando se presione el botón de ver lista de bancales. | Se permitirá realizar la visualización. |
| 2 | Visualización fallida | Si el usuario NO cuenta con el rol requerido. | Cuando se presione el botón de ver lista de bancales. | Se presentará una notificación de que el usuario no tiene el rol necesario. |

## 14. Editar un bancal

**ID Historia**: HU 14  
**Nombre**: Editar un bancal  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo editar un bancal  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo bancal.  
El usuario se dirige a la tabla de lotes, selecciona la opción de editar un bancal en específico.  
se despliega el formulario de editar bancales y remplaza la información deseada; nombre, descripción, estado, longitud x, longitud y, Lote etc.  
El sistema valida la información y permite al usuario realizar la actualización.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de actualizar bancales. | Se permitirá realizar la actualización del bancal. |
| 2 | Registro fallido | Si hay algún campo vacío | Cuando se presione el botón de confirmar en el formulario de actualizar bancales. | Se presentará un mensaje de advertencia indicando que hay campos vacíos |
| 3 | Registro fallido | Si el nombre del tipo de control es inválido o ya fue usado. | Cuando se presione el botón de confirmar en el formulario de actualizar bancales. | Se presentará un mensaje de advertencia indicando que el nombre del bancal es inválido. |
| 4 | Registro fallido | Si la descripción del bancal es inválida. | Cuando se presione el botón de confirmar en el formulario de actualizar bancales. | Se presentará un mensaje de advertencia indicando que la descripción del bancal es inválida. |
| 5 | Registro fallido | Si la longitud X del bancal es inválida. | Cuando se presione el botón de confirmar en el formulario de actualizar bancales. | Se presentará un mensaje de advertencia indicando que la longitud X del bancal es inválida. |
| 6 | Registro fallido | Si la longitud Y del bancal es inválida. | Cuando se presione el botón de confirmar en el formulario de actualizar bancales. | Se presentará un mensaje de advertencia indicando que la longitud Y del bancal es inválida. |

## 15. Eliminar un bancal

**ID Historia**: HU 15  
**Nombre**: Eliminar un bancal  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo eliminar un bancal  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de Cultivo.  
El usuario ingresa a el subItem de tipo bancal.  
El usuario se dirige a la tabla de lotes, selecciona la opción de editar un bancal en específico.  
se despliega el formulario de eliminar bancal.  
El sistema valida la información y permite al usuario realizar la eliminación.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Eliminación exitosa | Si el usuario cuenta con los permisos necesarios. | Cuando se presione el botón de confirmar en recuadro de advertencia para eliminar. | Se permitirá realizar la eliminación del bancal. |
| 2 | Eliminación fallida | Si el usuario NO cuenta con los permisos necesarios. | Cuando se presione el botón de confirmar en recuadro de advertencia para eliminar. | Se presentará un mensaje de advertencia indicando que no se tienen permisos para la acción. |

## 16. Registro de tipo de control

**ID Historia**: HU 16  
**Nombre**: Registro de tipo de control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo registrar un tipo control  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
El usuario ingresa al sistema.  
El usuario ingresa al módulo de plagas.  
El usuario ingresa a el subItem de tipo de control.  
El usuario se dirige al formulario de registro de tipo control e ingresa la información solicitada; nombre, descripción, etc.  
El sistema valida la información y permite al usuario realizar el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se permitirá realizar el registro de tipo de control. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se presentará un mensaje de advertencia indicando que hay campos sin completar. |
| 3 | Registro fallido | Si el nombre del tipo de control es inválido | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se presentará un mensaje de advertencia indicando que el nombre del tipo de control es inválido. |
| 4 | Registro fallido | Si la descripción del tipo de control es inválida. | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se presentará un mensaje de advertencia indicando que la descripción del tipo de control. |
 
## 17. Visualizar un tipo de control

**ID Historia**: HU 17  
**Nombre**: Visualizar un tipo de control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo visualizar los tipos de control  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de tipo de control.  
4. El usuario da clic en ver listado de tipo control.  
5. El sistema valida la información y permite al usuario realizar la visualización.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el usuario tiene el rol adecuado para visualizar. | Cuando se presione el botón de listar tipos de control. | Se permitirá realizar la visualización de los tipos de control. |
| 2 | Visualización fallida | Si el usuario NO tiene el rol adecuado para visualizar. | Cuando se presione el botón de confirmar en el formulario de editar tipo de control. | Una notificación informará al usuario que no tiene el permiso para realizar la acción. |

## 18. Editar un tipo de control

**ID Historia**: HU 18  
**Nombre**: Editar un tipo de control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo Editar un tipo control  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de tipo de control.  
4. El usuario se dirige al listado de tipo control y remplaza la información solicitada; nombre, descripción, etc.  
5. El sistema valida la información y permite al usuario realizar la actualización.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de editar tipo de control. | Se permitirá realizar la actualización de tipo de control. |
| 2 | Actualización fallida | Si los datos son inválidos | Cuando se presione el botón de confirmar en el formulario de editar tipo de control. | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si el nombre del tipo de control es inválido | Cuando se presione el botón de confirmar en el formulario de editar tipo de control. | Se presentará un mensaje de advertencia indicando que el nombre del tipo de control es inválido. |
| 4 | Actualización fallida | Si la descripción del tipo de control es inválida. | Cuando se presione el botón de confirmar en el formulario de editar tipo de control. | Se presentará un mensaje de advertencia indicando que la descripción del tipo de control. |

## 19. Eliminar un tipo de control

**ID Historia**: HU 19  
**Nombre**: Eliminar un tipo de control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador.  
**FUNCIONALIDAD**: Deseo registrar un control.  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de tipo de control.  
4. El usuario se dirige al listado de tipo control y elimina el tipo de control selecionado.  
5. El sistema valida la información y permite al usuario realizar la Eliminación.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Eliminación exitosa | Si el rol del usuario es el adecuado | Cuando se presione el botón de confirmar en el recuadro de advertencia. | Se permitirá realizar la eliminación de tipo de control. |
| 2 | Eliminación fallida | Si el rol del usuario NO es el adecuado | Cuando se presione el botón de confirmar en el formulario de eliminar tipo de control. | Se presentará un mensaje de advertencia indicando no tiene permisos para esta opción |

## 20. Registro de control

**ID Historia**: HU 20  
**Nombre**: Registro de control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo registrar un control  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de t control.  
4. El usuario se dirige al formulario de registro de tipo control e ingresa la información solicitada; afección, descripción, usuario encargado, insumos o productos etc.  
5. El sistema valida la información y permite al usuario realizar el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se permitirá realizar el registro de tipo de control. |
| 2 | Registro fallido | Si no hay afecciones registradas | Cuando se presione el botón de confirmar en el formulario de registro control. | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Registro fallido | Si no hay insumos registrados | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se presentará un mensaje de advertencia indicando que no hay insumos. |
| 4 | Registro fallido | Si no hay tipos de control registrados. | Cuando se presione el botón de confirmar en el formulario de registrar tipo de control. | Se presentará un mensaje de advertencia indicando que no hay tipo de control registrados. |

## 21. Editar un control

**ID Historia**: HU 21  
**Nombre**: Editar un control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo Editar un control  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de control.  
4. El usuario se dirige al listado de control y remplaza la información solicitada; afección, cultivo, etc.  
5. El sistema valida la información y permite al usuario realizar el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de editar tipo de control. | Se permitirá realizar la actualización de control. |
| 2 | Actualización fallida | Si los datos son inválidos | Cuando se presione el botón de confirmar en el formulario de editar control. | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si no hay afecciones registradas | Cuando se presione el botón de confirmar en el formulario de editar el control. | Se presentará un mensaje de advertencia indicando que no hay afecciones registradas. |
| 4 | Actualización fallida | Si no hay tipos de control registrados | Cuando se presione el botón de confirmar en el formulario de editar el control. | Se presentará un mensaje de advertencia indicando que no hay controles registrados. |

## 22. Visualizar controles

**ID Historia**: HU 22  
**Nombre**: Visualizar controles  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo visualizar los controles  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de control.  
4. El usuario da clic en ver listado de control.  
5. El sistema valida la información y permite al usuario realizar la visualización.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el usuario tiene el rol adecuado para visualizar. | Cuando se presione el botón de listar tipos de controles. | Se permitirá realizar la visualización de los controles. |
| 2 | Visualización fallida | Si el usuario NO tiene el rol adecuado para visualizar. | Cuando se presione el botón de listar tipos de controles. | Una notificación informará al usuario que no tiene el permiso para realizar la acción. |

## 23. Eliminar un control

**ID Historia**: HU 23  
**Nombre**: Eliminar un control  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador.  
**FUNCIONALIDAD**: Deseo eliminar un control.  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de plagas.  
3. El usuario ingresa a el subItem de control.  
4. El usuario se dirige al listado de control y elimina el tipo de control selecionado.  
5. El sistema valida la información y permite al usuario realizar la Eliminación.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Eliminación exitosa | Si el rol del usuario es el adecuado | Cuando se presione el botón de confirmar en el recuadro de advertencia. | Se permitirá realizar la eliminación del control. |
| 2 | Eliminación fallida | Si el rol del usuario NO es el adecuado | Cuando se presione el botón de confirmar en el formulario de eliminar tipo de control. | Se presentará un mensaje de advertencia indicando no tiene permisos para esta opción |

## 24. Registrar Tipo Plaga

**ID Historia**: HU 5  
**Nombre**: Registrar Tipo Plaga  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar el tipo de plaga de las cosechas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Registrar Tipo de Plaga".  
3. El sistema muestra un formulario con:  
   - Nombre (texto, máx. 30 caracteres, único).  
   - Descripción (texto detallado).  
   - Imagen (opcional, archivo de imagen).  
4. El usuario completa y envía el formulario.  
5. El sistema valida:  
   - Nombre único y dentro del límite.  
   - Campos requeridos completos.  
6. Si es válido, guarda el registro.  
7. Muestra mensaje de confirmación y lista actualizada de tipos de plaga.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de Tipo Plaga son válidos | Cuando se presione el botón de registrar | El sistema registrará el tipo plaga y lo añadirá a la lista de tipo plaga. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si el tipo plaga ya está registrado | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que el tipo plaga ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar el tipo plaga | El sistema mostrara la lista actualizada del tipo de plaga registrados |

## 25. Actualizar Tipo Plaga

**ID Historia**: HU 10  
**Nombre**: Actualizar Tipo Plaga  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de el tipo de plaga registrados.  
**RESULTADO**: Para mantener los datos de los tipos de plagas actualizados y precisos en el sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Listar Tipos de Plaga".  
3. El sistema muestra una lista con los tipos de plaga (nombre, descripción, imagen si aplica).  
4. El usuario selecciona un registro y elige "Actualizar".  
5. El sistema presenta un formulario con los datos actuales (nombre, descripción, imagen).  
6. El usuario modifica los datos necesarios.  
7. El sistema valida:  
   - Nombre único y dentro del límite.  
   - Campos requeridos completos.  
8. Si es válido, actualiza el registro.  
9. Muestra mensaje de confirmación y lista actualizada de tipos de plaga.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información del Tipo de plaga en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar un tipo de plaga | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 25. Registrar Plaga

**ID Historia**: HU 5  
**Nombre**: Registrar Plaga  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar las plagas de las cosechas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Registrar Plaga".  
3. El sistema muestra un formulario con:  
   - Tipo de plaga (seleccionable desde lista de tipos de plaga existentes).  
   - Nombre (texto, máx. 30 caracteres, único).  
   - Descripción (texto detallado).  
   - Imagen (opcional, archivo de imagen).  
4. El usuario completa y envía el formulario.  
5. El sistema valida:  
   - Nombre único y dentro del límite de caracteres.  
   - Campos requeridos completos (tipo de plaga, nombre, descripción).  
6. Si es válido, guarda el registro.  
7. Muestra mensaje de confirmación y lista actualizada de plagas.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de Plaga son válidos | Cuando se presione el botón de registrar | El sistema registrará la plaga y lo añadirá a la lista de plaga. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la plaga ya está registrada | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que la plaga ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la plaga | El sistema mostrara la lista actualizada de plaga registrados |

## 26. Actualizar Plaga

**ID Historia**: HU 10  
**Nombre**: Actualizar Plaga  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de la plaga registrados.  
**RESULTADO**: Para mantener los datos de plagas actualizados y precisos en el sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Listar Plagas".  
3. El sistema muestra una lista con las plagas registradas (tipo de plaga, nombre, descripción, imagen si aplica).  
4. El usuario selecciona un registro y elige "Actualizar".  
5. El sistema presenta un formulario con los datos actuales (tipo de plaga, nombre, descripción, imagen).  
6. El usuario modifica los datos necesarios.  
7. El sistema valida:  
   - Nombre único y dentro del límite de caracteres.  
   - Campos requeridos completos.  
8. Si es válido, actualiza el registro.  
9. Muestra mensaje de confirmación y lista actualizada de plagas.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información de plaga en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar una plaga | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 27. Registrar Afección

**ID Historia**: HU 5  
**Nombre**: Registrar Afección  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar las Afecciones de las cosechas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Registrar Afección".  
3. El sistema muestra un formulario con:  
   - Reporte (opcional, seleccionable desde reportes de plaga existentes).  
   - Cultivo (seleccionable desde cultivos existentes).  
   - Plaga (seleccionable desde plagas existentes).  
   - Bancal (seleccionable desde bancales existentes).  
   - Nombre (texto, máx. 30 caracteres).  
   - Descripción (texto detallado).  
   - Fecha de detección (fecha).  
   - Gravedad (seleccionable: Leve, Moderada, Grave).  
   - Estado (seleccionable: Estable, En Control, Eliminada, Activa; por defecto Activa).  
4. El usuario completa y envía el formulario.  
5. El sistema valida:  
   - Nombre dentro del límite de caracteres.  
   - Campos requeridos completos (cultivo, plaga, bancal, nombre, descripción, fecha, gravedad).  
6. Si es válido, guarda el registro.  
7. Muestra mensaje de confirmación y lista actualizada de afecciones.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de afección son válidos | Cuando se presione el botón de registrar | El sistema registrará la plaga y lo añadirá a la lista de afecciones. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la afección ya está registrada | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que la afección ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la afección | El sistema mostrara la lista actualizada de afección registrados |

## 28. Actualizar Afección

**ID Historia**: HU 10  
**Nombre**: Actualizar Afección  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de la afección registrados.  
**RESULTADO**: Para mantener los datos de la afección actualizados y precisos en el sistema.

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Listar Afecciones".  
3. El sistema muestra una lista con las afecciones registradas (reporte, cultivo, plaga, bancal, nombre, descripción, fecha de detección, gravedad, estado).  
4. El usuario selecciona un registro y elige "Actualizar".  
5. El sistema presenta un formulario con los datos actuales (reporte, cultivo, plaga, bancal, nombre, descripción, fecha de detección, gravedad, estado).  
6. El usuario modifica los datos necesarios.  
7. El sistema valida:  
   - Nombre dentro del límite de caracteres.  
   - Campos requeridos completos.  
8. Si es válido, actualiza el registro.  
9. Muestra mensaje de confirmación y lista actualizada de afecciones.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información de la afección en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar una afección | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 29. Registrar Tipo de especie

**ID Historia**: HU 5  
**Nombre**: Registrar Tipo de especie  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Para guardar esta información en el sistema y poder asignarla a otros procesos relacionados.  
**RESULTADO**: Deseo registrar el nombre y descripción  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Tipo especie”  
4. Selecciona "Registrar Tipo de especie".  
5. El sistema muestra un formulario con:  
   - Nombre (texto, máx. 30 caracteres, único).  
   - Descripción (texto detallado).  
   - Imagen (opcional, archivo de imagen).  
6. El usuario completa y envía el formulario.  
7. El sistema valida:  
   - Nombre único y dentro del límite.  
   - Campos requeridos completos.  
8. Si es válido, guarda el registro.  
9. Muestra mensaje de confirmación y lista actualizada de tipo de especie.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de Tipo especie son válidos | Cuando se presione el botón de registrar | El sistema registrará el tipo de especie y lo añadirá a la lista de tipo de especie. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si el tipo de especie ya está registrado | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que el tipo de especie ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar el tipo de especie | El sistema mostrara la lista actualizada del tipo de especie registrados |

## 30. Registrar especie

**ID Historia**: HU 5  
**Nombre**: Registrar especie  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Para gestionar eficientemente la información de las especies disponibles en el sistema  
**RESULTADO**: Deseo registrar el nombre y descripción  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Especie”  
4. Selecciona "Registrar Especie".  
5. Completa los campos requeridos: nombre, tipo, descripción, largo de crecimiento, imagen.  
6. El usuario completa y envía el formulario.  
7. El sistema valida:  
   - Nombre único y dentro del límite.  
   - Campos requeridos completos.  
8. Si es válido, guarda el registro.  
9. Muestra mensaje de confirmación y lista actualizada de las especies  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de especie son válidos | Cuando se presione el botón de registrar | El sistema registrará la especie y lo añadirá a la lista de especie. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la especie ya está registrado | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que la especie ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la especie | El sistema mostrara la lista actualizada de las especies registradas |

## 31. Listar Especie

**ID Historia**: HU 5  
**Nombre**: Listar Especie  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo visualizar una lista con los datos de las especies registradas  
**RESULTADO**: Para consultar fácilmente la información almacenada  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Especie”  
4. Selecciona "Listar Especie".  
5. El sistema muestra una tabla con nombre, tipo, descripción, largo de crecimiento e imagen.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Lista cargada | Existen especies | Entrar a sección | Se muestra una lista con la información. |
| 2 | Lista vacía | No hay especies | Entrar a sección | El sistema mostrará la tabla vacía |

## 32. Registrar cultivo

**ID Historia**: HU 5  
**Nombre**: Registrar cultivo  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo registrar un cultivo con su especie, bancal, unidad de medida y fecha de siembra  
**RESULTADO**: Para gestionar y monitorear adecuadamente el cultivo en el sistema  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Cultivo”  
4. Selecciona "Registrar cultivo".  
5. El sistema muestra los campos requeridos: nombre, especie, bancal, unidad de medida, fecha de siembra, estado (activo).  
6. El sistema valida y guarda la información del cultivo.  
7. Muestra mensaje de confirmación y lista actualizada de cultivo.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Existen cultivo | Presiona “Registrar | El cultivo queda guardado en la base de datos. |
| 2 | Campo obligatorio | Algún campo vacío | Presiona “Registrar” | Mensaje “campos obligatorios” |
| 3 | Nombre duplicado | Ya existe un cultivo con ese nombre | Presiona “Registrar” | Mensaje “el cultivo ya existe” |

## 33. Editar cultivo

**ID Historia**: HU 5  
**Nombre**: Editar cultivo  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como adminstrador  
**FUNCIONALIDAD**: Deseo registrar un cultivo con su especie, bancal, unidad de medida y fecha de siembra  
**RESULTADO**: Para gestionar y monitorear adecuadamente el cultivo en el sistema  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Cultivo”  
4. El usuario accede a la lista de cultivos.  
5. Presiona el botón “Editar” en el cultivo deseado.  
6. El sistema muestra el formulario con los datos actuales.  
7. El usuario modifica y guarda los cambios.  
8. El sistema valida y actualiza los datos.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Existen cultivo | Presiona “Registrar | El cultivo queda guardado en la base de datos. |
| 2 | Campo obligatorio | Algún campo vacío | Presiona “Registrar” | Mensaje “campos obligatorios” |
| 3 | Nombre duplicado | Ya existe un cultivo con ese nombre | Presiona “Registrar” | Mensaje “el cultivo ya existe” |

## 34. Trazabilidad cultivo

**ID Historia**: HU 5  
**Nombre**: Trazabilidad cultivo  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo consultar la trazabilidad de un cultivo (actividades y cosechas realizadas)  
**RESULTADO**: Para hacer seguimiento histórico y tomar decisiones basadas en el proceso del cultivo  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Trazabilidad”  
4. El usuario selecciona la cosecha a ver la trazabilidad  
5. El sistema valida la información  
6. El sistema muestra información relacionada con la trazabilidad de las cosechas  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Carga exitosamente | El cultivo debe existir y debe tener actividades relacionadas | Selecciona el cultivo | Se visualiza la trazabilidad de ese cultivo |
| 2 | Sin eventos | El cultivo aún no tiene actividades relacionadas | Selecciona el cultivo | Se muestra vacío |

## 35. Registrar tipo de actividad

**ID Historia**: HU 37  
**Nombre**: Registrar tipo de actividad  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo registrar un nuevo tipo de actividad agrícola con su nombre y descripción  
**RESULTADO**: Deseo registrar un nuevo tipo de actividad agrícola con su nombre y descripción  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Tipo de actividad”  
4. El usuario presiona el botón “Registrar”  
5. El usuario llena los campos : nombre y descripción  
6. El usuario presiona “Guardar”  
7. El sistema valida la información y guarda el tipo de actividad  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Todos los campos son válidos | Presiona “Guardar” | Se guarda correctamente el tipo de actividad y se visualiza en la lista de tipo de actividad |
| 2 | Campo vacío | Algún campo esta vacío | Presiona “Guardar” | Muestra un mensaje de error |
| 3 | Nombre duplicado | Ya existe un tipo con ese nombre | Presiona “Guardar” | Muestra un mensaje “el nombre ya esta registrado” |

## 36. Editar tipo de actividad

**ID Historia**: HU 5  
**Nombre**: editar tipo de actividad  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo modificar el nombre o la descripción de un tipo de actividad  
**RESULTADO**: Para corregir errores o actualizar información relevante  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Tipo de actividad”  
4. El usuario presiona el botón “editar”  
5. El sistema muestra el modal de edición  
6. El usuario llena los campos : nombre y descripción  
7. El usuario presiona “Guardar”  
8. El sistema valida la información y guarda el tipo de actividad  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Todos los campos son válidos | Presiona “confirmar” | Se actualiza correctamente el tipo de actividad y se visualiza en la lista de tipo de actividad |
| 2 | Campo vacío | Algún campo esta vacío | Presiona “confirmar” | Muestra un mensaje de error |
| 3 | Nombre duplicado | Ya existe un tipo con ese nombre | Presiona “confirmar” | Muestra un mensaje “el nombre ya esta registrado” |

## 36. Editar tipo de actividad (Repetida)

**ID Historia**: HU 5  
**Nombre**: editar tipo de actividad  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo modificar el nombre o la descripción de un tipo de actividad  
**RESULTADO**: Para corregir errores o actualizar información relevante  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Tipo de actividad”  
4. El usuario presiona el botón “editar”  
5. El sistema muestra el modal de edición  
6. El usuario llena los campos : nombre y descripción  
7. El usuario presiona “Guardar”  
8. El sistema valida la información y guarda el tipo de actividad  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Todos los campos son válidos | Presiona “confirmar” | Se actualiza correctamente el tipo de actividad y se visualiza en la lista de tipo de actividad |
| 2 | Campo vacío | Algún campo esta vacío | Presiona “confirmar” | Muestra un mensaje de error |
| 3 | Nombre duplicado | Ya existe un tipo con ese nombre | Presiona “confirmar” | Muestra un mensaje “el nombre ya esta registrado” |

## 38. Registrar tipo de actividad

**ID Historia**: HU 5  
**Nombre**: registrar tipo de actividad  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo asignarle una actividad a un usuario  
**RESULTADO**: Registrar y asignarle una actividad a un usuario  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Actividades”  
4. El usuario llena los campos  
5. El usuario presiona “Guardar”  
6. El sistema valida la información y guarda la actividad  
7. El sistema notifica al usuario correspondiente  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Todos los campos son válidos | Presiona “guardar” | Se guarda correctamente la actividad y se visualiza en la lista de actividades |
| 2 | Campo vacío | Algún campo esta vacío | Presiona “guardar” | Muestra un mensaje de error |
| 3 | Stock insuficiente | No existen stock de insumos y herramientas | Presiona “guardar” | Muestra un mensaje de stock insuficiente |

## 39. Finalizar actividad

**ID Historia**: HU 5  
**Nombre**: finalizar actividad  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo finalizar la actividad previamente asignada  
**RESULTADO**: Finalizar la actividad  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Cultivo”  
3. El usuario selecciona el submodulo “Actividades”  
4. Presiona el icono de finalizar  
5. El sistema presenta un modal de finalización  
6. El usuario completa los insumos devueltos y las herramientas devueltas  
7. El usuario presiona “Guardar”  
8. El sistema valida la información y finaliza la actividad  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Finalizacion exitoso | Todos los campos son válidos | Presiona “guardar” | Se guarda correctamente la actividad y se visualiza en la lista de actividades |
| 2 | Campo vacío | Algún campo esta vacío | Presiona “guardar” | Muestra un mensaje de error |

## 40. Registro de salario

**ID Historia**: HU 24  
**Nombre**: Registro de salario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo registrar un salario  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de finanzas.  
3. El usuario ingresa a el subItem de salario.  
4. El usuario se dirige al formulario de registro de salario e ingresa la información solicitada; rol, fecha de implementación y valor jornal.  
5. El sistema valida la información y permite al usuario realizar el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos son validos | Cuando se presione el botón de confirmar en el formulario de registro de salario. | Se permitirá realizar el registro de tipo de control. |
| 2 | Registro fallido | Si los datos son inválidos | Cuando se presione el botón de confirmar en el formulario de registro de salario. | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Registro fallido | Si no hay roles registrados | Cuando se presione el botón de confirmar en el formulario de registro de salario. | Se presentará un mensaje de advertencia indicando que no hay roles registrados. |
| 4 | Registro fallido | Si el valor ingresado en el valor del jornal NO es el correcto | Cuando se presione el botón de confirmar en el formulario de registro de salario. | Se presentará un mensaje de advertencia indicando que El formato del valor jornal no es el correcto |

## 41. Visualizar salario

**ID Historia**: HU 25  
**Nombre**: Visualizar salario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo visualizar los salarios  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de finanzas.  
3. El usuario ingresa a el subItem de salario.  
4. El usuario da clic en ver listado de salarios.  
5. El sistema valida la información y permite al usuario realizar la visualización.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el usuario tiene el rol adecuado para visualizar. | Cuando se presione el botón de listar salarios. | Se permitirá realizar la visualización de los salarios. |
| 2 | Visualización fallida | Si el usuario NO tiene el rol adecuado para visualizar. | Cuando se presione el botón de listar salarios. | Una notificación informará al usuario que no tiene el permiso para realizar la acción. |

## 42. Desactivación de salario

**ID Historia**: HU 26  
**Nombre**: Desactivación de salario  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como usuario  
**FUNCIONALIDAD**: Deseo registrar un salario  
**RESULTADO**: Para hacer uso de las funcionalidades del sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de finanzas.  
3. El usuario ingresa a el subItem de salario.  
4. El usuario se dirige a la tabla de salarios, ubica el salario que quiere desactivar  
5. El sistema valida la información y permite al usuario realizar la desactivación.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Desactivación exitosa | Si el usuario tiene los roles adecuados | Cuando se presione el botón de cambio de estado del salario. | Se permitirá realizar la desactivación. |
| 2 | Desactivación fallida | Si el usuario no cuenta con los roles adecuados | Cuando se presione el botón de cambio de estado del salario | Se presentará un mensaje de advertencia indicando que se cuentan con los roles adecuados |

## 42. Calcular pago

**ID Historia**: HU 5  
**Nombre**: Calcular pago  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como administrador  
**FUNCIONALIDAD**: Deseo calcular el pago al trabajador con base a las horas trabajas  
**RESULTADO**: Se visualiza cuanto se le debe pagar al trabajador  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario se dirige al modulo “Finanzas”  
3. El usuario selecciona el submodulo “Pagos”  
4. Presiona el botón de “Registrar”  
5. El sistema presenta un formulario  
6. El usuario diligencia el usuario y las fechas de inicio y fin  
7. El usuario presiona “Guardar”  
8. Calcula horas, jornales y pago total basado en el salario vigente del rol del usuario.  
9. El sistema valida la información y guarda el pago  

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Usuario valido con actividades completadas | Presiona “guardar” | Se guarda el pago y se devuelve los datos calculados |
| 2 | Usuario no tiene rol | Usuario sin rol asignado | Presiona “guardar” | Muestra un mensaje de error |
| 3 | Sin actividades en rango | No hay actividades completadas en ese rango | Presiona “guardar” | Muestra un mensaje de error |
| 4 | Pago ya existente | Ya existe un pago en ese rango | Presiona “guardar” | Muestra un mensaje de error |
| 5 | Sin salario configurado | No existe un salario para ese rol | Presiona “guardar” | Muestra un mensaje de error |

## 43. Registrar un nuevo sensor IoT

**ID Historia**: HU 43  
**Nombre**: Registrar un nuevo sensor IoT  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar un nuevo sensor IoT en el sistema  
**RESULTADO**: Para poder asociarlo a un bancal y comenzar a recopilar datos ambientales en tiempo real e históricos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de "IoT" y selecciona la opción "Sensores".  
3. El usuario hace clic en "Registrar" y completa el formulario con los datos del sensor: nombre, tipo, bancal, device_code, etc.  
4. El sistema valida la información y guarda el nuevo sensor.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si todos los datos requeridos son válidos y el device_code es único. | Cuando se presione el botón "Guardar" en el formulario de registro de sensor. | Se registrará el sensor y se mostrará un mensaje de éxito. El nuevo sensor aparecerá en la lista. |
| 2 | Registro fallido | Si el device_code ingresado ya existe en otro sensor. | Cuando se presione el botón "Guardar". | Se presentará un mensaje de advertencia indicando que el código de dispositivo ya está en uso. |
| 3 | Registro fallido | Si falta algún campo obligatorio como el nombre o el tipo de sensor. | Cuando se presione el botón "Guardar". | Se presentará un mensaje de advertencia indicando que los campos obligatorios deben ser completados. |

## 44. Registrar un nuevo sensor IoT

**ID Historia**: HU 44  
**Nombre**: Registrar un nuevo sensor IoT  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo editar un sensor IoT en del sistema  
**RESULTADO**: Para poder asociarlo a un bancal y comenzar a recopilar datos ambientales en tiempo real e históricos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario ingresa al módulo de "IoT" y selecciona la opción "Sensores".  
3. El usuario hace clic en "editar" y completa el formulario con los datos del sensor: nombre, tipo, bancal, device_code, etc.  
4. El sistema valida la información y guarda el nuevo sensor.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si todos los datos requeridos son válidos y el device_code es único. | Cuando se presione el botón "Guardar" en el formulario de edición de sensor. | Se registrará el sensor y se mostrará un mensaje de éxito. El nuevo sensor aparecerá en la lista. |
| 2 | Registro fallido | Si el device_code ingresado ya Existe en otro sensor. | Cuando se presione el botón "Guardar". | Se presentará un mensaje de advertencia indicando que el código El dispositivo ya está en uso. |

## 45. Monitorear datos en tiempo real

**ID Historia**: HU 28  
**Nombre**: Monitorear datos en tiempo real  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo visualizar los datos meteorológicos de un sensor en tiempo real  
**RESULTADO**: Para monitorear las condiciones actuales del cultivo y tomar acciones inmediatas si los valores salen de los umbrales seguros.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario navega al panel de control de IoT o a la vista de un bancal específico.  
3. El sistema establece una conexión con el método de comunicación elegido, MQTT /WS/HTTP y muestra gráficos que se actualizan automáticamente con los datos recibidos del sensor.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización exitosa | Si el sensor está activo y enviando datos a través de MQTT /WS/HTTP. | Al cargar la página del panel de IoT. | Se mostrarán gráficos (ej. temperatura, humedad) que se actualizan cada pocos segundos sin necesidad de recargar la página. |
| 2 | Alerta por umbral | Si un dato recibido (ej. temperatura > 50°C) excede los límites predefinidos. | Cuando el servidor MQTT /WS/HTTP recibe el dato anómalo. | Se mostrará una alerta visual en la interfaz notificando sobre la condición crítica. |
| 3 | Falla de conexión | Si el sensor deja de enviar datos o se pierde la conexión. | Tras un tiempo sin recibir datos. | El sistema mostrará un indicador de que el sensor está desconectado o no está enviando información. |

## 46. Calcular Evapotranspiración (ETo)

**ID Historia**: HU 46  
**Nombre**: Calcular Evapotranspiración (ETo)  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo calcular la evapotranspiración (ETo) para un bancal en una fecha determinada  
**RESULTADO**: Para determinar la necesidad de riego y optimizar el uso del agua en los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario hace clic en "Calcular" y selecciona un bancal y una fecha.  
3. El sistema busca los datos meteorológicos necesarios para esa fecha.  
4. El sistema realiza el cálculo y muestra el valor de ETo, guardando el registro.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Cálculo exitoso | Si existen suficientes datos meteorológicos para el bancal y la fecha seleccionados. | Cuando se presione el botón "Calcular" en el formulario. | Se registrará el valor de ETo en mm/día y se mostrará un mensaje de éxito. |
| 2 | Cálculo fallido | Si no se encuentran datos meteorológicos para el día especificado. | Cuando se presione el botón "Calcular". | Se presentará un mensaje de advertencia indicando que no hay datos suficientes para realizar el cálculo. |
| 3 | Conflicto de registro | Si ya existe un registro de ETo para el mismo bancal y fecha. | Cuando se presione el botón "Calcular". | Se presentará un mensaje de error indicando que ya existe un registro y no se puede duplicar. |

## 47. Registrar Insumos Agrícolas

**ID Historia**: HU 5  
**Nombre**: Registrar Insumos Agrícolas  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar los insumos agrícolas utilizados en la producción de cultivos  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de registrar insumos.  
3. El sistema presenta un formulario para ingresar los datos del insumo (nombre, tipo, cantidad, etc.).  
4. El usuario completa el formulario y confirma el registro.  
5. El sistema valida la información y registra el insumo, mostrando una lista actualizada de insumos.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos del insumo son válidos | Cuando se presione el botón de registrar | El sistema registrará el insumo y lo añadirá a la lista de insumos. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si el insumo ya está registrado | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que el insumo ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar el insumo | El sistema mostrara la lista actualizada de insumos registrados |

## 48. Listar Insumos Registrados

**ID Historia**: HU 6  
**Nombre**: Listar Insumos Registrados  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo visualizar una lista de todos los insumos agrícolas registrados en el sistema  
**RESULTADO**: Para consultar y gestionar de manera eficiente la información de los insumos disponibles.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar insumos.  
3. El sistema presenta una ventana con la lista de insumos registrados, incluyendo detalles como nombre, tipo y cantidad.  
4. El sistema permite al usuario seleccionar un insumo para ver información detallada.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Listado exitoso | Si existen insumos registrados | Cuando se acceda a la sección de listar insumos | Se mostrará una lista con los insumos registrados y sus detalles básicos. |
| 2 | Listado vacío | Si no hay insumos registrados | Cuando se acceda a la sección de listar insumos | Se presentará un mensaje indicando que no hay insumos registrados. |
| 3 | Visualización de detalles | Si se selecciona un insumo de la lista | Cuando se presione en un insumo | Se mostrará una ventana con la información detallada del insumo seleccionado. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente acceder a la lista de insumos | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 49. Actualizar Insumos

**ID Historia**: HU 7  
**Nombre**: Actualizar Insumos  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo actualizar la información de los insumos agrícolas registrados  
**RESULTADO**: Para mantener los datos de los insumos actualizados y precisos en el sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar insumos.  
3. El sistema presenta la lista de insumos registrados.  
4. El usuario selecciona un insumo y elige la opción de actualizar.  
5. El usuario modifica los datos en el formulario de actualización.  
6. El sistema valida la información y actualiza el registro del insumo.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información del insumo en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar un insumo | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 50. Registrar Herramientas

**ID Historia**: HU 8  
**Nombre**: Registrar Herramientas  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar las herramientas agrícolas utilizadas en la producción de cultivos  
**RESULTADO**: Para gestionar de manera eficiente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de registrar herramientas.  
3. El sistema presenta un formulario para ingresar los datos de la herramienta (nombre, tipo, cantidad, etc.).  
4. El usuario completa el formulario y confirma el registro.  
5. El sistema valida la información y registra la herramienta, mostrando una lista actualizada de herramientas.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de la herramienta son válidos | Cuando se presione el botón de registrar | Se registrará la herramienta y se añadirá a la lista de herramientas. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | Se presentará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la herramienta ya está registrada | Cuando se presione el botón de registrar | Se presentará un mensaje de advertencia indicando que la herramienta ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la herramienta | Se mostrará la lista actualizada de herramientas registradas. |

## 51. Listar Herramientas Registradas

**ID Historia**: HU 9  
**Nombre**: Listar Herramientas Registradas  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo visualizar una lista de todas las herramientas agrícolas registradas en el sistema  
**RESULTADO**: Para consultar y gestionar de manera eficiente la información de las herramientas disponibles.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar herramientas.  
3. El sistema presenta una ventana con la lista de herramientas registradas, incluyendo detalles como nombre, tipo y cantidad.  
4. El sistema permite al usuario seleccionar una herramienta para ver información detallada.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Listado exitoso | Si existen herramientas registradas | Cuando se acceda a la sección de listar herramientas | Se mostrará una lista con las herramientas registradas y sus detalles básicos. |
| 2 | Listado vacío | Si no hay herramientas registradas | Cuando se acceda a la sección de listar herramientas | Se presentará un mensaje indicando que no hay herramientas registradas. |
| 3 | Visualización de detalles | Si se selecciona una herramienta de la lista | Cuando se presione en una herramienta | Se mostrará una ventana con la información detallada de la herramienta seleccionada. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente acceder a la lista de herramientas | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 52. Actualizar Herramientas

**ID Historia**: HU 10  
**Nombre**: Actualizar Herramientas  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de las herramientas agrícolas registradas  
**RESULTADO**: Para mantener los datos de las herramientas actualizados y precisos en el sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar herramientas.  
3. El sistema presenta la lista de herramientas registradas.  
4. El usuario selecciona una herramienta y elige la opción de actualizar.  
5. El usuario modifica los datos en el formulario de actualización.  
6. El sistema valida la información y actualiza el registro de la herramienta.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información de la herramienta en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar una herramienta | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 53. Gestionar el Inventario de Insumos

**ID Historia**: HU 11  
**Nombre**: Gestionar el Inventario de Insumos  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo gestionar el inventario de insumos agrícolas  
**RESULTADO**: Para garantizar la disponibilidad de insumos y optimizar su uso en los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de gestionar inventario de insumos.  
3. El sistema presenta una lista de insumos con sus cantidades actuales.  
4. El usuario selecciona un insumo para actualizar su cantidad o registrar un nuevo ingreso/egreso.  
5. El sistema valida la información y actualiza el inventario, mostrando la lista actualizada.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos de inventario son válidos | Cuando se presione el botón de actualizar | Se actualizará la cantidad del insumo en el inventario. |
| 2 | Actualización fallida | Si los datos ingresados son inválidos | Cuando se presione el botón de actualizar | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Visualización de lista | Si hay insumos registrados | Cuando se acceda a la sección de inventario | Se mostrará la lista de insumos con sus cantidades actuales. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente gestionar el inventario | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 54. Gestionar el Inventario de Herramientas

**ID Historia**: HU 43  
**Nombre**: Gestionar el Inventario de Herramientas  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo gestionar el inventario de herramientas agrícolas  
**RESULTADO**: Para garantizar la disponibilidad de herramientas y optimizar su uso en los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de gestionar inventario de herramientas.  
3. El sistema presenta una lista de herramientas con sus cantidades y estados actuales.  
4. El usuario selecciona una herramienta para actualizar su cantidad, estado o registrar un nuevo ingreso/egreso.  
5. El sistema valida la información y actualiza el inventario, mostrando la lista actualizada.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos de inventario son válidos | Cuando se presione el botón de actualizar | Se actualizará la cantidad o estado de la herramienta en el inventario. |
| 2 | Actualización fallida | Si los datos ingresados son inválidos | Cuando se presione el botón de actualizar | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Visualización de lista | Si hay herramientas registradas | Cuando se acceda a la sección de inventario | Se mostrará la lista de herramientas con sus cantidades y estados actuales. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente gestionar el inventario | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 55. Registrar Bodegas

**ID Historia**: HU 5  
**Nombre**: Registrar Bodegas  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar las Bodegas para el almacenamiento de Insumos y Herramientas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de registrar una nueva bodega.  
3. El sistema presenta un formulario para ingresar los datos de la bodega (nombre, teléfono, capacidad, ubicación, estado activo).  
4. El usuario completa el formulario con la información requerida y confirma el registro.  
5. El sistema valida los datos ingresados, asegurando que todos los campos obligatorios estén completos y sean válidos.  
6. El sistema registra la nueva bodega en la base de datos.  
7. El sistema muestra un mensaje de confirmación y presenta la lista actualizada de bodegas disponibles.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de la Bodega son válidos | Cuando se presione el botón de registrar | El sistema registrará la Bodega y lo añadirá a la lista de Bodega. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la Bodega ya está registrada | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que la Bodega ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la Bodega | El sistema mostrara la lista actualizada de Bodega registrados |

## 56. Actualizar Bodega

**ID Historia**: HU 10  
**Nombre**: Actualizar Bodega  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de las Bodegas registradas  
**RESULTADO**: Para mantener los datos de las Bodegas actualizados y precisos en el sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar bodegas.  
3. El sistema presenta la lista de bodegas registradas.  
4. El usuario selecciona una bodega y elige la opción de actualizar.  
5. El sistema muestra un formulario con los datos actuales de la bodega.  
6. El usuario modifica la información en el formulario de actualización (como nombre, teléfono, capacidad, ubicación o estado).  
7. El sistema valida la información ingresada.  
8. El sistema actualiza el registro de la bodega en la base de datos.  
9. El sistema muestra un mensaje de confirmación y la lista actualizada de bodegas.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información de la bodega en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar una Bodega | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 57. Registrar Bodega Herramienta

**ID Historia**: HU 5  
**Nombre**: Registrar Bodega Herramienta  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar las Bodega Herramienta para el almacenamiento de Herramientas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de registrar herramientas en una bodega.  
3. El sistema presenta un formulario para ingresar los datos requeridos: bodega, herramienta, cantidad y creador (usuario que registra).  
4. El usuario completa el formulario y confirma el registro.  
5. El sistema obtiene automáticamente el precio de la herramienta y calcula el costo total multiplicando por la cantidad ingresada.  
6. El sistema valida la información y registra la relación entre la bodega y la herramienta, con su cantidad, costo total y cantidad prestada (por defecto en 0).  
7. El sistema muestra un mensaje de confirmación y una lista actualizada de herramientas por bodega.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de la Bodega Herramienta son válidos | Cuando se presione el botón de registrar | El sistema registrará la Bodega Herramienta y lo añadirá a la lista de Bodega. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la Bodega Herramienta ya está registrada | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que la Bodega Herramienta ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la Bodega Herramienta | El sistema mostrara la lista actualizada de Bodega Herramienta registrados |

## 58. Actualizar Bodega Herramienta

**ID Historia**: HU 10  
**Nombre**: Actualizar Bodega Herramienta  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de las Bodega Herramienta registradas  
**RESULTADO**: Para mantener los datos de las Bodega Herramienta actualizados y precisos en el sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar herramientas por bodega.  
3. El sistema presenta la lista de herramientas registradas en las bodegas.  
4. El usuario selecciona un registro específico y elige la opción de actualizar.  
5. El sistema muestra un formulario con los datos actuales (bodega, herramienta, cantidad, etc.).  
6. El usuario modifica los datos necesarios, como la cantidad de herramientas, la bodega o el creador del registro.  
7. El sistema recalcula el costo total si se ha modificado la cantidad o la herramienta.  
8. El sistema valida la información y actualiza el registro en la base de datos.  
9. El sistema muestra un mensaje de confirmación y la lista actualizada de herramientas por bodega.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información de la bodega Herramienta en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar una Bodega Herramienta | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 59. Registrar Bodega Insumo

**ID Historia**: HU 5  
**Nombre**: Registrar Bodega Insumo  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar las Bodega Insumo para el almacenamiento de Insumos en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de registrar insumos en una bodega.  
3. El sistema presenta un formulario para ingresar los datos requeridos: bodega, insumo y cantidad.  
4. El usuario completa el formulario y confirma el registro.  
5. El sistema valida la información y registra la relación entre la bodega y el insumo, incluyendo la cantidad especificada.  
6. El sistema muestra un mensaje de confirmación y presenta una lista actualizada de insumos por bodega.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos de la Bodega Insumo son válidos | Cuando se presione el botón de registrar | El sistema registrará la Bodega Insumo y lo añadirá a la lista de Bodega. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si la Bodega Insumo ya está registrada | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que la Bodega Insumo ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar la Bodega Insumo | El sistema mostrara la lista actualizada de Bodega Insumo registrados |

## 60. Actualizar Bodega Insumo

**ID Historia**: HU 10  
**Nombre**: Actualizar Bodega Insumo  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de las Bodega Insumo registradas  
**RESULTADO**: Para mantener los datos de las Bodega Insumo actualizados y precisos en el sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. El usuario selecciona la opción de listar insumos por bodega.  
3. El sistema presenta la lista de insumos registrados en las bodegas.  
4. El usuario selecciona un registro específico y elige la opción de actualizar.  
5. El sistema muestra un formulario con los datos actuales del registro (bodega, insumo y cantidad).  
6. El usuario modifica los datos necesarios, como la cantidad o la bodega asociada.  
7. El sistema valida la información y actualiza el registro en la base de datos.  
8. El sistema muestra un mensaje de confirmación y la lista actualizada de insumos por bodega.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información de la bodega Insumo en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar una Bodega Insumo | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 61. Registrar Producto

**ID Historia**: HU 5  
**Nombre**: Registrar Producto  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo registrar el producto de las cosechas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Registrar Precio de Producto".  
3. El sistema muestra un formulario con:  
   - Producto, unidad de medida, precio, fecha de registro, stock, fecha de caducidad (opcional).  
4. El usuario completa y envía el formulario.  
5. El sistema valida:  
   - Stock no negativo.  
   - Fecha de caducidad no anterior a la de registro (si aplica).  
6. Si es válido, guarda el registro.  
7. Muestra mensaje de confirmación y lista actualizada de precios de productos.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Registro exitoso | Si los datos del producto son válidos | Cuando se presione el botón de registrar | El sistema registrará el producto y lo añadirá a la lista de productos. |
| 2 | Registro fallido | Si algún campo está vacío | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que todos los campos son obligatorios. |
| 3 | Registro fallido | Si el producto ya está registrado | Cuando se presione el botón de registrar | El sistema mostrará un mensaje de advertencia indicando que el producto ya existe. |
| 4 | Visualización de lista | Si el registro es exitoso | Después de registrar el producto | El sistema mostrara la lista actualizada del producto registrados |

## 62. Actualizar Producto

**ID Historia**: HU 10  
**Nombre**: Actualizar Producto  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Usuario  
**FUNCIONALIDAD**: Deseo actualizar la información de los Productos registrados  
**RESULTADO**: Para mantener los datos de los Productos actualizados y precisos en el sistema.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Listar Precios de Productos".  
3. El sistema muestra una lista con los precios de productos registrados (producto, precio, stock, unidad de medida, fechas).  
4. El usuario selecciona un registro y elige "Actualizar".  
5. El sistema presenta un formulario con los datos actuales (producto, unidad de medida, precio, fecha de registro, stock, fecha de caducidad).  
6. El usuario modifica los datos necesarios (por ejemplo, precio o stock).  
7. El sistema valida:  
   - Stock no negativo.  
   - Fecha de caducidad no anterior a la de registro (si aplica).  
8. Si es válido, actualiza el registro.  
9. Muestra mensaje de confirmación y la lista actualizada de precios de productos.

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Actualización exitosa | Si los datos modificados son válidos | Cuando se presione el botón de guardar cambios | Se actualizará la información del Producto en el sistema. |
| 2 | Actualización fallida | Si los datos modificados son inválidos | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que los datos son inválidos. |
| 3 | Actualización fallida | Si algún campo obligatorio está vacío | Cuando se presione el botón de guardar cambios | Se presentará un mensaje de advertencia indicando que todos los campos obligatorios deben completarse. |
| 4 | Acceso restringido | Si el usuario no tiene permisos | Cuando se intente actualizar un producto | Se presentará un mensaje de advertencia indicando que no tiene permisos para esta acción. |

## 63. Listar Costo Beneficio

**ID Historia**: HU 5  
**Nombre**: Listar Costo Beneficio  
**Peso**: 5  

### HISTORIA

**ROL**: Yo como Administrador  
**FUNCIONALIDAD**: Deseo listar el costo beneficio de las cosechas en la Producción Agrícola.  
**RESULTADO**: Para gestionar eficientemente los recursos necesarios para los cultivos.  

### Flujo Normal
1. El usuario ingresa al sistema.  
2. Selecciona "Listar Costo-Beneficio".  
3. El sistema muestra una lista con los análisis registrados (cosecha, fecha de cálculo, mano de obra, insumos, total costos, total ingresos, rentabilidad, ROI).

### CRITERIOS DE ACEPTACION

| # | Criterio | Condición | Acción | Resultado |
|---|----------|-----------|--------|-----------|
| 1 | Visualización de lista | Si la consulta es exitosa | Después de Buscar el costo beneficio de una cosecha | El sistema mostrara la lista actualizada del costo beneficio de la cosecha consultada |

## DIAGRAMA DE CLASES

En esta sección se debe presentar el diagrama de clases del sistema. 