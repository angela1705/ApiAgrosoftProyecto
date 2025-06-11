---
title: Gestión de Especies
---

## ¿Cómo listar y gestionar especies?

Esta documentación detalla el proceso para listar, registrar, actualizar y eliminar especies en el sistema. Sigue los pasos a continuación para gestionar las especies de manera efectiva.

---

### 1. Navegar al módulo de Especies
1. En el menú principal, busca el módulo **"Cultivo"** y selecciona el subítem **"Especies"**:

   <img src="/public/trazabilidad/especies/sidebarEspecie.png" alt="Navegación al módulo de especies" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de especies
- Al entrar en **"Especies"**, encontrarás una tabla con las especies registradas. Si no hay registros, verás una tabla vacía:

   <img src="/public/trazabilidad/especies/ListaVacia.png" alt="Listado de especies vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada especie, incluyendo:
  - **Nombre**
  - **Descripción**
  - **Largo de Crecimiento** (en días)
  - **Tipo de Especie**
  - **Imagen** (vista previa o "Sin imagen" si no se ha cargado)
  - **Acciones** (Editar, Eliminar)

---

### 3. Registrar una nueva especie
1. En la parte superior derecha del listado, haz clic en el botón **"+ Registrar"**:

   <img src="/public/trazabilidad/especies/RegistrarEspecieBtn.png" alt="Botón registrar especie" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario de registro de especies:

   <img src="/public/trazabilidad/especies/FormularioVacio.png" alt="Formulario de registro de especie" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Nombre**: Obligatorio. Ingresa un nombre único para la especie (máximo 30 caracteres).
   - **Descripción**: Obligatorio. Describe la especie.
   - **Largo de Crecimiento**: Obligatorio. Ingresa el tiempo en días que tarda la especie en crecer.
   - **Tipo de Especie**: Obligatorio. Selecciona un tipo de especie de la lista desplegable o registra uno nuevo haciendo clic en el botón **"+"**.
     <img src="/public/trazabilidad/especies/ModalTipoEspecie.png" alt="ModalTipoEspecie" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />
   - **Imagen**: Opcional. Selecciona una imagen representativa de la especie (formatos aceptados: imágenes como JPG, PNG, etc.).

   <img src="/public/trazabilidad/especies/FormularioLleno.png" alt="Formulario de especie diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Los campos **Nombre**, **Descripción**, **Largo de Crecimiento** y **Tipo de Especie** son obligatorios.
   - El campo **Nombre** debe ser único y no exceder los 30 caracteres.
   - El **Largo de Crecimiento** debe ser un número entero positivo.
   - La **Imagen** es opcional, pero si se carga, debe ser un archivo de imagen válido.

5. Haz clic en **"Guardar"** para registrar la especie.

6. Verás un mensaje de éxito como este:

   <img src="/public/trazabilidad/especies/RegistroExito.png" alt="Mensaje de registro exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Regresa a **"Listar Especies"** para confirmar que la especie se registró correctamente:

   <img src="/public/trazabilidad/especies/ListaLlena.png" alt="Listado con especie registrada" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Actualizar una especie
1. En el listado de especies, en la columna **Acciones**, haz clic en el ícono de **Editar** (lápiz):

   <img src="/public/trazabilidad/especies/EditarEAccion.png" alt="Botón de editar especie" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un formulario con los datos actuales de la especie:

   <img src="/public/trazabilidad/especies/EditarModal.png" alt="Formulario de edición de especie" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Modifica los campos que desees actualizar (Nombre, Descripción, Largo de Crecimiento, Tipo de Especie). **Nota**: La imagen no se puede actualizar desde este formulario; para cambiar la imagen, se debe registrar una nueva especie o eliminar y volver a crear el registro.

4. Haz clic en **"Confirmar"** para guardar los cambios.
5. Verás un mensaje de actualización exitosa:

   <img src="/public/trazabilidad/especies/ActualizadaExito.png" alt="Mensaje de actualización exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 5. Eliminar una especie
1. En el listado de especies, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/trazabilidad/especies/EliminarEAccion.png" alt="Botón de eliminar especie" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/trazabilidad/especies/EliminarModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer. Asegúrate de que la especie no esté asociada a ningún cultivo o actividad existente.
4. Haz clic en **"Confirmar"** para eliminar la especie.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/trazabilidad/especies/EliminadaExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar especies por nombre, descripción, tipo de especie o largo de crecimiento.
- **Validaciones**:
  - El **Nombre** debe ser único y no exceder los 30 caracteres.
  - La **Descripción** es obligatoria y debe proporcionar un contexto claro sobre la especie.
  - El **Largo de Crecimiento** debe ser un número entero positivo.
  - El **Tipo de Especie** debe seleccionarse de una lista de tipos de especie existentes.
  - La **Imagen** es opcional, pero si se carga, debe ser un archivo de imagen válido (JPG, PNG, etc.).
- **Imágenes**: En el listado, las imágenes se muestran como vistas previas de 64x64 píxeles. Si no se puede cargar la imagen, se muestra el texto "Sin imagen".
- **Acceso a otros módulos**: Las especies son utilizadas en el módulo de **Cultivos** para especificar qué se está cultivando. Asegúrate de que no existan dependencias (como cultivos asociados) antes de eliminar una especie.

---

### 7. Casos de uso
- **Registrar una especie**: Ideal para definir especies específicas (por ejemplo, "Maíz Dulce", "Trigo Durum") con su tipo correspondiente, tiempo de crecimiento y una imagen opcional para identificación visual.
- **Actualizar una especie**: Útil para corregir nombres, descripciones, tiempos de crecimiento o tipos de especie. **Nota**: La imagen no se puede actualizar directamente.
- **Eliminar una especie**: Aplicable cuando una especie ya no es relevante, pero debe hacerse con precaución debido a posibles dependencias con cultivos existentes.
- **Listar especies**: Permite supervisar todas las especies registradas, filtrarlas por nombre, descripción, tipo o tiempo de crecimiento, visualizar imágenes asociadas y realizar acciones rápidas como editar o eliminar.