---
title: Gestión de Insumos
---

## ¿Cómo listar y gestionar insumos?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar insumos en el sistema de inventario. Sigue los pasos a continuación para gestionar los insumos agrícolas de manera efectiva.

---

### 1. Navegar al módulo de Insumos
1. En el menú principal, busca el módulo **"Inventario"** y selecciona el subítem **"Insumos"**:

   <img src="/public/inventario/insumos/Sidebarinsumo.png" alt="Navegación al módulo de insumos" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de insumos
- Al entrar en **"Insumos"**, encontrarás una tabla con los insumos registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/inventario/insumos/listainsumo.png" alt="Listado de insumos vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada insumo, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Cantidad** (stock disponible)
  - **Unidad de Medida** (kg, L, unidades, etc.)
  - **Tipo de Insumo** (fertilizante, pesticida, etc.)
  - **Activo** (Sí/No)
  - **Tipo de Empacado** (bolsa, botella, etc.)
  - **Fecha de Registro**
  - **Fecha de Caducidad**
  - **Precio del Insumo** (formato COP)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo insumo
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/inventario/insumos/registrarinsumo.png" alt="Botón registrar insumo" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de insumos:

   <img src="/public/inventario/insumos/formulario.png" alt="Formulario de registro de insumo" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Información básica**:
   - **Nombre**: Nombre identificativo del insumo
   - **Descripción**: Descripción detallada del insumo y sus características
   - **Cantidad**: Stock inicial disponible (valor numérico)

   **b) Unidad de Medida**: 
   - Selecciona una unidad de medida existente del menú desplegable
   - Haz clic en el botón **"+"** para crear una nueva unidad de medida si no existe la que necesitas:

   <img src="/public/inventario/insumos/+unidad.png" alt="Selector de unidad de medida con botón plus" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de creación de unidad de medida:

   <img src="/public/inventario/insumos/modalunidad.png" alt="Modal de crear unidad de medida" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **c) Tipo de Insumo**: 
   - Selecciona un tipo de insumo existente del menú desplegable
   - Haz clic en el botón **"+"** para crear un nuevo tipo de insumo si no existe el que necesitas:

   <img src="/public/inventario/insumos/+tipo.png" alt="Selector de tipo de insumo con botón plus" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

   - Al hacer clic en **"+"**, se abrirá el modal de creación de tipo de insumo:

   <img src="/public/inventario/insumos/modaltipo.png" alt="Modal de crear tipo de insumo" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **d) Estado y características**:
   - **Activo**: Switch para indicar si el insumo está disponible (activado por defecto)
   - **Tipo de Empacado**: Campo opcional para especificar el tipo de empaque (bolsa, botella, caja, etc.)

   **e) Fechas**:
   - **Fecha de Registro**: Fecha y hora de registro (por defecto la fecha actual)
   - **Fecha de Caducidad**: Campo opcional para insumos perecederos

   **f) Precio**:
   - **Precio del Insumo (COP)**: Valor unitario con formato automático en pesos colombianos

4. **Formulario completado**:

   <img src="/public/inventario/insumos/registrarcompleto.png" alt="Formulario de insumo diligenciado" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Los campos **Nombre**, **Descripción** y **Cantidad** son obligatorios.
   - **Unidad de medida** y **Tipo de insumo** son opcionales pero recomendables para mejor organización.
   - El **precio** se formatea automáticamente con separadores de miles.
   - La **fecha de caducidad** es importante para insumos perecederos.
   - El **tipo de empacado** ayuda en la gestión logística.
   - Puedes crear nuevas unidades de medida y tipos de insumo directamente desde este formulario usando los botones **"+"**.

6. Una vez completados los campos, haz clic en **"Guardar"** para registrar el insumo.

7. Verás un mensaje de éxito como este:

   <img src="/public/inventario/insumos/mensaje-exito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. Para verificar el registro, haz clic en **"Listar Insumos"** para regresar al listado:

   <img src="/public/inventario/insumos/listarinsumoboton.png" alt="Botón listar insumos" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

9. Confirma que el insumo se registró correctamente en la tabla:

   <img src="/public/inventario/insumos/ListaInsumoConRegistros.png" alt="Listado con insumo registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Crear unidades de medida y tipos de insumo desde los modales
**Funcionalidad especial**: Este módulo permite crear tanto unidades de medida como tipos de insumo sin salir del formulario principal.

#### 4.1 Crear nueva unidad de medida
1. En el selector de unidad de medida, haz clic en el botón **"+"**:
2. Completa el formulario de unidad de medida en el modal:
   - **Nombre**: Abreviación o nombre corto (ej: kg, L, unidades, sacos)
   - **Descripción**: Descripción detallada de la unidad (ej: "Kilogramos para fertilizantes sólidos")

   <img src="/public/inventario/insumos/ModalUnidadMedidaCompleto.png" alt="Modal de unidad de medida completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Confirmar"** y la nueva unidad aparecerá automáticamente en el selector principal.

