---
title: Gestión de Bodega Insumos
---

## ¿Cómo listar y gestionar bodega insumos?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar registros de bodega insumos en el sistema de inventario. Sigue los pasos a continuación para gestionar las asignaciones de insumos a bodegas de manera efectiva.

---

### 1. Navegar al módulo de Bodega Insumos
1. En el menú principal, busca el módulo **"Inventario"** y selecciona el subítem **"Bodega Insumos"**:

   <img src="/public/inventario/bodegainsumo/SidebarBodegaInsumo.png" alt="Navegación al módulo de bodega insumos" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 2. Visualizar el listado de bodega insumos
- Al entrar en **"Bodega Insumos"**, encontrarás una tabla con los registros de asignación de insumos a bodegas. Si no hay registros, verás una tabla vacía:

   <img src="/public/inventario/bodegainsumo/ListaBodegaInsumoVacia.png" alt="Listado de bodega insumos vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada asignación, incluyendo:
  - **Bodega** (Nombre de la bodega)
  - **Insumo** (Nombre del insumo)
  - **Cantidad** (Cantidad del insumo en la bodega)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar una nueva asignación de bodega insumo
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/inventario/bodegainsumo/RegistrarBodegaInsumoBtn.png" alt="Botón registrar bodega insumo" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de bodega insumos:

   <img src="/public/inventario/bodegainsumo/FormularioRegistroBodegaInsumo.png" alt="Formulario de registro de bodega insumo" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Bodega**: 
   - Selecciona una bodega existente del menú desplegable
   - Haz clic en el botón **"+"** para registrar una nueva bodega si no existe la que necesitas:

   <img src="/public/inventario/bodegainsumo/SelectorBodegaConPlus.png" alt="Selector de bodega con botón plus" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de registro de bodega:

   <img src="/public/inventario/bodegainsumo/ModalRegistrarBodega.png" alt="Modal de registro de bodega" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **b) Insumo**: 
   - Selecciona un insumo existente del menú desplegable
   - Haz clic en el botón **"+"** para registrar un nuevo insumo si no existe el que necesitas:

   <img src="/public/inventario/bodegainsumo/SelectorInsumoConPlus.png" alt="Selector de insumo con botón plus" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de registro de insumo:

   <img src="/public/inventario/bodegainsumo/ModalRegistrarInsumo.png" alt="Modal de registro de insumo" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **c) Cantidad**: 
   - Ingresa la cantidad del insumo que se almacenará en la bodega seleccionada

4. **Formulario completado**:

   <img src="/public/inventario/bodegainsumo/FormularioBodegaInsumoLleno.png" alt="Formulario de bodega insumo diligenciado" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Todos los campos son obligatorios: **Bodega**, **Insumo** y **Cantidad**.
   - Debes seleccionar opciones válidas (no "Seleccione una Bodega" o "Seleccione un Insumo").
   - La cantidad debe ser un valor numérico positivo.
   - Puedes registrar nuevas bodegas e insumos directamente desde este formulario usando los botones **"+"**.

6. Una vez completados todos los campos, haz clic en **"Guardar"** para registrar la asignación.

7. Verás un mensaje de éxito como este:

   <img src="/public/inventario/bodegainsumo/BodegaInsumoRegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. El sistema te redirigirá automáticamente al listado para verificar el registro:

   <img src="/public/inventario/bodegainsumo/ListaBodegaInsumoConRegistros.png" alt="Listado con bodega insumo registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Registrar bodega o insumo desde los modales
**Funcionalidad especial**: Este módulo permite registrar nuevas bodegas e insumos sin salir del formulario principal.

#### 4.1 Registrar nueva bodega
1. En el selector de bodega, haz clic en el botón **"+"**:
2. Completa el formulario de bodega en el modal:
   - **Nombre**: Nombre identificativo de la bodega
   - **Ubicación**: Dirección o ubicación física
   - **Capacidad**: Capacidad de almacenamiento
   - **Teléfono**: Número de contacto
   - **Activo**: Estado de la bodega

   <img src="/public/inventario/bodegainsumo/ModalBodegaCompleto.png" alt="Modal de bodega completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Guardar"** y la nueva bodega aparecerá automáticamente en el selector principal.

#### 4.2 Registrar nuevo insumo
1. En el selector de insumo, haz clic en el botón **"+"**:
2. Completa el formulario de insumo en el modal:
   - **Nombre**: Nombre del insumo
   - **Descripción**: Características del insumo
   - **Unidad de medida**: Kg, L, unidades, etc.
   - **Precio**: Valor unitario
   - **Otros campos**: Según el formulario de insumos

   <img src="/public/inventario/bodegainsumo/ModalInsumoCompleto.png" alt="Modal de insumo completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Guardar"** y el nuevo insumo aparecerá automáticamente en el selector principal.

---

### 5. Actualizar una asignación existente
1. En el listado de bodega insumos, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/inventario/insumos/InsumoAccionEditar.png" alt="Botón de editar bodega insumo" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales:

   <img src="/public/inventario/bodegainsumo/ModalEditarBodegaInsumo.png" alt="Modal de edición de bodega insumo" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Bodega**: Cambia la bodega asignada seleccionando una diferente
   - **Insumo**: Cambia el insumo seleccionando uno diferente
   - **Cantidad**: Modifica la cantidad almacenada

