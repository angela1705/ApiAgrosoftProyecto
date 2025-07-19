---
title: Gestión de Plagas
---

## ¿Cómo listar y gestionar plagas?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar plagas específicas en el sistema de trazabilidad. Sigue los pasos a continuación para gestionar las plagas de manera efectiva, vinculándolas con sus tipos correspondientes.

---

### 1. Navegar al módulo de Plagas
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Plagas"**:

   <img src="/public/trazabilidad/plaga/SidebarPlaga.png" alt="Navegación al módulo de plagas" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

---

### 2. Visualizar el listado de plagas
- Al entrar en **"Plagas"**, encontrarás una tabla con las plagas registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/plaga/ListaPlagaVacia.png" alt="Listado de plagas vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada plaga específica, incluyendo:
  - **Nombre** (nombre específico de la plaga)
  - **Descripción** (características y síntomas particulares)
  - **Tipo de Plaga** (categoría a la que pertenece)
  - **Imagen** (fotografía de la plaga específica)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar una nueva plaga
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/plaga/RegistrarPlagaBtn.png" alt="Botón registrar plaga" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de plagas:

   <img src="/public/trazabilidad/plaga/FormularioRegistroPlaga.png" alt="Formulario de registro de plaga" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Información básica**:
   - **Nombre**: Obligatorio. Nombre específico de la plaga (ej: "Áfido verde del durazno", "Mosca blanca del tomate")
   - **Descripción**: Obligatorio. Descripción detallada de la plaga específica, daños causados y características distintivas

   **b) Clasificación**:
   - **Tipo de Plaga**: Obligatorio. Selecciona el tipo de plaga al cual pertenece esta plaga específica desde el menú desplegable

   <img src="/public/trazabilidad/plaga/SelectorTipoPlaga.png" alt="Selector de tipo de plaga" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

   **c) Imagen representativa**:
   - **Imagen**: Campo opcional para cargar una imagen específica de esta plaga
   - Acepta formatos: JPG, PNG, GIF, WEBP
   - Ayuda en la identificación precisa de la plaga en campo

   <img src="/public/trazabilidad/plaga/CampoImagenPlaga.png" alt="Campo de imagen para plaga" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

4. **Formulario completado**:

   <img src="/public/trazabilidad/plaga/FormularioPlagaLleno.png" alt="Formulario de plaga diligenciado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Los campos **Nombre**, **Descripción** y **Tipo de Plaga** son obligatorios.
   - Debes tener al menos un **Tipo de Plaga** registrado previamente para poder crear plagas específicas.
   - La **imagen** es opcional pero altamente recomendable para identificación precisa en campo.
   - El **Tipo de Plaga** establece la categoría o familia a la que pertenece esta plaga específica.
   - Proporciona nombres y descripciones específicas que permitan distinguir esta plaga de otras similares.

6. Una vez completados los campos obligatorios, haz clic en **"Guardar"** para registrar la plaga.

7. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/plaga/PlagaRegistradaExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. Para verificar el registro, haz clic en **"Listar Plagas"** para regresar al listado:

   <img src="/public/trazabilidad/plaga/BotonListarPlagas.png" alt="Botón listar plagas" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

9. Confirma que la plaga se registró correctamente en la tabla:

   <img src="/public/trazabilidad/plaga/ListaPlagaConRegistros.png" alt="Listado con plaga registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Gestión de tipos de plaga requeridos
**Dependencia crítica**: Las plagas específicas requieren tipos de plaga previamente registrados.

#### 4.1 Verificar tipos de plaga disponibles
1. Antes de registrar una plaga, asegúrate de que existan tipos de plaga en el sistema:

   <img src="/public/trazabilidad/plaga/TiposPlagaDisponibles.png" alt="Tipos de plaga disponibles en selector" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

2. Si el selector de **"Tipo de Plaga"** aparece vacío, debes registrar tipos de plaga primero.

#### 4.2 Relación jerárquica
- **Tipo de Plaga**: Categoría general (ej: "Insectos", "Ácaros", "Nematodos")
- **Plaga**: Especie específica dentro de esa categoría (ej: "Áfido verde", "Thrips del tomate")

#### 4.3 Navegación a Tipos de Plaga
Si necesitas registrar nuevos tipos de plaga:
1. Navega al módulo **"Tipos de Plaga"** desde el menú principal
2. Registra los tipos necesarios
3. Regresa al módulo de **"Plagas"** para continuar con el registro específico

---

### 5. Gestión de imágenes específicas
**Identificación precisa**: Las imágenes de plagas específicas deben mostrar características distintivas.