#### 4.2 Crear nuevo tipo de insumo
1. En el selector de tipo de insumo, haz clic en el botón **"+"**:
2. Completa el formulario de tipo de insumo en el modal:
   - **Nombre**: Nombre del tipo (ej: Fertilizante, Pesticida, Herbicida, Fungicida)
   - **Descripción**: Descripción del tipo y su uso (ej: "Fertilizantes para nutrición de plantas")

   <img src="/public/inventario/insumos/ModalTipoInsumoCompleto.png" alt="Modal de tipo de insumo completado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Haz clic en **"Confirmar"** y el nuevo tipo aparecerá automáticamente en el selector principal.

---

### 5. Actualizar un insumo existente
1. En el listado de insumos, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/inventario/insumos/InsumoAccionEditar.png" alt="Botón de editar insumo" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales:

   <img src="/public/inventario/insumos/ModalEditarInsumo.png" alt="Modal de edición de insumo" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Nombre**: Modifica el nombre del insumo
   - **Descripción**: Actualiza la descripción y características
   - **Cantidad**: Cambia el stock disponible
   - **Unidad de Medida**: Modifica la unidad o crea una nueva con el botón "Nueva Unidad"
   - **Tipo de Insumo**: Cambia el tipo o crea uno nuevo con el botón "Nuevo Tipo"
   - **Activo**: Marca o desmarca para activar/desactivar el insumo
   - **Tipo de Empacado**: Actualiza el tipo de empaque
   - **Fecha de Registro**: Modifica la fecha y hora de registro
   - **Fecha de Caducidad**: Establece o actualiza la fecha de vencimiento
   - **Precio del Insumo**: Actualiza el precio con formato automático

4. **Funcionalidades especiales del modal de edición**:
   - **Botón "Nueva Unidad"**: Permite crear unidades de medida directamente desde el modal de edición
   - **Botón "Nuevo Tipo"**: Permite crear tipos de insumo directamente desde el modal de edición
   - **Formato automático**: Los campos de precio se formatean automáticamente
   - **Selectores dinámicos**: Los menús desplegables se actualizan al crear nuevos elementos

   <img src="/public/inventario/insumos/EditarInsumoModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Si necesitas crear una nueva unidad de medida durante la edición, haz clic en **"Nueva Unidad"**:

   <img src="/public/inventario/insumos/ModalNuevaUnidadEnEdicion.png" alt="Modal nueva unidad en edición" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. Si necesitas crear un nuevo tipo de insumo durante la edición, haz clic en **"Nuevo Tipo"**:

   <img src="/public/inventario/insumos/ModalNuevoTipoEnEdicion.png" alt="Modal nuevo tipo en edición" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Haz clic en **"Confirmar"** para guardar los cambios.

8. Verás un mensaje de actualización exitosa:

   <img src="/public/inventario/insumos/InsumoActualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

9. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/inventario/insumos/ListaInsumoActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Eliminar un insumo
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/inventario/insumos/InsumoAccionEliminar.png" alt="Botón de eliminar insumo" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/inventario/insumos/ModalEliminarInsumo.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación del insumo es **permanente** y no se puede deshacer.
   - Esta acción afecta la disponibilidad del insumo para actividades agrícolas.
   - Considera cuidadosamente antes de proceder si el insumo está siendo usado en actividades.

4. Si estás seguro de eliminar el insumo, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/inventario/insumos/InsumoEliminadoExiton.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/inventario/insumos/InsumoEliminadoExito.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Gestión de tipos de insumo
**Categorización inteligente**: Control completo de categorías de insumos.

#### 7.1 Tipos comunes de insumos agrícolas:
- **Fertilizantes**: Nutricionales para plantas (NPK, orgánicos, etc.)
- **Pesticidas**: Control de plagas (insecticidas, acaricidas, etc.)
- **Herbicidas**: Control de malezas
- **Fungicidas**: Control de enfermedades fúngicas
- **Estimulantes**: Promotores de crecimiento
- **Adherentes**: Mejoradores de aplicación
- **Reguladores**: Hormonas y reguladores de crecimiento

#### 7.2 Beneficios de la categorización:
- **Organización mejorada**: Facilita la búsqueda y gestión
- **Control específico**: Aplicación de regulaciones por tipo
- **Análisis de costos**: Reportes por categoría de insumo
- **Planificación**: Estrategias diferenciadas por tipo

---

### 8. Sistema de unidades de medida
**Medición precisa**: Control completo de unidades de medida.

