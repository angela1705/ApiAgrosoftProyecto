---
title: Gestión de Afecciones
---

## ¿Cómo listar y gestionar afecciones?

Esta documentación detalla el proceso para listar, registrar, actualizar y gestionar afecciones en el sistema de trazabilidad. Las afecciones representan problemas fitosanitarios específicos que afectan cultivos en bancales determinados, permitiendo un seguimiento detallado desde la detección hasta la resolución.

---

### 1. Navegar al módulo de Afecciones
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Afecciones"**:

   <img src="/public/trazabilidad/afecciones/SidebarAfecciones.png" alt="Navegación al módulo de afecciones" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 2. Visualizar el listado de afecciones
- Al entrar en **"Afecciones"**, encontrarás una tabla con las afecciones registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/afecciones/ListaAfeccionesVacia.png" alt="Listado de afecciones vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada afección, incluyendo:
  - **Nombre** (identificación descriptiva de la afección)
  - **Plaga** (plaga causante de la afección)
  - **Bancal** (ubicación donde se presenta la afección)
  - **Estado** (etapa actual de manejo: Activa, Estable, En Control, Eliminada)
  - **Gravedad** (nivel de severidad: Leve, Moderada, Grave)
  - **Acciones** (Ver detalles, Editar, Eliminar, Cambiar estado)

---

### 3. Registrar una nueva afección
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar Afección"**:

   <img src="/public/trazabilidad/afecciones/RegistrarAfeccionBtn.png" alt="Botón registrar afección" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de afecciones:

   <img src="/public/trazabilidad/afecciones/FormularioRegistroAfeccion.png" alt="Formulario de registro de afección" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Información básica**:
   - **Nombre**: Obligatorio. Identificación descriptiva de la afección (ej: "Ataque de áfidos en tomate sector norte")
   - **Descripción**: Obligatorio. Descripción detallada de la afección observada, síntomas y características

   **b) Fecha y gravedad**:
   - **Fecha de Detección**: Obligatorio. Fecha cuando se detectó la afección (por defecto fecha actual)
   - **Gravedad**: Obligatorio. Nivel de severidad de la afección

   <img src="/public/trazabilidad/afecciones/SelectorGravedad.png" alt="Selector de gravedad" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

   Las opciones de gravedad son:
   - **Leve (L)**: Afección menor que no compromete significativamente el cultivo
   - **Moderada (M)**: Afección que requiere atención y puede afectar la producción
   - **Grave (G)**: Afección severa que compromete seriamente el cultivo

   **c) Relaciones obligatorias**:
   
   **Plaga**: Obligatorio. Selecciona la plaga causante de la afección
   <img src="/public/trazabilidad/afecciones/SelectorPlagaConPlus.png" alt="Selector de plaga con botón plus" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **Cultivo**: Obligatorio. Selecciona el cultivo afectado
   <img src="/public/trazabilidad/afecciones/SelectorCultivoConPlus.png" alt="Selector de cultivo con botón plus" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **Bancal**: Obligatorio. Selecciona el bancal donde se presenta la afección
   <img src="/public/trazabilidad/afecciones/SelectorBancalConPlus.png" alt="Selector de bancal con botón plus" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

4. **Formulario completado**:

   <img src="/public/trazabilidad/afecciones/FormularioAfeccionLleno.png" alt="Formulario de afección diligenciado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Todos los campos son obligatorios excepto el reporte adicional.
   - Debes tener registrados previamente: **plagas**, **cultivos** y **bancales**.
   - La **fecha de detección** no puede ser futura.
   - El **estado inicial** de toda afección nueva es **"Activa"** automáticamente.
   - Puedes crear elementos faltantes directamente desde el formulario usando los botones **"+"**.

6. Una vez completados todos los campos obligatorios, haz clic en **"Guardar"** para registrar la afección.

7. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/afecciones/AfeccionRegistradaExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. Para verificar el registro, haz clic en **"Listar Afecciones"** para regresar al listado:

   <img src="/public/trazabilidad/afecciones/BotonListarAfecciones.png" alt="Botón listar afecciones" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

9. Confirma que la afección se registró correctamente en la tabla:

   <img src="/public/trazabilidad/afecciones/ListaAfeccionesConRegistros.png" alt="Listado con afección registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Creación de elementos relacionados desde el formulario
