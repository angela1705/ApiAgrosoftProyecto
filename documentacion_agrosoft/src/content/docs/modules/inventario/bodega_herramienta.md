---
title: "Gestión de Bodega Herramienta"
slug: modules/inventario/bodega_herramienta
description: "Documentación de la API para la gestión de bodega herramienta en Agrosoft."
---

# **Gestión de Bodega Herramienta**

Los **registros de Bodega Herramienta** documentan la relación entre herramientas y bodegas, incluyendo la cantidad disponible, costo total, cantidad prestada y usuario creador de cada herramienta en una bodega específica. Esta documentación cubre los endpoints RESTful para su gestión completa.

---

## **Endpoints de la API**

### **Obtener todas las relaciones entre bodegas y herramientas**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/"><div></div></button></div>
    </figure>
  </div>
</section>

**Parámetros opcionales:**
- `?bodega=1`: Filtra por ID de bodega específica.
- `?herramienta=2`: Filtra por ID de herramienta específica.
- `?creador=3`: Filtra por ID de usuario creador.
- `?cantidad__gte=5`: Filtra cantidades mayores o iguales al valor especificado.

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "bodega": 1,
    "herramienta": 2,
    "cantidad": 5,
    "creador": 3,
    "costo_total": "125000.00",
    "cantidad_prestada": 2
  },
  {
    "id": 2,
    "bodega": 1,
    "herramienta": 4,
    "cantidad": 3,
    "creador": 3,
    "costo_total": "54000.00",
    "cantidad_prestada": 0
  }
]
```

---

### **Obtener una relación específica por ID**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "bodega": 1,
  "herramienta": 2,
  "cantidad": 5,
  "creador": 3,
  "costo_total": "125000.00",
  "cantidad_prestada": 2
}
```

---

### **Registrar una nueva relación entre bodega y herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "bodega": 1,
  "herramienta": 2,
  "cantidad": 3,
  "creador": null,
  "cantidad_prestada": 0
}
```

**Validaciones:**
- Campos obligatorios: `bodega`, `herramienta`
- `cantidad` debe ser un entero positivo (≥ 1, por defecto 1)
- `cantidad_prestada` debe ser un entero positivo (≥ 0, por defecto 0)
- `cantidad` no puede exceder la cantidad disponible de la herramienta
- `creador` es opcional (se asigna automáticamente al usuario autenticado)
- `costo_total` se calcula automáticamente (cantidad × precio de herramienta)

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 3,
  "bodega": 1,
  "herramienta": 2,
  "cantidad": 3,
  "creador": 3,
  "costo_total": "75000.00",
  "cantidad_prestada": 0
}
```

---

### **Actualizar una relación entre bodega y herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "bodega": 1,
  "herramienta": 2,
  "cantidad": 4,
  "cantidad_prestada": 1
}
```

**Restricciones:**
- Todos los campos son modificables
- `creador` se actualiza automáticamente al usuario autenticado
- `costo_total` se recalcula automáticamente al cambiar la cantidad
- Se aplican las mismas validaciones que en la creación

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "bodega": 1,
  "herramienta": 2,
  "cantidad": 4,
  "creador": 3,
  "costo_total": "100000.00",
  "cantidad_prestada": 1
}
```

---

### **Actualización parcial de una relación**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PATCH</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "cantidad_prestada": 3
}
```

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "bodega": 1,
  "herramienta": 2,
  "cantidad": 4,
  "creador": 3,
  "costo_total": "100000.00",
  "cantidad_prestada": 3
}
```

---

### **Eliminar una relación entre bodega y herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta exitosa (204 No Content):**
```json
{}
```

---

## **Endpoints de Reportes**

### **Generar reporte PDF de bodega herramientas**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/bodega_herramienta/reporte_pdf/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/bodega_herramienta/reporte_pdf/"><div></div></button></div>
    </figure>
  </div>
</section>

**Descripción:**
Genera un reporte PDF completo con todas las relaciones de bodega-herramienta registradas, incluyendo:
- Información detallada de cada relación (ID, bodega, herramienta, cantidad, costo total, cantidad prestada)
- Resumen estadístico con totales acumulados
- Formato profesional con logotipo empresarial

**Ejemplo de respuesta:**
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="reporte_bodega_herramientas.pdf"`

**Contenido del reporte incluye:**
1. **Objetivo**: Control y gestión de herramientas almacenadas en bodega
2. **Inventario de Herramientas**: Tabla completa con todos los campos
3. **Resumen General**: Estadísticas totales de herramientas, cantidades, costos y préstamos

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
  "detail": "El campo 'cantidad' debe ser un entero positivo."
}
```

### **Ejemplo de error de validación de cantidad:**
```json
{
  "cantidad": [
    "La cantidad ingresada (10) excede la cantidad disponible (8) para la herramienta Martillo Profesional."
  ]
}
```

