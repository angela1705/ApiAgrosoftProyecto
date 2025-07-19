---
title: "Gestión de Precios de Productos"
slug: modules/inventario/precio-producto
description: "Documentación de la API para la gestión de precios de productos en Agrosoft."
---

# **Gestión de Precios de Productos**

Los **registros de Precios de Productos** documentan los precios, stock y fechas de caducidad de productos derivados de cosechas, incluyendo su vinculación con productos específicos, unidades de medida y control de inventario. Esta documentación cubre los endpoints RESTful para su gestión completa.

---

## **Endpoints de la API**

### **Obtener todos los precios de productos**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/"><div></div></button></div>
    </figure>
  </div>
</section>

**Parámetros opcionales:**
- `?Producto=1`: Filtra por ID de producto específico.
- `?precio__gte=10000`: Filtra precios mayores o iguales al valor especificado.
- `?stock__gt=0`: Filtra productos con stock disponible.
- `?fecha_registro=2024-01-15`: Filtra por fecha de registro específica.

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "Producto": "Cosecha de Tomate #123",
    "Producto_id": 123,
    "nombre_producto": "Tomate Cherry",
    "unidad_medida": {
      "id": 1,
      "nombre": "kg",
      "descripcion": "Kilogramo",
      "creada_por_usuario": false,
      "fecha_creacion": "2024-01-01T00:00:00Z"
    },
    "unidad_medida_id": 1,
    "precio": "15000.00",
    "fecha_registro": "2024-01-15",
    "stock": 150,
    "fecha_caducidad": "2024-02-15"
  },
  {
    "id": 2,
    "Producto": "Cosecha de Lechuga #456",
    "Producto_id": 456,
    "nombre_producto": "Lechuga Romana",
    "unidad_medida": {
      "id": 2,
      "nombre": "unidades",
      "descripcion": "Unidad individual",
      "creada_por_usuario": false,
      "fecha_creacion": "2024-01-01T00:00:00Z"
    },
    "unidad_medida_id": 2,
    "precio": "2500.00",
    "fecha_registro": "2024-01-16",
    "stock": 200,
    "fecha_caducidad": "2024-01-25"
  }
]
```

---

### **Obtener un precio de producto por ID**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "Producto": "Cosecha de Tomate #123",
  "Producto_id": 123,
  "nombre_producto": "Tomate Cherry",
  "unidad_medida": {
    "id": 1,
    "nombre": "kg",
    "descripcion": "Kilogramo",
    "creada_por_usuario": false,
    "fecha_creacion": "2024-01-01T00:00:00Z"
  },
  "unidad_medida_id": 1,
  "precio": "15000.00",
  "fecha_registro": "2024-01-15",
  "stock": 150,
  "fecha_caducidad": "2024-02-15"
}
```

---

### **Registrar un nuevo precio de producto**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "Producto_id": 789,
  "unidad_medida_id": 1,
  "precio": "8500.00",
  "fecha_registro": "2024-01-17",
  "stock": 75,
  "fecha_caducidad": "2024-02-28"
}
```

**Validaciones:**
- Campos obligatorios: `precio`, `fecha_registro`
- `Producto_id` debe ser un ID válido de Cosecha (opcional)
- `unidad_medida_id` debe ser un ID válido de UnidadMedida (opcional)
- `precio` debe ser un decimal válido con máximo 10 dígitos y 2 decimales
- `stock` debe ser mayor o igual a 0 (por defecto 0)
- `fecha_caducidad` debe ser posterior a `fecha_registro` (opcional)
- `fecha_registro` debe estar en formato YYYY-MM-DD

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 3,
  "Producto": "Cosecha de Zanahoria #789",
  "Producto_id": 789,
  "nombre_producto": "Zanahoria Orgánica",
  "unidad_medida": {
    "id": 1,
    "nombre": "kg",
    "descripcion": "Kilogramo",
    "creada_por_usuario": false,
    "fecha_creacion": "2024-01-01T00:00:00Z"
  },
  "unidad_medida_id": 1,
  "precio": "8500.00",
  "fecha_registro": "2024-01-17",
  "stock": 75,
  "fecha_caducidad": "2024-02-28"
}
```

---

