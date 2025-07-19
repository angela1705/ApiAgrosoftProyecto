---
title: Gestión de Herramientas
---

## ¿Cómo listar y gestionar herramientas?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar herramientas en el sistema de inventario. Sigue los pasos a continuación para gestionar las herramientas de manera efectiva.

---

### 1. Navegar al módulo de Herramientas
1. En el menú principal, busca el módulo **"Inventario"** y selecciona el subítem **"Herramientas"**:

   <img src="/public/inventario/herramienta/SidebarHerramienta.png" alt="Navegación al módulo de herramientas" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

---

### 2. Visualizar el listado de herramientas
- Al entrar en **"Herramientas"**, encontrarás una tabla con las herramientas registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/inventario/herramienta/ListaHerramientaVacia.png" alt="Listado de herramientas vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada herramienta, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Cantidad**
  - **Estado** (Disponible, En uso, En mantenimiento, etc.)
  - **Activo** (Sí/No)
  - **Fecha Registro**
  - **Precio** (formato COP)
  - **Acciones** (Editar, Eliminar)

- En la parte inferior de la tabla, verás una **fila de totales** que muestra el valor total del inventario de herramientas:

   <img src="/public/inventario/herramienta/TablaHerramientasConTotal.png" alt="Tabla con valor total" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 3. Registrar una nueva herramienta
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/inventario/herramienta/RegistrarHerramientaBtn.png" alt="Botón registrar herramienta" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de herramientas:

   <img src="/public/inventario/herramienta/FormularioRegistroHerramienta.png" alt="Formulario de registro de herramienta" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa el nombre identificativo de la herramienta.
   - **Descripción**: Obligatorio. Describe las características y especificaciones de la herramienta.
   - **Cantidad**: Obligatorio. Número de unidades disponibles (valor numérico).
   - **Precio Herramienta (COP)**: Obligatorio. Valor unitario en pesos colombianos (formato automático con separadores de miles).
   - **Fecha de Registro**: Obligatorio. Fecha y hora de registro (por defecto se establece la fecha actual).
   - **Activo**: Switch que indica si la herramienta está disponible en el inventario (activado por defecto).

   <img src="/public/inventario/herramienta/FormularioHerramientaLleno.png" alt="Formulario de herramienta diligenciado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Todos los campos son obligatorios.
   - La cantidad debe ser un valor numérico positivo.
   - El precio se formatea automáticamente con separadores de miles (ej: 15.000).
   - La fecha de registro permite seleccionar fecha y hora específicas.
   - El switch **Activo** determina si la herramienta aparece en consultas del inventario.

5. Una vez completados todos los campos, haz clic en **"Guardar"** para registrar la herramienta.

6. Verás un mensaje de éxito como este:

   <img src="/public/inventario/herramienta/HerramientaRegistradaExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Para verificar el registro, haz clic en **"Listar Herramientas"** para regresar al listado:

   <img src="/public/inventario/herramienta/BotonListarHerramientas.png" alt="Botón listar herramientas" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

8. Confirma que la herramienta se registró correctamente en la tabla:

   <img src="/public/inventario/herramienta/ListaHerramientaConRegistros.png" alt="Listado con herramienta registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar una herramienta existente
1. En el listado de herramientas, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/inventario/insumos/InsumoAccionEditar.png" alt="Botón de editar herramienta" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales de la herramienta:

   <img src="/public/inventario/herramienta/ModalEditarHerramienta.png" alt="Modal de edición de herramienta" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Nombre**: Modifica el nombre de la herramienta.
   - **Descripción**: Actualiza la descripción y especificaciones.
   - **Cantidad**: Cambia el número de unidades disponibles.
   - **Estado**: Modifica el estado actual (Disponible, En uso, En mantenimiento, etc.).
   - **Precio (COP)**: Actualiza el valor unitario con formato automático.
   - **Activo**: Marca o desmarca para activar/desactivar la herramienta.

4. Realiza los cambios necesarios en los campos que desees actualizar:

   <img src="/public/inventario/herramienta/EditarHerramientaModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/inventario/herramienta/HerramientaActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. La tabla se actualizará automáticamente mostrando los nuevos datos y recalculando el valor total:

   <img src="/public/inventario/herramienta/ListaHerramientaActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 5. Eliminar una herramienta
1. En el listado de herramientas, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/inventario/insumos/InsumoAccionEliminar.png" alt="Botón de eliminar herramienta" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/inventario/herramienta/ModalEliminarHerramienta.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación de una herramienta es **permanente** y no se puede deshacer.
   - Considera cuidadosamente antes de proceder, especialmente si la herramienta está asignada a actividades.

4. Si estás seguro de eliminar la herramienta, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/inventario/herramienta/HerramientaEliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. La herramienta desaparecerá del listado inmediatamente y el valor total se recalculará:

   <img src="/public/inventario/herramienta/ListaHerramientaDespuesEliminar.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Estados y indicadores visuales