**Funcionalidad especial**: Los botones **"+"** permiten crear plagas, cultivos y bancales sin salir del formulario principal.

#### 4.1 Crear nueva plaga
1. En el selector de **"Plaga"**, haz clic en el botón **"+"**:

   <img src="/public/trazabilidad/afecciones/BotonPlusPlaga.png" alt="Botón plus para crear plaga" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

2. Se abrirá el modal de creación de plaga:

   <img src="/public/trazabilidad/afecciones/ModalCrearPlaga.png" alt="Modal de crear plaga" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Completa los datos de la nueva plaga y haz clic en **"Guardar"**.
4. La nueva plaga aparecerá automáticamente en el selector principal.

#### 4.2 Crear nuevo cultivo
1. En el selector de **"Cultivo"**, haz clic en el botón **"+"**:
2. Se abrirá el modal de creación de cultivo:

   <img src="/public/trazabilidad/afecciones/ModalCrearCultivo.png" alt="Modal de crear cultivo" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Completa los datos del nuevo cultivo y guarda.
4. El nuevo cultivo estará disponible inmediatamente en el selector.

#### 4.3 Crear nuevo bancal
1. En el selector de **"Bancal"**, haz clic en el botón **"+"**:
2. Se abrirá el modal de creación de bancal:

   <img src="/public/trazabilidad/afecciones/ModalCrearBancal.png" alt="Modal de crear bancal" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. Completa los datos del nuevo bancal y guarda.
4. El nuevo bancal aparecerá en el selector para su selección.

---

### 5. Sistema de estados de afecciones
**Flujo de trabajo especializado**: Las afecciones siguen un ciclo de vida específico desde detección hasta resolución.

#### 5.1 Estados disponibles:
- **Activa (AC)**: Estado inicial, afección detectada y requiere atención (icono: punto naranja)
- **En Control (EC)**: Afección bajo tratamiento o manejo específico (icono: alerta azul)
- **Estable (ST)**: Afección controlada, sin crecimiento ni empeoramiento (icono: check verde)
- **Eliminada (EL)**: Afección completamente resuelta (icono: X roja)

#### 5.2 Indicadores visuales por estado:

   <img src="/public/trazabilidad/afecciones/EstadosVisuales.png" alt="Indicadores visuales de estados" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

#### 5.3 Flujo recomendado de estados:
```
Activa (AC) → En Control (EC) → Estable (ST) → Eliminada (EL)
```

Aunque también es posible:
- Activa → Estable (para afecciones que se auto-regulan)
- Activa → Eliminada (para casos de eliminación directa)
- En Control → Activa (si reaparece el problema)

---

### 6. Cambiar estado de afecciones
**Operación crítica**: Permite actualizar el estado de manejo de las afecciones.

#### 6.1 Cambiar estado desde la tabla
1. En la columna **"Acciones"**, haz clic en el icono correspondiente al estado deseado:

   <img src="/public/trazabilidad/afecciones/AccionesCambioEstado.png" alt="Acciones de cambio de estado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

   - **Icono de alerta azul**: Cambiar a "En Control" (solo disponible si está "Activa")
   - Otros cambios requieren el modal de gestión de estados

#### 6.2 Modal de cambio de estado
1. Se abrirá un modal específico para cambio de estado:

   <img src="/public/trazabilidad/afecciones/ModalCambioEstado.png" alt="Modal de cambio de estado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

2. **Opciones disponibles**:
   - **Estable**: Afección controlada sin progresión
   - **En Control**: Bajo tratamiento activo
   - **Eliminada**: Completamente resuelta

3. Selecciona el nuevo estado haciendo clic en el botón correspondiente:

   <img src="/public/trazabilidad/afecciones/SeleccionNuevoEstado.png" alt="Selección de nuevo estado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. Haz clic en **"Confirmar"** para aplicar el cambio.

5. Verás una confirmación del cambio de estado:

   <img src="/public/trazabilidad/afecciones/EstadoCambiadoExito.png" alt="Confirmación de cambio de estado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

6. La tabla se actualizará automáticamente mostrando el nuevo estado:

   <img src="/public/trazabilidad/afecciones/TablaEstadoActualizado.png" alt="Tabla con estado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Ver detalles de afecciones
**Vista completa**: Modal especializado para visualizar información completa de la afección.

