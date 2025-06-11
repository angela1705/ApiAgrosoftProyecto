---
title: Gestión de Cosechas
---

## ¿Cómo listar y gestionar cosechas?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar cosechas en el sistema. Sigue los pasos a continuación para gestionar las cosechas de manera efectiva.

---

### 1. Navegar al módulo de Cosechas
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Cosechas"**:

   <img src="/public/trazabilidad/cosechas/sidebarCosecha.png" alt="Navegación al módulo de cosechas" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de cosechas
- Al entrar en **"Cosechas"**, encontrarás una tabla con las cosechas registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/cosechas/ListaVacia.png" alt="Listado de cosechas vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada cosecha, incluyendo:
  - **Cultivo**
  - **Cantidad**
  - **Unidad de Medida**
  - **Fecha de recolección**
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar una nueva cosecha
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/cosechas/RegistrarCosechaBtn.png" alt="Botón registrar cosecha" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de cosechas:

   <img src="/public/trazabilidad/cosechas/formularioVacio.png" alt="Formulario de registro de cosecha" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Cultivo**: Obligatorio. Selecciona un cultivo de la lista desplegable.
    <img src="/public/trazabilidad/cosechas/ModalCultivo.png" alt="ModalUnidadMedida" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Cantidad**: Obligatorio. Ingresa la cantidad cosechada (número entero positivo).
   - **Unidad de Medida**: Obligatorio. Selecciona una unidad de medida de la lista desplegable o registra una nueva haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/cosechas/modalunidadmedida.png" alt="ModalUnidadMedida" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Fecha de recolección**: Obligatorio. Selecciona la fecha en que se realizó la cosecha.

   <img src="/public/trazabilidad/cosechas/formularioLleno.png" alt="Formulario de cosecha diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Cultivo**, **Cantidad**, **Unidad de Medida** y **Fecha de recolección** son obligatorios.
   - La **Cantidad** debe ser un número entero positivo.
   - La **Fecha de recolección** debe ser una fecha válida.
   - El **Cultivo** y la **Unidad de Medida** deben seleccionarse de listas existentes o crearse nuevas desde los modales correspondientes.

5. Haz clic en **"Guardar"** para registrar la cosecha.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/cosechas/RegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Cosechas"** para confirmar que la cosecha se registró correctamente:

   <img src="/public/trazabilidad/cosechas/formularioVacio.png" alt="Listado con cosecha registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar una cosecha
1. En el listado de cosechas, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/cosechas/EditarCosechaAccion.png" alt="Botón de editar cosecha" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales de la cosecha:

   <img src="/public/trazabilidad/cosechas/EditarModal.png" alt="Formulario de edición de cosecha" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Cultivo, Cantidad, Unidad de Medida, Fecha de recolección).
4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/cosechas/ActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar una cosecha
1. En el listado de cosechas, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/cosechas/EliminarCosechaAccion.png" alt="Botón de eliminar cosecha" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/cosechas/EliminarModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer.
4. Haz clic en **"Confirmar"** para eliminar la cosecha.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/cosechas/EliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar cosechas por cultivo, cantidad, unidad de medida o fecha de recolección.
- **Validaciones**:
  - La **Cantidad** debe ser un número entero positivo.
  - La **Fecha de recolección** debe ser una fecha válida.
  - El **Cultivo** y la **Unidad de Medida** deben seleccionarse de listas existentes o crearse nuevas desde los modales correspondientes.
- **Acceso a otros módulos**: Las cosechas están relacionadas con el módulo de **Cultivos**. Asegúrate de que el cultivo asociado esté correctamente registrado antes de crear una cosecha.
- **Modales de creación**: El botón **"+"** en el campo de Unidad de Medida permite registrar nuevas unidades directamente desde el formulario.

---

### 7. Casos de uso
- **Registrar una cosecha**: Ideal para documentar la cantidad recolectada de un cultivo específico, especificando la unidad de medida y la fecha de recolección.
- **Actualizar una cosecha**: Útil para corregir datos como la cantidad cosechada, la unidad de medida, el cultivo asociado o la fecha de recolección.
- **Eliminar una cosecha**: Aplicable cuando un registro de cosecha es erróneo o ya no es relevante, pero debe hacerse con precaución debido a su carácter irreversible.
- **Listar cosechas**: Permite supervisar todas las cosechas registradas, filtrarlas por cultivo, cantidad, unidad de medida o fecha, y realizar acciones rápidas como editar o eliminar.