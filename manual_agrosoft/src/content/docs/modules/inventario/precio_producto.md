---
title: Gestión de Precios de Productos
---

## ¿Cómo listar y gestionar precios de productos?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar precios de productos en el sistema de inventario. Sigue los pasos a continuación para gestionar los precios de productos cosechados de manera efectiva.

---

### 1. Navegar al módulo de Precios de Productos
1. En el menú principal, busca el módulo **"Inventario"** y selecciona el subítem **"Precios de Productos"**:

   <img src="/public/inventario/preciosproductos/SidebarPreciosProductos.png" alt="Navegación al módulo de precios de productos" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 2. Visualizar el listado de precios de productos
- Al entrar en **"Precios de Productos"**, encontrarás una tabla con los precios registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/inventario/preciosproductos/ListaPreciosProductosVacia.png" alt="Listado de precios de productos vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada precio de producto, incluyendo:
  - **Cosecha** (Nombre del producto/cultivo)
  - **Unidad de Medida** (kg, L, unidades, etc.)
  - **Precio** (Valor en pesos colombianos)
  - **Fecha Registro** (Fecha de registro del precio)
  - **Stock** (Cantidad disponible)
  - **Fecha Caducidad** (Fecha de vencimiento del producto)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo precio de producto
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/inventario/preciosproductos/RegistrarPrecioProductoBtn.png" alt="Botón registrar precio de producto" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de precios de productos:

   <img src="/public/inventario/preciosproductos/FormularioRegistroPrecioProducto.png" alt="Formulario de registro de precio de producto" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Cosecha**: 
   - Selecciona una cosecha existente del menú desplegable
   - Las opciones muestran información detallada: "Cosecha [ID_Cultivo] [Nombre_Cultivo] - [Fecha]"
   - Haz clic en el botón **"+"** para registrar una nueva cosecha si no existe la que necesitas:

   <img src="/public/inventario/preciosproductos/SelectorCosechaConPlus.png" alt="Selector de cosecha con botón plus" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de registro de cosecha:

   <img src="/public/inventario/preciosproductos/ModalRegistrarCosecha.png" alt="Modal de registro de cosecha" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **b) Unidad de Medida**: 
   - Selecciona una unidad de medida existente del menú desplegable (kg, L, unidades, etc.)
   - Haz clic en el botón **"+"** para crear una nueva unidad de medida si no existe la que necesitas:

   <img src="/public/inventario/preciosproductos/SelectorUnidadMedidaConPlus.png" alt="Selector de unidad de medida con botón plus" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de creación de unidad de medida:

   <img src="/public/inventario/preciosproductos/ModalCrearUnidadMedida.png" alt="Modal de crear unidad de medida" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **c) Precio Producto (COP)**: 
   - Ingresa el precio en pesos colombianos con formato automático (ej: 1.000)
   - **Sugerencia inteligente**: Al seleccionar una cosecha, aparece una sugerencia de precios:

   <img src="/public/inventario/preciosproductos/SugerenciaPrecio.png" alt="Sugerencia de precio automática" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

   **d) Fecha de Registro**: 
   - Selecciona la fecha de registro (por defecto la fecha actual)

   **e) Stock**: 
   - Ingresa la cantidad inicial disponible del producto

   **f) Fecha de Caducidad**: 
   - Campo opcional para productos perecederos
   - Selecciona la fecha de vencimiento del producto

4. **Formulario completado**:

   <img src="/public/inventario/preciosproductos/FormularioPrecioProductoLleno.png" alt="Formulario de precio de producto diligenciado" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Los campos **Cosecha** son obligatorios.
   - **Unidad de medida** es opcional pero recomendable para mejor control.
   - El **precio** se formatea automáticamente con separadores de miles.
   - La **fecha de caducidad** es opcional (úsala para productos perecederos).
   - El sistema valida que se seleccione una cosecha válida antes del envío.
   - Aprovecha las **sugerencias de precio** basadas en costos de producción.

6. Una vez completados los campos obligatorios, haz clic en **"Guardar"** para registrar el precio.

