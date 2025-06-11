---
title: Gestión de Tipos de Plaga
---

## ¿Cómo listar y gestionar tipos de plaga?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar tipos de plaga en el sistema de trazabilidad. Sigue los pasos a continuación para gestionar los tipos de plaga de manera efectiva.

---

### 1. Navegar al módulo de Tipos de Plaga
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Tipos de Plaga"**:

   <img src="/public/trazabilidad/tipoplaga/SidebarTipoPlaga.png" alt="Navegación al módulo de tipos de plaga" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de tipos de plaga
- Al entrar en **"Tipos de Plaga"**, encontrarás una tabla con los tipos de plaga registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/tipoplaga/ListaTipoPlagaVacia.png" alt="Listado de tipos de plaga vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada tipo de plaga, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Imagen** (miniatura de la imagen cargada)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo tipo de plaga
1. En la parte superior izquierda del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/tipoplaga/RegistrarTipoPlagaBtn.png" alt="Botón registrar tipo de plaga" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de tipos de plaga:

   <img src="/public/trazabilidad/tipoplaga/FormularioRegistroTipoPlaga.png" alt="Formulario de registro de tipo de plaga" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

3. **Campos del formulario**:
   
   **a) Información básica**:
   - **Nombre**: Obligatorio. Nombre identificativo del tipo de plaga
   - **Descripción**: Obligatorio. Descripción detallada del tipo de plaga, características y síntomas

   **b) Imagen representativa**:
   - **Imagen**: Campo opcional para cargar una imagen representativa del tipo de plaga
   - Acepta formatos: JPG, PNG, GIF, WEBP
   - Ayuda en la identificación visual de la plaga

4. **Formulario completado**:

   <img src="/public/trazabilidad/tipoplaga/FormularioTipoPlagaLleno.png" alt="Formulario de tipo de plaga diligenciado" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

5. **⚠️ Importante**:
   - Los campos **Nombre** y **Descripción** son obligatorios.
   - La **imagen** es opcional pero recomendable para facilitar la identificación.
   - Los formatos de imagen soportados son: JPG, JPEG, PNG, GIF, WEBP.
   - El tamaño máximo de imagen recomendado es de 5MB.
   - Proporciona descripciones detalladas que incluyan síntomas, daños típicos y características distintivas.

6. Una vez completados los campos, haz clic en **"Guardar"** para registrar el tipo de plaga.

7. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaRegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

8. Para verificar el registro, haz clic en **"Listar Tipo de Plaga"** para regresar al listado:

   <img src="/public/trazabilidad/tipoplaga/BotonListarTipoPlaga.png" alt="Botón listar tipos de plaga" style="display: block; margin: auto; width: 40%; border-radius: 12px;" />

9. Confirma que el tipo de plaga se registró correctamente en la tabla:

   <img src="/public/trazabilidad/tipoplaga/ListaTipoPlagaConRegistros.png" alt="Listado con tipo de plaga registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Gestión de imágenes
**Funcionalidad especial**: El sistema permite cargar imágenes para facilitar la identificación de plagas.

#### 4.1 Cargar imagen al registrar
1. En el formulario de registro, localiza el campo **"Imagen"**:

   <img src="/public/trazabilidad/tipoplaga/CampoImagen.png" alt="Campo de carga de imagen" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

2. Haz clic en **"Examinar"** o arrastra la imagen directamente al área designada.

3. **Tipos de archivo aceptados**:
   - **Imágenes**: .jpg, .jpeg, .png, .gif, .webp
   - **Tamaño máximo**: 5MB recomendado
   - **Resolución recomendada**: 800x600 px para óptima visualización

4. Una vez seleccionada, verás una vista previa de la imagen:

   <img src="/public/trazabilidad/tipoplaga/VistaPreviaImagen.png" alt="Vista previa de imagen cargada" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

#### 4.2 Visualización en el listado
- Las imágenes cargadas se muestran como miniaturas en la columna **"Imagen"**:

   <img src="/public/trazabilidad/tipoplaga/MiniaturaEnListado.png" alt="Miniatura de imagen en listado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- Si no se cargó imagen, aparece el texto **"Sin imagen"**.

---

### 5. Actualizar un tipo de plaga existente
1. En el listado de tipos de plaga, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaAccionEditar.png" alt="Botón de editar tipo de plaga" style="display: block; margin: auto; width: 15%; border-radius: 12px;" />

2. Se abrirá un modal con el formulario de edición conteniendo los datos actuales del tipo de plaga:

   <img src="/public/trazabilidad/tipoplaga/ModalEditarTipoPlaga.png" alt="Modal de edición de tipo de plaga" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