#### 7.1 Acceder a los detalles
1. En la columna **"Acciones"**, haz clic en el icono de **"Ver detalles"** (ojo):

   <img src="/public/trazabilidad/afecciones/BotonVerDetalles.png" alt="Botón ver detalles" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

2. Se abrirá el modal de detalle completo:

   <img src="/public/trazabilidad/afecciones/ModalDetalleAfeccion.png" alt="Modal de detalle de afección" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

#### 7.2 Información mostrada en detalle:
- **Datos básicos**: Nombre, descripción, fecha de detección
- **Clasificación**: Plaga causante, cultivo afectado, bancal ubicación
- **Estado actual**: Con indicador visual y descripción
- **Gravedad**: Con código de colores correspondiente
- **Historial**: Cambios de estado (si está implementado)
- **Reportes**: Documentos adjuntos adicionales

---

### 8. Actualizar una afección existente
1. En el listado de afecciones, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/afecciones/AfeccionAccionEditar.png" alt="Botón de editar afección" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales:

   <img src="/public/trazabilidad/afecciones/ModalEditarAfeccion.png" alt="Modal de edición de afección" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables en el modal**:
   - **Nombre**: Modifica la identificación de la afección
   - **Descripción**: Actualiza los detalles y observaciones

   **⚠️ Limitaciones en edición**:
   - **Fecha de detección**: No se puede modificar desde el modal
   - **Gravedad**: No se puede cambiar desde el modal de edición
   - **Plaga, Cultivo, Bancal**: No se pueden modificar desde el modal
   - **Estado**: Se cambia mediante la función específica de cambio de estado

4. Realiza los cambios necesarios en los campos disponibles:

   <img src="/public/trazabilidad/afecciones/EditarAfeccionModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/afecciones/AfeccionActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 9. Eliminar una afección
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/trazabilidad/afecciones/AfeccionAccionEliminar.png" alt="Botón de eliminar afección" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/afecciones/ModalEliminarAfeccion.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación de la afección es **permanente** y no se puede deshacer.
   - Se perderá todo el historial de estados y tratamientos asociados.
   - Esta acción afectará los reportes de incidencia históricos.
   - Considera cambiar el estado a **"Eliminada"** en lugar de eliminar el registro.

4. Si estás seguro de eliminar la afección, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/trazabilidad/afecciones/AfeccionEliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/trazabilidad/afecciones/ListaAfeccionesVacia.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 10. Indicadores visuales y códigos de colores
**Sistema visual intuitivo**: Identificación rápida del estado y gravedad de afecciones.

#### 10.1 Colores de gravedad:
- **Leve (L)**: Fondo verde claro, texto verde oscuro
- **Moderada (M)**: Fondo amarillo claro, texto amarillo oscuro  
- **Grave (G)**: Fondo rojo claro, texto rojo oscuro

   <img src="/public/trazabilidad/afecciones/ColoresGravedad.png" alt="Códigos de color para gravedad" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

#### 10.2 Iconos de estado:
- **Activa (AC)**: `CircleDot` - Punto naranja
- **Estable (ST)**: `CircleCheck` - Check verde
- **En Control (EC)**: `CircleAlert` - Alerta azul
- **Eliminada (EL)**: `CircleX` - X roja

#### 10.3 Iconos de acciones:
- **Ver detalles**: `Eye` - Ojo azul
- **Editar**: `EditIcon` - Lápiz verde
- **Eliminar**: `Trash2` - Basura roja
- **Cambiar a En Control**: `CircleAlert` - Alerta púrpura (solo si está Activa)

---

### 11. Navegación y funcionalidades técnicas
- **Botón "Guardar"**: Registra la nueva afección en el formulario.
- **Botón "Listar Afecciones"**: Navegación desde formulario a listado.
- **Modales integrados**: Creación de elementos relacionados sin perder contexto.
- **Actualización automática**: React Query sincroniza datos tras operaciones.
- **Cache inteligente**: Optimización de rendimiento con invalidación selectiva.
- **Estados de carga**: Indicadores visuales durante operaciones asíncronas.

---

### 12. Tipos de afecciones comunes por cultivo
**Guía de referencia**: Ejemplos de afecciones típicas organizados por cultivo.