7. Verás un mensaje de éxito como este:

   <img src="/public/inventario/preciosproductos/PrecioProductoRegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. Para verificar el registro, haz clic en **"Listar Precios de Productos"** para regresar al listado:

   <img src="/public/inventario/preciosproductos/BotonListarPreciosProductos.png" alt="Botón listar precios de productos" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

9. Confirma que el precio se registró correctamente en la tabla:

   <img src="/public/inventario/preciosproductos/ListaPreciosProductosConRegistros.png" alt="Listado con precio de producto registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Crear unidad de medida desde el modal
**Funcionalidad especial**: Este módulo permite crear nuevas unidades de medida sin salir del formulario principal.

#### 4.1 Crear nueva unidad de medida
1. En el selector de unidad de medida, haz clic en el botón **"+"**:
2. Completa el formulario de unidad de medida en el modal:
   - **Nombre**: Abreviación o nombre corto (ej: kg, L, unidades, cajas)
   - **Descripción**: Descripción detallada de la unidad (ej: "Kilogramos para productos sólidos")

   <img src="/public/inventario/preciosproductos/ModalUnidadMedidaCompleto.png" alt="Modal de unidad de medida completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Confirmar"** y la nueva unidad aparecerá automáticamente en el selector principal.

#### 4.2 Crear nueva cosecha desde el modal
1. En el selector de cosecha, haz clic en el botón **"+"**:
2. Completa el formulario de cosecha según los campos requeridos:
   - **Cultivo**: Selecciona el cultivo asociado
   - **Fecha de cosecha**: Fecha en que se realizó la cosecha
   - **Cantidad cosechada**: Cantidad obtenida
   - **Otros campos**: Según el formulario de cosechas del sistema

   <img src="/public/inventario/preciosproductos/ModalCosechaCompleto.png" alt="Modal de cosecha completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Guardar"** y la nueva cosecha aparecerá automáticamente en el selector principal.

---

### 5. Actualizar un precio de producto existente
1. En el listado de precios de productos, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/inventario/insumos/InsumoAccionEditar.png" alt="Botón de editar precio de producto" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales:

   <img src="/public/inventario/preciosproductos/ModalEditarPrecioProducto.png" alt="Modal de edición de precio de producto" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Cosecha**: Cambia la cosecha asociada seleccionando una diferente
   - **Unidad de Medida**: Modifica la unidad de medida o crea una nueva con el botón "Nueva Unidad"
   - **Precio**: Actualiza el precio con formato automático en pesos colombianos
   - **Fecha de Registro**: Cambia la fecha de registro
   - **Stock**: Modifica la cantidad disponible
   - **Fecha de Caducidad**: Actualiza o establece la fecha de vencimiento

4. **Funcionalidades especiales del modal de edición**:
   - **Botón "Nueva Unidad"**: Permite crear unidades de medida directamente desde el modal de edición
   - **Formato automático**: Los campos de precio y stock se formatean automáticamente
   - **Selectores dinámicos**: Los menús desplegables se actualizan al crear nuevos elementos

   <img src="/public/inventario/preciosproductos/EditarPrecioProductoModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Si necesitas crear una nueva unidad de medida durante la edición, haz clic en **"Nueva Unidad"**:

   <img src="/public/inventario/preciosproductos/ModalNuevaUnidadEnEdicion.png" alt="Modal nueva unidad en edición" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. Haz clic en **"Confirmar"** para guardar los cambios.

7. Verás un mensaje de actualización exitosa:

   <img src="/public/inventario/preciosproductos/PrecioProductoActualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/inventario/preciosproductos/ListaPreciosProductosActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Eliminar un precio de producto
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/inventario/insumos/InsumoAccionEliminar.png" alt="Botón de eliminar precio de producto" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/inventario/preciosproductos/ModalEliminarPrecioProducto.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación del precio es **permanente** y no se puede deshacer.
   - Esta acción afecta la disponibilidad del producto para ventas.
   - Considera cuidadosamente antes de proceder si hay órdenes pendientes.