3. **Campos editables**:
   - **Nombre**: Modifica el nombre del tipo de plaga
   - **Descripción**: Actualiza la descripción, síntomas y características

   **⚠️ Nota importante**: En el modal de edición no se puede modificar la imagen. Para cambiar la imagen, será necesario eliminar el registro y crear uno nuevo, o contactar al administrador del sistema.

4. Realiza los cambios necesarios en los campos que desees actualizar:

   <img src="/public/trazabilidad/tipoplaga/EditarTipoPlagaModificado.png" alt="Formulario de edición modificado" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

5. Haz clic en **"Confirmar"** para guardar los cambios.

6. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaActualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. La tabla se actualizará automáticamente mostrando los nuevos datos:

   <img src="/public/trazabilidad/tipoplaga/ListaTipoPlagaActualizada.png" alt="Listado actualizado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 6. Eliminar un tipo de plaga
1. En el listado, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura roja):

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaAccionEliminar.png" alt="Botón de eliminar tipo de plaga" style="display: block; margin: auto; width: 15%; border-radius: 12px;" />

2. Se mostrará un modal de confirmación con una advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/tipoplaga/ModalEliminarTipoPlaga.png" alt="Modal de confirmación de eliminación" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

3. **⚠️ Advertencia importante**:
   - La eliminación del tipo de plaga es **permanente** y no se puede deshacer.
   - Esta acción afectará cualquier registro de plagas que esté asociado a este tipo.
   - Considera cuidadosamente antes de proceder si el tipo de plaga está siendo usado en registros de actividades fitosanitarias.

4. Si estás seguro de eliminar el tipo de plaga, haz clic en **"Confirmar"**. De lo contrario, haz clic en **"Cancelar"**.

5. Al confirmar la eliminación, verás un mensaje de éxito:

   <img src="/public/trazabilidad/tipoplaga/TipoPlagaEliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

6. El registro desaparecerá del listado inmediatamente:

   <img src="/public/trazabilidad/tipoplaga/ListaTipoPlagaDespuesEliminar.png" alt="Listado después de eliminar" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 7. Estados y indicadores visuales
- **Iconos de acción**:
  - **Editar** (✏️): Permite modificar el nombre y descripción del tipo de plaga
  - **Eliminar** (🗑️): Permite eliminar permanentemente el tipo de plaga

- **Indicadores de imagen**:
  - **Miniatura**: Se muestra una imagen pequeña cuando hay imagen cargada
  - **"Sin imagen"**: Texto que aparece cuando no se ha cargado imagen

- **Estados de carga**:
  - **"Cargando..."**: Mensaje que aparece mientras se obtienen los datos
  - **Tabla vacía**: Se muestra cuando no hay tipos de plaga registrados

---

### 8. Navegación y funcionalidades adicionales
- **Botón "Guardar"**: Registra el nuevo tipo de plaga en el formulario de registro.
- **Botón "Listar Tipo de Plaga"**: Te permite regresar al listado desde el formulario de registro.
- **Modal de edición**: Permite modificar información sin salir del listado.
- **Modal de eliminación**: Solicita confirmación antes de eliminar registros.
- **Carga de datos**: El sistema muestra **"Cargando..."** mientras obtiene la información.
- **Actualización automática**: Después de cualquier operación (registro, edición, eliminación), la tabla se actualiza automáticamente usando React Query.

---

### 9. Tipos comunes de plagas agrícolas
**Guía de referencia**: Categorías principales para organizar los tipos de plaga.

#### 9.1 Por tipo de organismo:
- **Insectos**: Áfidos, thrips, moscas blancas, lepidópteros, coleópteros
- **Ácaros**: Ácaros rojos, ácaros del bronceado, arañas rojas
- **Nematodos**: Nematodos de raíz, nematodos foliares
- **Moluscos**: Caracoles, babosas
- **Vertebrados**: Roedores, aves, murciélagos

#### 9.2 Por cultivo afectado:
- **Hortalizas**: Plagas específicas de tomate, lechuga, pepino, etc.
- **Frutales**: Plagas de cítricos, manzano, durazno, etc.
- **Cereales**: Plagas de maíz, arroz, trigo, etc.
- **Cultivos industriales**: Plagas de algodón, caña de azúcar, etc.

#### 9.3 Por tipo de daño:
- **Masticadores**: Que consumen hojas y tallos
- **Chupadores**: Que extraen savia de la planta
- **Minadores**: Que crean galerías en hojas
- **Barrenadores**: Que perforan tallos y frutos
- **Vectores**: Que transmiten enfermedades

