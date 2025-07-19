---
title: Gestión de Bodegas
---

## ¿Cómo listar y gestionar bodegas?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar bodegas en el sistema de inventario. Sigue los pasos a continuación para gestionar las bodegas de manera efectiva.

---

### 1. Navegar al módulo de Bodegas
1. En el menú principal, busca el módulo **"Inventario"** y selecciona el subítem **"Bodegas"**:

   <img src="/public/inventario/bodega/SidebarBodega.png" alt="Navegación al módulo de bodegas" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

---

### 2. Visualizar el listado de bodegas
- Al entrar en **"Bodegas"**, encontrarás una tabla con las bodegas registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/inventario/bodega/ListaBodegaVacia.png" alt="Listado de bodegas vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada bodega, incluyendo:
  - **Nombre**
  - **Ubicación**
  - **Capacidad**
  - **Teléfono**
  - **Activo** (Sí/No)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar una nueva bodega
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/inventario/bodega/RegistrarBodegaBtn.png" alt="Botón registrar bodega" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de bodegas:

   <img src="/public/inventario/bodega/FormularioRegistroBodega.png" alt="Formulario de registro de bodega" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa el nombre identificativo de la bodega.
   - **Ubicación**: Obligatorio. Especifica la dirección o ubicación física de la bodega.
   - **Capacidad**: Obligatorio. Ingresa la capacidad de almacenamiento (valor numérico).
   - **Teléfono**: Obligatorio. Número de contacto de la bodega.
   - **Activo**: Checkbox que indica si la bodega está operativa (marcado por defecto).

   <img src="/public/inventario/bodega/FormularioBodegaLleno.png" alt="Formulario de bodega diligenciado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Todos los campos son obligatorios excepto el estado **Activo** que viene marcado por defecto.
   - La capacidad debe ser un valor numérico positivo.
   - El teléfono debe tener un formato válido.

5. Una vez completados todos los campos, haz clic en **"Registrar Bodega"** para guardar la información.

6. Verás un mensaje de éxito como este:

   <img src="/public/inventario/bodega/BodegaRegistradaExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Para verificar el registro, haz clic en **"Listar Bodegas"** para regresar al listado:

   <img src="/public/inventario/bodega/BotonListarBodegas.png" alt="Botón listar bodegas" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

8. Confirma que la bodega se registró correctamente en la tabla:

   <img src="/public/inventario/bodega/ListaBodegaConRegistros.png" alt="Listado con bodega registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar una bodega existente
1. En el listado de bodegas, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/inventario/insumos/InsumoAccionEditar.png" alt="Botón de editar bodega" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales de la bodega:

   <img src="/public/inventario/bodega/ModalEditarBodega.png" alt="Modal de edición de bodega" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Nombre**: Modifica el nombre de la bodega.
   - **Ubicación**: Actualiza la dirección o ubicación.
   - **Capacidad**: Cambia la capacidad de almacenamiento.
   - **Teléfono**: Actualiza el número de contacto.
   - **Activo**: Marca o desmarca para activar/desactivar la bodega.

4. Realiza los cambios necesarios en los campos que desees actualizar:

   <img src="/public/inventario/bodega/EditarBodegaModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/inventario/bodega/BodegaActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/inventario/bodega/ListaBodegaActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 5. Eliminar una bodega
1. En el listado de bodegas, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/inventario/insumos/InsumoAccionEliminar.png" alt="Botón de eliminar bodega" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/inventario/bodega/ModalEliminarBodega.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación de una bodega es **permanente** y no se puede deshacer.
   - Considera cuidadosamente antes de proceder, especialmente si la bodega tiene inventario asociado.

4. Si estás seguro de eliminar la bodega, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/inventario/bodega/BodegaEliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. La bodega desaparecerá del listado inmediatamente:

   <img src="/public/inventario/bodega/ListaBodegaDespuesEliminar.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Estados y indicadores visuales
- **Estado Activo**: Las bodegas activas se muestran con **"Sí"** en la columna correspondiente, mientras que las inactivas muestran **"No"**.
- **Iconos de acción**:
  - **Editar** (🖊️): Permite modificar la información de la bodega.
  - **Eliminar** (🗑️): Permite eliminar permanentemente la bodega.

---

### 7. Navegación y funcionalidades adicionales
- **Botón "Registrar Bodega"**: Disponible tanto en la página de registro como en el listado para facilitar la navegación.
- **Botón "Listar Bodegas"**: Te permite regresar al listado desde cualquier parte del módulo.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información de las bodegas.
- **Actualización automática**: Después de cualquier operación (registro, edición, eliminación), la tabla se actualiza automáticamente.

---

### 8. Buenas prácticas recomendadas
- **Nombres descriptivos**: Usa nombres claros y descriptivos para identificar fácilmente las bodegas.
- **Ubicaciones precisas**: Incluye direcciones completas o referencias claras de ubicación.
- **Capacidades realistas**: Ingresa capacidades acordes al espacio físico real.
- **Teléfonos actualizados**: Mantén los números de contacto actualizados para comunicación efectiva.
- **Estado activo**: Desactiva bodegas que no estén en operación en lugar de eliminarlas si tienen historial importante.

---

### 9. Solución de problemas comunes
- **Error de autenticación**: Si recibes un error de acceso denegado, contacta al administrador del sistema.
- **Campos obligatorios**: Asegúrate de completar todos los campos marcados como obligatorios.
- **Formato de capacidad**: La capacidad debe ser un número entero positivo.
- **Conexión lenta**: Si la página tarda en cargar, verifica tu conexión a internet y espera a que termine la carga.

---

### 10. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de inventario.
- **Edición**: Requiere permisos de modificación en bodegas.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.

---

**💡 Consejo**: Mantén siempre actualizada la información de las bodegas para garantizar un control eficiente del inventario y facilitar la gestión logística de tu organización.