#### 8.1 Unidades comunes para insumos:
- **Peso**: kg, g, lb, toneladas (fertilizantes sólidos)
- **Volumen**: L, ml, galones (líquidos)
- **Cantidad**: unidades, docenas (envases individuales)
- **Empaque**: sacos, bolsas, bidones, cajas

#### 8.2 Buenas prácticas para unidades:
- **Consistencia**: Usar la misma unidad para insumos similares
- **Precisión**: Elegir unidades apropiadas para la cantidad típica
- **Conversiones**: Considerar conversiones estándar del mercado
- **Etiquetado**: Usar nombres claros y reconocibles

---

### 9. Control de fechas y caducidad de insumos
**Gestión de vida útil**: Control especializado para insumos agrícolas.

#### 9.1 Fecha de registro:
- **Formato completo**: Fecha y hora exactas (datetime-local)
- **Importancia**: Trazabilidad de entrada al inventario
- **Uso**: Para reportes de rotación y análisis de compras

#### 9.2 Fecha de caducidad:
- **Crítica para seguridad**: Especialmente importante en pesticidas
- **Eficacia**: Los insumos vencidos pueden perder efectividad
- **Regulación**: Cumplimiento de normativas sanitarias
- **Planificación**: Uso prioritario de insumos próximos a vencer

---

### 10. Gestión de empacado y presentación
**Logística eficiente**: Control de tipos de empaque.

#### 10.1 Tipos de empacado comunes:
- **Bolsas**: Fertilizantes granulados, semillas
- **Bidones**: Líquidos concentrados
- **Botellas**: Presentaciones pequeñas
- **Sacos**: Grandes volúmenes de sólidos
- **Cajas**: Productos fraccionados
- **Tambores**: Volúmenes industriales

#### 10.2 Beneficios del control de empacado:
- **Almacenamiento**: Optimización del espacio
- **Manipulación**: Instrucciones específicas de manejo
- **Dosificación**: Facilita el cálculo de aplicaciones
- **Inventario**: Control más preciso de existencias

---

### 11. Formato de precios y control económico
- **Formato COP**: Los precios se muestran con separadores de miles (ej: 25.000)
- **Entrada flexible**: Puedes ingresar con o sin formato, el sistema lo procesa automáticamente
- **Validación numérica**: Solo acepta valores numéricos válidos
- **Análisis de costos**: Base para cálculos de costos de producción

---

### 12. Estado activo e inventario
- **Switch moderno**: Componente Switch para control de estado activo
- **Inventario dinámico**: Solo insumos activos aparecen en selecciones de actividades
- **Histórico preservado**: Insumos inactivos mantienen el histórico
- **Reactivación**: Posibilidad de reactivar insumos cuando sea necesario

---

### 13. Navegación y funcionalidades adicionales
- **Botón "Guardar"**: Registra el nuevo insumo.
- **Botón "Listar Insumos"**: Te permite regresar al listado desde el formulario.
- **Modales múltiples**: Gestión simultánea de unidades de medida y tipos de insumo.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información.
- **Actualización automática**: Después de cualquier operación, la tabla se actualiza automáticamente.
- **Cache inteligente**: Los selectores mantienen los datos actualizados usando React Query.

---

### 14. Buenas prácticas recomendadas
- **Nombres descriptivos**: Incluye marca, concentración y características principales.
- **Descripciones completas**: Especifica principio activo, concentración, modo de acción.
- **Cantidades realistas**: Registra stock real disponible para uso.
- **Unidades apropiadas**: Selecciona unidades que faciliten los cálculos de aplicación.
- **Tipos coherentes**: Usa categorías consistentes para facilitar la organización.
- **Fechas precisas**: Especialmente importante la fecha de caducidad para seguridad.
- **Precios actualizados**: Mantén precios actuales para análisis de costos precisos.
- **Empacado detallado**: Especifica el tipo de empaque para logística eficiente.

---

### 15. Flujo de trabajo recomendado
1. **Verificar categorías**: Antes de registrar, verifica que existan las unidades de medida y tipos de insumo necesarios.
2. **Crear dependencias**: Usa los botones **"+"** para crear las categorías faltantes.
3. **Información completa**: Registra toda la información disponible, especialmente fechas de caducidad.
4. **Verificar registro**: Confirma que toda la información sea correcta en el listado.
5. **Mantener actualizado**: Actualiza cantidades según entradas y salidas de inventario.
6. **Control de caducidad**: Revisa periódicamente fechas de vencimiento.

---

