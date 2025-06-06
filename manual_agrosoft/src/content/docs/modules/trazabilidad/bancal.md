---
title: Gestión de Bancales
---

## ¿Cómo listar y gestionar bancales?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar bancales en el sistema. Sigue los pasos a continuación para gestionar los bancales de manera efectiva.

---

### 1. Navegar al módulo de Bancales
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Bancal"**:

   <img src="/public/trazabilidad/bancales/sidebarBancal.png" alt="Navegación al módulo de bancales" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de bancales
- Al entrar en **"Bancal"**, encontrarás una tabla con los bancales registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/bancales/ListaVacia.png" alt="Listado de bancales vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada bancal, incluyendo:
  - **Nombre**
  - **Tamaño X** (en metros)
  - **Tamaño Y** (en metros)
  - **Latitud**
  - **Longitud**
  - **Lote**
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo bancal
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/bancales/RegistrarBancalBtn.png" alt="Botón registrar bancal" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de bancales:

   <img src="/public/trazabilidad/bancales/FormularioVacio.png" alt="Formulario de registro de bancal" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa un nombre único para el bancal (máximo 15 caracteres).
   - **Tamaño X**: Obligatorio. Ingresa el tamaño en metros en el eje X (máximo 5 dígitos, 2 decimales).
   - **Tamaño Y**: Obligatorio. Ingresa el tamaño en metros en el eje Y (máximo 5 dígitos, 2 decimales).
   - **Latitud**: Obligatorio. Ingresa la coordenada de latitud (máximo 9 dígitos, 6 decimales).
   - **Longitud**: Obligatorio. Ingresa la coordenada de longitud (máximo 9 dígitos, 6 decimales).
   - **Lote**: Obligatorio. Selecciona un lote de la lista desplegable o registra uno nuevo haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/bancales/modalLotw.png.png" alt="ModalLote" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

   <img src="/public/trazabilidad/bancales/FormularioLleno.png" alt="Formulario de bancal diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Nombre**, **Tamaño X**, **Tamaño Y**, **Latitud**, **Longitud** y **Lote** son obligatorios.
   - El campo **Nombre** debe ser único y no exceder los 15 caracteres.
   - Los valores de **Tamaño X** y **Tamaño Y** deben ser números positivos con hasta 2 decimales.
   - Las coordenadas de **Latitud** y **Longitud** deben ser valores numéricos válidos con hasta 6 decimales.
   - El **Lote** debe seleccionarse de una lista de lotes existentes o crearse uno nuevo desde el modal correspondiente.

5. Haz clic en **"Guardar"** para registrar el bancal.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/bancales/RegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Bancales"** para confirmar que el bancal se registró correctamente:

   <img src="/public/trazabilidad/bancales/ListaLlena.png" alt="Listado con bancal registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar un bancal
1. En el listado de bancales, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/bancales/EditarBancalAccion.png" alt="Botón de editar bancal" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales del bancal:

   <img src="/public/trazabilidad/bancales/EditarModal.png" alt="Formulario de edición de bancal" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Nombre, Tamaño X, Tamaño Y, Latitud, Longitud, Lote).
4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/bancales/ActualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar un bancal
1. En el listado de bancales, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/bancales/EliminarBancalAccion.png" alt="Botón de eliminar bancal" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/bancales/eliminarModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer. Asegúrate de que el bancal no esté asociado a ningún cultivo existente.
4. Haz clic en **"Confirmar"** para eliminar el bancal.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/bancales/eliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar bancales por nombre, tamaño, coordenadas o lote.
- **Validaciones**:
  - El **Nombre** debe ser único y no exceder los 15 caracteres.
  - **Tamaño X** y **Tamaño Y** deben ser valores numéricos positivos con hasta 2 decimales.
  - **Latitud** y **Longitud** deben ser valores numéricos válidos con hasta 6 decimales.
  - El **Lote** debe seleccionarse de una lista de lotes existentes.
- **Acceso a otros módulos**: Los bancales están relacionados con **Lotes** y **Cultivos**. Asegúrate de que no existan dependencias (como cultivos asociados) antes de eliminar un bancal.
- **Modales de creación**: El botón **"+"** en el campo de Lote permite registrar nuevos lotes directamente desde el formulario.

---

### 7. Casos de uso
- **Registrar un bancal**: Ideal para definir áreas específicas dentro de un lote para cultivos, especificando dimensiones y ubicación geográfica.
- **Actualizar un bancal**: Útil para corregir datos como el nombre, dimensiones, coordenadas o lote asociado.
- **Eliminar un bancal**: Aplicable cuando un bancal ya no es utilizado, pero debe hacerse con precaución debido a posibles dependencias con cultivos.
- **Listar bancales**: Permite supervisar todos los bancales registrados, filtrarlos por nombre, tamaño, coordenadas o lote, y realizar acciones rápidas como editar o eliminar.