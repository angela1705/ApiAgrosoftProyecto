---
title: Gestión de Tipos de Actividad
---

## ¿Cómo listar y gestionar tipo de actividad?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar tipos de actividad en el sistema. Sigue los pasos a continuación para gestionar los tipo de actividad de manera efectiva.

---

### 1. Navegar al módulo de Tipos de Actividad
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Tipo de Actividad"**:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadSidebar.png" alt="Navegación al módulo de tipo de actividad" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de tipo de actividad
- Al entrar en **"Tipos de Actividad"**, encontrarás una tabla con los tipo de actividad registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadListaVacio.png" alt="Listado de tipo de actividad vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada tipo de actividad, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo tipo de actividad
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/tipo_actividad/RegistrarTipoActividadBtn.png" alt="Botón registrar tipo de actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de tipos de actividad:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadFormularioVacio.png" alt="Formulario de registro de tipo de actividad" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa un nombre único para el tipo de actividad (máximo 255 caracteres).
   - **Descripción**: Obligatorio. Describe el tipo de actividad.

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadFormularioLleno.png" alt="Formulario de tipo de actividad diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Nombre** y **Descripción** son obligatorios.
   - El campo **Nombre** debe ser único.

5. Haz clic en **"Guardar"** para registrar el tipo de actividad.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadRegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Tipos de Actividad"** para confirmar que el tipo de actividad se registró correctamente:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadListaLleno.png" alt="Listado con tipo de actividad registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar un tipo de actividad
1. En el listado de tipos de actividad, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/tipo_actividad/EditarTPAccion.png" alt="Botón de editar tipo de actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales del tipo de actividad:

   <img src="/public/trazabilidad/tipo_actividad/EditarTipoActividadModal.png" alt="Formulario de edición de tipo de actividad" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Nombre, Descripción).
4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadActualizadoConExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar un tipo de actividad
1. En el listado de tipos de actividad, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/tipo_actividad/EliminarTPAccion.png" alt="Botón de eliminar tipo de actividad" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/tipo_actividad/EliminarTipoActividadModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer. Asegúrate de que el tipo de actividad no esté asociado a ninguna actividad existente.
4. Haz clic en **"Confirmar"** para eliminar el tipo de actividad.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/tipo_actividad/TipoActividadEliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar tipos de actividad por nombre o descripción.
- **Validaciones**:
  - El **Nombre** debe ser único y no exceder los 255 caracteres.
  - La **Descripción** es obligatoria y debe proporcionar un contexto claro sobre el tipo de actividad.
- **Acceso a otros módulos**: Los tipos de actividad son utilizados en el módulo de **Actividades** para clasificar las tareas. Asegúrate de que no existan dependencias (como actividades asociadas) antes de eliminar un tipo de actividad.

---

### 7. Casos de uso
- **Registrar un tipo de actividad**: Ideal para definir categorías de tareas (por ejemplo, "Siembra", "Riego", "Cosecha") que se usarán al registrar actividades.
- **Actualizar un tipo de actividad**: Útil para corregir nombres o descripciones, o para mejorar la claridad de la información.
- **Eliminar un tipo de actividad**: Aplicable cuando un tipo de actividad ya no es relevante, pero debe hacerse con precaución debido a posibles dependencias con actividades existentes.
- **Listar tipos de actividad**: Permite supervisar todos los tipos de actividad registrados, filtrarlos por nombre o descripción, y realizar acciones rápidas como editar o eliminar.