#### 12.1 Hortalizas:
**Tomate**:
- Ataque de mosca blanca en invernadero
- Infestación de trips en hojas jóvenes
- Daño por minador de la hoja en sector norte
- Presencia de ácaros en plantas maduras

**Lechuga**:
- Colonización de áfidos en cabezas
- Ataque de gusano soldado en plántulas
- Presencia de trips en hojas externas

**Pepino**:
- Infestación de mosca blanca en tutorado
- Daño por ácaro del bronceado
- Ataque de trips occidental en flores

#### 12.2 Frutales:
**Cítricos**:
- Infestación de cochinilla harinosa en ramas
- Ataque de minador en brotes nuevos
- Presencia de mosca de la fruta en frutos maduros

**Manzano**:
- Daño por carpocapsa en frutos
- Infestación de pulgón lanígero en tronco
- Presencia de ácaro rojo en hojas

#### 12.3 Cereales:
**Maíz**:
- Ataque de gusano cogollero en plantas jóvenes
- Daño por barrenador del tallo
- Infestación de diabrótica en raíces

**Arroz**:
- Presencia de sogata en macollamiento
- Ataque de chinche en panoja
- Daño por gusano medidor en hojas

---

### 13. Gestión de dependencias múltiples
**Arquitectura relacional**: Manejo de tres entidades relacionadas simultáneamente.

#### 13.1 Dependencias obligatorias:
- **Plaga**: Debe existir al menos una plaga registrada
- **Cultivo**: Debe haber cultivos activos en el sistema
- **Bancal**: Debe existir al menos un bancal operativo

#### 13.2 Validaciones del sistema:
- **Consistencia referencial**: No se puede eliminar plaga/cultivo/bancal si tiene afecciones asociadas
- **Estados activos**: Solo aparecen elementos activos en los selectores
- **Fecha válida**: La fecha de detección no puede ser futura
- **Relación lógica**: El sistema puede validar que la plaga sea compatible con el cultivo

#### 13.3 Flujo recomendado de registro:
1. **Verificar elementos base**: Confirmar que existen plagas, cultivos y bancales
2. **Crear elementos faltantes**: Usar botones "+" si faltan elementos
3. **Registrar afección**: Completar formulario con todas las relaciones
4. **Verificar coherencia**: Confirmar que las relaciones sean lógicas
5. **Seguimiento continuo**: Actualizar estados según evolución del problema

---

### 14. Búsqueda y filtrado avanzado (cuando esté implementado)
**Funcionalidades futuras**: Capacidades de búsqueda especializada.

#### 14.1 Filtros disponibles:
- **Por estado**: Mostrar solo afecciones en estado específico
- **Por gravedad**: Filtrar por nivel de severidad
- **Por plaga**: Ver afecciones de una plaga particular
- **Por cultivo**: Afecciones en cultivos específicos
- **Por bancal**: Problemas en ubicaciones determinadas
- **Por fecha**: Rango de fechas de detección

#### 14.2 Búsqueda inteligente:
- **Búsqueda global**: En nombre y descripción de afecciones
- **Autocompletado**: Sugerencias basadas en registros existentes
- **Búsqueda relacionada**: Por nombres de plaga, cultivo o bancal
- **Histórico**: Búsqueda en afecciones archivadas

---

### 15. Reportes y análisis de afecciones
**Inteligencia de negocio**: Análisis de patrones y tendencias.

#### 15.1 Reportes básicos:
- **Afecciones activas**: Lista de problemas que requieren atención
- **Por gravedad**: Distribución de severidad de problemas
- **Por ubicación**: Incidencia por bancal o zona
- **Tendencias temporales**: Evolución de afecciones en el tiempo

#### 15.2 Análisis avanzados:
- **Eficacia de tratamientos**: Tiempo de resolución por tipo de intervención
- **Puntos críticos**: Bancales o cultivos con mayor incidencia
- **Estacionalidad**: Patrones de aparición según época del año
- **Costos de control**: Impacto económico de las afecciones

#### 15.3 Dashboards especializados:
- **Mapa de calor**: Distribución espacial de afecciones
- **Línea de tiempo**: Evolución de estados por afección
- **Alertas tempranas**: Predicción de nuevas afecciones
- **KPIs de sanidad**: Indicadores clave de salud de cultivos

---

### 16. Integración con tratamientos fitosanitarios
**Trazabilidad completa**: Vinculación con aplicaciones de control.

