---
title: "Gestión de Evapotranspiración"
slug: modules/IoT/evapotranspiracion
description: "Documentación de la API para la gestión de cálculos de evapotranspiración en Agrosoft."
---

# **Gestión de Evapotranspiración**

Los **registros de Evapotranspiración** documentan los cálculos diarios de evapotranspiración (ETo) para bancales de cultivo, basados en datos meteorológicos. Esta documentación cubre los endpoints RESTful para gestionar y calcular la evapotranspiración, así como para generar reportes en PDF.

---

## **Estructura de Datos**

| Campo        | Tipo           | Descripción                                      | Obligatorio |
|--------------|----------------|--------------------------------------------------|-------------|
| **id**       | `AutoField`    | Identificador único                              | No          |
| **fk_bancal**| `ForeignKey`   | Bancal asociado (puede ser nulo)                 | No          |
| **fecha**    | `DateField`    | Fecha del cálculo (formato YYYY-MM-DD)           | Sí          |
| **valor**    | `DecimalField` | Valor de evapotranspiración en mm/día (5 dígitos, 2 decimales) | Sí |
| **creado**   | `DateTimeField`| Fecha y hora de creación del registro            | Sí          |

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

**Parámetros opcionales:**
- `?fk_bancal=1`: Filtra por ID del bancal.
- `?fecha=2025-01-01`: Filtra por fecha (formato YYYY-MM-DD).

Resultado: Obtiene todos los registros de evapotranspiración filtrados.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
[
  {
    "id": 1,
    "fk_bancal": 1,
    "fecha": "2025-01-01",
    "valor": 5.20,
    "creado": "2025-01-01T12:00:00Z"
  }
]
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Obtiene un registro de evapotranspiración específico.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "fk_bancal": 1,
  "fecha": "2025-01-01",
  "valor": 5.20,
  "creado": "2025-01-01T12:00:00Z"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Crea un nuevo registro de evapotranspiración.

**Request:**
```json
{
  "fk_bancal": 1,
  "fecha": "2025-01-01",
  "valor": 5.20
}
```

**Response (201 Created):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "fk_bancal": 1,
  "fecha": "2025-01-01",
  "valor": 5.20,
  "creado": "2025-06-06T00:00:00Z"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Actualiza un registro de evapotranspiración existente.

**Request:**
```json
{
  "valor": 5.50
}
```

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "fk_bancal": 1,
  "fecha": "2025-01-01",
  "valor": 5.50,
  "creado": "2025-06-06T00:00:00Z"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**         | `application/json`            | Indica que la respuesta debe estar en formato JSON.      |

Resultado: Elimina un registro de evapotranspiración.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "message": "Registro eliminado correctamente",
  "id": 1
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/calcular/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/calcular/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Calcula y guarda la evapotranspiración para un bancal y fecha específicos.

**Request:**
```json
{
  "fk_bancal_id": 1,
  "fecha": "2025-01-01",
  "latitud": 4.65
}
```

**Response (201 Created):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "fk_bancal": 1,
  "fecha": "2025-01-01",
  "valor": 5.20,
  "creado": "2025-06-06T00:00:00Z"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/evapotranspiracion/reporte_pdf/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/evapotranspiracion/reporte_pdf/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/pdf`             | Indica que la respuesta debe ser un archivo PDF.          |

**Parámetros opcionales:**
- `?fecha_inicio=2025-01-01`: Fecha inicial (formato YYYY-MM-DD).
- `?fecha_fin=2025-01-31`: Fecha final (formato YYYY-MM-DD).

Resultado: Genera un reporte PDF con datos de evapotranspiración.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
- Un archivo PDF con:
  - Encabezado con logo y título.
  - Objetivo del reporte.
  - Tabla de registros (ID, bancal, fecha, valor, creado).
  - Resumen general con total de registros.

---

## **Ejemplos de Uso**

### **Calcular y consultar evapotranspiración:**
```bash
Método: POST 
URL: http://127.0.0.1:8000/iot/evapotranspiracion/calcular/
{
  "fk_bancal_id": 1,
  "fecha": "2025-01-01",
  "latitud": 4.65
}

Método: GET 
URL: http://127.0.0.1:8000/iot/evapotranspiracion/?fk_bancal=1&fecha=2025-01-01
```

### **Generar reporte PDF:**
```bash
Método: GET 
URL: http://127.0.0.1:8000/iot/evapotranspiracion/reporte_pdf/?fecha_inicio=2025-01-01&fecha_fin=2025-01-31
```

---

## **Validaciones**

1. **Campos requeridos:**
   ```python
   ["fecha", "valor"]
   ```

2. **Restricciones:**
   - `fk_bancal`: Opcional, debe corresponder a un `Bancal` existente si se proporciona.
   - `fecha`: Formato YYYY-MM-DD, obligatorio.
   - `valor`: Valor decimal (máx. 5 dígitos, 2 decimales, obligatorio).
   - `creado`: Generado automáticamente por el servidor.
   - **POST /calcular/**: Requiere `fk_bancal_id` (entero) y `fecha` (YYYY-MM-DD). `latitud` es opcional (decimal, por defecto 0).

3. **Unicidad:**
   - Combinación de `fk_bancal` y `fecha` debe ser única.

---

## **Manejo de Errores**

**Error (400 Bad Request):**
```json
{
  "error": "fk_bancal_id es requerido"
}
```

**Error (404 Not Found):**
```json
{
  "detail": "No encontrado."
}
```

**Error (409 Conflict):**
```json
{
  "error": "Conflicto",
  "detail": "Ya existe un registro para el bancal y fecha especificados."
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Logo no encontrado"
}
```

---

## **Buenas Prácticas**

✔️ **Datos meteorológicos:** Asegúrate de que existan datos meteorológicos suficientes para el bancal y fecha antes de calcular la evapotranspiración.  
✔️ **Uso de filtros:** Utiliza `fk_bancal` y `fecha` para consultas específicas y optimizar el rendimiento.  
✔️ **Latitud precisa:** Proporciona una `latitud` válida en `/calcular/` para mejorar la precisión del cálculo.  
✔️ **Monitoreo de errores:** Revisa los logs para identificar problemas en la generación de reportes PDF o cálculos fallidos.

---

## **Integraciones Comunes**

▸ **Datos Meteorológicos:** Los cálculos de evapotranspiración dependen de datos en `/iot/datosmeteorologicos/`.  
▸ **Trazabilidad:** Asociación con bancales para optimizar el riego en cultivos.  
▸ **Reportes:** Generación de reportes PDF con históricos de evapotranspiración.  
▸ **Gestión de Recursos:** Uso de valores de ETo para planificar el riego en la interfaz de Agrosoft.

--- 