#### 5.1 Cargar imagen de plaga específica
1. En el campo **"Imagen"**, selecciona una fotografía que muestre claramente:
   - Características distintivas de la plaga
   - Daños típicos causados en las plantas
   - Etapa de desarrollo (larva, adulto, etc.)
   - Comparación de tamaño con objetos conocidos

   <img src="/public/trazabilidad/plaga/EjemploImagenPlagaEspecifica.png" alt="Ejemplo de imagen de plaga específica" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

#### 5.2 Diferencia con imágenes de tipos
- **Imagen de Tipo de Plaga**: Representación general de la categoría
- **Imagen de Plaga**: Fotografía específica de la especie individual

#### 5.3 Buenas prácticas para imágenes
- **Calidad alta**: Resolución mínima de 800x600 px
- **Enfoque claro**: La plaga debe estar en foco y bien iluminada
- **Contexto**: Mostrar la plaga en su ambiente natural (sobre la planta)
- **Múltiples ángulos**: Si es posible, vista dorsal y ventral
- **Escala**: Incluir referencia de tamaño (moneda, regla, etc.)

---

### 6. Actualizar una plaga existente
1. En el listado de plagas, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaAccionEditar.png" alt="Botón de editar plaga" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales de la plaga:

   <img src="/public/trazabilidad/plaga/ModalEditarPlaga.png" alt="Modal de edición de plaga" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables en el modal**:
   - **Nombre**: Modifica el nombre específico de la plaga
   - **Descripción**: Actualiza la descripción, síntomas y características específicas

   **⚠️ Limitaciones en edición**:
   - **Tipo de Plaga**: No se puede cambiar desde el modal de edición
   - **Imagen**: No se puede modificar desde el modal de edición
   - Para cambiar tipo de plaga o imagen, contacta al administrador o elimina y vuelve a crear el registro

4. Realiza los cambios necesarios en los campos disponibles:

   <img src="/public/trazabilidad/plaga/EditarPlagaModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/plaga/PlagaActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/trazabilidad/plaga/ListaPlagaActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Eliminar una plaga
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaAccionEliminar.png" alt="Botón de eliminar plaga" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/plaga/ModalEliminarPlaga.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación de la plaga es **permanente** y no se puede deshacer.
   - Esta acción afectará cualquier registro de detección o tratamiento asociado a esta plaga específica.
   - Considera cuidadosamente antes de proceder si la plaga está siendo usada en actividades fitosanitarias.
   - La eliminación no afecta el tipo de plaga, solo la especie específica.

4. Si estás seguro de eliminar la plaga, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/trazabilidad/plaga/PlagaEliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/trazabilidad/plaga/ListaPlagaVacia.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 8. Sistema de clasificación jerárquica
**Organización inteligente**: Estructura de datos para manejo eficiente de plagas.

#### 8.1 Jerarquía del sistema:
```
Tipo de Plaga (Categoría)
├── Plaga específica 1
├── Plaga específica 2
└── Plaga específica 3
```

#### 8.2 Ejemplos de clasificación:
**Tipo: Insectos**
- Áfido verde del durazno
- Mosca blanca del tomate
- Thrips de la cebolla
- Gusano cogollero del maíz

**Tipo: Ácaros**
- Ácaro rojo europeo
- Ácaro del bronceado
- Arañuela roja común

**Tipo: Nematodos**
- Nematodo agallador
- Nematodo de la raíz
- Nematodo foliar

#### 8.3 Beneficios de la clasificación:
- **Organización lógica**: Facilita búsqueda y gestión
- **Tratamientos específicos**: Permite aplicar estrategias por categoría
- **Análisis estadísticos**: Reportes por tipo y especie
- **Capacitación**: Estructura didáctica para entrenamiento

---

### 9. Estados y indicadores visuales en la tabla
- **Nombre**: Nombre específico de la plaga individual
- **Descripción**: Texto descriptivo truncado con "..." si es muy largo
- **Tipo de Plaga**: Muestra el nombre del tipo al que pertenece, o "Sin tipo" si no está asignado
- **Imagen**: Miniatura de la imagen o "Sin imagen" si no se cargó
- **Acciones**: Iconos de editar (✏️) y eliminar (🗑️)

#### 9.1 Indicadores especiales:
- **"Sin tipo"**: Aparece cuando falta la relación con tipo de plaga
- **"Sin imagen"**: Indica que no se ha cargado imagen para esa plaga
- **"Cargando..."**: Estado temporal mientras se obtienen datos del servidor

---