#### 16.1 Conexión con aplicaciones:
- **Productos aplicados**: Registro de tratamientos por afección específica
- **Dosis utilizadas**: Control de cantidades aplicadas
- **Frecuencia**: Programación de aplicaciones repetidas
- **Eficacia**: Evaluación de resultados de tratamientos

#### 16.2 Seguimiento de tratamientos:
- **Antes del tratamiento**: Registro de la afección activa
- **Durante el tratamiento**: Estado "En Control"
- **Después del tratamiento**: Evaluación y cambio a "Estable" o "Eliminada"
- **Monitoreo continuo**: Verificación de no recurrencia

#### 16.3 Documentación de intervenciones:
- **Productos utilizados**: Qué insumos se aplicaron
- **Método de aplicación**: Cómo se realizó el tratamiento
- **Personal responsable**: Quién ejecutó la intervención
- **Condiciones ambientales**: Clima y factores externos
- **Resultados obtenidos**: Efectividad del tratamiento

---

### 17. Sistema de alertas y notificaciones
**Gestión proactiva**: Avisos automáticos para gestión oportuna.

#### 17.1 Alertas automáticas:
- **Afecciones graves**: Notificación inmediata de problemas severos
- **Tiempo de resolución**: Alertas si las afecciones no mejoran
- **Recurrencia**: Avisos si aparecen afecciones similares
- **Concentración**: Alertas por múltiples afecciones en una zona

#### 17.2 Notificaciones de sistema:
- **Estados cambiados**: Confirmación de cambios de estado
- **Nuevas afecciones**: Avisos de registros recientes
- **Elementos relacionados**: Notificaciones de cambios en plagas, cultivos o bancales
- **Reportes listos**: Avisos cuando se generan reportes automáticos

#### 17.3 Escalamiento de alertas:
- **Operarios de campo**: Alertas de afecciones nuevas en su zona
- **Supervisores**: Resumen de afecciones graves
- **Gerencia**: Alertas de problemas que afectan objetivos de producción
- **Técnicos especializados**: Afecciones que requieren intervención especializada

---

### 18. Flujo de trabajo recomendado
1. **Detección en campo**: Personal identifica problema fitosanitario
2. **Registro inmediato**: Crear afección con estado "Activa"
3. **Evaluación técnica**: Confirmar plaga, gravedad y ubicación
4. **Planificación de intervención**: Determinar tratamiento apropiado
5. **Cambio a "En Control"**: Al iniciar tratamientos
6. **Monitoreo continuo**: Seguimiento de evolución
7. **Cambio a "Estable"**: Cuando se controla la afección
8. **Cambio a "Eliminada"**: Al resolver completamente el problema
9. **Análisis post-resolución**: Evaluar eficacia de intervenciones
10. **Medidas preventivas**: Implementar acciones para evitar recurrencia

---

### 19. Interpretación de datos en la tabla
- **Nombre**: Identificación específica y descriptiva de la afección observada.
- **Plaga**: Organismo causante del problema (vinculado al registro de plagas).
- **Bancal**: Ubicación específica donde se presenta la afección.
- **Estado**: Etapa actual de manejo con indicador visual correspondiente.
- **Gravedad**: Nivel de severidad con código de colores para identificación rápida.
- **Acciones**: Operaciones disponibles según estado actual y permisos del usuario.

---

### 20. Casos de uso específicos
- **Monitoreo preventivo**: Registro de primeros síntomas para intervención temprana
- **Gestión de brotes**: Control de afecciones que se extienden rápidamente
- **Seguimiento de tratamientos**: Evaluación de eficacia de intervenciones
- **Análisis de recurrencia**: Identificación de problemas que reaparecen
- **Planificación de rotaciones**: Decisiones basadas en historial de afecciones
- **Certificaciones fitosanitarias**: Documentación para auditorías y certificaciones
- **Capacitación técnica**: Casos de estudio para entrenar personal
- **Análisis de costos**: Evaluación del impacto económico de problemas sanitarios

---

### 21. Solución de problemas comunes
- **Selectores vacíos**: Verifica que existan plagas, cultivos y bancales registrados
- **Error al crear elementos relacionados**: Confirma permisos para crear plaga/cultivo/bancal
- **Modal no se cierra**: Los modales se cierran automáticamente tras operaciones exitosas
- **Estado no cambia**: Verifica que la transición de estado sea válida
- **Fecha incorrecta**: La fecha de detección no puede ser futura
- **Error 403**: Contacta al administrador para verificar permisos de usuario
- **Datos no se actualizan**: React Query actualiza automáticamente, verifica conexión
- **Botones deshabilitados**: Confirma que no haya operaciones en progreso