### **Actualizar un precio de producto**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "precio": "16500.00",
  "stock": 120,
  "fecha_caducidad": "2024-03-15"
}
```

**Restricciones:**
- Todos los campos son modificables
- Las validaciones del modelo se aplican (stock ≥ 0, fecha_caducidad ≥ fecha_registro)
- Se pueden actualizar las relaciones con `Producto_id` y `unidad_medida_id`

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "Producto": "Cosecha de Tomate #123",
  "Producto_id": 123,
  "nombre_producto": "Tomate Cherry",
  "unidad_medida": {
    "id": 1,
    "nombre": "kg",
    "descripcion": "Kilogramo",
    "creada_por_usuario": false,
    "fecha_creacion": "2024-01-01T00:00:00Z"
  },
  "unidad_medida_id": 1,
  "precio": "16500.00",
  "fecha_registro": "2024-01-15",
  "stock": 120,
  "fecha_caducidad": "2024-03-15"
}
```

---

### **Actualización parcial de un precio de producto**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PATCH</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "stock": 95
}
```

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "Producto": "Cosecha de Tomate #123",
  "Producto_id": 123,
  "nombre_producto": "Tomate Cherry",
  "unidad_medida": {
    "id": 1,
    "nombre": "kg",
    "descripcion": "Kilogramo",
    "creada_por_usuario": false,
    "fecha_creacion": "2024-01-01T00:00:00Z"
  },
  "unidad_medida_id": 1,
  "precio": "16500.00",
  "fecha_registro": "2024-01-15",
  "stock": 95,
  "fecha_caducidad": "2024-03-15"
}
```

---

### **Eliminar un precio de producto**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta exitosa (204 No Content):**
```json
{}
```

---

## **Endpoints Especializados**

### **Registrar venta de producto**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/{id}/registrar_venta/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/{id}/registrar_venta/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "cantidad": 25
}
```

**Validaciones:**
- `cantidad` debe ser mayor a 0
- `cantidad` no puede exceder el stock disponible
- Se actualiza automáticamente el stock del producto

**Ejemplo de respuesta (200 OK):**
```json
{
  "mensaje": "Venta registrada. Stock actual: 70"
}
```

---

## **Endpoints de Unidades de Medida**

### **Obtener todas las unidades de medida**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/unidades_medida/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/unidades_medida/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "kg",
    "descripcion": "Kilogramo",
    "creada_por_usuario": false,
    "fecha_creacion": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "nombre": "unidades",
    "descripcion": "Unidad individual",
    "creada_por_usuario": false,
    "fecha_creacion": "2024-01-01T00:00:00Z"
  }
]
```

---

### **Crear una nueva unidad de medida**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/crear_unidad_medida/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/crear_unidad_medida/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "nombre": "cajas",
  "descripcion": "Caja de empaque estándar"
}
```

**Validaciones:**
- `nombre` debe ser único y obligatorio (máximo 50 caracteres)
- `descripcion` es opcional
- `creada_por_usuario` se marca automáticamente como `true`

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 3,
  "nombre": "cajas",
  "descripcion": "Caja de empaque estándar",
  "creada_por_usuario": true,
  "fecha_creacion": "2024-01-17T10:30:00Z"
}
```

---

## **Endpoints de Reportes**

### **Generar reporte PDF de precios de productos**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/precio-producto/reporte_pdf/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/precio-producto/reporte_pdf/"><div></div></button></div>
    </figure>
  </div>
</section>

**Descripción:**
Genera un reporte PDF completo con todos los precios de productos registrados, incluyendo:
- Información detallada de cada precio (ID, producto, unidad de medida, precio, fechas, stock)
- Resumen estadístico con totales y suma de precios
- Formato profesional con logotipo empresarial
- Optimización de consultas con select_related