4. Realiza los cambios necesarios:

   <img src="/public/inventario/bodegainsumo/EditarBodegaInsumoModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/inventario/bodegainsumo/BodegaInsumoActualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/inventario/bodegainsumo/ListaBodegaInsumoActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Eliminar una asignación de bodega insumo
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/inventario/insumos/InsumoAccionEliminar.png" alt="Botón de eliminar bodega insumo" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/inventario/bodegainsumo/ModalEliminarBodegaInsumo.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación del registro es **permanente** y no se puede deshacer.
   - Esta acción solo elimina la asignación, no la bodega ni el insumo por separado.
   - Considera cuidadosamente antes de proceder si hay actividades dependientes.

4. Si estás seguro de eliminar el registro, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/inventario/bodegainsumo/BodegaInsumoEliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/inventario/bodegainsumo/ListaBodegaInsumoDespuesEliminar.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Características especiales del módulo
- **Registro integrado**: Permite crear nuevas bodegas e insumos sin abandonar el formulario principal.
- **Selectores inteligentes**: Los menús desplegables se actualizan automáticamente cuando se registran nuevos elementos.
- **Validación de relaciones**: Previene duplicados de la misma combinación bodega-insumo.
- **Navegación fluida**: Redirección automática al listado después del registro exitoso.
- **Iconos de acción**:
  - **Plus** (+): Registrar nueva bodega o insumo desde el formulario
  - **Editar** (🖊️): Modificar la asignación existente
  - **Eliminar** (🗑️): Eliminar la asignación permanentemente

---

### 8. Navegación y funcionalidades adicionales
- **Botón "Guardar"**: Registra la nueva asignación de bodega insumo.
- **Botón "Listar Bodega Insumos"**: Te permite regresar al listado desde el formulario de registro.
- **Modales integrados**: Los modales de bodega e insumo se abren y cierran sin afectar el formulario principal.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información.
- **Actualización automática**: Después de cualquier operación, la tabla se actualiza automáticamente.
- **Cache inteligente**: Los selectores mantienen los datos actualizados usando React Query.

---

### 9. Buenas prácticas recomendadas
- **Planificación previa**: Verifica que las bodegas e insumos existan antes de crear asignaciones.
- **Cantidades realistas**: Ingresa cantidades acordes a la capacidad de la bodega y disponibilidad real.
- **Organización lógica**: Asigna insumos relacionados a bodegas apropiadas (ej: fertilizantes a bodega de químicos).
- **Registro inmediato**: Crea las asignaciones tan pronto como los insumos lleguen a la bodega.
- **Revisión periódica**: Verifica regularmente que las cantidades registradas coincidan con el inventario físico.
- **Uso de modales**: Aprovecha la funcionalidad de registro rápido para crear bodegas e insumos según sea necesario.

---

### 10. Flujo de trabajo recomendado
1. **Verificar existencia**: Antes de registrar, verifica si la bodega e insumo ya existen.
2. **Crear dependencias**: Si no existen, úsalos botones **"+"** para crearlos primero.
3. **Registrar asignación**: Una vez que ambos existen, ingresa la cantidad y guarda.
4. **Verificar en listado**: Confirma que la asignación se registró correctamente.
5. **Actualizar según movimientos**: Modifica las cantidades cuando haya entradas o salidas de inventario.

---

### 11. Interpretación de la información
- **Bodega**: Indica dónde está físicamente almacenado el insumo.
- **Insumo**: Especifica qué tipo de material o producto está almacenado.
- **Cantidad**: Representa las unidades disponibles del insumo en esa bodega específica.
- **Combinación única**: Cada combinación bodega-insumo debe ser única en el sistema.

---

### 12. Solución de problemas comunes
- **Error de campos obligatorios**: Asegúrate de seleccionar bodega e insumo válidos, no las opciones "Seleccione...".
- **Cantidad inválida**: La cantidad debe ser un número positivo.
- **Bodega/Insumo no aparece**: Usa los botones **"+"** para registrar el elemento faltante.
- **Error de autenticación**: Si recibes un error de acceso denegado, contacta al administrador.
- **Modal no se cierra**: Los modales se cierran automáticamente al guardar exitosamente.
- **Selectores vacíos**: Si los selectores están vacíos, verifica la conexión y recarga la página.
- **Duplicados**: El sistema previene registrar la misma combinación bodega-insumo dos veces.

---

### 13. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de inventario.
- **Edición**: Requiere permisos de modificación en asignaciones de inventario.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.
- **Registro de dependencias**: Los permisos para crear bodegas e insumos pueden estar separados.

---

### 14. Integración con otros módulos
- **Inventario general**: Las asignaciones contribuyen al control total del inventario.
- **Actividades**: Las asignaciones determinan qué insumos están disponibles para actividades en cada bodega.
- **Reportes**: La información se incluye en reportes de inventario por ubicación.
- **Trazabilidad**: Permite rastrear la ubicación específica de cada insumo.
- **Costos**: Facilita el cálculo de costos por bodega y valoración de inventarios.

---

### 15. Casos de uso comunes
- **Entrada de inventario**: Registrar insumos recién llegados a una bodega específica.
- **Redistribución**: Mover insumos entre bodegas modificando las asignaciones.
- **Control de stock**: Monitorear qué insumos están disponibles en cada ubicación.
- **Planificación de actividades**: Verificar disponibilidad de insumos por bodega antes de asignar actividades.
- **Auditorías**: Comparar registros del sistema con inventario físico por bodega.

---

**💡 Consejo**: Utiliza esta funcionalidad para mantener un control preciso de la ubicación de cada insumo en tu organización. La integración de modales facilita el registro rápido de nuevos elementos, optimizando el flujo de trabajo de gestión de inventarios.