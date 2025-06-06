---
title: Gestión de Pagos
---

## ¿Cómo listar y gestionar pagos?

Esta documentación detalla el proceso para listar, calcular, visualizar detalles y eliminar pagos en el sistema. Sigue los pasos a continuación para gestionar los pagos de manera efectiva.

---

### 1. Navegar al módulo de Pagos
1. En el menú principal, busca el módulo **"Finanzas"** y selecciona el subítem **"Pagos"**:

   <img src="/public/finanzas/pagos/sidebarPago.png" alt="Navegación al módulo de pagos" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

---

### 2. Visualizar el listado de pagos
- Al entrar en **"Pagos"**, encontrarás una tabla con los pagos registrados. Si no hay registros, verás una tabla vacía:

   <img src="/public/finanzas/pagos/ListaVacia.png" alt="Listado de pagos vacío" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- La tabla muestra información detallada de cada pago, incluyendo:
  - **ID**
  - **Período** (fecha de inicio - fecha de fin)
  - **Horas Trabajadas**
  - **Total** (en COP)
  - **Usuario**
  - **Fecha de Cálculo**
  - **Acciones** (Ver detalles, Eliminar)

---

### 3. Calcular un nuevo pago
1. En la parte superior derecha del listado, haz clic en el botón **"+ Calcular Nuevo Pago"**:

   <img src="/public/finanzas/pagos/CalcularPagoBtn.png" alt="Botón calcular nuevo pago" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá el formulario para calcular un nuevo pago:

   <img src="/public/finanzas/pagos/FormularioVacio.png" alt="Formulario de cálculo de pago" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **Campos del formulario**:
   - **Usuario**: Obligatorio. Selecciona un usuario de la lista desplegable (puedes buscar por nombre).
   - **Fecha Inicio**: Obligatorio. Selecciona la fecha de inicio del período.
   - **Fecha Fin**: Obligatorio. Selecciona la fecha de fin del período.

   <img src="/public/finanzas/pagos/FormularioLleno.png" alt="Formulario de pago diligenciado" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4. **⚠️ Importante**:
   - Todos los campos son obligatorios.
   - La **Fecha de Inicio** no puede ser mayor que la **Fecha de Fin**.
   - El **Usuario** debe tener un rol asignado y un salario configurado para su rol.
   - Deben existir actividades completadas por el usuario en el rango de fechas especificado para calcular el pago.

5. Haz clic en **"Calcular Pago"** para procesar el cálculo.

6. Verás un mensaje de éxito como este:

   <img src="/public/finanzas/pagos/RegistroExito.png" alt="Mensaje de cálculo exitoso" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

7. Serás redirigido a **"Listar Pagos"**, donde podrás confirmar que el pago se registró correctamente:

   <img src="/public/finanzas/pagos/ListaLlena.png" alt="Listado con pago registrado" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

---

### 4. Visualizar detalles de un pago
1. En el listado de pagos, en la columna **Acciones**, haz clic en el ícono de **Ver detalles** (ojo):

   <img src="/public/finanzas/pagos/DetallePagoAccion.png" alt="Botón de ver detalles de pago" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se abrirá un modal con los detalles del pago:

   <img src="/public/finanzas/pagos/DetallePago.png" alt="Modal de detalles de pago" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. Los detalles incluyen:
   - Período (fechas de inicio y fin)
   - Horas trabajadas
   - Jornales calculados
   - Total a pagar
   - Fecha de cálculo
   - Número de actividades incluidas

4. Haz clic en **"Cerrar"** para volver al listado.

---

### 5. Eliminar un pago
1. En el listado de pagos, en la columna **Acciones**, haz clic en el ícono de **Eliminar** (basura):

   <img src="/public/finanzas/pagos/DetallePagoAccionEliminar.png" alt="Botón de eliminar pago" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

2. Se mostrará un mensaje de advertencia, ya que esta acción es **irreversible**:

   <img src="/public/finanzas/pagos/EliminarPagoModal.png" alt="Mensaje de confirmación de eliminación" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

3. **⚠️ Considera cuidadosamente** antes de eliminar, ya que no se puede deshacer.
4. Haz clic en **"Eliminar"** para confirmar la eliminación.
5. Verás un mensaje de eliminación exitosa:

   <img src="/public/finanzas/pagos/EliminarExito.png" alt="Mensaje de eliminación exitosa" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

---

### 6. Notas adicionales
- **Filtros y búsqueda**: Usa los filtros en la tabla para buscar pagos por ID, período, horas trabajadas, total, usuario o fecha de cálculo.
- **Validaciones**:
  - El **Usuario** debe tener un rol asignado y un salario configurado.
  - La **Fecha de Inicio** no puede ser mayor que la **Fecha de Fin**.
  - Deben existir actividades completadas en el rango de fechas especificado para calcular el pago.
  - El cálculo del pago se basa en las horas trabajadas (suma de la duración de actividades completadas) y el valor del jornal definido en el salario del rol del usuario.
- **Acceso a otros módulos**: Los pagos están relacionados con **Usuarios**, **Actividades** y **Salarios**. Asegúrate de que los usuarios tengan roles y salarios configurados, y que existan actividades completadas antes de calcular un pago.
- **Formato de datos**:
  - Los totales se muestran en pesos colombianos (COP) sin decimales.
  - Las fechas se formatean en el formato DD/MM/YYYY.
  - Las horas trabajadas y jornales se redondean a 2 decimales.

---

### 7. Casos de uso
- **Calcular un nuevo pago**: Ideal para registrar el pago correspondiente a un usuario basado en las actividades completadas en un período específico.
- **Visualizar detalles de un pago**: Útil para revisar la información detallada de un pago, incluyendo el período, horas trabajadas, jornales, total y actividades asociadas.
- **Eliminar un pago**: Aplicable cuando un registro de pago es erróneo o ya no es relevante, pero debe hacerse con precaución debido a su carácter irreversible.
- **Listar pagos**: Permite supervisar todos los pagos registrados, filtrarlos por ID, período, usuario, horas, total o fecha de cálculo, y realizar acciones rápidas como ver detalles o eliminar.