---

### 22. Permisos y restricciones de acceso
- **Registro**: Requiere permisos de escritura en el módulo de cultivo/trazabilidad
- **Edición**: Requiere permisos de modificación en afecciones
- **Cambio de estado**: Puede requerir permisos específicos según el flujo organizacional
- **Eliminación**: Requiere permisos de administración; úsalo con extrema precaución
- **Consulta**: Todos los usuarios con acceso al módulo pueden visualizar listados
- **Crear elementos relacionados**: Requiere permisos en módulos de plaga, cultivo y bancal
- **Reportes**: Puede requerir permisos específicos para acceso a análisis detallados

---

### 23. Integración con otros módulos del sistema
- **Plagas**: Dependencia obligatoria para identificar causa de afección
- **Cultivos**: Vinculación con cultivos específicos afectados
- **Bancales**: Relación con ubicaciones físicas específicas
- **Tratamientos Fitosanitarios**: Aplicaciones de control dirigidas a afecciones
- **Monitoreos de Campo**: Observaciones rutinarias que detectan afecciones
- **Actividades Agrícolas**: Registro de intervenciones realizadas
- **Reportes de Sanidad**: Inclusión en reportes de salud de cultivos
- **Trazabilidad**: Contribución al sistema completo de trazabilidad fitosanitaria
- **Análisis de Costos**: Impacto económico de afecciones y tratamientos

---

### 24. Optimización técnica y rendimiento
**Tecnologías avanzadas**: Optimización para manejo eficiente de datos complejos.

#### 24.1 Gestión de estado avanzada:
- **React Query**: Cache inteligente con invalidación selectiva
- **Optimistic Updates**: Actualizaciones inmediatas en interfaz con rollback automático
- **Lazy Loading**: Carga progresiva de datos relacionados
- **Prefetch Strategies**: Precarga inteligente de elementos relacionados

#### 24.2 Manejo de relaciones complejas:
- **Normalized State**: Normalización de datos para evitar duplicación
- **Referential Integrity**: Validación de integridad referencial client-side
- **Cascade Updates**: Actualizaciones en cascada de elementos relacionados
- **Conflict Resolution**: Resolución de conflictos en operaciones concurrentes

#### 24.3 Optimización de rendimiento:
- **Virtual Scrolling**: Manejo eficiente de listas grandes
- **Component Memoization**: Optimización de renders con React.memo
- **Debounced Operations**: Optimización de búsquedas y filtros
- **Background Sync**: Sincronización en background de datos relacionados

---

### 25. Seguridad y auditoría avanzada
**Protección integral**: Seguridad y trazabilidad completa de operaciones.

#### 25.1 Auditoría de cambios:
- **Log de estados**: Registro detallado de todos los cambios de estado
- **Timestamps precisos**: Fecha y hora exacta de cada operación
- **Usuario responsable**: Identificación del usuario que realiza cada acción
- **Cambios trackeados**: Historial completo de modificaciones para auditorías

#### 25.2 Validaciones de seguridad:
- **Campos obligatorios**: Validación en tiempo real de datos requeridos
- **Integridad referencial**: Verificación de relaciones válidas
- **Autorización granular**: Permisos específicos por operación
- **Sanitización de datos**: Limpieza de entradas para prevenir inyecciones

#### 25.3 Backup y recuperación:
- **Backup automático**: Respaldo programado de afecciones y relaciones
- **Versionado**: Mantenimiento de versiones de registros modificados
- **Recuperación selectiva**: Restauración de registros específicos si es necesario
- **Sincronización multiusuario**: Manejo de operaciones concurrentes

---

**💡 Consejo**: Mantén siempre un flujo de trabajo consistente registrando afecciones tan pronto como se detecten y actualizando estados de manera oportuna. Utiliza los botones "+" para crear elementos faltantes directamente desde el formulario principal, manteniendo la eficiencia del proceso. El sistema de estados te permitirá llevar un control detallado del progreso desde la detección hasta la resolución completa de cada problema fitosanitario.