**Ejemplo de respuesta:**
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="reporte_precios_productos.pdf"`

**Contenido del reporte incluye:**
1. **Objetivo**: Detalle de precios, stock y fechas de caducidad de productos
2. **Registro de Precios de Productos**: Tabla completa con todos los campos
3. **Resumen General**: Estadísticas totales del inventario

---

## **Manejo de Errores**

### **Ejemplo de error (404 Not Found):**
```json
{
  "detail": "No encontrado."
}
```

### **Ejemplo de error (400 Bad Request):**
```json
{
  "error": "Bad Request",
  "detail": "El campo 'precio' debe ser un decimal válido."
}
```

### **Ejemplo de error de validación de stock:**
```json
{
  "error": "El stock no puede ser negativo."
}
```

### **Ejemplo de error de validación de fechas:**
```json
{
  "error": "La fecha de caducidad no puede ser anterior al registro."
}
```

### **Ejemplo de error de stock insuficiente en venta:**
```json
{
  "error": "No hay suficiente stock disponible."
}
```

### **Ejemplo de error de cantidad inválida en venta:**
```json
{
  "error": "La cantidad debe ser mayor a 0."
}
```

### **Ejemplo de error de validación de campos:**
```json
{
  "precio": ["Este campo es obligatorio."],
  "fecha_registro": ["La fecha tiene un formato inválido. Use uno de estos formatos en su lugar: YYYY-MM-DD."]
}
```

### **Ejemplo de error de autenticación (401 Unauthorized):**
```json
{
  "detail": "Las credenciales de autenticación no se proporcionaron."
}
```

### **Ejemplo de error de permisos (403 Forbidden):**
```json
{
  "detail": "No tienes permisos para realizar esta acción."
}
```

---

## **Códigos de Estado Comunes**

| Código | Descripción |
|--------|-------------|
| `200` | OK (GET, PUT, PATCH exitoso) |
| `201` | Created (POST exitoso) |
| `204` | No Content (DELETE exitoso) |
| `400` | Bad Request (datos inválidos o validaciones fallidas) |
| `401` | Unauthorized (autenticación requerida) |
| `403` | Forbidden (permisos insuficientes) |
| `404` | Not Found (precio de producto no encontrado) |
| `409` | Conflict (restricción de integridad) |

---

## **Buenas Prácticas**

✔️ **Vinculación completa:** Siempre asociar el precio con un `Producto_id` y `unidad_medida_id` para trazabilidad.  
✔️ **Fechas consistentes:** Verificar que `fecha_caducidad` sea posterior a `fecha_registro`.  
✔️ **Control de stock:** Mantener el stock actualizado usando el endpoint `/registrar_venta/` para ventas.  
✔️ **Precios realistas:** Establecer precios competitivos basados en costos de producción y mercado.  
✔️ **Gestión de caducidad:** Monitorear productos próximos a vencer para minimizar pérdidas.  
✔️ **Unidades apropiadas:** Seleccionar unidades de medida que reflejen la forma real de comercialización.  
✔️ **Reportes periódicos:** Generar reportes PDF regularmente para análisis de precios y stock.

---

## **Integraciones Comunes**

▸ **Gestión de Ventas:** Integración directa con el endpoint `/registrar_venta/` para:  
    • Descuento automático de stock  
    • Trazabilidad de transacciones  
    • Control de inventario en tiempo real  
▸ **Sistema de Cosechas:** Vinculación con `Cosecha` para:  
    • Seguimiento desde producción hasta venta  
    • Análisis de rentabilidad por cultivo  
    • Planificación de siembras futuras  
▸ **Alertas y Notificaciones:** Monitoreo automático para:  
    • Stock bajo (umbral configurable)  
    • Productos próximos a vencer  
    • Cambios de precios significativos  
▸ **Análisis Financiero:** Integración con módulos de finanzas para:  
    • Cálculo de ingresos por producto  
    • Análisis de márgenes de ganancia  
    • Proyecciones de ventas  
▸ **Reportes y Dashboard:** Dashboards interactivos mostrando:  
    • Evolución de precios históricos  
    • Rotación de inventario  
    • Productos más rentables  
    • Análisis estacional de demanda

---

## **Relaciones Clave**
```mermaid
graph TD
    A[PrecioProducto] --> B[Cosecha/Producto]
    A --> C[UnidadMedida]
    A --> D[Sistema de Ventas]
    A --> E[Reportes PDF]
    A --> F[Dashboard Financiero]
    B --> G[Cultivo]
    C --> H[Inventario]
```

---

## **Configuración de Autenticación**

**Requerido:** JWT Authentication  
**Permisos:** IsAuthenticated + PermisoPorRol  
**Headers necesarios:**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Ejemplo de header completo:**
```http
GET /inventario/precio-producto/ HTTP/1.1
Host: 127.0.0.1:8000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

---

## **Casos de Uso Específicos**

### **Registro de nuevo producto con precio**
```json
POST /inventario/precio-producto/
{
  "Producto_id": 100,
  "unidad_medida_id": 1,
  "precio": "12000.00",
  "fecha_registro": "2024-01-18",
  "stock": 50,
  "fecha_caducidad": "2024-02-18"
}
```

### **Actualización de precio por inflación**
```json
PATCH /inventario/precio-producto/1/
{
  "precio": "13500.00"
}
```

### **Venta con descuento de stock**
```json
POST /inventario/precio-producto/1/registrar_venta/
{
  "cantidad": 15
}
```

### **Control de productos próximos a vencer**
```http
GET /inventario/precio-producto/?fecha_caducidad__lte=2024-01-25
```

### **Análisis de productos con alto stock**
```http
GET /inventario/precio-producto/?stock__gte=100
```