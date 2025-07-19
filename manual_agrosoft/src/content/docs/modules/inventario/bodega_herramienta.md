---
title: Gestión de Bodega Herramientas
---

## ¿Cómo listar y gestionar bodega herramientas?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar registros de bodega herramientas en el sistema de inventario. Sigue los pasos a continuación para gestionar las asignaciones de herramientas a bodegas de manera efectiva.

---

### 1. Navegar al módulo de Bodega Herramientas
1. En el menú principal, busca el módulo **"Inventario"** y selecciona el subítem **"Bodega Herramientas"**:

   <img src="/public/inventario/bodegaherramienta/SidebarBodegaHerramienta.png" alt="Navegación al módulo de bodega herramientas" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 2. Visualizar el listado de bodega herramientas
- Al entrar en **"Bodega Herramientas"**, encontrarás una tabla con los registros de asignación de herramientas a bodegas. Si no hay registros, verás una tabla vacía:

   <img src="/public/inventario/bodegaherramienta/ListaBodegaHerramientaVacia.png" alt="Listado de bodega herramientas vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada asignación, incluyendo:
  - **Bodega** (Nombre de la bodega)
  - **Herramienta** (Nombre de la herramienta)
  - **Cantidad** (Cantidad total de la herramienta en la bodega)
  - **Costo Total** (Valor total en pesos colombianos)
  - **Cantidad Prestada** (Cantidad actualmente prestada o en uso)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar una nueva asignación de bodega herramienta
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/inventario/bodegaherramienta/RegistrarBodegaHerramientaBtn.png" alt="Botón registrar bodega herramienta" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de bodega herramientas:

   <img src="/public/inventario/bodegaherramienta/FormularioRegistroBodegaHerramienta.png" alt="Formulario de registro de bodega herramienta" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Bodega**: 
   - Selecciona una bodega existente del menú desplegable
   - Haz clic en el botón **"+"** para registrar una nueva bodega si no existe la que necesitas:

   <img src="/public/inventario/bodegaherramienta/SelectorBodegaConPlus.png" alt="Selector de bodega con botón plus" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de registro de bodega:

   <img src="/public/inventario/bodegaherramienta/ModalRegistrarBodega.png" alt="Modal de registro de bodega" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **b) Herramienta**: 
   - Selecciona una herramienta existente del menú desplegable
   - Haz clic en el botón **"+"** para registrar una nueva herramienta si no existe la que necesitas:

   <img src="/public/inventario/bodegaherramienta/SelectorHerramientaConPlus.png" alt="Selector de herramienta con botón plus" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de registro de herramienta:

   <img src="/public/inventario/bodegaherramienta/ModalRegistrarHerramienta.png" alt="Modal de registro de herramienta" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **c) Cantidad**: 
   - Ingresa la cantidad total de la herramienta que se almacenará en la bodega seleccionada

4. **Formulario completado**:

   <img src="/public/inventario/bodegaherramienta/FormularioBodegaHerramientaLleno.png" alt="Formulario de bodega herramienta diligenciado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Todos los campos son obligatorios: **Bodega**, **Herramienta** y **Cantidad**.
   - Debes seleccionar opciones válidas (no "Seleccione una Bodega" o "Seleccione una Herramienta").
   - La cantidad debe ser un valor numérico positivo.
   - El sistema valida automáticamente que todos los campos estén completos antes de permitir el envío.
   - Puedes registrar nuevas bodegas y herramientas directamente desde este formulario usando los botones **"+"**.

6. Una vez completados todos los campos, haz clic en **"Guardar"** para registrar la asignación.

7. Verás un mensaje de éxito como este:

   <img src="/public/inventario/bodegaherramienta/BodegaHerramientaRegistradaExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. El sistema te redirigirá automáticamente al listado para verificar el registro:

   <img src="/public/inventario/bodegaherramienta/ListaBodegaHerramientaConRegistros.png" alt="Listado con bodega herramienta registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Registrar bodega o herramienta desde los modales
**Funcionalidad especial**: Este módulo permite registrar nuevas bodegas y herramientas sin salir del formulario principal.

#### 4.1 Registrar nueva bodega
1. En el selector de bodega, haz clic en el botón **"+"**:
2. Completa el formulario de bodega en el modal:
   - **Nombre**: Nombre identificativo de la bodega
   - **Ubicación**: Dirección o ubicación física
   - **Capacidad**: Capacidad de almacenamiento
   - **Teléfono**: Número de contacto
   - **Activo**: Estado de la bodega

   <img src="/public/inventario/bodegaherramienta/ModalBodegaCompleto.png" alt="Modal de bodega completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Guardar"** y la nueva bodega aparecerá automáticamente en el selector principal.

#### 4.2 Registrar nueva herramienta
1. En el selector de herramienta, haz clic en el botón **"+"**:
2. Completa el formulario de herramienta en el modal:
   - **Nombre**: Nombre de la herramienta
   - **Descripción**: Características y especificaciones
   - **Cantidad**: Cantidad inicial
   - **Estado**: Estado actual de la herramienta
   - **Precio**: Valor unitario (se calculará automáticamente el costo total)
   - **Fecha de registro**: Fecha de adquisición
   - **Activo**: Estado de disponibilidad

   <img src="/public/inventario/bodegaherramienta/ModalHerramientaCompleto.png" alt="Modal de herramienta completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Guardar"** y la nueva herramienta aparecerá automáticamente en el selector principal.