### 10. Navegación y funcionalidades técnicas
- **Botón "Guardar"**: Registra la nueva plaga en el formulario de registro.
- **Botón "Listar Plagas"**: Te permite regresar al listado desde el formulario de registro.
- **Modal de edición**: Permite modificar información básica sin salir del listado.
- **Modal de eliminación**: Solicita confirmación antes de eliminar registros.
- **Selector dinámico**: El dropdown de tipos de plaga se actualiza automáticamente.
- **Cache inteligente**: React Query mantiene datos sincronizados entre módulos.

---

### 11. Ejemplos de plagas específicas por cultivo
**Guía de referencia**: Plagas comunes organizadas por cultivo objetivo.

#### 11.1 Hortalizas:
**Tomate**:
- Mosca blanca del tomate (Bemisia tabaci)
- Gusano del fruto (Helicoverpa zea)
- Minador de la hoja (Liriomyza sativae)
- Ácaro rojo (Tetranychus urticae)

**Lechuga**:
- Áfido de la lechuga (Nasonovia ribisnigri)
- Thrips del tabaco (Thrips tabaci)
- Gusano soldado (Spodoptera exigua)

**Pepino**:
- Mosca blanca de los invernaderos (Trialeurodes vaporariorum)
- Ácaro del bronceado (Aculops lycopersici)
- Trips occidental (Frankliniella occidentalis)

#### 11.2 Frutales:
**Cítricos**:
- Mosca de la fruta (Ceratitis capitata)
- Cochinilla harinosa (Planococcus citri)
- Minador de los cítricos (Phyllocnistis citrella)

**Manzano**:
- Carpocapsa (Cydia pomonella)
- Pulgón lanígero (Eriosoma lanigerum)
- Ácaro rojo europeo (Panonychus ulmi)

#### 11.3 Cereales:
**Maíz**:
- Gusano cogollero (Spodoptera frugiperda)
- Barrenador del tallo (Diatraea saccharalis)
- Diabrótica (Diabrotica speciosa)

**Arroz**:
- Sogata del arroz (Tagosodes orizicolus)
- Chinche del arroz (Oebalus poecilus)
- Gusano medidor (Mocis latipes)

---

### 12. Gestión de relaciones con tipos de plaga
**Integridad referencial**: Manejo de dependencias entre módulos.

#### 12.1 Validaciones del sistema:
- **Tipo requerido**: No se puede crear una plaga sin asignar un tipo
- **Tipos activos**: Solo aparecen tipos de plaga activos en el selector
- **Consistencia**: El sistema mantiene la relación entre plaga y tipo automáticamente

#### 12.2 Flujo recomendado:
1. **Crear tipos de plaga** primero (categorías generales)
2. **Crear plagas específicas** asignándolas a tipos existentes
3. **Usar en actividades** para registro de detecciones y tratamientos

#### 12.3 Mantenimiento de relaciones:
- **Eliminación de tipos**: No se puede eliminar un tipo si tiene plagas asociadas
- **Modificación de tipos**: Los cambios se reflejan automáticamente en plagas asociadas
- **Reporte de consistencia**: El sistema puede generar reportes de integridad

---

### 13. Buenas prácticas para registro de plagas específicas
- **Nomenclatura científica**: Incluye nombre científico entre paréntesis cuando sea posible.
- **Descripciones específicas**: Detalla características que distingan esta plaga de otras del mismo tipo.
- **Nombres locales**: Incluye nombres comunes usados en la región.
- **Etapas de desarrollo**: Especifica si se refiere a larva, ninfa, adulto, etc.
- **Hospederos específicos**: Menciona cultivos o plantas que ataca preferencialmente.
- **Daños característicos**: Describe síntomas distintivos que produce.
- **Condiciones favorables**: Clima, época del año, factores que favorecen su aparición.

---

### 14. Sistema de carga de archivos mejorado
**FormData Upload**: Manejo avanzado de imágenes con metadatos.

#### 14.1 Proceso técnico:
- **FormData**: Utiliza FormData para envío de archivos con datos estructurados
- **Multipart/form-data**: Encoding específico para archivos e imágenes
- **Validación client-side**: Verificación de formatos antes del envío
- **Compresión automática**: Optimización de imágenes en el servidor

#### 14.2 Metadatos incluidos:
- **fk_tipo_plaga**: ID del tipo de plaga seleccionado
- **nombre**: Nombre específico de la plaga
- **descripcion**: Descripción detallada
- **img**: Archivo de imagen (si se carga)

#### 14.3 Manejo de errores:
- **Tamaño excedido**: Alerta si la imagen supera límites
- **Formato no soportado**: Validación de tipos MIME
- **Error de red**: Reintento automático en caso de fallas
- **Timeout**: Manejo de tiempos de espera largos

---

