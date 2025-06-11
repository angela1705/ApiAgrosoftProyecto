---
title: "Gestión de Herramientas"
slug: modules/inventario/herramientas
description: "Documentación de la API para la gestión de herramientas en Agrosoft."
---

# **Gestión de Herramientas**

Los **registros de Herramientas** documentan las herramientas disponibles en el inventario, incluyendo su nombre, descripción, cantidad, estado, fecha de registro y precio. Esta documentación cubre los endpoints RESTful para su gestión completa.

---

## **Endpoints de la API**

### **Obtener todas las herramientas**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/"><div></div></button></div>
    </figure>
  </div>
</section>

**Parámetros opcionales:**
- `?nombre=Martillo`: Filtra por nombre de herramienta.
- `?activo=true`: Filtra por herramientas activas.
- `?estado=Bueno`: Filtra por estado de la herramienta.

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Martillo Profesional",
    "descripcion": "Martillo de acero forjado con mango ergonómico para uso industrial",
    "cantidad": 5,
    "estado": "Bueno",
    "activo": true,
    "fecha_registro": "2024-01-15T10:30:00Z",
    "precio": "25000"
  },
  {
    "id": 2,
    "nombre": "Destornillador Set",
    "descripcion": "Juego de destornilladores de precisión, 12 piezas",
    "cantidad": 3,
    "estado": "Nuevo",
    "activo": true,
    "fecha_registro": "2024-01-16T14:22:00Z",
    "precio": "18000"
  }
]
```

---

### **Obtener una herramienta por ID**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Martillo Profesional",
  "descripcion": "Martillo de acero forjado con mango ergonómico para uso industrial",
  "cantidad": 5,
  "estado": "Bueno",
  "activo": true,
  "fecha_registro": "2024-01-15T10:30:00Z",
  "precio": "25000"
}
```

---

### **Registrar una nueva herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "nombre": "Taladro Inalámbrico",
  "descripcion": "Taladro inalámbrico de 18V con batería de litio y portabrocas de 13mm",
  "cantidad": 2,
  "estado": "Nuevo",
  "activo": true,
  "precio": "120000"
}
```

**Validaciones:**
- Campos obligatorios: `nombre`, `descripcion`, `cantidad`, `estado`
- `cantidad` debe ser un entero (puede ser negativo para casos especiales de inventario)
- `estado` debe ser una cadena de máximo 50 caracteres
- `precio` debe ser un número decimal (por defecto 0)
- `activo` es opcional (por defecto `true`)
- `fecha_registro` se establece automáticamente al momento de la creación

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 3,
  "nombre": "Taladro Inalámbrico",
  "descripcion": "Taladro inalámbrico de 18V con batería de litio y portabrocas de 13mm",
  "cantidad": 2,
  "estado": "Nuevo",
  "activo": true,
  "fecha_registro": "2024-01-17T09:15:00Z",
  "precio": "120000"
}
```

---

### **Actualizar una herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "cantidad": 8,
  "estado": "Usado",
  "precio": "22000"
}
```

**Restricciones:**
- Todos los campos son modificables
- `fecha_registro` no se actualiza automáticamente en PUT (mantiene valor original)
- Se puede actualizar el estado según el uso real de la herramienta

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Martillo Profesional",
  "descripcion": "Martillo de acero forjado con mango ergonómico para uso industrial",
  "cantidad": 8,
  "estado": "Usado",
  "activo": true,
  "fecha_registro": "2024-01-15T10:30:00Z",
  "precio": "22000"
}
```

---

### **Actualización parcial de una herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PATCH</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de solicitud:**
```json
{
  "estado": "Mantenimiento"
}
```

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Martillo Profesional",
  "descripcion": "Martillo de acero forjado con mango ergonómico para uso industrial",
  "cantidad": 8,
  "estado": "Mantenimiento",
  "activo": true,
  "fecha_registro": "2024-01-15T10:30:00Z",
  "precio": "22000"
}
```

---

### **Eliminar una herramienta**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/{id}/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Ejemplo de respuesta exitosa (204 No Content):**
```json
{}
```

---

## **Endpoints de Reportes**

### **Generar reporte PDF de herramientas**

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>

URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code">http://127.0.0.1:8000/inventario/herramientas/reporte_pdf/</div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/inventario/herramientas/reporte_pdf/"><div></div></button></div>
    </figure>
  </div>
</section>

**Descripción:**
Genera un reporte PDF completo con todas las herramientas registradas, incluyendo:
- Información detallada de cada herramienta (ID, nombre, descripción, cantidad, estado, fecha de registro, precio)
- Resumen estadístico del inventario
- Formato profesional con logotipo empresarial
- Totales de herramientas y cantidades acumuladas

**Ejemplo de respuesta:**
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="reporte_herramientas.pdf"`