4. Si estás seguro de eliminar el precio, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/inventario/preciosproductos/PrecioProductoEliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/inventario/preciosproductos/ListaPreciosProductosDespuesEliminar.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Sistema de sugerencias de precios
**Funcionalidad inteligente**: El sistema proporciona sugerencias automáticas de precios.

#### 7.1 Cómo funciona:
- Al seleccionar una cosecha, aparece automáticamente una sugerencia de precio
- La sugerencia se basa en los costos de producción registrados
- Incluye recomendaciones para establecer precios competitivos
- Ayuda a asegurar rentabilidad en las ventas

#### 7.2 Interpretación de sugerencias:
- **Precio mínimo sugerido**: Basado en costos de producción + margen mínimo
- **Precio competitivo**: Considerando precios de mercado
- **Recomendación**: Valor sugerido para maximizar rentabilidad

   <img src="/public/inventario/preciosproductos/DetallesSugerenciaPrecio.png" alt="Detalles de sugerencia de precio" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

---

### 8. Gestión de unidades de medida
**Funcionalidad avanzada**: Control completo de unidades de medida.

#### 8.1 Tipos de unidades comunes:
- **Peso**: kg, g, lb, toneladas
- **Volumen**: L, ml, galones
- **Cantidad**: unidades, docenas, cajas
- **Área**: m², hectáreas (para productos por área)

#### 8.2 Buenas prácticas para unidades:
- **Nombres claros**: Usa abreviaciones estándar (kg, L, etc.)
- **Descripciones precisas**: Explica cuándo usar cada unidad
- **Consistencia**: Mantén la misma unidad para productos similares
- **Conversiones**: Considera las conversiones más comunes

---

### 9. Control de fechas y caducidad
**Gestión de vida útil**: Control de fechas para productos perecederos.

#### 9.1 Fecha de registro:
- **Importancia**: Determina cuándo se estableció el precio
- **Uso**: Para reportes históricos y análisis de tendencias
- **Recomendación**: Usar la fecha real de establecimiento del precio

#### 9.2 Fecha de caducidad:
- **Opcional**: Solo para productos perecederos
- **Alertas**: El sistema puede generar alertas de vencimiento próximo
- **Gestión de stock**: Ayuda a priorizar la venta de productos próximos a vencer

---

### 10. Formato de precios y stock
- **Formato COP**: Los precios se muestran con separadores de miles (ej: 15.000)
- **Entrada flexible**: Puedes ingresar con o sin formato, el sistema lo procesa automáticamente
- **Validación numérica**: Solo acepta valores numéricos válidos
- **Stock formateado**: El stock también se muestra con separadores para facilitar la lectura

---

### 11. Navegación y funcionalidades adicionales
- **Botón "Guardar"**: Registra el nuevo precio de producto.
- **Botón "Listar Precios de Productos"**: Te permite regresar al listado desde el formulario.
- **Modales integrados**: Los modales se abren y cierran sin afectar el formulario principal.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información.
- **Actualización automática**: Después de cualquier operación, la tabla se actualiza automáticamente.
- **Refrescos periódicos**: El listado se actualiza automáticamente cada segundo para mostrar cambios en tiempo real.

---

### 12. Buenas prácticas recomendadas
- **Precios realistas**: Considera costos de producción y márgenes de ganancia adecuados.
- **Unidades apropiadas**: Selecciona unidades de medida que faciliten las transacciones.
- **Fechas precisas**: Registra fechas exactas para trazabilidad y reportes.
- **Stock actualizado**: Mantén el stock actualizado para evitar ventas de productos no disponibles.
- **Fechas de caducidad**: Usa para productos perecederos para gestión adecuada de inventarios.
- **Aprovecha sugerencias**: Considera las sugerencias automáticas para establecer precios competitivos.
- **Registro oportuno**: Registra precios tan pronto como los productos estén listos para venta.

---