### **Ejemplo de error de validación de campos:**
```json
{
  "bodega": ["Este campo es obligatorio."],
  "herramienta": ["Este campo es obligatorio."]
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
| `404` | Not Found (relación no encontrada) |
| `409` | Conflict (restricción de integridad) |

---

## **Funcionalidades Automáticas**

### **Cálculo Automático de Costo Total:**
El campo `costo_total` se calcula automáticamente usando la fórmula:
```
costo_total = cantidad × precio_herramienta
```

**Ejemplo:**
- Cantidad: 5 unidades
- Precio de herramienta: $25,000
- Costo total: $125,000

### **Asignación Automática de Creador:**
El campo `creador` se asigna automáticamente al usuario autenticado en las operaciones de creación y actualización.

### **Validación de Stock Disponible:**
El sistema valida que la cantidad asignada no exceda la cantidad disponible de la herramienta en el inventario principal.

---

## **Gestión de Préstamos**

### **Control de Herramientas Prestadas:**
El campo `cantidad_prestada` permite llevar un control de cuántas unidades de una herramienta están actualmente prestadas.

**Estados típicos:**
- `cantidad_prestada = 0`: Todas las herramientas disponibles en bodega
- `cantidad_prestada > 0`: Algunas herramientas están en préstamo
- `cantidad_prestada = cantidad`: Todas las herramientas están prestadas

### **Disponibilidad Real:**
```
Disponibilidad = cantidad - cantidad_prestada
```

---

## **Buenas Prácticas**

✔️ **Control de stock preciso:** Actualizar inmediatamente tras movimientos de herramientas.  
✔️ **Gestión de préstamos:** Mantener `cantidad_prestada` actualizada para reflejar herramientas en uso.  
✔️ **Verificación de disponibilidad:** Validar stock antes de asignar herramientas a nuevas bodegas.  
✔️ **Trazabilidad completa:** Aprovechar el campo `creador` para auditoría y seguimiento.  
✔️ **Cálculos automáticos:** Confiar en el sistema para cálculo de `costo_total`.  
✔️ **Reportes periódicos:** Generar reportes PDF regularmente para análisis de inventario.  
✔️ **Validaciones estrictas:** Respetar las validaciones del sistema para mantener integridad de datos.

---

## **Integraciones Comunes**

▸ **Sistema de Préstamos:** Integración con `PrestamoHerramienta` para:  
    • Control de herramientas entregadas y devueltas  
    • Actualización automática de `cantidad_prestada`  
    • Trazabilidad completa de movimientos  
▸ **Gestión de Inventario:** Sincronización con `Herramienta` para:  
    • Validación de stock disponible  
    • Actualización automática del inventario principal  
    • Control de disponibilidad en tiempo real  
▸ **Sistema de Usuarios:** Vinculación con `Usuarios` para:  
    • Trazabilidad de operaciones por usuario  
    • Control de permisos y accesos  
    • Auditoría de modificaciones  
▸ **Análisis Financiero:** Cálculos automáticos para:  
    • Valorización de inventario por bodega  
    • Análisis de costos por ubicación  
    • Reportes de inversión en herramientas  
▸ **Alertas y Notificaciones:** Monitoreo para:  
    • Herramientas con alto porcentaje de préstamos  
    • Bodegas con bajo stock  
    • Movimientos inusuales de inventario

---

## **Relaciones Clave**
```mermaid
graph TD
    A[Bodega] --> B[BodegaHerramienta]
    C[Herramienta] --> B
    D[Usuarios] --> B
    B --> E[PrestamoHerramienta]
    B --> F[Reportes PDF]
    B --> G[Sistema Financiero]
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
GET /inventario/bodega_herramienta/ HTTP/1.1
Host: 127.0.0.1:8000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

---

## **Casos de Uso Específicos**

### **Asignación inicial de herramientas a bodega**
```json
POST /inventario/bodega_herramienta/
{
  "bodega": 1,
  "herramienta": 5,
  "cantidad": 10
}
```

### **Registro de préstamo de herramientas**
```json
PATCH /inventario/bodega_herramienta/1/
{
  "cantidad_prestada": 3
}
```

### **Devolución de herramientas prestadas**
```json
PATCH /inventario/bodega_herramienta/1/
{
  "cantidad_prestada": 0
}
```

### **Consulta de herramientas por bodega específica**
```http
GET /inventario/bodega_herramienta/?bodega=1
```

### **Análisis de herramientas con préstamos activos**
```http
GET /inventario/bodega_herramienta/?cantidad_prestada__gt=0
```

### **Búsqueda por creador específico**
```http
GET /inventario/bodega_herramienta/?creador=3
```