---

### 10. Buenas prácticas para registro de tipos de plaga
- **Nombres científicos**: Incluye tanto el nombre común como el científico cuando sea posible.
- **Descripciones completas**: Detalla síntomas, daños, ciclo de vida y métodos de identificación.
- **Imágenes de calidad**: Usa fotografías claras que muestren las características distintivas.
- **Información actualizada**: Mantén la información científica y técnica actualizada.
- **Consistencia**: Usa nomenclatura consistente para facilitar búsquedas.
- **Contexto local**: Incluye información relevante para las condiciones climáticas y cultivos locales.

---

### 11. Gestión de archivos de imagen
**Control técnico**: Consideraciones importantes para el manejo de imágenes.

#### 11.1 Formatos soportados:
- **JPEG/JPG**: Ideal para fotografías con compresión eficiente
- **PNG**: Mejor para imágenes con transparencia o gráficos
- **GIF**: Para imágenes animadas simples
- **WEBP**: Formato moderno con mejor compresión

#### 11.2 Optimización de imágenes:
- **Resolución recomendada**: 800x600 píxeles para balance entre calidad y tamaño
- **Tamaño de archivo**: Máximo 5MB, recomendado 1-2MB
- **Compresión**: Usar compresión moderada para mantener calidad visual
- **Nombre de archivo**: Usar nombres descriptivos antes de cargar

#### 11.3 Almacenamiento:
- **Backup automático**: Las imágenes se almacenan con backup automático
- **URL persistente**: Las imágenes mantienen URLs permanentes
- **Cache optimizado**: Sistema de cache para carga rápida

---

### 12. Integración con actividades fitosanitarias
**Funcionalidad especial**: Los tipos de plaga se integran con registros de campo.

#### 12.1 Uso en actividades:
- **Identificación**: Los tipos registrados aparecen en formularios de detección de plagas
- **Trazabilidad**: Permite vincular tratamientos específicos con tipos de plaga
- **Reportes**: Genera reportes de incidencia por tipo de plaga
- **Análisis**: Facilita análisis de efectividad de tratamientos

#### 12.2 Beneficios de la integración:
- **Consistencia**: Terminología uniforme en todos los registros
- **Eficiencia**: Selección rápida de tipos en formularios de campo
- **Análisis**: Datos estructurados para análisis estadísticos
- **Cumplimiento**: Registro detallado para certificaciones agrícolas

---

### 13. Sistema de notificaciones y feedback
**React Query + Toast System**: Retroalimentación inmediata al usuario.

#### 13.1 Notificaciones de éxito:
- **Registro exitoso**: Confirmación al crear nuevo tipo de plaga
- **Actualización exitosa**: Confirmación al modificar datos
- **Eliminación exitosa**: Confirmación al eliminar registro

#### 13.2 Notificaciones de error:
- **Acceso denegado (403)**: Cuando no tienes permisos para la operación
- **Error de autenticación**: Cuando el token de sesión ha expirado
- **Error de red**: Cuando hay problemas de conectividad
- **Error de validación**: Cuando faltan campos obligatorios

#### 13.3 Configuración de notificaciones:
- **Duración**: 3 segundos de visualización
- **Colores**: Verde para éxito, rojo para error, amarillo para advertencia
- **Posición**: Esquina superior derecha de la pantalla

---

### 14. Control de estado y carga de datos
**React Query Integration**: Gestión avanzada del estado de datos.

#### 14.1 Estados de la aplicación:
- **Loading**: Mientras se cargan los datos del servidor
- **Success**: Cuando los datos se cargan correctamente
- **Error**: Cuando hay problemas al cargar datos
- **Idle**: Estado inicial antes de cargar datos

#### 14.2 Cache inteligente:
- **Invalidación automática**: Los datos se actualizan tras modificaciones
- **Refetch automático**: Recarga datos cuando es necesario
- **Optimistic updates**: Actualizaciones optimistas para mejor UX

---

### 15. Flujo de trabajo recomendado
1. **Preparación de información**: Recopila nombres científicos, descripciones e imágenes de calidad.
2. **Registro inicial**: Crea tipos de plaga con información básica completa.
3. **Carga de imágenes**: Añade imágenes representativas para facilitar identificación.
4. **Verificación**: Confirma que la información sea precisa y completa.
5. **Uso en campo**: Utiliza los tipos registrados en actividades fitosanitarias.
6. **Mantenimiento**: Actualiza información según nuevos conocimientos técnicos.