---

### 5. Actualizar una asignación existente
1. En el listado de bodega herramientas, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/inventario/insumos/InsumoAccionEditar.png" alt="Botón de editar bodega herramienta" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales:

   <img src="/public/inventario/bodegaherramienta/ModalEditarBodegaHerramienta.png" alt="Modal de edición de bodega herramienta" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Bodega**: Cambia la bodega asignada seleccionando una diferente
   - **Herramienta**: Cambia la herramienta seleccionando una diferente
   - **Cantidad**: Modifica la cantidad total disponible en la bodega
   - **Cantidad Prestada**: Actualiza la cantidad actualmente prestada o en uso
   - **Costo Total**: Modifica el valor total con formato automático en pesos colombianos

4. **Funcionalidades especiales del modal de edición**:
   - **Formato de costo**: El campo costo total se formatea automáticamente con separadores de miles y símbolo de peso ($)
   - **Validación de cantidades**: La cantidad prestada no puede exceder la cantidad total
   - **Actualización en tiempo real**: Los cambios se reflejan inmediatamente en el formulario

   <img src="/public/inventario/bodegaherramienta/EditarBodegaHerramientaModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/inventario/bodegaherramienta/BodegaHerramientaActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/inventario/bodegaherramienta/ListaBodegaHerramientaActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Eliminar una asignación de bodega herramienta
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/inventario/insumos/InsumoAccionEliminar.png" alt="Botón de eliminar bodega herramienta" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/inventario/bodegaherramienta/ModalEliminarBodegaHerramienta.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación del registro es **permanente** y no se puede deshacer.
   - Esta acción solo elimina la asignación, no la bodega ni la herramienta por separado.
   - Considera cuidadosamente antes de proceder si hay herramientas prestadas o en uso.

4. Si estás seguro de eliminar el registro, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/inventario/bodegaherramienta/BodegaHerramientaEliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/inventario/bodegaherramienta/ListaBodegaHerramientaDespuesEliminar.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Características especiales del módulo
- **Registro integrado**: Permite crear nuevas bodegas y herramientas sin abandonar el formulario principal.
- **Control de préstamos**: Gestiona las cantidades prestadas vs. disponibles de cada herramienta.
- **Cálculo automático de costos**: Calcula y muestra el costo total basado en cantidad y precio unitario.
- **Formato monetario**: Formatea automáticamente los valores en pesos colombianos con separadores.
- **Validación inteligente**: Previene asignaciones duplicadas y valida campos obligatorios.
- **Navegación fluida**: Redirección automática al listado después del registro exitoso.
- **Iconos de acción**:
  - **Plus** (+): Registrar nueva bodega o herramienta desde el formulario
  - **Editar** (🖊️): Modificar la asignación existente
  - **Eliminar** (🗑️): Eliminar la asignación permanentemente

---

### 8. Gestión de cantidad prestada
**Funcionalidad especial**: Este módulo incluye control de herramientas prestadas.

- **Cantidad total**: Representa todas las unidades de la herramienta en la bodega
- **Cantidad prestada**: Indica cuántas unidades están actualmente prestadas o en uso
- **Cantidad disponible**: Se calcula automáticamente como (Cantidad total - Cantidad prestada)

#### 8.1 Casos de uso para cantidad prestada:
- **Préstamo a empleados**: Registrar herramientas entregadas temporalmente
- **Asignación a proyectos**: Herramientas asignadas a actividades específicas
- **Mantenimiento externo**: Herramientas enviadas para reparación
- **Control de disponibilidad**: Saber qué herramientas están disponibles para nuevos préstamos

---

### 9. Formato y visualización de costos
- **Formato COP**: Los costos se muestran con el símbolo $ y separadores de miles (ej: $15.000)
- **Entrada flexible**: Puedes ingresar valores con o sin formato, el sistema los procesa automáticamente
- **Validación numérica**: Solo acepta valores numéricos válidos
- **Cálculo automático**: El costo total se calcula basado en cantidad × precio unitario de la herramienta

---

### 10. Navegación y funcionalidades adicionales
- **Botón "Guardar"**: Registra la nueva asignación de bodega herramienta.
- **Botón "Listar Bodega Herramientas"**: Te permite regresar al listado desde el formulario de registro.
- **Modales integrados**: Los modales de bodega y herramienta se abren y cierran sin afectar el formulario principal.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información.
- **Actualización automática**: Después de cualquier operación, la tabla se actualiza automáticamente.
- **Cache inteligente**: Los selectores mantienen los datos actualizados usando React Query.

---

