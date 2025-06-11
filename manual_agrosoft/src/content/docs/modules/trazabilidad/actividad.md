---
title: Gestion de actividades
---


## ¿Cómo listar y gestionar actividades?

Esta documentación detalla el proceso para listar, registrar, actualizar, eliminar y finalizar actividades en el sistema. Sigue los pasos a continuación para gestionar las actividades de manera efectiva.

---

### 1. Navegar al módulo de Actividades
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Actividades"**:

   <img src="/public/trazabilidad/actividad/SidebarActividad.png" alt="Navegación al módulo de actividades" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de actividades
- Al entrar en **"Actividades"**, encontrarás una tabla con las actividades registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/actividad/ListaActividadVacía.png" alt="Listado de actividades vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada actividad, incluyendo:
  - **Descripción**
  - **Fecha de inicio**
  - **Fecha de fin**
  - **Estado** (Pendiente, En proceso, Completada, Cancelada)
  - **Prioridad** (Alta, Media, Baja)
  - **Tipo de actividad**
  - **Usuarios asignados**
  - **Cultivo**
  - **Insumos utilizados**
  - **Herramientas asignadas**
  - **Acciones** (Finalizar, Editar, Eliminar)

---

### 3. Registrar una nueva actividad
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/registrarActividadBtn.png" alt="Botón registrar actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de actividades:

   <img src="/public/trazabilidad/actividad/AsignarActividadFormulario.png" alt="Formulario de registro de actividad" style="display: block; margin: auto; width: 120%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Descripción**: Obligatorio. Describe la actividad a realizar.
   - **Fecha de inicio**: Obligatorio. Selecciona la fecha y hora de inicio.
   - **Fecha de fin**: Obligatorio. Selecciona la fecha y hora de finalización.
   - **Estado**: Selecciona entre Pendiente, En proceso, Completada o Cancelada (por defecto: Pendiente).
   - **Prioridad**: Selecciona entre Alta, Media o Baja (por defecto: Media).
   - **Tipo de actividad**: Obligatorio. Selecciona un tipo de actividad o registra uno nuevo haciendo clic en el botón **"+"** para abrir el modal de registro de tipo de actividad.
     <img src="/public/trazabilidad/actividad/TipoActividadModal.png" alt="ModalTipoActividad" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

   - **Cultivo**: Obligatorio. Selecciona un cultivo o registra uno nuevo haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/actividad/ModalCultivo.png" alt="ModalCultivo" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
     
   - **Usuarios asignados**: Selecciona uno o más usuarios para asignar a la actividad.
   - **Insumos requeridos**: Selecciona los insumos necesarios y especifica la cantidad. Puedes registrar nuevos insumos con el botón **"+"**.
     <img src="/public/trazabilidad/actividad/InsumoModal.png" alt="ModalInsumo" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Herramientas**: Selecciona las herramientas necesarias y especifica la cantidad entregada. Puedes registrar nuevas herramientas con el botón **"+"**.
     <img src="/public/trazabilidad/actividad/ModalHerramienta.png" alt="ModalHerramienta" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Instrucciones adicionales**: Opcional. Ingresa detalles adicionales para la actividad.

   <img src="/public/trazabilidad/actividad/AsignarActividadLleno.png" alt="Formulario de actividad diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Descripción**, **Fecha de inicio**, **Tipo de actividad** y **Cultivo** son obligatorios.
   - Los campos de insumos y herramientas permiten especificar cantidades y, en el caso de herramientas, marcar si han sido devueltas.

5. Haz clic en **"Guardar"** para registrar la actividad.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/actividad/FinalizadaExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Actividades"** para confirmar que la actividad se registró correctamente:

   <img src="/public/trazabilidad/actividad/ListaActividadNoVacia.png" alt="Listado con actividad registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar una actividad
1. En el listado de actividades, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/actividad/ActividadAccionEditar.png" alt="Botón de editar actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales de la actividad:

   <img src="/public/trazabilidad/actividad/EditarActividad.png" alt="Formulario de edición de actividad" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Descripción, Fechas, Estado, Prioridad, etc.).
4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/actividad/ActividadActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar una actividad
1. En el listado de actividades, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/actividad/ActividadAccionEliminar.png" alt="Botón de eliminar actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/actividad/EliminarActividad.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer.
4. Haz clic en **"Confirmar"** para eliminar la actividad.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/actividad/ActividadEliminadaConExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Finalizar una actividad
1. En el listado de actividades, en la columna **Acciones**, haz clic en el ícono de **Finalizar** (check verde), disponible solo para actividades que no estén en estado **Completada**:

   <img src="/public/trazabilidad/actividad/ActividadAccionFinalizar.png" alt="Botón de finalizar actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un modal para finalizar la actividad:

   <img src="/public/trazabilidad/actividad/FinalizarActividad.png" alt="Formulario de finalización de actividad" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario de finalización**:
   - **Fecha y hora de finalización**: Selecciona la fecha y hora en que se completó la actividad.
   - **Herramientas utilizadas**: Para cada herramienta, marca si fue devuelta, especifica la cantidad devuelta y selecciona la fecha de devolución.
   - **Insumos utilizados**: Especifica la cantidad de insumos devueltos (si aplica).
   - **Resumen**: Revisa el estado de la actividad y las herramientas pendientes por devolver.

4. Haz clic en **"Confirmar Finalización"** para marcar la actividad como **Completada**.
5. Verás un mensaje de finalización exitosa:

   <img src="/public/trazabilidad/actividad/FinalizadaExito.png" alt="Mensaje de finalización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 7. Notas adicionales
- **Estados de actividad**: Los estados (Pendiente, En proceso, Completada, Cancelada) se muestran con colores distintivos:
  - Pendiente: Amarillo
  - En proceso: Azul
  - Completada: Verde
  - Cancelada: Rojo
- **Prioridades**: Las prioridades (Alta, Media, Baja) también tienen colores:
  - Alta: Rojo
  - Media: Amarillo
  - Baja: Verde
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar actividades por descripción, estado, prioridad, etc.
- **Acceso a otros módulos**: Puedes registrar nuevos tipos de actividades, cultivos, insumos o herramientas directamente desde el formulario de registro haciendo clic en los botones **"+"** correspondientes.