---

### 16. Interpretación de la información
- **Nombre**: Identificación principal del tipo de plaga (común y/o científico).
- **Descripción**: Información detallada sobre características, síntomas y daños.
- **Imagen**: Representación visual para identificación en campo.
- **Acciones**: Operaciones disponibles según permisos del usuario.

---

### 17. Casos de uso comunes
- **Catalogación**: Crear biblioteca de plagas comunes en la región.
- **Identificación en campo**: Consulta rápida para identificar plagas observadas.
- **Capacitación**: Material de referencia para entrenar personal de campo.
- **Registro de tratamientos**: Vincular aplicaciones fitosanitarias con plagas específicas.
- **Análisis de tendencias**: Estudiar patrones de incidencia por tipo de plaga.
- **Cumplimiento normativo**: Documentar plagas para certificaciones agrícolas.

---

### 18. Solución de problemas comunes
- **Campos obligatorios**: Asegúrate de completar nombre y descripción.
- **Imagen no carga**: Verifica formato (JPG, PNG, GIF, WEBP) y tamaño (máx. 5MB).
- **Error de autenticación**: Si recibes error 403, contacta al administrador del sistema.
- **Modal no se cierra**: Los modales se cierran automáticamente al guardar exitosamente.
- **Tabla no se actualiza**: Verifica conexión a internet y espera la sincronización.
- **Imagen aparece como "Sin imagen"**: Verifica que la imagen se cargó correctamente en el registro.
- **Botones no responden**: Asegúrate de que no haya operaciones en curso (estado "loading").

---

### 19. Permisos y restricciones
- **Registro**: Requiere permisos de escritura en el módulo de cultivo/trazabilidad.
- **Edición**: Requiere permisos de modificación en tipos de plaga.
- **Eliminación**: Requiere permisos de administración; úsalo con precaución.
- **Consulta**: Todos los usuarios con acceso al módulo pueden ver el listado.
- **Carga de imágenes**: Puede requerir permisos específicos para subir archivos.
- **Integración con actividades**: Puede requerir permisos del módulo de actividades fitosanitarias.

---

### 20. Integración con otros módulos
- **Actividades Fitosanitarias**: Los tipos de plaga se usan en registros de detección y tratamiento.
- **Reportes**: Información incluida en reportes de sanidad vegetal.
- **Trazabilidad**: Contribuye al sistema de trazabilidad de tratamientos.
- **Análisis de Cultivos**: Datos para análisis de problemáticas por cultivo.
- **Cumplimiento**: Registros para auditorías y certificaciones fitosanitarias.
- **Planificación**: Información para programas preventivos de manejo integrado.

---

### 21. Seguridad y autenticación
**Sistema de autenticación basado en tokens**:
- **Token Bearer**: Autenticación mediante token JWT almacenado localmente
- **Expiración automática**: Redirección al login cuando el token expira
- **Permisos granulares**: Control de acceso por operación específica
- **Logs de auditoría**: Registro de todas las operaciones realizadas

---

### 22. Optimización de rendimiento
**Tecnologías para mejor experiencia de usuario**:
- **React Query**: Cache inteligente y actualizaciones en tiempo real
- **Lazy Loading**: Carga progresiva de imágenes en la tabla
- **Optimistic Updates**: Actualizaciones inmediatas en interfaz
- **Debounced Search**: Búsqueda optimizada con retrasos controlados

---

### 23. Accesibilidad y usabilidad
- **Navegación por teclado**: Soporte completo para navegación sin mouse
- **Lectores de pantalla**: Etiquetas ARIA para accesibilidad
- **Contrastes**: Colores optimizados para visibilidad
- **Responsive Design**: Funcionalidad completa en dispositivos móviles
- **Tooltips informativos**: Ayuda contextual en elementos complejos

---

### 24. Mantenimiento y escalabilidad
- **Modular Design**: Arquitectura modular para fácil mantenimiento
- **Reutilización de componentes**: Componentes globales (ReuInput, ReuModal, Tabla)
- **TypeScript**: Tipado fuerte para reducir errores en producción
- **Error Boundaries**: Manejo controlado de errores en componentes
- **Performance Monitoring**: Métricas de rendimiento integradas

---

**💡 Consejo**: Mantén siempre información científica actualizada en los tipos de plaga y utiliza imágenes de alta calidad para facilitar la identificación en campo. La integración con actividades fitosanitarias te permitirá llevar un control detallado de incidencias y efectividad de tratamientos aplicados.