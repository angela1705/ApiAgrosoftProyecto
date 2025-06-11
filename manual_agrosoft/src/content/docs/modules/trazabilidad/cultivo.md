---
title: Gestión de Cultivos
---

## ¿Cómo listar y gestionar cultivos?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar cultivos en el sistema. Sigue los pasos a continuación para gestionar los cultivos de manera efectiva.

---

### 1. Navegar al módulo de Cultivos
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Cultivos"**:

   <img src="/public/trazabilidad/cultivos/sidebarCultivo.png" alt="Navegación al módulo de cultivos" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de cultivos
- Al entrar en **"Cultivos"**, encontrarás una tabla con los cultivos registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/cultivos/ListaCultivoVacia.png" alt="Listado de cultivos vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada cultivo, incluyendo:
  - **Nombre**
  - **Unidad de Medida**
  - **Estado** (Activo: Sí/No)
  - **Fecha de Siembra**
  - **Especie**
  - **Bancal**
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo cultivo
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/cultivos/RegistrarCultivoBtn.png" alt="Botón registrar cultivo" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de cultivos:

   <img src="/public/trazabilidad/cultivos/FormularioVacio.png" alt="Formulario de registro de cultivo" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa un nombre único para el cultivo (máximo 50 caracteres).
   - **Unidad de Medida**: Obligatorio. Selecciona una unidad de medida de la lista desplegable o registra una nueva haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/cultivos/unidadMedidaModal.png" alt="ModalUnidadMedida" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Estado**: Selecciona si el cultivo está **Activo** o **Inactivo** usando el interruptor (por defecto: Inactivo).
   - **Fecha de Siembra**: Obligatorio. Selecciona la fecha de siembra del cultivo.
   - **Especie**: Obligatorio. Selecciona una especie de la lista desplegable o registra una nueva haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/cultivos/ModalEspecie.png" alt="ModalEspecie" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Bancal**: Obligatorio. Selecciona un bancal de la lista desplegable o registra uno nuevo haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/cultivos/ModalBancal.png" alt="ModalBancal" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

   <img src="/public/trazabilidad/cultivos/FormularioLleno.png" alt="Formulario de cultivo diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Nombre**, **Unidad de Medida**, **Fecha de Siembra**, **Especie** y **Bancal** son obligatorios.
   - El campo **Nombre** debe ser único y no exceder los 50 caracteres.
   - La **Fecha de Siembra** debe ser una fecha válida.
   - Los campos **Especie** y **Bancal** deben seleccionarse de listas existentes o crearse nuevos desde los modales correspondientes.

5. Haz clic en **"Guardar"** para registrar el cultivo.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/cultivos/RegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Cultivos"** para confirmar que el cultivo se registró correctamente:

   <img src="/public/trazabilidad/cultivos/ListaCultivoLlena.png" alt="Listado con cultivo registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar un cultivo
1. En el listado de cultivos, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/cultivos/EditarCultivoAccion.png" alt="Botón de editar cultivo" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales del cultivo:

   <img src="/public/trazabilidad/cultivos/EditarModal.png" alt="Formulario de edición de cultivo" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Nombre, Unidad de Medida, Estado, Fecha de Siembra, Especie, Bancal).
4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/cultivos/actualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar un cultivo
1. En el listado de cultivos, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/cultivos/EliminarCultivoAccion.png" alt="Botón de eliminar cultivo" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/cultivos/eliminarModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer. Asegúrate de que el cultivo no esté asociado a ninguna actividad o cosecha existente.
4. Haz clic en **"Confirmar"** para eliminar el cultivo.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/cultivos/EliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Estado del cultivo**: El estado (Activo/Inactivo) se muestra como "Sí" o "No" en la tabla.
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar cultivos por nombre, unidad de medida, estado, fecha de siembra, especie o bancal.
- **Validaciones**:
  - El **Nombre** debe ser único y no exceder los 50 caracteres.
  - La **Unidad de Medida**, **Especie** y **Bancal** deben seleccionarse de listas existentes o crearse nuevos desde los modales correspondientes.
  - La **Fecha de Siembra** debe ser una fecha válida.
- **Acceso a otros módulos**: Los cultivos están relacionados con **Especies**, **Bancales**, **Actividades** y **Cosechas**. Asegúrate de que no existan dependencias (como actividades o cosechas asociadas) antes de eliminar un cultivo.
- **Modales de creación**: Los botones **"+"** en los campos de Unidad de Medida, Especie y Bancal permiten registrar nuevos elementos directamente desde el formulario.

---

### 7. Casos de uso
- **Registrar un cultivo**: Ideal para iniciar un nuevo cultivo, especificando su especie, bancal, unidad de medida y fecha de siembra, con la opción de crear nuevos elementos relacionados (especies, bancales, unidades de medida).
- **Actualizar un cultivo**: Útil para corregir datos como el nombre, unidad de medida, fecha de siembra, especie, bancal o estado del cultivo.
- **Eliminar un cultivo**: Aplicable cuando un cultivo ya no es relevante, pero debe hacerse con precaución debido a posibles dependencias con actividades o cosechas.
- **Listar cultivos**: Permite supervisar todos los cultivos registrados, filtrarlos por nombre, unidad de medida, estado, especie o bancal, y realizar acciones rápidas como editar o eliminar.