### 11. Buenas prácticas recomendadas
- **Planificación previa**: Verifica que las bodegas y herramientas existan antes de crear asignaciones.
- **Cantidades realistas**: Ingresa cantidades acordes a la capacidad de la bodega y disponibilidad real.
- **Organización lógica**: Asigna herramientas similares a bodegas especializadas (ej: herramientas eléctricas a bodega de equipos).
- **Control de préstamos**: Mantén actualizada la cantidad prestada para control preciso de disponibilidad.
- **Costos actualizados**: Revisa periódicamente los costos para mantener valoraciones precisas del inventario.
- **Registro inmediato**: Crea las asignaciones tan pronto como las herramientas lleguen a la bodega.
- **Uso de modales**: Aprovecha la funcionalidad de registro rápido para crear bodegas y herramientas según sea necesario.

---

### 12. Flujo de trabajo recomendado
1. **Verificar existencia**: Antes de registrar, verifica si la bodega y herramienta ya existen.
2. **Crear dependencias**: Si no existen, usa los botones **"+"** para crearlos primero.
3. **Registrar asignación**: Una vez que ambos existen, ingresa la cantidad y guarda.
4. **Verificar en listado**: Confirma que la asignación se registró correctamente.
5. **Gestionar préstamos**: Actualiza la cantidad prestada cuando se entreguen herramientas.
6. **Controlar devoluciones**: Reduce la cantidad prestada cuando se devuelvan herramientas.

---

### 13. Interpretación de la información
- **Bodega**: Indica dónde están físicamente almacenadas las herramientas.
- **Herramienta**: Especifica qué tipo de herramienta está almacenada.
- **Cantidad**: Representa las unidades totales del herramienta en esa bodega específica.
- **Costo Total**: Valor económico total del inventario de esa herramienta en la bodega.
- **Cantidad Prestada**: Unidades actualmente no disponibles (prestadas, en uso, en mantenimiento).
- **Combinación única**: Cada combinación bodega-herramienta debe ser única en el sistema.

---

### 14. Control de disponibilidad
**Cálculo de disponibilidad**:
- **Disponible** = Cantidad Total - Cantidad Prestada
- **En uso** = Cantidad Prestada
- **Total** = Cantidad registrada en la bodega

**Estados de disponibilidad**:
- **100% disponible**: Cantidad prestada = 0
- **Parcialmente disponible**: 0 < Cantidad prestada < Cantidad total
- **Totalmente prestada**: Cantidad prestada = Cantidad total

---

### 15. Solución de problemas comunes
- **Error de campos obligatorios**: Asegúrate de seleccionar bodega y herramienta válidos, no las opciones "Seleccione...".
- **Cantidad inválida**: La cantidad debe ser un número positivo.
- **Cantidad prestada mayor**: La cantidad prestada no puede exceder la cantidad total.
- **Bodega/Herramienta no aparece**: Usa los botones **"+"** para registrar el elemento faltante.
- **Error de formato de costo**: Ingresa solo números; el sistema aplicará automáticamente el formato monetario.
- **Error de autenticación**: Si recibes un error de acceso denegado, contacta al administrador.
- **Modal no se cierra**: Los modales se cierran automáticamente al guardar exitosamente.
- **Selectores vacíos**: Si los selectores están vacíos, verifica la conexión y recarga la página.
- **Duplicados**: El sistema previene registrar la misma combinación bodega-herramienta dos veces.

---

### 16. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de inventario.
- **Edición**: Requiere permisos de modificación en asignaciones de inventario.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.
- **Registro de dependencias**: Los permisos para crear bodegas y herramientas pueden estar separados.
- **Gestión de préstamos**: Puede requerir permisos específicos para modificar cantidades prestadas.

---

### 17. Integración con otros módulos
- **Inventario general**: Las asignaciones contribuyen al control total del inventario de herramientas.
- **Actividades**: Las asignaciones determinan qué herramientas están disponibles para actividades en cada bodega.
- **Préstamos**: Control de herramientas entregadas a empleados o proyectos específicos.
- **Mantenimiento**: Seguimiento de herramientas en reparación o mantenimiento.
- **Reportes**: La información se incluye en reportes de inventario por ubicación y valoración.
- **Costos**: Facilita el cálculo de costos por bodega y valoración de activos.
- **Trazabilidad**: Permite rastrear la ubicación y estado específico de cada herramienta.

---

### 18. Casos de uso comunes
- **Entrada de inventario**: Registrar herramientas recién adquiridas en una bodega específica.
- **Redistribución**: Mover herramientas entre bodegas modificando las asignaciones.
- **Control de préstamos**: Gestionar herramientas entregadas temporalmente a empleados.
- **Planificación de trabajos**: Verificar disponibilidad de herramientas por bodega antes de asignar tareas.
- **Auditorías**: Comparar registros del sistema con inventario físico por bodega.
- **Valoración de activos**: Calcular el valor total de herramientas por ubicación.
- **Control de mantenimiento**: Registrar herramientas enviadas para reparación o servicio.

---

**💡 Consejo**: Aprovecha la funcionalidad de control de préstamos para mantener un seguimiento preciso de las herramientas en uso. La integración de modales y el formato automático de costos optimizan significativamente la gestión del inventario de herramientas de tu organización.