### 15. Integración con actividades fitosanitarias
**Trazabilidad completa**: Uso de plagas en registros de campo.

#### 15.1 Uso en detecciones:
- **Formularios de monitoreo**: Selección de plagas detectadas en campo
- **Niveles de infestación**: Registro de intensidad de ataque
- **Ubicación específica**: Geolocalización de detecciones
- **Fecha y hora**: Timestamp de observaciones

#### 15.2 Uso en tratamientos:
- **Plagas objetivo**: Especificación de plagas a controlar
- **Productos aplicados**: Relación con insumos fitosanitarios
- **Dosis y métodos**: Registro de aplicaciones específicas
- **Eficacia**: Seguimiento de resultados de tratamientos

#### 15.3 Reportes integrados:
- **Incidencia por plaga**: Frecuencia de aparición
- **Eficacia de tratamientos**: Análisis de control por plaga específica
- **Mapas de calor**: Distribución espacial de plagas
- **Tendencias temporales**: Patrones estacionales por especie

---

### 16. Sistema de notificaciones avanzado
**Feedback inteligente**: Notificaciones contextuales y específicas.

#### 16.1 Notificaciones de éxito:
- **Registro exitoso**: "Plaga registrada con éxito" con invalidación de cache
- **Actualización exitosa**: "Plaga actualizada con éxito" con refresh automático
- **Eliminación exitosa**: "Plaga eliminada con éxito" con actualización de listado

#### 16.2 Notificaciones de error específicas:
- **Error 403**: "No tienes permiso para realizar esta acción, contacta a un administrador"
- **Tipo de plaga faltante**: "Debe seleccionar un tipo de plaga válido"
- **Imagen corrupta**: "Error al procesar la imagen, intenta con otro archivo"
- **Red desconectada**: "Error de conexión, verifica tu internet"

#### 16.3 Notificaciones de advertencia:
- **Campos obligatorios**: "Complete todos los campos requeridos"
- **Relación faltante**: "Debe existir al menos un tipo de plaga para continuar"
- **Operación en progreso**: "Procesando... por favor espera"

---

### 17. Control de estado avanzado con React Query
**Gestión de estado profesional**: Cache sincronizado entre componentes.

#### 17.1 QueryKeys utilizadas:
- **["plagas"]**: Lista principal de plagas
- **["tipoPlagas"]**: Tipos de plaga para selectores
- **Invalidación automática**: Actualización tras mutaciones

#### 17.2 Estados de carga:
- **isLoading**: Estado inicial de carga
- **isPending**: Operaciones en progreso (botones deshabilitados)
- **isError**: Estados de error con retry automático
- **isSuccess**: Confirmación de operaciones exitosas

#### 17.3 Optimizaciones:
- **Stale time**: Cache válido por tiempo definido
- **Background refetch**: Actualización silenciosa en background
- **Optimistic updates**: Actualizaciones inmediatas en UI
- **Retry logic**: Reintentos automáticos en errores de red

---

### 18. Flujo de trabajo recomendado
1. **Verificar tipos de plaga**: Asegúrate de tener tipos registrados antes de crear plagas específicas.
2. **Preparar información detallada**: Recopila nombres científicos, descripciones específicas e imágenes de calidad.
3. **Registro sistemático**: Crea plagas agrupándolas por tipo para mejor organización.
4. **Validar información**: Confirma que nombres y descripciones sean precisos y específicos.
5. **Carga de imágenes**: Añade fotografías de alta calidad que faciliten identificación en campo.
6. **Verificar relaciones**: Asegúrate de que las plagas estén correctamente asociadas a sus tipos.
7. **Uso en actividades**: Implementa las plagas registradas en monitoreos y tratamientos.
8. **Mantenimiento continuo**: Actualiza información según nuevos conocimientos técnicos.

---

### 19. Interpretación de datos en la tabla
- **Nombre**: Identificación específica de la plaga individual (incluye nombre común y científico si es posible).
- **Descripción**: Información detallada sobre características distintivas, daños causados y métodos de identificación.
- **Tipo de Plaga**: Categoría taxonómica o funcional a la que pertenece la plaga.
- **Imagen**: Representación visual específica para identificación precisa en campo.
- **Acciones**: Operaciones disponibles según permisos del usuario (editar solo texto, eliminar completamente).

---