### 13. Flujo de trabajo recomendado
1. **Verificar cosecha**: Asegúrate de que la cosecha esté registrada en el sistema.
2. **Crear unidades necesarias**: Si no existe la unidad de medida requerida, créala usando el modal.
3. **Consultar sugerencias**: Revisa las sugerencias de precio basadas en costos.
4. **Establecer precio competitivo**: Define un precio que cubra costos y genere ganancia.
5. **Registrar stock inicial**: Ingresa la cantidad disponible para venta.
6. **Establecer caducidad**: Para productos perecederos, define fecha de vencimiento.
7. **Verificar registro**: Confirma que toda la información sea correcta en el listado.

---

### 14. Interpretación de la información
- **Cosecha**: Vincula el precio con una cosecha específica para trazabilidad.
- **Unidad de Medida**: Define cómo se vende el producto (peso, volumen, cantidad).
- **Precio**: Valor de venta por unidad de medida establecida.
- **Fecha Registro**: Cuándo se estableció este precio (importante para históricos).
- **Stock**: Cantidad disponible para venta.
- **Fecha Caducidad**: Cuándo vence el producto (gestión de perecederos).

---

### 15. Casos de uso comunes
- **Productos recién cosechados**: Establecer precios para nueva producción.
- **Actualización de precios**: Modificar precios por cambios en costos o mercado.
- **Gestión de inventarios**: Control de stock y fechas de vencimiento.
- **Análisis de rentabilidad**: Comparar precios con costos de producción.
- **Planificación de ventas**: Definir estrategias basadas en stock y precios.
- **Control de caducidad**: Gestionar productos perecederos eficientemente.

---

### 16. Solución de problemas comunes
- **Error de cosecha obligatoria**: Asegúrate de seleccionar una cosecha válida, no "Seleccione una cosecha".
- **Unidad de medida faltante**: Usa el botón **"+"** para crear la unidad que necesitas.
- **Formato de precio incorrecto**: Ingresa solo números; el sistema aplicará el formato automáticamente.
- **Cosecha no aparece**: Usa el botón **"+"** para registrar la cosecha faltante.
- **Error de autenticación**: Si recibes error de acceso denegado, contacta al administrador.
- **Modal no se cierra**: Los modales se cierran automáticamente al guardar exitosamente.
- **Selectores vacíos**: Si están vacíos, verifica la conexión y recarga la página.
- **Sugerencias no aparecen**: Las sugerencias solo aparecen al seleccionar una cosecha válida.

---

### 17. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de inventario.
- **Edición**: Requiere permisos de modificación en precios de productos.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.
- **Crear unidades**: Puede requerir permisos específicos para crear unidades de medida.
- **Crear cosechas**: Los permisos para crear cosechas pueden estar separados.

---

### 18. Integración con otros módulos
- **Cosechas**: Vincula directamente con el módulo de gestión de cosechas.
- **Ventas**: Los precios establecidos se usan en el módulo de ventas.
- **Inventarios**: El stock se sincroniza con el inventario general.
- **Reportes**: Información incluida en reportes de precios y rentabilidad.
- **Contabilidad**: Los precios impactan directamente en cálculos de ingresos.
- **Análisis**: Datos utilizados para análisis de rentabilidad y tendencias de mercado.

---

### 19. Alertas y notificaciones
- **Productos próximos a vencer**: Alertas automáticas basadas en fechas de caducidad.
- **Stock bajo**: Notificaciones cuando el stock llega a niveles mínimos.
- **Precios desactualizados**: Alertas para revisar precios establecidos hace mucho tiempo.
- **Sugerencias de precio**: Recomendaciones automáticas basadas en costos.

---

### 20. Análisis y reportes
**Información valiosa disponible**:
- **Histórico de precios**: Evolución de precios por producto y período.
- **Análisis de rentabilidad**: Comparación entre precios y costos de producción.
- **Rotación de inventarios**: Análisis de stock y velocidad de venta.
- **Productos próximos a vencer**: Reportes de caducidad para gestión preventiva.
- **Tendencias de mercado**: Análisis de cambios en precios y demanda.

---

**💡 Consejo**: Utiliza las sugerencias automáticas de precios para establecer valores competitivos que aseguren rentabilidad. La gestión adecuada de fechas de caducidad y stock te permitirá optimizar las ventas y reducir pérdidas por productos vencidos.