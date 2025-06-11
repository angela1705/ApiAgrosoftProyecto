---
title: Gestión de Lotes
---

## ¿Cómo listar y gestionar lotes?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar lotes en el sistema. Sigue los pasos a continuación para gestionar los lotes de manera efectiva.

---

### 1. Navegar al módulo de Lotes
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Lotes"**:

   <img src="/public/trazabilidad/lotes/LotesSidebar.png" alt="Navegación al módulo de lotes" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de lotes
- Al entrar en **"Lotes"**, encontrarás una tabla con los lotes registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/lotes/LotesListaVacio.png" alt="Listado de lotes vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada lote, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Estado** (Activo: Sí/No)
  - **Tamaño X** (en metros)
  - **Tamaño Y** (en metros)
  - **Latitud**
  - **Longitud**
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo lote
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/lotes/RegistrarLoteBtn.png" alt="Botón registrar lote" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de lotes:

   <img src="/public/trazabilidad/lotes/FormularioRegistroLote.png" alt="Formulario de registro de lote" style="display: block; margin: auto; width: 120%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa un nombre único para el lote (máximo 15 caracteres).
   - **Descripción**: Opcional. Describe el lote.
   - **Estado**: Selecciona si el lote está **Activo** o **Inactivo** usando el interruptor (por defecto: Inactivo).
   - **Tamaño X**: Obligatorio. Ingresa el tamaño en metros en el eje X (máximo 5 dígitos, 2 decimales).
   - **Tamaño Y**: Obligatorio. Ingresa el tamaño en metros en el eje Y (máximo 5 dígitos, 2 decimales).
   - **Latitud**: Obligatorio. Ingresa la coordenada de latitud (máximo 9 dígitos, 6 decimales).
   - **Longitud**: Obligatorio. Ingresa la coordenada de longitud (máximo 9 dígitos, 6 decimales).

   <img src="/public/trazabilidad/lotes/FormularioRegistroLoteLleno.png" alt="Formulario de lote diligenciado" style="display: block; margin: auto; max-width: 1000px; width: 100%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Nombre**, **Tamaño X**, **Tamaño Y**, **Latitud** y **Longitud** son obligatorios.
   - El campo **Nombre** debe ser único.
   - Los valores de **Tamaño X** y **Tamaño Y** deben ser números positivos.
   - Las coordenadas de **Latitud** y **Longitud** deben ser válidas.

5. Haz clic en **"Guardar"** para registrar el lote.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/lotes/LoteRegistradoConExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Lotes"** para confirmar que el lote se registró correctamente:

   <img src="/public/trazabilidad/lotes/LotesListaLleno.png" alt="Listado con lote registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar un lote
1. En el listado de lotes, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/lotes/EditarLoteAccion.png" alt="Botón de editar lote" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales del lote:

   <img src="/public/trazabilidad/lotes/LoteModalEdición.png" alt="Formulario de edición de lote" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Nombre, Descripción, Estado, Tamaño X, Tamaño Y, Latitud, Longitud).
4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/lotes/LoteActualizadoConExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar un lote
1. En el listado de lotes, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/lotes/EliminarLoteAccion.png" alt="Botón de eliminar lote" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/lotes/LoteEliminarModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer.
4. Haz clic en **"Confirmar"** para eliminar el lote.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/lotes/LoteEliminadoConExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Estado del lote**: El estado (Activo/Inactivo) se muestra como "Sí" o "No" en la tabla.
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar lotes por nombre, descripción, estado, etc.
- **Validaciones**:
  - El **Nombre** debe ser único y no exceder los 15 caracteres.
  - **Tamaño X** y **Tamaño Y** deben ser valores numéricos positivos con hasta 2 decimales.
  - **Latitud** y **Longitud** deben ser valores numéricos válidos con hasta 6 decimales.
- **Acceso a otros módulos**: Los lotes pueden estar relacionados con cultivos o actividades. Asegúrate de que no existan dependencias (como cultivos asociados) antes de eliminar un lote.

---

### 7. Casos de uso
- **Registrar un lote**: Ideal para definir nuevas áreas de cultivo con sus dimensiones y ubicación geográfica.
- **Actualizar un lote**: Útil para corregir datos (como coordenadas o descripción) o cambiar el estado del lote.
- **Eliminar un lote**: Aplicable cuando un lote ya no es utilizado, pero debe hacerse con precaución debido a posibles dependencias con otros módulos.
- **Listar lotes**: Permite supervisar todos los lotes registrados, filtrarlos por estado o nombre, y realizar acciones rápidas como editar o eliminar.