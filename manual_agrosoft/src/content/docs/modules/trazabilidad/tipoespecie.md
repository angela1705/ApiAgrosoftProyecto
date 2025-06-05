---
title: Gestión de Tipos de Especie
---

## ¿Cómo listar y gestionar tipos de especie?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar tipos de especie en el sistema. Sigue los pasos a continuación para gestionar los tipos de especie de manera efectiva.

---

### 1. Navegar al módulo de Tipos de Especie
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Tipos de Especie"**:

   <img src="/public/trazabilidad/tipo_especie/sidebarTE.png" alt="Navegación al módulo de tipos de especie" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de tipos de especie
- Al entrar en **"Tipos de Especie"**, encontrarás una tabla con los tipos de especie registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/tipo_especie/ListaVacia.png" alt="Listado de tipos de especie vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada tipo de especie, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Imagen** (vista previa o "Sin imagen" si no se ha cargado)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar un nuevo tipo de especie
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/tipo_especie/RegistrarTipoEspecieBtn.png" alt="Botón registrar tipo de especie" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de tipos de especie:

   <img src="/public/trazabilidad/tipo_especie/FormularioVacio.png" alt="Formulario de registro de tipo de especie" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa un nombre único para el tipo de especie (máximo 30 caracteres).
   - **Descripción**: Obligatorio. Describe el tipo de especie.
   - **Imagen**: Opcional. Selecciona una imagen representativa del tipo de especie (formatos aceptados: imágenes como JPG, PNG, etc.).

   <img src="/public/trazabilidad/tipo_especie/FormularioLleno.png" alt="Formulario de tipo de especie diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Nombre** y **Descripción** son obligatorios.
   - El campo **Nombre** debe ser único y no exceder los 30 caracteres.
   - La **Imagen** es opcional, pero si se carga, debe ser un archivo de imagen válido.

5. Haz clic en **"Guardar"** para registrar el tipo de especie.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/tipo_especie/RegistradoExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Tipos de Especie"** para confirmar que el tipo de especie se registró correctamente:

   <img src="/public/trazabilidad/tipo_especie/TipoEspecieListaLleno.png" alt="Listado con tipo de especie registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar un tipo de especie
1. En el listado de tipos de especie, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/tipo_especie/EditarTEAccion.png" alt="Botón de editar tipo de especie" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales del tipo de especie:

   <img src="/public/trazabilidad/tipo_especie/EditarTipoEspecieModal.png" alt="Formulario de edición de tipo de especie" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Nombre, Descripción). **Nota**: La imagen no se puede actualizar desde este formulario; para cambiar la imagen, se debe registrar un nuevo tipo de especie o eliminar y volver a crear el registro.

4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/tipo_especie/ActualizadoExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar un tipo de especie
1. En el listado de tipos de especie, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/tipo_especie/EliminarTEAccion.png" alt="Botón de eliminar tipo de especie" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/tipo_especie/EliminarModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer. Asegúrate de que el tipo de especie no esté asociado a ningún cultivo o actividad existente.
4. Haz clic en **"Confirmar"** para eliminar el tipo de especie.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/tipo_especie/EliminadoExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar tipo de especie por nombre o descripción.
- **Validaciones**:
  - El **Nombre** debe ser único y no exceder los 30 caracteres.
  - La **Descripción** es obligatoria y debe proporcionar un contexto claro sobre el tipo de especie.
  - La **Imagen** es opcional, pero si se carga, debe ser un archivo de imagen válido (JPG, PNG, etc.).
- **Imágenes**: En el listado, las imágenes se muestran como vistas previas de 64x64 píxeles. Si no se puede cargar la imagen, se muestra un placeholder con el texto "Imagen no disponible".
- **Acceso a otros módulos**: Los tipo de especie son utilizados en el módulo de **Cultivos** para clasificar las especies cultivadas. Asegúrate de que no existan dependencias (como cultivos asociados) antes de eliminar un tipo de especie.

---

### 7. Casos de uso
- **Registrar un tipo de especie**: Ideal para definir categorías de especies (por ejemplo, "Legumbres", "Hortaliza", "Frutales") que se usarán al registrar cultivos, con una imagen opcional para identificación visual.
- **Actualizar un tipo de especie**: Útil para corregir nombres o descripciones, o para mejorar la claridad de la información. **Nota**: La imagen no se puede actualizar directamente.
- **Eliminar un tipo de especie**: Aplicable cuando un tipo de especie ya no es relevante, pero debe hacerse con precaución debido a posibles dependencias con cultivos existentes.
- **Listar tipos de especie**: Permite supervisar todos los tipos de especie registrados, filtrarlos por nombre o descripción, visualizar imágenes asociadas y realizar acciones rápidas como editar o eliminar.