### 16. Interpretación de la información
- **Nombre**: Identificación clara del insumo incluyendo marca si es relevante.
- **Descripción**: Características técnicas, principio activo, concentración.
- **Cantidad**: Stock actual disponible para uso en actividades.
- **Unidad de Medida**: Cómo se mide y dosifica el insumo.
- **Tipo de Insumo**: Categoría para organización y control.
- **Activo**: Disponibilidad actual para selección en actividades.
- **Tipo de Empacado**: Presentación física del insumo.
- **Fecha de Registro**: Cuándo ingresó al inventario.
- **Fecha de Caducidad**: Cuándo vence la efectividad del insumo.
- **Precio**: Costo unitario para análisis económicos.

---

### 17. Casos de uso comunes
- **Entrada de inventario**: Registrar nuevos insumos adquiridos.
- **Control de stock**: Monitorear cantidades disponibles.
- **Planificación de actividades**: Verificar disponibilidad antes de programar aplicaciones.
- **Control de caducidad**: Gestionar insumos próximos a vencer.
- **Análisis de costos**: Calcular costos de insumos por actividad.
- **Cumplimiento normativo**: Mantener registros para auditorías.
- **Organización por categorías**: Gestionar diferentes tipos de insumos eficientemente.

---

### 18. Integración con actividades agrícolas
**Funcionalidad especial**: Los insumos se integran directamente con el módulo de actividades.

#### 18.1 Uso en actividades:
- **Selección automática**: Solo insumos activos aparecen en actividades
- **Control de consumo**: Reducción automática de stock al usar en actividades
- **Trazabilidad**: Registro de qué insumos se usaron en cada actividad
- **Dosificación**: Control de cantidades aplicadas

#### 18.2 Beneficios de la integración:
- **Inventario automático**: Stock actualizado en tiempo real
- **Costos precisos**: Cálculo automático de costos por actividad
- **Cumplimiento**: Registro detallado para certificaciones
- **Planificación**: Disponibilidad visible al programar actividades

---

### 19. Solución de problemas comunes
- **Campos obligatorios**: Asegúrate de completar nombre, descripción y cantidad.
- **Unidad/Tipo faltante**: Usa los botones **"+"** para crear los elementos que necesitas.
- **Formato de precio incorrecto**: Ingresa solo números; el sistema aplicará el formato automáticamente.
- **Switch no responde**: Verifica que el componente Switch esté habilitado.
- **Error de autenticación**: Si recibes error de acceso denegado, contacta al administrador.
- **Modales no se cierran**: Los modales se cierran automáticamente al guardar exitosamente.
- **Selectores vacíos**: Si están vacíos, verifica la conexión y recarga la página.
- **Fechas incorrectas**: Usa los selectores de fecha para evitar errores de formato.

---

### 20. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de inventario.
- **Edición**: Requiere permisos de modificación en insumos.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.
- **Crear categorías**: Puede requerir permisos específicos para crear unidades de medida y tipos.
- **Usar en actividades**: Puede requerir permisos del módulo de actividades.

---

### 21. Integración con otros módulos
- **Actividades**: Los insumos se usan directamente en actividades agrícolas.
- **Bodegas**: Control de ubicación física de insumos.
- **Costos**: Cálculo de costos de producción por insumo.
- **Reportes**: Información incluida en reportes de inventario y consumo.
- **Compras**: Integración con órdenes de compra y proveedores.
- **Cumplimiento**: Registros para auditorías y certificaciones agrícolas.

---

### 22. Alertas y control de caducidad
**Sistema inteligente de alertas**:
- **Insumos próximos a vencer**: Alertas automáticas basadas en fechas de caducidad
- **Stock bajo**: Notificaciones cuando las cantidades llegan a niveles mínimos
- **Insumos inactivos**: Recordatorios de insumos no utilizados
- **Precios desactualizados**: Alertas para revisar precios antiguos

---

### 23. Análisis y reportes especializados
**Información valiosa para gestión agrícola**:
- **Consumo por tipo**: Análisis de uso por categoría de insumo
- **Rotación de inventarios**: Velocidad de uso de diferentes insumos
- **Análisis de caducidad**: Pérdidas por vencimiento
- **Costos por hectárea**: Cálculo de costos de insumos por área
- **Eficiencia de aplicación**: Análisis de rendimiento por insumo
- **Cumplimiento normativo**: Reportes para certificaciones

---

### 24. Seguridad y cumplimiento normativo
- **Registro detallado**: Cumplimiento de normativas de trazabilidad
- **Fechas de caducidad**: Control obligatorio para insumos regulados
- **Tipos específicos**: Categorización según regulaciones locales
- **Histórico preservado**: Mantenimiento de registros para auditorías
- **Control de acceso**: Permisos específicos para gestión de insumos

---

**💡 Consejo**: Mantén siempre actualizada la información de caducidad de los insumos y utiliza la categorización por tipos para una gestión más eficiente. La integración con actividades te permitirá tener un control automático del consumo y costos reales de producción.