**Contenido del reporte incluye:**
1. **Objetivo**: Detalle de herramientas registradas para gestión eficiente
2. **Inventario de Herramientas**: Tabla completa con todos los campos
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
  "detail": "El campo 'cantidad' debe ser un entero válido."
}
```

### **Ejemplo de error de validación:**
```json
{
  "nombre": ["Este campo es obligatorio."],
  "estado": ["Asegúrate de que este campo no tenga más de 50 caracteres."]
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
| `400` | Bad Request (datos inválidos) |
| `401` | Unauthorized (autenticación requerida) |
| `403` | Forbidden (permisos insuficientes) |
| `404` | Not Found (herramienta no encontrada) |
| `409` | Conflict (restricción de integridad) |

---

## **Estados de Herramientas Comunes**

**Estados recomendados para el campo `estado`:**
- `"Nuevo"`: Herramienta sin uso previo
- `"Bueno"`: Herramienta en condiciones óptimas
- `"Usado"`: Herramienta con uso normal
- `"Mantenimiento"`: Herramienta en reparación
- `"Dañado"`: Herramienta con averías
- `"Desechado"`: Herramienta fuera de servicio

---

## **Buenas Prácticas**

✔️ **Registro detallado:** Incluir especificaciones técnicas en `descripcion` (voltaje, tamaño, materiales).  
✔️ **Estados actualizados:** Mantener el `estado` sincronizado con la condición real de la herramienta.  
✔️ **Precios realistas:** Actualizar `precio` según depreciación y condiciones del mercado.  
✔️ **Inventario preciso:** Registrar inmediatamente cambios en `cantidad` tras uso o reabastecimiento.  
✔️ **Información de fecha:** Aprovechar `fecha_registro` para análisis de antigüedad y rotación.  
✔️ **Categorización:** Usar nombres descriptivos que incluyan marca y modelo cuando sea relevante.

---

## **Integraciones Comunes**

▸ **Notificaciones:** Alertas cuando:  
    • La cantidad de herramientas cae por debajo de un umbral  
    • El estado cambia a "Mantenimiento" o "Dañado"  
▸ **Inventario:** Sincronización con `BodegaHerramienta` para reflejar disponibilidad por bodega.  
▸ **Actividades:** Vinculación con actividades agrícolas para trazabilidad de uso.  
▸ **Reportes:**  
    • Estado general de herramientas por categoría  
    • Análisis de costos y depreciación  
    • Histórico de uso y modificaciones  
    • Programación de mantenimientos preventivos  
▸ **Análisis financiero:** Integración con módulos de costos para:  
    • Cálculo de depreciación  
    • Análisis de ROI por herramienta  
    • Planificación de compras

---

## **Relaciones Clave**
```mermaid
graph TD
    A[Herramienta] --> B[BodegaHerramienta]
    A --> C[Actividades]
    A --> D[Reportes PDF]
    A --> E[Sistema de Costos]
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
GET /inventario/herramientas/ HTTP/1.1
Host: 127.0.0.1:8000
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
Content-Type: application/json
```

---

## **Casos de Uso Específicos**

### **Gestión de Mantenimiento**
```json
PATCH /inventario/herramientas/1/
{
  "estado": "Mantenimiento",
  "descripcion": "Martillo Profesional - En mantenimiento por desgaste del mango"
}
```

### **Control de Depreciación**
```json
PUT /inventario/herramientas/1/
{
  "precio": "20000",
  "estado": "Usado",
  "descripcion": "Martillo Profesional - Depreciación por uso intensivo"
}
```

### **Baja de Herramienta**
```json
PATCH /inventario/herramientas/1/
{
  "activo": false,
  "estado": "Desechado"
}
```