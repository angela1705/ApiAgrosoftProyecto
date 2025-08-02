---

title: "Documento Plan de Pruebas"
description: "Plan de pruebas del sistema Agrosoft v1.0"
slug: modules/Configuracion_Tecnica/Casos_de_prueba
--------------------------------------------------------

# **DOCUMENTO PLAN DE PRUEBAS**

**Agrosoft**
**Versión:** 1.0

---

## Tabla de contenido

1. [Introducción](#1-introducción)
2. [Alcance](#2-alcance)
3. [Definiciones, siglas y abreviaturas](#3-definiciones-siglas-y-abreviaturas)
4. [Responsables e involucrados](#4-responsables-e-involucrados)
5. [Plan De Pruebas](#5-plan-de-pruebas)
6. [Casos De Prueba](#6-casos-de-prueba)

---

## 1. Introducción

Este documento presenta el Plan de Pruebas del sistema desarrollado, el cual forma parte del proyecto de gestión agrícola con componentes web y funcionalidades IoT. Su objetivo es definir las estrategias, tipos de pruebas, casos y criterios que permitan verificar que el sistema cumple con los requerimientos funcionales y no funcionales establecidos.

Las pruebas descritas en este plan permiten detectar errores, validar el correcto funcionamiento de los módulos, garantizar la seguridad de los datos y asegurar una experiencia de usuario fluida. Este proceso es fundamental para entregar un sistema robusto, confiable y alineado con las necesidades de sus diferentes usuarios.

---

## 2. Alcance

Este documento define el plan de pruebas del sistema Agrosoft, desarrollado para la Corporación de Gestión y Desarrollo Sostenible (C.G.D.S.S.).

El alcance de este documento incluye la planeación y descripción de los casos de prueba funcionales de los módulos principales del sistema, los cuales abarcan:

* Gestión de usuarios
* Trazabilidad del cultivo
* Gestión de inventario
* Actividades agrícolas
* Cosechas y producción
* Asignación de recursos (insumos y herramientas)
* Monitoreo de condiciones ambientales

Este documento afecta a todas las áreas del sistema donde se requiere validar que las funcionalidades se ejecutan correctamente antes de ser entregadas al usuario final. Además, asegura que los flujos de trabajo críticos del sistema operen sin errores, que los datos se registren de forma segura y coherente, y que se cumplan los requerimientos funcionales establecidos desde el diseño del sistema.

---

## 3. Definiciones, siglas y abreviaturas

* **Agrosoft:** Sistema desarrollado para apoyar la gestión agrícola integral.
* **C.G.D.S.S.:** Corporación de Gestión y Desarrollo Sostenible.
* **IoT:** Internet of Things.
* **Trazabilidad:** Registro cronológico de actividades en el cultivo.
* **CRUD:** Crear, Consultar, Actualizar, Eliminar.
* **CU:** Caso de Uso.
* **Lote:** Área de cultivo delimitada dentro de la finca.
* **Bancal:** Subdivisión dentro de un lote.
* **Unidad de medida:** kg, L, u, g, etc.
* **SMLV:** Salario Mínimo Legal Vigente.
* **UI:** Interfaz de Usuario.
* **Prueba funcional:** Verificación del cumplimiento funcional.
* **Caso de prueba:** Escenario definido para validar una funcionalidad.

---

## 4. Responsables e involucrados

| Nombre                    | Tipo                      | Rol           |
| ------------------------- | ------------------------- | ------------- |
| Juan José Manrique        | Responsable e involucrado | Desarrollador |
| Mauricio Audor Bernal     | Involucrado               | Desarrollador |
| Haison Leandro Toro Lopez | Involucrado               | Desarrollador |

---

## 5. Plan de Pruebas

Esta sección describe los módulos del sistema que serán sometidos a pruebas.

### 5.1 Módulo de Gestión de usuarios

Permite al administrador registrar nuevos usuarios, editar datos, asignar roles y eliminar cuentas.

#### Casos de prueba:

* Crear nuevo usuario con datos válidos
* Intentar crear usuario con correo o documento repetido
* Iniciar sesión con credenciales válidas
* Iniciar sesión con credenciales incorrectas
* Cambiar contraseña
* Editar perfil del usuario
* Eliminar usuario
* Recuperar contraseña
* Cerrar sesión correctamente

### 5.2 Módulo Trazabilidad del cultivo

Permite registrar todas las etapas del proceso productivo desde la preparación hasta la cosecha.

#### Casos de prueba:

* Registrar y editar cultivo
* Registrar y editar lote
* Registrar y editar bancal
* Crear y editar tipos de actividades
* Asignar y editar actividades agrícolas
* Finalizar actividades
* Registrar cosechas
* Validar uso correcto de insumos y herramientas
* Control de stock al asignar actividades
* Filtrar actividades por fecha, tipo o responsable

### 5.3 Módulo Inventario

Gestiona insumos, herramientas y productos en bodega.

#### Funcionalidades:

* Registro y almacenamiento
* Asignación de recursos
* Control de entradas, salidas y movimientos
* Soporte a la venta de productos
* Integración con otros módulos
* Generación de reportes

### 5.4 Módulo IoT

Integra sensores de hardware para capturar, visualizar y analizar datos ambientales en tiempo real.

#### Funcionalidades:

* Gestión de sensores
* Recepción y almacenamiento de datos
* Monitoreo en tiempo real (WebSocket)
* Análisis de datos históricos
* Cálculo de evapotranspiración (ETo)
* Generación de reportes PDF

# 6. Casos de Prueba

Se enumeran las pruebas necesarias para verificar el correcto funcionamiento del módulo.

---

## Caso de uso - Nº Prueba CU1. Registro de Usuarios

### INFORMACIÓN GLOBAL DEL CASO DE PRUEBA

| **CASO DE PRUEBA No.** | CU1                       |
|------------------------|---------------------------|
| **VERSIÓN DE EJECUCIÓN** |                          |
| **FECHA EJECUCIÓN**    |                           |
| **CASO DE USO**        | Registro de nuevo usuario |
| **MÓDULO DEL SISTEMA** | Usuarios                  |

### Descripción del caso de prueba

Validar que el sistema permita registrar un nuevo usuario correctamente con sus datos correspondientes.

---

### Precondiciones

- El usuario debe tener acceso a la plataforma.
- El formulario de registro debe estar disponible.

---

### Pasos de la prueba

1. Ingresar al módulo de usuarios.
2. Hacer clic en “Registrar”.
3. Ingresar la siguiente información: nombre, apellido, número de documento.
4. Hacer clic en “Registrar usuario”.
5. Dirigirse a la lista de usuarios para verificar el correcto registro del nuevo usuario.

---

### Datos de entrada y resultados esperados

| CAMPO               | VALOR     | TIPO ESCENARIO | RESPUESTA ESPERADA                                                                  | COINCIDE | RESPUESTA DEL SISTEMA                                                                               |
|---------------------|-----------|----------------|--------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------|
| Nombre              | Juan      | Positivo       | El sistema debe registrar correctamente al nuevo usuario y mostrar mensaje de éxito | X        | Se muestra un mensaje informando que la operación fue exitosa. El nuevo usuario aparece en la lista |
| Apellido            | Pérez     | Positivo       |                                                                                      | X        |                                                                                                     |
| Número de documento | 100408230 | Positivo       |                                                                                      | X        |                                                                                                     |

---

### Post condiciones

- El usuario queda registrado en la base de datos.
- Se puede iniciar sesión con las credenciales asignadas.

---

### Resultados de la prueba

| DEFECTOS Y DESVIACIONES | VEREDICTO |
|--------------------------|-----------|
| N/A                      | Aprobado  |

**🗒 Observaciones Probador:**  
El correo electrónico podrá ser definido posteriormente por el nuevo usuario en su perfil.

---

## Caso de uso - Nº Prueba CU2. Inicio de sesión con credenciales incorrectas

### INFORMACIÓN GLOBAL DEL CASO DE PRUEBA

| **CASO DE PRUEBA No.** | CU2                                           |
|------------------------|-----------------------------------------------|
| **VERSIÓN DE EJECUCIÓN** |                                             |
| **FECHA EJECUCIÓN**    |                                              |
| **CASO DE USO**        | Inicio de sesión con credenciales incorrectas |
| **MÓDULO DEL SISTEMA** | Usuarios                                     |

### Descripción del caso de prueba

Verificar que el inicio de sesión no permita el acceso si las credenciales son incorrectas.

---

### Precondiciones

- En el sistema debe existir por lo menos un usuario.
- El formulario de inicio de sesión debe estar disponible.

---

### Pasos de la prueba

1. Ingresar al formulario de iniciar sesión.
2. Ingresar número de documento y contraseña incorrectos.
3. Hacer clic en “Iniciar sesión”.
4. Observar respuesta del sistema.

---

### Datos de entrada y resultados esperados

| CAMPO               | VALOR         | TIPO ESCENARIO | RESPUESTA ESPERADA                                                                    | COINCIDE | RESPUESTA DEL SISTEMA                                           |
|---------------------|---------------|----------------|----------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------|
| Número de documento | 1001102       | Negativo       | El sistema impide acceso al usuario y muestra mensaje: “Credenciales incorrectas...”  |          | Se muestra un mensaje de error, el sistema no permite el acceso |
| Contraseña          | Contraseña123 | Negativo       |                                                                                        | X        |                                                                 |

---

### Post condiciones

- El sistema permanece en el inicio de sesión.
- El usuario no puede acceder.

---

### Resultados de la prueba

| DEFECTOS Y DESVIACIONES | VEREDICTO |
|--------------------------|-----------|
| N/A                      | Aprobado  |

**🗒 Observaciones Probador:**  
N/A

---

## Caso de uso - Nº Prueba CU3. Inicio de sesión con credenciales válidas

### INFORMACIÓN GLOBAL DEL CASO DE PRUEBA

| **CASO DE PRUEBA No.** | CU3                                       |
|------------------------|-------------------------------------------|
| **VERSIÓN DE EJECUCIÓN** |                                         |
| **FECHA EJECUCIÓN**    |                                          |
| **CASO DE USO**        | Inicio de sesión con credenciales válidas |
| **MÓDULO DEL SISTEMA** | Usuarios                                 |

### Descripción del caso de prueba

Verificar que el inicio de sesión permita el acceso si las credenciales son correctas.

---

### Precondiciones

- En el sistema debe existir por lo menos un usuario.
- El formulario de inicio de sesión debe estar disponible.

---

### Pasos de la prueba

1. Ingresar al formulario de iniciar sesión.
2. Ingresar número de documento y contraseña correctos.
3. Hacer clic en “Iniciar sesión”.
4. Verificar que el sistema redireccione al panel principal.

---

### Datos de entrada y resultados esperados

| CAMPO               | VALOR          | TIPO ESCENARIO | RESPUESTA ESPERADA                                          | COINCIDE | RESPUESTA DEL SISTEMA                                           |
|---------------------|----------------|----------------|--------------------------------------------------------------|----------|-----------------------------------------------------------------|
| Número de documento | 100408230      | Positivo       | El sistema permite el acceso y redirige al panel principal. | X        | Se muestra un mensaje de error, el sistema no permite el acceso |
| Contraseña          | Contraseña1234 | Positivo       |                                                              | X        |                                                                 |

---

### Post condiciones

- El sistema redirige al usuario al apartado principal según su rol.

---

### Resultados de la prueba

| DEFECTOS Y DESVIACIONES | VEREDICTO |
|--------------------------|-----------|
| N/A                      | Aprobado  |

**🗒 Observaciones Probador:**  
N/A

---

## Caso de uso - Nº Prueba CU4. Editar información de un Usuario

### INFORMACIÓN GLOBAL DEL CASO DE PRUEBA

| **CASO DE PRUEBA No.** | CU4                              |
|------------------------|----------------------------------|
| **VERSIÓN DE EJECUCIÓN** |                                |
| **FECHA EJECUCIÓN**    |                                 |
| **CASO DE USO**        | Editar información de un usuario |
| **MÓDULO DEL SISTEMA** | Usuarios                         |

### Descripción del caso de prueba

Validar que el sistema permita modificar la información de un usuario registrado.

---

### Precondiciones

- El usuario debe estar previamente registrado.

---

### Pasos de la prueba

1. Ingresar al módulo de usuarios.
2. Buscar y seleccionar el usuario a editar.
3. Hacer clic en el ícono de lápiz.
4. Modificar los datos del usuario.
5. Hacer clic en “Confirmar”.
6. Verificar que los cambios se realizaron con éxito.

---

### Datos de entrada y resultados esperados

| CAMPO            | VALOR | TIPO ESCENARIO | RESPUESTA ESPERADA                                                              | COINCIDE | RESPUESTA DEL SISTEMA                                         |
|------------------|-------|----------------|----------------------------------------------------------------------------------|----------|---------------------------------------------------------------|
| Campo/s a editar | -     | Positivo       | El sistema actualiza los datos y muestra mensaje de éxito “Usuario actualizado” | X        | Se muestra mensaje “Usuario actualizado”. Datos actualizados. |

---

### Post condiciones

- Los datos actualizados se guardan en la base de datos.
- El cambio es visible al consultar nuevamente los datos.

---

### Resultados de la prueba

| DEFECTOS Y DESVIACIONES | VEREDICTO |
|--------------------------|-----------|
| N/A                      | Aprobado  |

**🗒 Observaciones Probador:**  
N/A

### 6.5 Caso de Uso - CU5. Recuperación de Contraseña (Prueba Nº 5)

#### Información Global del Caso de Prueba

| **Campo**            | **Valor**                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| CASO DE PRUEBA No.   | CU5                                                                                                                                             |
| VERSIÓN DE EJECUCIÓN |                                                                                                                                                 |
| FECHA EJECUCIÓN      |                                                                                                                                                 |
| CASO DE USO          | Recuperación de contraseña                                                                                                                      |
| MÓDULO DEL SISTEMA   | Usuarios                                                                                                                                        |
| **Descripción**      | Comprobar que el sistema permite al usuario la opción de reestablecer su contraseña enviando un enlace de recuperación a su correo electrónico. |

#### Caso de Prueba

**Precondiciones**

* El usuario debe estar registrado con un correo válido.

**Pasos de la prueba**

1. Ingresa al formulario de inicio de sesión.
2. Hacer clic en “¿Olvidaste tu contraseña?”.
3. Ingresar el correo electrónico en la casilla correspondiente.
4. Hacer clic en “Enviar correo”.
5. Verifica que se muestre una notificación de éxito y que el enlace de recuperación llegue al correo.

**Datos de Entrada y Resultados Esperados**

| CAMPO              | VALOR                                       | TIPO ESCENARIO | RESPUESTA ESPERADA                                                                              | ¿COINCIDE? | RESPUESTA DEL SISTEMA                                                                     |
| ------------------ | ------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------- |
| Correo electrónico | [Juan01@gmail.com](mailto:Juan01@gmail.com) | Positivo       | El sistema debe notificar el envío del enlace de recuperación: “correo de recuperación enviado” | X          | Se muestra una notificación de éxito y se obtiene un correo con un enlace de recuperación |

**Postcondiciones**

* El usuario obtiene el enlace en su correo y puede restablecer su contraseña.
* El sistema guarda la nueva contraseña.

**Resultados de la Prueba**

| Defectos y desviaciones | Veredicto |
| ----------------------- | --------- |
| N/A                     | Aprobado  |

| Observaciones | Probador |
| ------------- | -------- |
| N/A           |          |

---

### Caso de Uso - CU6. Registrar Unidad de Medida (Prueba Nº 6)

#### Información Global del Caso de Prueba

| **Campo**            | **Valor**                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| CASO DE PRUEBA No.   | CU6                                                                                                                         |
| VERSIÓN DE EJECUCIÓN | 1.0                                                                                                                         |
| FECHA EJECUCIÓN      |                                                                                                                             |
| CASO DE USO          | Registro de unidad de medida                                                                                                |
| MÓDULO DEL SISTEMA   | Inventario – Unidad de medida                                                                                               |
| **Descripción**      | Verificar que el sistema permita registrar correctamente una unidad de medida que luego pueda ser usada en las actividades. |

#### Caso de Prueba

**Precondiciones**

* El usuario debe tener permisos de administración sobre el módulo.
* El módulo debe estar habilitado.

**Pasos de la prueba**

1. Ingresar al submódulo “Unidades de Medida”.
2. Hacer clic en “Agregar”.
3. Ingresar nombre de la unidad (por ejemplo: libras).
4. Ingresar una breve descripción.
5. Hacer clic en “Guardar”.
6. Verificar que la unidad se agregue correctamente a la lista.

**Datos de Entrada y Resultados Esperados**

| CAMPO        | VALOR | TIPO ESCENARIO | RESPUESTA ESPERADA                                                                               | ¿COINCIDE? | RESPUESTA DEL SISTEMA                                          |
| ------------ | ----- | -------------- | ------------------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------- |
| Nombre       | Libra | Positivo       | “Unidad registrada Exitosamente.” La unidad debe mostrarse en la tabla y poder ser seleccionada. | X          | Se muestra mensaje de confirmación. Unidad aparece en la lista |
| Abreviatura  | Lb    | Positivo       |                                                                                                  | X          |                                                                |
| Tipo         |       | Positivo       |                                                                                                  | X          |                                                                |
| Equivalencia | 500   | Positivo       |                                                                                                  | X          |                                                                |

**Postcondiciones**

* La unidad queda disponible para ser usada en el resto del módulo de Insumos y Actividades.

**Resultados de la Prueba**

| Defectos y desviaciones | Veredicto                                 |
| ----------------------- | ----------------------------------------- |
| N/A                     | Aprobado / Fallido (según resultado real) |

| Observaciones | Probador |
| ------------- | -------- |
| N/A           |          |

---

### Caso de Uso - CU7. Registrar Insumo (Prueba Nº 7)

#### Información Global del Caso de Prueba

| **Campo**            | **Valor**                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| CASO DE PRUEBA No.   | CU7                                                                                                       |
| VERSIÓN DE EJECUCIÓN | 1.0                                                                                                       |
| FECHA EJECUCIÓN      |                                                                                                           |
| CASO DE USO          | Registrar Insumo                                                                                          |
| MÓDULO DEL SISTEMA   | Inventario – Insumos                                                                                      |
| **Descripción**      | Validar que el sistema permita registrar correctamente un insumo agrícola diligenciando todos los campos. |

#### Caso de Prueba

**Precondiciones**

* El usuario debe tener permisos para acceder y registrar insumos.

**Pasos de la prueba**

1. Ingresar al submódulo insumos.
2. Hacer clic en “Agregar”.
3. Ingresar todos los campos requeridos.
4. Hacer clic en “Guardar”.
5. Verificar que el insumo quede listado correctamente.

**Datos de Entrada y Resultados Esperados**

| CAMPO              | VALOR        | TIPO ESCENARIO | RESPUESTA ESPERADA                                                                        | ¿COINCIDE? | RESPUESTA DEL SISTEMA                                             |
| ------------------ | ------------ | -------------- | ----------------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------- |
| Nombre             | fertilizante | Positivo       | “Insumo registrado Exitosamente.” El nuevo registro debe aparecer en la lista de insumos. | X          | Se muestra mensaje de confirmación. El insumo aparece en la tabla |
| Precio             | 30.000       | Positivo       |                                                                                           | X          |                                                                   |
| Unidad de medida   | Kg           | Positivo       |                                                                                           | X          |                                                                   |
| fecha de creación  | 30/04/2025   | Positivo       |                                                                                           | X          |                                                                   |
| fecha de caducidad | 25/05/2025   | Positivo       |                                                                                           | X          |                                                                   |
| Cantidad           | 30           | Positivo       |                                                                                           | X          |                                                                   |
| Tipo de empacado   | Bulto        | Positivo       |                                                                                           | X          |                                                                   |
| Tipo de Insumo     | Fertilizante | Positivo       |                                                                                           | X          |                                                                   |
| Descripción        | Pesticida    | Positivo       |                                                                                           | X          |                                                                   |

**Postcondiciones**

* El insumo queda registrado y puede ser consultado, eliminado o editado.

**Resultados de la Prueba**

| Defectos y desviaciones | Veredicto                                 |
| ----------------------- | ----------------------------------------- |
| N/A                     | Aprobado / Fallido (según resultado real) |

| Observaciones | Probador |
| ------------- | -------- |
| N/A           |          |

## CU8 - Registrar Herramienta

**Módulo:** Inventario - Herramientas  
**Versión:** 1.0  
**Descripción:** Verificar que el sistema permita registrar correctamente una herramienta, incluyendo el nombre, descripción, cantidad, estado, fecha de registro, precio.

### Precondiciones

- El usuario debe tener permisos de registro en el módulo de inventario.

### Pasos de la Prueba

1. Ingresar al submódulo “Herramientas”.
2. Hacer clic en “Agregar”.
3. Ingresar los campos solicitados.
4. Hacer clic en “Guardar”.
5. Verificar que la herramienta se registre exitosamente en la tabla.

### Datos de Entrada

| Campo            | Valor                    | Tipo de Escenario | Respuesta Esperada                                                                 | Coincide | Respuesta del Sistema                                       |
|------------------|--------------------------|--------------------|------------------------------------------------------------------------------------|----------|--------------------------------------------------------------|
| Nombre           | Martillo                 | Positivo           | “Herramienta registrada Exitosamente.” Aparece en la tabla.                      | Sí        | Se muestra mensaje de confirmación. Herramienta listada.    |
| Cantidad         | 30                       | Positivo           |                                                                                    | Sí        |                                                              |
| Descripción      | Trabajos de carpintería. | Positivo           |                                                                                    | Sí        |                                                              |
| Estado           | Activo                   | Positivo           |                                                                                    | Sí        |                                                              |
| Precio           | 100.000                  | Positivo           |                                                                                    | Sí        |                                                              |
| Fecha de Registro| 29/07/2025               | Positivo           |                                                                                    | Sí        |                                                              |

### Postcondiciones

La herramienta queda registrada y disponible para ser usada, consultada, editada o eliminada.

**Veredicto:** Aprobado  
**Observaciones:** N/A

---

## CU9 - Registrar Una Bodega

**Módulo:** Inventario - Bodega  
**Versión:** 1.0  
**Descripción:** Verificar el correcto registro de una bodega con los campos: Nombre, Teléfono, Estado, Capacidad y Ubicación.

### Precondiciones

- El usuario debe estar autenticado con permisos necesarios.

### Pasos de la Prueba

1. Ingresar al submódulo “Bodega”.
2. Hacer clic en “Registrar”.
3. Llenar los campos requeridos.
4. Hacer clic en “Guardar”.
5. Verificar el registro en la tabla.

### Datos de Entrada

| Campo      | Valor                     | Tipo de Escenario | Respuesta Esperada                                                            | Coincide | Respuesta del Sistema                                   |
|------------|---------------------------|--------------------|-------------------------------------------------------------------------------|----------|----------------------------------------------------------|
| Nombre     | Bodega-Yamboro            | Positivo           | “Bodega Creada Exitosamente.” Aparece en la tabla.                           | Sí        | Mensaje de confirmación. Movimiento aparece en la lista.|
| Teléfono   | 31432533                  | Positivo           |                                                                               | Sí        |                                                          |
| Estado     | Activo                    | Positivo           |                                                                               | Sí        |                                                          |
| Capacidad  | 100                       | Positivo           |                                                                               | Sí        |                                                          |
| Ubicación  | Yamboro Centro Agrícola   | Positivo           |                                                                               | Sí        |                                                          |

### Postcondiciones

El usuario debe tener los permisos necesarios.

**Veredicto:** Aprobado  
**Observaciones:** N/A

---

## CU10 - Registrar Bodega para Insumos

**Módulo:** Inventario – Bodega Insumos  
**Versión:** 1.0  
**Descripción:** Registro correcto de una bodega para almacenar insumos previamente registrados.

### Precondiciones

- Deben existir insumos y bodegas previamente registrados.
- Usuario autenticado con permisos.

### Pasos de la Prueba

1. Ingresar al submódulo “Bodega Insumos”.
2. Hacer clic en “Registrar”.
3. Llenar los campos requeridos.
4. Hacer clic en “Guardar”.
5. Verificar que se muestre en la tabla.

### Datos de Entrada

| Campo   | Valor           | Tipo de Escenario | Respuesta Esperada                                                    | Coincide | Respuesta del Sistema                                     |
|---------|-----------------|--------------------|------------------------------------------------------------------------|----------|------------------------------------------------------------|
| Bodega  | Bodega-Yamboro  | Positivo           | “Bodega registrada Exitosamente.” Aparece en la tabla.               | Sí        | Se muestra mensaje de confirmación. Movimiento listado.   |
| Insumo  | Urea            | Positivo           |                                                                        | Sí        |                                                            |
| Cantidad| 20              | Positivo           |                                                                        | Sí        |                                                            |

### Postcondiciones

La unidad de medida es la del insumo previamente registrado.

**Veredicto:** Aprobado  
**Observaciones:** N/A

---

## CU11 - Registrar Bodega para Herramientas

**Módulo:** Inventario – Bodega Herramientas  
**Versión:** 1.0  
**Descripción:** Registro correcto de una bodega para almacenar herramientas previamente registradas.

### Precondiciones

- Deben existir herramientas y bodegas previamente registradas.
- Usuario autenticado con permisos.

### Pasos de la Prueba

1. Ingresar al submódulo “Bodega Herramientas”.
2. Hacer clic en “Registrar”.
3. Llenar los campos requeridos.
4. Hacer clic en “Guardar”.
5. Verificar que se muestre en la tabla.

### Datos de Entrada

| Campo              | Valor          | Tipo de Escenario | Respuesta Esperada                                                   | Coincide | Respuesta del Sistema                                     |
|--------------------|----------------|--------------------|-----------------------------------------------------------------------|----------|------------------------------------------------------------|
| Bodega             | Bodega-Yamboro | Positivo           | “Bodega registrada Exitosamente.” Aparece en la tabla.              | Sí        | Se muestra mensaje de confirmación. Movimiento listado.   |
| Herramienta        | Martillo       | Positivo           |                                                                       | Sí        |                                                            |
| Costo Total        | 900.000        | Positivo           |                                                                       | Sí        |                                                            |
| Cantidad           | 100            | Positivo           |                                                                       | Sí        |                                                            |
| Cantidad Emprestada| 20             | Positivo           |                                                                       | Sí        |                                                            |

### Postcondiciones

La cantidad de herramientas registrada no debe superar la cantidad existente.

**Veredicto:** Aprobado  
**Observaciones:** N/A

---

## CU12 - Registrar Producto

**Módulo:** Inventario - Producto  
**Versión:** 1.0  
**Descripción:** Verifica que se registre correctamente un producto incluyendo los campos clave.

### Precondiciones

- Usuario con permisos de registro.
- Cosecha previamente registrada.

### Pasos de la Prueba

1. Ingresar al submódulo “Producto”.
2. Hacer clic en “Agregar”.
3. Ingresar los campos solicitados.
4. Hacer clic en “Guardar”.
5. Verificar el registro en la tabla.

### Datos de Entrada

| Campo            | Valor         | Tipo de Escenario | Respuesta Esperada                                                       | Coincide | Respuesta del Sistema                                     |
|------------------|---------------|--------------------|--------------------------------------------------------------------------|----------|------------------------------------------------------------|
| Producto         | Tomate        | Positivo           | “Producto registrado Exitosamente.” Aparece en la tabla.                | Sí        | Se muestra mensaje de confirmación. Producto listado.     |
| Stock            | 30            | Positivo           |                                                                          | Sí        |                                                            |
| Unidad Medida    | Kg            | Positivo           |                                                                          | Sí        |                                                            |
| Fecha Registro   | 30/07/2025    | Positivo           |                                                                          | Sí        |                                                            |
| Precio           | 100.000       | Positivo           |                                                                          | Sí        |                                                            |
| Fecha Caducidad  | 29/08/2025    | Positivo           |                                                                          | Sí        |                                                            |

### Postcondiciones

Producto disponible para uso, consulta, edición o eliminación.

**Veredicto:** Aprobado  
**Observaciones:** N/A

---

## CU13 - Registrar Tipo de Insumo

**Módulo:** Inventario – Tipo de Insumo  
**Versión:** 1.0  
**Descripción:** Registro correcto de un tipo de insumo para su uso en la creación de insumos.

### Precondiciones

- Usuario con permisos administrativos.
- Módulo habilitado.

### Pasos de la Prueba

1. Ingresar al submódulo “Insumos”.
2. Hacer clic en “Agregar”.
3. Ingresar nombre y descripción del tipo de insumo.
4. Hacer clic en “Guardar”.
5. Verificar que aparezca en la lista.

### Datos de Entrada

| Campo       | Valor                           | Tipo de Escenario | Respuesta Esperada                                                             | Coincide | Respuesta del Sistema                                     |
|-------------|---------------------------------|--------------------|--------------------------------------------------------------------------------|----------|------------------------------------------------------------|
| Nombre      | Fertilizante                    | Positivo           | “Tipo de Insumo registrado Exitosamente.” Disponible al registrar insumos.    | Sí        | Se muestra mensaje de confirmación. Tipo listado.         |
| Descripción | Para la fertilización de plantas| Positivo           |                                                                                | Sí        |                                                            |

### Postcondiciones

Tipo de insumo disponible para uso.

**Veredicto:** Aprobado  
**Observaciones:** N/A

## CU14 - Registrar, Listar y Editar Cultivo

**Módulo:** Trazabilidad - Cultivo
**Versión:** 1.0
**Descripción:** Verificar que el sistema permita registrar correctamente un cultivo, visualizarlo en un listado y editarlo posteriormente.

### Precondiciones

* El usuario debe tener permisos de administración.
* Deben existir registros previos de Especies, Bancales y Unidades de Medida.

### Pasos de la Prueba

1. Ingresar al submódulo "Cultivos".
2. Hacer clic en "Agregar".
3. Seleccionar especie y bancal.
4. Ingresar nombre del cultivo.
5. Seleccionar unidad de medida.
6. Marcar estado activo.
7. Ingresar fecha de siembra.
8. Hacer clic en "Guardar".
9. Verificar registro en la lista.
10. Editar y confirmar cambios reflejados.

### Datos de Entrada

| Campo            | Valor                | Tipo Escenario | Respuesta Esperada                                       | Coincide | Respuesta del Sistema               |
| ---------------- | -------------------- | -------------- | -------------------------------------------------------- | -------- | ----------------------------------- |
| Especie          | Maíz                 | Positivo       | "Cultivo registrado correctamente." Aparece en la tabla. | Sí       | Se muestra mensaje de confirmación. |
| Bancal           | Bancal 3             | Positivo       |                                                          | Sí       |                                     |
| Nombre           | Maíz temporada Junio | Positivo       |                                                          | Sí       |                                     |
| Unidad de medida | kg/gr/unidad/Litro   | Positivo       |                                                          | Sí       |                                     |
| Activo           | Sí/No                | Positivo       |                                                          | Sí       |                                     |
| Fecha de siembra | 2025-07-30           | Positivo       |                                                          | Sí       |                                     |

### Postcondiciones

El cultivo debe estar disponible para asignación en otras actividades.

**Veredicto:** Aprobado
**Observaciones:** N/A

---

## CU15 - Registrar, Listar y Editar Lotes

**Módulo:** Trazabilidad - Lotes
**Versión:** 1.0
**Descripción:** Verificar registro, edición y visualización correcta de lotes.

### Precondiciones

* Usuario con permisos de administración.

### Pasos de la Prueba

1. Ingresar al submódulo "Lotes".
2. Hacer clic en "Registrar".
3. Ingresar nombre, descripción, estado, dimensiones y coordenadas.
4. Hacer clic en "Guardar".
5. Verificar aparición en el listado.
6. Editar datos, guardar y confirmar cambios.

### Datos de Entrada

| Campo       | Valor           | Tipo Escenario | Respuesta Esperada                                    | Coincide | Respuesta del Sistema               |
| ----------- | --------------- | -------------- | ----------------------------------------------------- | -------- | ----------------------------------- |
| Nombre      | Lote 1          | Positivo       | "Lote registrado correctamente." Aparece en la tabla. | Sí       | Se muestra mensaje de confirmación. |
| Descripción | Área de tomates | Positivo       |                                                       | Sí       |                                     |
| Activo      | Sí/No           | Positivo       |                                                       | Sí       |                                     |
| Tamaño X    | 25.50           | Positivo       |                                                       | Sí       |                                     |
| Tamaño Y    | 30.75           | Positivo       |                                                       | Sí       |                                     |
| Latitud     | 5.123456        | Positivo       |                                                       | Sí       |                                     |
| Longitud    | -75.123456      | Positivo       |                                                       | Sí       |                                     |

### Postcondiciones

El lote debe quedar registrado correctamente y los cambios reflejarse donde corresponda.

**Veredicto:** Aprobado
**Observaciones:** N/A

---

## CU16 - Registrar, Listar y Editar Bancal

**Módulo:** Trazabilidad - Bancal
**Versión:** 1.0
**Descripción:** Registrar una era asociada a un lote, modificar sus datos y visualizarlos.

### Precondiciones

* Usuario con permisos sobre el módulo.
* Deben existir lotes previamente registrados.

### Pasos de la Prueba

1. Ingresar al submódulo "Bancal".
2. Hacer clic en "Registrar".
3. Ingresar datos y seleccionar lote.
4. Guardar y verificar en la lista.
5. Editar y confirmar cambios reflejados.

### Datos de Entrada

| Campo    | Valor      | Tipo Escenario | Respuesta Esperada                 | Coincide | Respuesta del Sistema               |
| -------- | ---------- | -------------- | ---------------------------------- | -------- | ----------------------------------- |
| Nombre   | Bancal 1   | Positivo       | "Bancal registrado correctamente." | Sí       | Se muestra mensaje de confirmación. |
| Tamaño Y | 10.50      | Positivo       |                                    | Sí       |                                     |
| Tamaño X | 8.25       | Positivo       |                                    | Sí       |                                     |
| Latitud  | 5.123456   | Positivo       |                                    | Sí       |                                     |
| Longitud | -75.654321 | Positivo       |                                    | Sí       |                                     |
| Lote     | Lote A     | Positivo       |                                    | Sí       |                                     |

### Postcondiciones

El bancal queda registrado y asociado correctamente a un lote.

**Veredicto:** Aprobado
**Observaciones:** N/A

---

## CU17 - Registrar, Listar y Editar Tipo de Actividad

**Módulo:** Trazabilidad - Tipo de Actividad
**Versión:** 1.0
**Descripción:** Registrar y editar tipos de actividades a realizar sobre cultivos.

### Precondiciones

* Usuario con permisos de acceso y edición.

### Pasos de la Prueba

1. Ingresar al submódulo "Tipo de actividad".
2. Hacer clic en "Registrar".
3. Ingresar nombre y descripción.
4. Guardar y verificar en la lista.
5. Editar y confirmar actualización.

### Datos de Entrada

| Campo       | Valor                        | Tipo Escenario | Respuesta Esperada                            | Coincide | Respuesta del Sistema               |
| ----------- | ---------------------------- | -------------- | --------------------------------------------- | -------- | ----------------------------------- |
| Nombre      | Fertilización                | Positivo       | "Tipo de actividad registrado correctamente." | Sí       | Se muestra mensaje de confirmación. |
| Descripción | Aplicación de abono orgánico | Positivo       |                                               | Sí       |                                     |

### Postcondiciones

La actividad queda disponible para su asignación a actividades.

**Veredicto:** Aprobado
**Observaciones:** N/A

---

## CU18 - Registrar, Listar y Editar Actividad

**Módulo:** Trazabilidad - Actividad
**Versión:** 1.0
**Descripción:** Verifica la asignación, registro y edición de una actividad a un cultivo y usuarios.

### Precondiciones

* Deben existir cultivos, usuarios, insumos, herramientas y tipos de actividad.
* El usuario debe tener permisos.

### Pasos de la Prueba

1. Ingresar al submódulo "Actividades".
2. Hacer clic en "Registrar".
3. Seleccionar tipo de actividad, cultivo y usuarios.
4. Ingresar fechas, prioridad, estado, instrucciones.
5. Asociar insumos y herramientas.
6. Guardar y verificar en la lista.
7. Editar y confirmar cambios reflejados.

### Datos de Entrada

| Campo              | Valor                         | Tipo Escenario | Respuesta Esperada                    | Coincide | Respuesta del Sistema               |
| ------------------ | ----------------------------- | -------------- | ------------------------------------- | -------- | ----------------------------------- |
| Tipo de Actividad  | Riego                         | Positivo       | "Actividad registrada correctamente." | Sí       | Se muestra mensaje de confirmación. |
| Descripción        | Riego por aspersión general   | Positivo       |                                       | Sí       |                                     |
| Cultivo            | Tomate                        | Positivo       |                                       | Sí       |                                     |
| Usuarios asignados | Juan Perez, Maria Diaz        | Positivo       |                                       | Sí       |                                     |
| Fecha de inicio    | 2025-08-01 07:00              | Positivo       |                                       | Sí       |                                     |
| Fecha de fin       | 2025-08-01 09:00              | Positivo       |                                       | Sí       |                                     |
| Estado             | Pendiente                     | Positivo       |                                       | Sí       |                                     |
| Prioridad          | Alta                          | Positivo       |                                       | Sí       |                                     |
| Instrucciones      | Regar solo por las mañanas    | Positivo       |                                       | Sí       |                                     |
| Insumos            | Fertilizante NPK - 5kg        | Positivo       |                                       | Sí       |                                     |
| Herramientas       | Bomba de aspersión - 1 unidad | Positivo       |                                       | Sí       |                                     |

### Postcondiciones

La actividad debe quedar registrada, asignada, editable y notificada. Los insumos y herramientas deben reflejar préstamo y seguimiento.

**Veredicto:** Aprobado
**Observaciones:** N/A

## Caso de Prueba CU19: Finalizar una actividad

**Módulo del sistema:** Trazabilidad - Actividades (Finalización)

**Descripción:** Verificar que el sistema permita finalizar una actividad agrícola previamente asignada. El instructor/administrador podrá modificar el estado de la actividad, registrar la cantidad utilizada del insumo devuelto y confirmar la finalización.

### Precondiciones

- Deben existir actividades previamente asignadas.
- Los insumos y herramientas deben haber sido prestados.
- El usuario debe tener permisos para finalizar actividades.

### Pasos de la prueba

1. Ingresar al submódulo “Actividades”.
2. Localizar la actividad pendiente o en proceso.
3. Hacer clic en el botón de finalización.
4. Ingresar la cantidad de insumo devuelta.
5. Seleccionar el nuevo estado de la actividad.
6. Hacer clic en “Finalizar Actividad”.
7. Confirmar el mensaje de éxito.
8. Verificar el cambio de estado y actualización de datos.

### Datos de Entrada y Resultados

| Campo               | Valor                 | Tipo      | Respuesta Esperada                                             | Coincide | Sistema          |
|---------------------|-----------------------|-----------|-----------------------------------------------------------------|----------|------------------|
| Insumos devueltos   | 4 kg de fertilizante  | Positivo  | “Actividad finalizada correctamente.” Aparece en la lista.     | X        | Confirmación     |
| Herramientas        | 2 palas               | Positivo  |                                                                 | X        | Confirmación     |

### Post condiciones

- La actividad queda registrada como finalizada.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU20: Registrar cosechas

**Módulo del sistema:** Trazabilidad - Cosechas

**Descripción:** Verificar que el sistema permita registrar correctamente la producción de un cultivo con nombre, cantidad, unidad, fecha y foto.

### Precondiciones

- Debe haber al menos un cultivo registrado.
- Usuario con permisos para registrar cosechas.

### Pasos

1. Ingresar al submódulo “Cosechas”.
2. Seleccionar “Registrar”.
3. Elegir cultivo.
4. Ingresar cantidad, unidad, fecha, fotografía.
5. Hacer clic en “Guardar”.
6. Verificar mensaje de confirmación y que la cosecha aparezca listada.

### Datos de Entrada

| Campo              | Valor                    | Tipo      | Esperado                                                       | Coincide | Sistema            |
|--------------------|--------------------------|-----------|----------------------------------------------------------------|----------|--------------------|
| Cultivo            | Maíz temporada junio     | Positivo  | “Cosecha registrada correctamente.” Aparece en lista.          | X        | Confirmación       |
| Cantidad           | 250                      | Positivo  |                                                                | X        |                    |
| Unidad de medida   | kg/gr/unidades           | Positivo  |                                                                | X        |                    |
| Fecha recolección  | 2025-07-30               | Positivo  |                                                                | X        |                    |

### Post condiciones

- Registro disponible para edición y reportes.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU21: Registrar recordatorios

**Módulo del sistema:** Trazabilidad - Calendario

**Descripción:** Validar que el sistema permita registrar, visualizar y eliminar eventos en el calendario con fecha, hora y descripción.

### Precondiciones

- Usuario debe estar logueado y tener permisos.

### Pasos

1. Ingresar al sistema.
2. Ir a “Calendario”.
3. Seleccionar un día.
4. Ingresar título, hora, descripción.
5. Guardar evento.
6. Verificar que aparece en el calendario.

### Datos de Entrada

| Campo        | Valor                | Tipo      | Esperado                                                       | Coincide | Sistema          |
|--------------|----------------------|-----------|----------------------------------------------------------------|----------|------------------|
| Título       | Siembra de tomate    | Positivo  | “Recordatorio registrado correctamente.” Aparece en calendario | X        | Confirmación     |
| Tipo evento  | Todo el día / Hora   | Positivo  |                                                                | X        |                  |
| Hora         | 7:30AM               | Positivo  |                                                                | X        |                  |
| Descripción  | Siembra en lote 4    | Positivo  |                                                                | X        |                  |

### Post condiciones

- Registro visible en calendario y en reportes.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU22: Registrar Tipo de Control

**Módulo del sistema:** Plagas - Tipo Control

**Descripción:** Validar que el sistema permita registrar un nuevo tipo de control correctamente con sus datos correspondientes.

### Precondiciones

- Usuario con acceso y permisos.

### Pasos

1. Ingresar al módulo de plagas.
2. Acceder a “Tipo control”.
3. Hacer clic en “Registrar”.
4. Ingresar nombre y descripción.
5. Hacer clic en “Guardar”.
6. Verificar en la lista.

### Datos de Entrada

| Campo       | Valor                       | Tipo      | Esperado                                                      | Coincide | Sistema            |
|-------------|-----------------------------|-----------|---------------------------------------------------------------|----------|--------------------|
| Nombre      | Control Terreno             | Positivo  | Registro exitoso con mensaje y visualización en lista.        | X        | Confirmación       |
| Descripción | Control sobre el terreno    | Positivo  |                                                               | X        |                    |

### Post condiciones

- Tipo de control guardado en base de datos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU23: Editar Tipo de Control

**Módulo del sistema:** Plagas - Tipo Control

**Descripción:** Validar que el sistema permita editar un tipo de control correctamente.

### Precondiciones

- Tipo de control ya registrado.
- Usuario con permisos.

### Pasos

1. Buscar el tipo de control.
2. Hacer clic en el ícono de edición.
3. Editar los campos requeridos.
4. Hacer clic en “Guardar”.
5. Verificar actualización.

### Datos de Entrada

| Campo/s editado/s | Valor       | Tipo      | Esperado                                          | Coincide | Sistema          |
|-------------------|-------------|-----------|---------------------------------------------------|----------|------------------|
| Nombre/Descripción| Modificado  | Positivo  | Registro actualizado y mensaje de éxito.         | X        | Confirmación     |

### Post condiciones

- Cambios actualizados en base de datos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU24: Eliminar Tipo de Control

**Módulo del sistema:** Plagas - Tipo Control

**Descripción:** Validar que el sistema permita eliminar un tipo de control correctamente.

### Precondiciones

- Tipo de control existente.
- Usuario con permisos.

### Pasos

1. Buscar tipo de control.
2. Hacer clic en ícono de eliminar.
3. Confirmar la acción.
4. Verificar eliminación en la lista.

### Datos de Entrada

| Campo | Valor | Tipo      | Esperado                                        | Coincide | Sistema          |
|-------|-------|-----------|--------------------------------------------------|----------|------------------|
| N/A   | N/A   | Positivo  | Eliminación correcta con mensaje de éxito.      | X        | Confirmación     |

### Post condiciones

- Registro eliminado de la base de datos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU25: Registrar Control

**Módulo del sistema:** Plagas - Control

**Descripción:** Validar que el sistema permita registrar un nuevo control correctamente.

### Precondiciones

- Debe existir: tipo de control, afección, insumo.

### Pasos

1. Ingresar a “Control” en el módulo de plagas.
2. Hacer clic en “Registrar”.
3. Ingresar los campos: afección, tipo control, producto, fecha, efectividad.
4. Guardar y verificar en lista.

### Datos de Entrada

| Campo       | Valor                | Tipo      | Esperado                                      | Coincide | Sistema          |
|-------------|----------------------|-----------|-----------------------------------------------|----------|------------------|
| Afección    | Araña blanca         | Positivo  | Registro exitoso y visible en lista.          | X        | Confirmación     |
| Tipo control| Control de terreno   | Positivo  |                                               | X        |                  |
| Producto    | Insecticida          | Positivo  |                                               | X        |                  |
| Fecha       | 31-07-2025           | Positivo  |                                               | X        |                  |
| Efectividad | 100%                 | Positivo  |                                               | X        |                  |

### Post condiciones

- Control registrado en base de datos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU26: Editar Control

**Módulo del sistema:** Plagas - Control

**Descripción:** Validar que el sistema permita editar un control correctamente.

### Precondiciones

- Control previamente registrado.
- Usuario con permisos.

### Pasos

1. Buscar control en lista.
2. Hacer clic en editar.
3. Modificar los datos requeridos.
4. Guardar.
5. Verificar cambios.

### Datos de Entrada

| Campo/s editado/s | Valor      | Tipo      | Esperado                                      | Coincide | Sistema          |
|-------------------|------------|-----------|-----------------------------------------------|----------|------------------|
| Cualquier campo   | Modificado | Positivo  | Actualización exitosa y visible.              | X        | Confirmación     |

### Post condiciones

- Datos actualizados correctamente.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU27: Eliminar Control

**Módulo del sistema:** Plagas - Control

**Descripción:** Validar que el sistema permita eliminar un control correctamente.

### Precondiciones

- Control existente.
- Usuario con permisos.

### Pasos

1. Buscar el control en la tabla.
2. Hacer clic en eliminar.
3. Confirmar acción.
4. Verificar que no aparezca en lista.

### Datos de Entrada

| Campo | Valor | Tipo      | Esperado                                       | Coincide | Sistema          |
|-------|-------|-----------|------------------------------------------------|----------|------------------|
| N/A   | N/A   | Positivo  | Eliminación correcta con mensaje de éxito.     | X        | Confirmación     |

### Post condiciones

- Registro eliminado.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU28: Registrar Tipo de Plaga

**Módulo del sistema:** Plagas - Tipo Plaga

**Descripción:** Validar que el sistema permita registrar, editar y eliminar un nuevo tipo de plaga.

### Precondiciones

- Usuario con permisos.

### Pasos

1. Ingresar a “Tipo Plaga”.
2. Hacer clic en “Registrar”.
3. Ingresar nombre, descripción e imagen.
4. Guardar y verificar.

### Datos de Entrada

| Campo       | Valor               | Tipo      | Esperado                                      | Coincide | Sistema          |
|-------------|---------------------|-----------|-----------------------------------------------|----------|------------------|
| Nombre      | Pulgones            | Positivo  | Registro exitoso y visible en lista.          | X        | Confirmación     |
| Imagen      | Fotografía          | Positivo  |                                               | X        |                  |
| Descripción | Plaga de hortalizas | Positivo  |                                               | X        |                  |

### Post condiciones

- Registro disponible en base de datos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU29: Registrar Plaga

**Módulo del sistema:** Plagas - Plaga

**Descripción:** Validar que el sistema permita registrar una nueva plaga correctamente.

### Precondiciones

- Usuario con permisos.
- Tipo de plaga existente.

### Pasos

1. Ingresar a “Plaga”.
2. Hacer clic en “Registrar”.
3. Ingresar tipo de plaga, imagen y descripción.
4. Guardar y verificar.

### Datos de Entrada

| Campo       | Valor               | Tipo      | Esperado                                      | Coincide | Sistema          |
|-------------|---------------------|-----------|-----------------------------------------------|----------|------------------|
| Tipo Plaga  | Pulgones            | Positivo  | Registro exitoso y visualización en lista.    | X        | Confirmación     |
| Imagen      | Fotografía          | Positivo  |                                               | X        |                  |
| Descripción | Plaga de hortalizas | Positivo  |                                               | X        |                  |

### Post condiciones

- Registro activo en la base de datos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU30: Registrar Afección

**Módulo del sistema:** Plagas - Afecciones

**Descripción:** Validar que el sistema permita registrar una afección nueva con sus respectivos datos.

### Precondiciones

- Usuario con permisos.
- Plaga, bancal y cultivo previamente registrados.

### Pasos

1. Ingresar a “Afección”.
2. Hacer clic en “Registrar”.
3. Ingresar los siguientes campos: cultivo, plaga, bancal, nombre, descripción, fecha, gravedad, estado.
4. Guardar y verificar.

### Datos de Entrada

| Campo              | Valor               | Tipo      | Esperado                                        | Coincide | Sistema          |
|--------------------|---------------------|-----------|-------------------------------------------------|----------|------------------|
| Plaga              | Pulgones            | Positivo  | Registro exitoso y aparece en lista.           | X        | Confirmación     |
| Cultivo            | Tomate              | Positivo  |                                                 | X        |                  |
| Bancal             | Bancal 1            | Positivo  |                                                 | X        |                  |
| Nombre             | Pulgones            | Positivo  |                                                 | X        |                  |
| Fecha detección    | 31/07/2025          | Positivo  |                                                 | X        |                  |
| Gravedad           | Moderada            | Positivo  |                                                 | X        |                  |
| Estado             | En control          | Positivo  |                                                 | X        |                  |
| Descripción        | Plaga de hortalizas | Positivo  |                                                 | X        |                  |

### Post condiciones

- Afección registrada en base de datos.
- Disponible para reporte y tratamiento.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

## Caso de Prueba CU31: Registrar un salario

**Módulo del sistema:** Finanzas - Salario  
**Descripción:** Validar que el sistema permita registrar un salario correctamente con sus datos correspondientes.

### Precondiciones

- Existen roles registrados previamente.
- Usuario con permisos para interactuar con el módulo de salarios.

### Pasos

1. Ingresar al módulo de finanzas.
2. Acceder a “Salario”.
3. Hacer clic en “Registrar nuevo salario”.
4. Ingresar: rol, fecha de implementación y valor jornal.
5. Hacer clic en “Guardar”.
6. Verificar el registro en la lista de salarios.

### Datos de Entrada

| Campo                 | Valor     | Tipo      | Esperado                                                                 | Coincide | Sistema                    |
|----------------------|-----------|-----------|--------------------------------------------------------------------------|----------|----------------------------|
| Rol                  | Pasante   | Positivo  | Registro exitoso, mensaje de éxito, datos visibles en la lista.         | X        | Confirmación en pantalla   |
| Fecha implementación | 2-01-2025 | Positivo  |                                                                          | X        |                            |
| Valor jornal         | 85.000    | Positivo  |                                                                          | X        |                            |

### Post condiciones

- El salario queda registrado en la base de datos.
- Permite realizar pagos con base en el rol registrado.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU32: Desactivar un salario

**Módulo del sistema:** Finanzas - Salario  
**Descripción:** Validar que el sistema permita cambiar el estado de un salario para suspender su uso.

### Precondiciones

- Salarios registrados previamente.
- Usuario con permisos necesarios.

### Pasos

1. Ingresar a “Salarios”.
2. Ubicar el salario a desactivar.
3. Hacer clic en el ícono de editar (lápiz).
4. Desmarcar la casilla “Activo”.
5. Hacer clic en “Confirmar”.
6. Verificar en la lista el cambio de estado.

### Datos de Entrada

| Campo  | Valor           | Tipo      | Esperado                                                   | Coincide | Sistema                  |
|--------|------------------|-----------|-------------------------------------------------------------|----------|--------------------------|
| Activo | Activo/Inactivo | Positivo  | Mensaje: “Estado actualizado exitosamente”. Cambio visible. | X        | Confirmación en pantalla |

### Post condiciones

- El salario desactivado no tiene uso hasta reactivarse.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU33: Cálculo del pago al trabajador

**Módulo del sistema:** Finanzas - Pagos  
**Descripción:** Verificar que el sistema calcule el monto a pagar a un trabajador, basado en actividades finalizadas dentro de un rango de fechas.

### Precondiciones

- El trabajador tiene un salario activo.
- Existen actividades finalizadas para el trabajador en el rango de fechas.
- El usuario tiene permisos.
- No hay pagos registrados para ese trabajador y rango.

### Pasos

1. Ingresar al módulo “Finanzas”.
2. Seleccionar “Pagos”.
3. Filtrar por trabajador y fechas.
4. Hacer clic en “Calcular Pago”.
5. Verificar lista de actividades finalizadas.
6. Confirmar cálculo de horas trabajadas.
7. Validar número de jornales.
8. Confirmar cálculo del total a pagar.
9. Verificar almacenamiento del pago.
10. Revisar la lista de pagos realizados.

### Datos de Entrada

| Campo         | Valor        | Tipo      | Esperado                                                                           | Coincide | Sistema                    |
|---------------|--------------|-----------|------------------------------------------------------------------------------------|----------|----------------------------|
| Usuario       | Juan Perez   | Positivo  | Mensaje de confirmación. Pago aparece en la lista con el cálculo correspondiente. | X        | Confirmación en pantalla   |
| Fecha inicio  | 2025-07-01   | Positivo  |                                                                                    | X        |                            |
| Fecha fin     | 2025-07-30   | Positivo  |                                                                                    | X        |                            |

### Post condiciones

- El pago queda registrado y visible para consulta.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU34: Costo Beneficio

**Módulo del sistema:** Finanzas - Costo Beneficio  
**Descripción:** Verificar que el sistema calcule correctamente el costo de mano de obra para un análisis de costo-beneficio.

### Precondiciones

- La cosecha está registrada.
- Existen actividades finalizadas asociadas a la cosecha.
- Trabajadores con roles y valores de jornal asignados.
- Usuario con permisos.
- No existe cálculo anterior para esa cosecha y rango.

### Pasos

1. Ingresar al módulo “Finanzas”.
2. Seleccionar “Costo-Beneficio”.
3. Filtrar por cosecha, trabajador y rango de fechas.
4. Hacer clic en “Calcular Mano de Obra”.
5. Verificar lista de actividades finalizadas asociadas.
6. Confirmar cálculo de tiempo trabajado.
7. Validar cantidad de jornales (basado en 8h).
8. Verificar cálculo del costo total según valor del jornal.
9. Confirmar que el análisis aparece en lista.

### Datos de Entrada

| Campo         | Valor            | Tipo      | Esperado                                                                      | Coincide | Sistema                    |
|---------------|------------------|-----------|-------------------------------------------------------------------------------|----------|----------------------------|
| Nombre        | Cosecha-Tomate   | Positivo  | Mensaje de confirmación. Cálculo aparece en la tabla de Costo Beneficio.     | X        | Confirmación en pantalla   |
| Fecha inicio  | 2025-07-01       | Positivo  |                                                                               | X        |                            |
| Fecha fin     | 2025-07-30       | Positivo  |                                                                               | X        |                            |

### Post condiciones

- El análisis de costo-beneficio queda disponible para visualización y toma de decisiones.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

## Caso de Prueba CU35: Registrar un nuevo sensor IoT

**Módulo del sistema:** IoT - Sensores  
**Descripción:** Validar que el sistema permita registrar un nuevo sensor IoT correctamente con todos sus datos.

### Precondiciones

- El usuario tiene permisos para registrar sensores.
- Existen tipo de sensor y bancal previamente registrados.

### Pasos

1. Ingresar al módulo “Sensores”.
2. Hacer clic en “Agregar nuevo sensor”.
3. Llenar el formulario con: nombre, tipo, descripción, bancal, medidas mín/máx, estado y `device_code`.
4. Hacer clic en “Guardar”.
5. Verificar que el sensor aparece en la lista.

### Datos de Entrada

| Campo         | Valor              | Tipo      | Esperado                                                                 | Coincide | Sistema                          |
|---------------|--------------------|-----------|--------------------------------------------------------------------------|----------|----------------------------------|
| nombre        | Sensor DHT22 Patio | Positivo  | Registro exitoso, mensaje de confirmación, aparece en la lista           | X        | Confirmación y listado correcto |
| tipo_sensor_id| 1                  | Positivo  |                                                                          | X        |                                  |
| bancal_id     | 1                  | Positivo  |                                                                          | X        |                                  |
| device_code   | DHT22_001          | Positivo  |                                                                          | X        |                                  |

### Post condiciones

- El sensor queda registrado y disponible para mediciones.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** El `device_code` debe ser único.

---

## Caso de Prueba CU36: Enviar datos meteorológicos vía HTTP

**Módulo del sistema:** IoT - Datos Meteorológicos  
**Descripción:** Verificar que el sistema reciba y almacene correctamente los datos enviados vía HTTP POST desde un sensor.

### Precondiciones

- Sensor registrado y activo con `device_code` válido.

### Pasos

1. Configurar un dispositivo IoT para enviar un POST a `http://127.0.0.1:8000/iot/datosmeteorologicos/`.
2. Incluir `device_code`, temperatura, humedad, etc.
3. Enviar la solicitud.
4. Verificar respuesta 201 Created.
5. Comprobar almacenamiento de los datos.

### Datos de Entrada

| Campo             | Valor       | Tipo      | Esperado                                                                      | Coincide | Sistema                     |
|------------------|-------------|-----------|--------------------------------------------------------------------------------|----------|-----------------------------|
| device_code      | DHT22_001   | Positivo  | Código 201, datos almacenados y visibles en el sistema.                       | X        | Confirmación y registro OK  |
| temperatura      | 25.5        | Positivo  |                                                                                | X        |                             |
| humedad_ambiente | 60.0        | Positivo  |                                                                                | X        |                             |

### Post condiciones

- Datos meteorológicos registrados y asociados correctamente.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** `device_code` debe ser único.

---

## Caso de Prueba CU37: Conexión de sensor por WebSocket

**Módulo del sistema:** IoT - WebSocket  
**Descripción:** Validar que un dispositivo IoT se conecte al WebSocket y transmita datos en tiempo real.

### Precondiciones

- WebSocket activo en `ws://127.0.0.1:8000/ws/realtime/`.
- Dispositivo configurado correctamente.

### Pasos

1. Encender el dispositivo IoT.
2. Verificar conexión WiFi.
3. Confirmar conexión WebSocket.
4. Observar envío de datos en JSON.
5. Verificar actualizaciones en tiempo real en Agrosoft.

### Datos de Entrada

| Campo             | Valor                  | Tipo      | Esperado                                                                 | Coincide | Sistema                       |
|------------------|------------------------|-----------|--------------------------------------------------------------------------|----------|-------------------------------|
| Conexión WiFi    | Credenciales correctas | Positivo  | Conexión establecida. Datos llegan por WebSocket.                        | X        | Conexión exitosa en consola   |
| Conexión WebSocket| URL correcta           | Positivo  |                                                                          | X        |                               |
| Envío de datos   | JSON válido            | Positivo  |                                                                          | X        |                               |

### Post condiciones

- Canal de comunicación en tiempo real establecido.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** Requiere reconexión automática si se pierde conexión.

---

## Caso de Prueba CU38: Calcular y registrar Evapotranspiración (ETo)

**Módulo del sistema:** IoT - Evapotranspiración  
**Descripción:** Validar que el sistema calcule y registre correctamente la evapotranspiración por bancal y fecha.

### Precondiciones

- Bancal registrado.
- Datos meteorológicos disponibles.

### Pasos

1. Enviar POST a `http://127.0.0.1:8000/iot/evapotranspiracion/calcular/`.
2. Incluir `fk_bancal_id`, `fecha`, `latitud`.
3. Verificar código 201.
4. Consultar lista de registros de ETo.

### Datos de Entrada

| Campo         | Valor        | Tipo      | Esperado                                                                 | Coincide | Sistema                    |
|---------------|--------------|-----------|--------------------------------------------------------------------------|----------|----------------------------|
| fk_bancal_id  | 1            | Positivo  | Registro de ETo exitoso y disponible.                                    | X        | Registro exitoso visible  |
| fecha         | 2025-01-01   | Positivo  |                                                                          | X        |                            |
| latitud       | 4.65         | Positivo  |                                                                          | X        |                            |

### Post condiciones

- El valor de ETo queda disponible para análisis de riego.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** Evitar duplicidad bancal-fecha.

---

## Caso de Prueba CU39: Registrar, listar y editar Tipo de Residuo

**Módulo del sistema:** Trazabilidad - Residuos  
**Descripción:** Validar que el sistema registre, liste y permita editar un tipo de residuo correctamente.

### Precondiciones

- Usuario con permisos.
- Módulo habilitado.

### Pasos

1. Ir a formulario “Registrar Residuo”.
2. Hacer clic en el botón "+" en “Tipo de Residuo”.
3. Ingresar nombre y descripción.
4. Clic en “Guardar”.
5. Verificar aparición en la lista desplegable.

### Datos de Entrada

| Campo      | Valor                                  | Tipo      | Esperado                                                              | Coincide | Sistema                      |
|------------|----------------------------------------|-----------|-----------------------------------------------------------------------|----------|------------------------------|
| Nombre     | Orgánico                               | Positivo  | Mensaje de éxito, aparece en lista y en tabla de tipos de residuos.  | X        | Confirmación y listado OK    |
| Descripción| Residuos de origen vegetal o animal.   | Positivo  |                                                                       | X        |                              |

### Post condiciones

- El tipo queda registrado y listo para asociarse a residuos.

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

---

## Caso de Prueba CU40: Registrar, listar y eliminar un Residuo

**Módulo del sistema:** Trazabilidad - Residuos  
**Descripción:** Validar que el sistema permita registrar y eliminar un residuo asociado a una cosecha.

### Precondiciones

- Existen cosechas y tipos de residuo registrados.
- Usuario autorizado.

### Pasos

1. Ingresar al submódulo “Residuos”.
2. Completar campos: Nombre, Descripción, Fecha, Cantidad.
3. Seleccionar Cosecha y Tipo de Residuo.
4. Clic en “Guardar”.
5. Verificar que se muestre en la lista.
6. Proceder a eliminar desde la tabla.

### Datos de Entrada

| Campo           | Valor                           | Tipo      | Esperado                                                                | Coincide | Sistema                  |
|------------------|----------------------------------|-----------|-------------------------------------------------------------------------|----------|--------------------------|
| Nombre           | Restos de poda de tomate        | Positivo  | Registro exitoso. Aparece en la tabla.                                 | X        | Registro visible         |
| Cantidad         | 20                               | Positivo  |                                                                         | X        |                          |
| Cosecha          | Cosecha de Tomates - Julio      | Positivo  |                                                                         | X        |                          |
| Tipo de Residuo  | Orgánico                         | Positivo  |                                                                         | X        |                          |

### Post condiciones

- El residuo queda registrado y puede ser gestionado (editado/eliminado).

### Resultados

- **Defectos:** N/A  
- **Veredicto:** Aprobado  
- **Observaciones:** N/A