### 20. Casos de uso específicos
- **Biblioteca de plagas**: Crear catálogo completo de plagas por región o cultivo.
- **Identificación en campo**: Consulta rápida con imágenes para identificar plagas observadas.
- **Protocolos de monitoreo**: Listas específicas de plagas a vigilar por cultivo.
- **Registro de detecciones**: Vincular observaciones de campo con plagas específicas catalogadas.
- **Planificación de tratamientos**: Seleccionar productos según plagas objetivo específicas.
- **Capacitación técnica**: Material didáctico para entrenar personal de campo.
- **Análisis de efectividad**: Evaluar éxito de tratamientos por plaga específica.
- **Cumplimiento normativo**: Documentar plagas para certificaciones y auditorías.

---

### 21. Solución de problemas comunes
- **Selector de tipo vacío**: Verifica que existan tipos de plaga registrados en el sistema.
- **Error al cargar imagen**: Confirma formato (JPG, PNG, GIF, WEBP) y tamaño máximo.
- **Modal no se cierra**: Los modales se cierran automáticamente tras operaciones exitosas.
- **Datos no se actualizan**: React Query actualiza automáticamente, verifica conexión.
- **Error 403**: Contacta al administrador para verificar permisos de usuario.
- **Campos requeridos**: Asegúrate de completar nombre, descripción y tipo de plaga.
- **Relación rota**: Si aparece "Sin tipo", reasigna la plaga a un tipo válido.
- **Imagen no aparece**: Verifica que la imagen se cargó correctamente durante el registro.

---

### 22. Permisos y restricciones de acceso
- **Registro**: Requiere permisos de escritura en el módulo de cultivo/trazabilidad.
- **Edición**: Requiere permisos de modificación en plagas específicas.
- **Eliminación**: Requiere permisos de administración; úsalo con extrema precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden visualizar el listado.
- **Carga de imágenes**: Puede requerir permisos específicos para upload de archivos.
- **Relación con tipos**: Requiere acceso de lectura al módulo de tipos de plaga.
- **Uso en actividades**: Integración con permisos del módulo de actividades fitosanitarias.

---

### 23. Integración con otros módulos del sistema
- **Tipos de Plaga**: Dependencia obligatoria para clasificación jerárquica.
- **Actividades Fitosanitarias**: Uso directo en formularios de detección y tratamiento.
- **Monitoreos de Campo**: Registro de observaciones con plagas específicas.
- **Aplicación de Productos**: Selección de plagas objetivo para tratamientos.
- **Reportes de Sanidad**: Inclusión en reportes de incidencia y control.
- **Trazabilidad**: Contribución al sistema de trazabilidad fitosanitaria.
- **Análisis Estadísticos**: Datos para estudios de tendencias y patrones.
- **Cumplimiento Normativo**: Registros para auditorías y certificaciones agrícolas.

---

### 24. Optimización y rendimiento del módulo
**Tecnologías para experiencia de usuario superior**:
- **React Query**: Cache inteligente con invalidación automática tras mutaciones.
- **Lazy Loading**: Carga progresiva de imágenes en tabla para mejor rendimiento.
- **Debounced Operations**: Optimización de búsquedas y filtros con retrasos controlados.
- **Component Memoization**: Optimización de renders con React.memo en componentes pesados.
- **Virtual Scrolling**: Manejo eficiente de listas grandes de plagas.
- **Image Optimization**: Compresión automática de imágenes en servidor.
- **Prefetch Strategies**: Precarga inteligente de datos relacionados.

---

### 25. Seguridad y validación de datos
**Protección integral**: Validaciones client-side y server-side.

#### 25.1 Validaciones de entrada:
- **Campos obligatorios**: Validación en tiempo real de nombre, descripción y tipo
- **Formato de imágenes**: Verificación de tipos MIME permitidos
- **Tamaño de archivos**: Límites de tamaño para imágenes (5MB máximo)
- **Caracteres especiales**: Sanitización de texto para prevenir inyecciones

#### 25.2 Seguridad de autenticación:
- **JWT Tokens**: Autenticación basada en tokens con expiración automática
- **Refresh automático**: Renovación silenciosa de tokens cuando es necesario
- **Logout forzado**: Redirección automática al login si el token expira
- **Permisos granulares**: Control de acceso específico por operación

#### 25.3 Auditoría y logs:
- **Registro de operaciones**: Log detallado de todas las acciones realizadas
- **Timestamps precisos**: Fecha y hora exacta de cada operación
- **Usuario responsable**: Identificación del usuario que realiza cada acción
- **Cambios trackeados**: Historial de modificaciones para auditorías

---

**💡 Consejo**: Mantén siempre la clasificación jerárquica actualizada registrando primero los tipos de plaga y luego las especies específicas. Utiliza imágenes de alta calidad y descripciones detalladas para facilitar la identificación precisa en campo. La integración con actividades fitosanitarias te permitirá llevar un control completo de incidencias y efectividad de tratamientos aplicados por plaga específica.