- **Estado de la herramienta**: Puede ser "Disponible", "En uso", "En mantenimiento", "Fuera de servicio", etc.
- **Estado Activo**: Las herramientas activas se muestran con **"Sí"** en la columna correspondiente, mientras que las inactivas muestran **"No"**.
- **Formato de precio**: Los precios se muestran en formato COP con separadores de miles (ej: $15.000).
- **Fecha de registro**: Se muestra en formato YYYY-MM-DD.
- **Valor total**: Calcula automáticamente la suma de (cantidad × precio) de todas las herramientas.
- **Iconos de acción**:
  - **Editar** (🖊️): Permite modificar la información de la herramienta.
  - **Eliminar** (🗑️): Permite eliminar permanentemente la herramienta.

---

### 7. Funcionalidades especiales
- **Formato automático de precio**: Al ingresar valores monetarios, el sistema automáticamente formatea el número con separadores de miles.
- **Switch de estado activo**: Utiliza un componente Switch moderno para activar/desactivar herramientas.
- **Cálculo de valor total**: La tabla muestra una fila de totales que calcula automáticamente el valor del inventario.
- **Fecha y hora de registro**: Permite especificar fecha y hora exactas de registro de cada herramienta.

---

### 8. Navegación y funcionalidades adicionales
- **Botón "Guardar"**: Guarda la información de la nueva herramienta.
- **Botón "Listar Herramientas"**: Te permite regresar al listado desde cualquier parte del módulo.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información de las herramientas.
- **Actualización automática**: Después de cualquier operación (registro, edición, eliminación), la tabla se actualiza automáticamente.
- **Recálculo automático**: El valor total se recalcula cada vez que se modifica el inventario.

---

### 9. Buenas prácticas recomendadas
- **Nombres descriptivos**: Usa nombres claros que identifiquen fácilmente el tipo de herramienta.
- **Descripciones detalladas**: Incluye especificaciones técnicas, marca, modelo, y características importantes.
- **Cantidades exactas**: Mantén actualizadas las cantidades para un control preciso del inventario.
- **Precios actualizados**: Revisa periódicamente los precios para mantener valoraciones precisas.
- **Estados coherentes**: Usa estados consistentes (Disponible, En uso, En mantenimiento) para facilitar la gestión.
- **Fechas precisas**: Registra fechas exactas para trazabilidad del inventario.
- **Control de estado activo**: Desactiva herramientas que no estén disponibles en lugar de eliminarlas si tienen historial.

---

### 10. Gestión de estados de herramientas
- **Disponible**: Herramienta lista para ser asignada a actividades.
- **En uso**: Herramienta actualmente asignada a una actividad o trabajador.
- **En mantenimiento**: Herramienta temporalmente fuera de servicio para reparación.
- **Fuera de servicio**: Herramienta dañada o no funcional.
- **Prestada**: Herramienta entregada temporalmente a personal externo.

---

### 11. Interpretación del valor total
- **Cálculo**: El valor total se calcula como la suma de (cantidad × precio unitario) de todas las herramientas activas.
- **Uso**: Esta información es útil para:
  - Valoración del inventario
  - Reportes financieros
  - Control de activos
  - Seguros de inventario
  - Presupuestos de reposición

---

### 12. Solución de problemas comunes
- **Error de autenticación**: Si recibes un error de acceso denegado, contacta al administrador del sistema.
- **Campos obligatorios**: Asegúrate de completar todos los campos requeridos.
- **Formato de precio**: Ingresa solo números; el sistema aplicará automáticamente el formato de moneda.
- **Formato de cantidad**: La cantidad debe ser un número entero positivo.
- **Fecha de registro**: Usa el selector de fecha y hora para evitar errores de formato.
- **Switch de estado**: Asegúrate de que el switch refleje correctamente el estado deseado.
- **Conexión lenta**: Si la página tarda en cargar, verifica tu conexión a internet y espera a que termine la carga.

---

### 13. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de inventario.
- **Edición**: Requiere permisos de modificación en herramientas.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.
- **Valor total**: Solo usuarios autorizados pueden ver información financiera del inventario.

---

### 14. Integración con otros módulos
- **Actividades**: Las herramientas registradas pueden ser asignadas a actividades agrícolas.
- **Trazabilidad**: El registro de herramientas contribuye a la trazabilidad de procesos.
- **Reportes**: La información de herramientas se incluye en reportes de inventario y costos.
- **Mantenimiento**: Los estados permiten gestionar programas de mantenimiento preventivo.

---

**💡 Consejo**: Mantén siempre actualizada la información de las herramientas, especialmente cantidades y estados, para garantizar un control eficiente del inventario y optimizar la productividad de las actividades agrícolas de tu organización.