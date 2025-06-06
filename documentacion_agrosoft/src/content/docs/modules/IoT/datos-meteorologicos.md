---
title: "Gestión de Datos Meteorológicos"
slug: modules/IoT/datos-meteorologicos
description: "Documentación de la API y WebSocket para la gestión de datos meteorológicos en Agrosoft."
---

# **Gestión de Datos Meteorológicos**

Los **registros de Datos Meteorológicos** documentan las mediciones recopiladas por sensores IoT, como temperatura, humedad, luminosidad, lluvia, viento y propiedades del suelo, asociadas a bancales de cultivo. Esta documentación cubre los endpoints RESTful y el WebSocket para su gestión en tiempo real.

---

## **Estructura de Datos**

| Campo               | Tipo           | Descripción                              | Obligatorio |
|---------------------|----------------|------------------------------------------|-------------|
| **id**              | `AutoField`    | Identificador único                      | No          |
| **fk_sensor**       | `ForeignKey`   | Sensor que generó el dato                | Sí          |
| **fk_bancal**       | `ForeignKey`   | Bancal asociado (opcional)               | No          |
| **temperatura**     | `DecimalField` | Valor en °C (10 dígitos, 2 decimales)    | No          |
| **humedad_ambiente**| `DecimalField` | Valor en % (10 dígitos, 2 decimales)     | No          |
| **luminosidad**     | `DecimalField` | Valor en lux (10 dígitos, 2 decimales)   | No          |
| **lluvia**          | `DecimalField` | Valor en mm (5 dígitos, 2 decimales)     | No          |
| **velocidad_viento**| `DecimalField` | Valor en m/s (5 dígitos, 2 decimales)    | No          |
| **direccion_viento**| `DecimalField` | Valor en grados (3 dígitos, 0 decimales) | No          |
| **humedad_suelo**   | `DecimalField` | Valor en % (5 dígitos, 2 decimales)      | No          |
| **ph_suelo**        | `DecimalField` | Valor en pH (4 dígitos, 2 decimales)     | No          |
| **fecha_medicion**  | `DateTimeField`| Fecha y hora de la medición              | Sí          |

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/datosmeteorologicos/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/datosmeteorologicos/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

**Parámetros opcionales:**
- `?fk_sensor_id=1`: Filtra por ID del sensor.
- `?fk_bancal_id=1`: Filtra por ID del bancal.
- `?fecha_inicio=2025-01-01`: Fecha inicial (formato YYYY-MM-DD).
- `?fecha_fin=2025-01-31`: Fecha final (formato YYYY-MM-DD).

Resultado: Obtiene todos los datos meteorológicos filtrados.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
[
  {
    "id": 1,
    "sensor_nombre": "Sensor DHT22 Patio",
    "bancal_nombre": "Patio 1",
    "temperatura": 25.50,
    "humedad_ambiente": 60.00,
    "luminosidad": 1000.00,
    "lluvia": 0.00,
    "velocidad_viento": 10.50,
    "direccion_viento": 180,
    "humedad_suelo": 45.00,
    "ph_suelo": 6.50,
    "fecha_medicion": "2025-01-01T12:00:00Z"
  }
]
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/datosmeteorologicos/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/datosmeteorologicos/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Obtiene un dato meteorológico específico.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "sensor_nombre": "Sensor DHT22 Patio",
  "bancal_nombre": "Patio 1",
  "temperatura": 25.50,
  "humedad_ambiente": 60.00,
  "luminosidad": 1000.00,
  "lluvia": 0.00,
  "velocidad_viento": 10.50,
  "direccion_viento": 180,
  "humedad_suelo": 45.00,
  "ph_suelo": 6.50,
  "fecha_medicion": "2025-01-01T12:00:00Z"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/datosmeteorologicos/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/datosmeteorologicos/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Crea un nuevo registro de datos meteorológicos.

**Request:**
```json
{
  "device_code": "DHT22_001",
  "temperatura": 25.5,
  "humedad_ambiente": 60.0,
  "luminosidad": 1000.0,
  "lluvia": 0.0,
  "velocidad_viento": 10.5,
  "direccion_viento": 180,
  "humedad_suelo": 45.0,
  "ph_suelo": 6.5
}
```

**Response (201 Created):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "sensor_nombre": "Sensor DHT22 Patio",
  "bancal_nombre": "Patio 1",
  "temperatura": 25.50,
  "humedad_ambiente": 60.00,
  "luminosidad": 1000.00,
  "lluvia": 0.00,
  "velocidad_viento": 10.50,
  "direccion_viento": 180,
  "humedad_suelo": 45.00,
  "ph_suelo": 6.50,
  "fecha_medicion": "2025-06-06T00:00:00Z"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/datosmeteorologicos/reporte_pdf/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/datosmeteorologicos/reporte_pdf/"><div></div></button></div>
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

Resultado: Genera un reporte PDF con datos meteorológicos.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
- Un archivo PDF con:
  - Encabezado con logo y título.
  - Objetivo del reporte.
  - Tabla de los últimos 100 registros (ID, sensor, bancal, temperatura, humedad, fecha).
  - Tabla de promedios diarios (fecha, temperatura promedio, humedad promedio).
  - Resumen general con total de registros y promedios globales.

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">WS</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-http" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">ws://127.0.0.1:8000/ws/realtime/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="ws://127.0.0.1:8000/ws/realtime/"><div></div></button></div>
    </figure>
  </div>
</section>

Resultado: Conexión WebSocket para datos en tiempo real.

**Request:**
```json
{
  "device_code": "DHT22_001",
  "temperatura": 25.5,
  "humedad_ambiente": 60.0,
  "luminosidad": 1000.0,
  "lluvia": 0.0,
  "velocidad_viento": 10.5,
  "direccion_viento": 180,
  "humedad_suelo": 45.0,
  "ph_suelo": 6.5
}
```

**Response (tipo `weather_data`):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "type": "weather_data",
  "data": {
    "id": 1,
    "sensor_nombre": "Sensor DHT22 Patio",
    "bancal_nombre": "Patio 1",
    "temperatura": 25.50,
    "humedad_ambiente": 60.00,
    "luminosidad": 1000.00,
    "lluvia": 0.00,
    "velocidad_viento": 10.50,
    "direccion_viento": 180,
    "humedad_suelo": 45.00,
    "ph_suelo": 6.50,
    "fecha_medicion": "2025-06-06T00:00:00Z"
  }
}
```

**Response (tipo `weather_alert`):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "type": "weather_alert",
  "data": {
    "id": "abc123",
    "type": "temperatura_above_threshold",
    "message": "Alerta: Temperatura alta en Sensor DHT22 Patio (Patio 1): 50.5 (máximo permitido: 50)",
    "timestamp": "2025-06-06T00:00:00Z",
    "device_code": "DHT22_001",
    "source": "meteorological_data"
  }
}
```

---

## **Ejemplos de Uso**

### **Registrar y consultar datos meteorológicos:**
```bash
Método: POST 
URL: http://127.0.0.1:8000/iot/datosmeteorologicos/
{
  "device_code": "DHT22_001",
  "temperatura": 25.5,
  "humedad_ambiente": 60.0,
  "luminosidad": 1000.0,
  "lluvia": 0.0,
  "velocidad_viento": 10.5,
  "direccion_viento": 180,
  "humedad_suelo": 45.0,
  "ph_suelo": 6.5
}

Método: GET 
URL: http://127.0.0.1:8000/iot/datosmeteorologicos/?fk_bancal_id=1&fecha_inicio=2025-01-01&fecha_fin=2025-01-31
```

### **Generar reporte PDF:**
```bash
Método: GET 
URL: http://127.0.0.1:8000/iot/datosmeteorologicos/reporte_pdf/?fecha_inicio=2025-01-01&fecha_fin=2025-01-31
```

### **Conexión WebSocket:**
```bash
URL: ws://127.0.0.1:8000/ws/realtime/
{
  "device_code": "DHT22_001",
  "temperatura": 50.5,
  "humedad_ambiente": 60.0
}
```

---

## **Validaciones**

1. **Campos requeridos:**
   ```python
   ["device_code"]
   ```

2. **Restricciones:**
   - `device_code`: Debe corresponder a un sensor registrado con `estado='activo'`.
   - `temperatura`: Valor decimal (máx. 10 dígitos, 2 decimales, opcional).
   - `humedad_ambiente`: Valor decimal (máx. 10 dígitos, 2 decimales, opcional).
   - `luminosidad`: Valor decimal (máx. 10 dígitos, 2 decimales, opcional).
   - `lluvia`: Valor decimal (máx. 5 dígitos, 2 decimales, opcional).
   - `velocidad_viento`: Valor decimal (máx. 5 dígitos, 2 decimales, opcional).
   - `direccion_viento`: Valor decimal (máx. 3 dígitos, 0 decimales, opcional).
   - `humedad_suelo`: Valor decimal (máx. 5 dígitos, 2 decimales, opcional).
   - `ph_suelo`: Valor decimal (máx. 4 dígitos, 2 decimales, opcional).
   - `fecha_medicion`: Generada automáticamente en el servidor.

3. **Umbrales para alertas (WebSocket):**
   - `temperatura`: 0–50 °C
   - `humedad_ambiente`: 20–90 %
   - `luminosidad`: 100–100000 lux
   - `lluvia`: 0–50 mm
   - `velocidad_viento`: 0–20 m/s
   - `humedad_suelo`: 10–80 %
   - `ph_suelo`: 5.5–7.5

---

## **Manejo de Errores**

**Error (404 Not Found):**
```json
{
  "detail": "No encontrado."
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Bad Request",
  "detail": "No existe un sensor con device_code = 'DHT22_001'."
}
```

**Error WebSocket:**
```json
{
  "error": "device_code requerido"
}
```

---

## **Buenas Prácticas**

✔️ **Frecuencia de envío:** Configura los sensores para enviar datos cada 5-10 segundos para evitar saturar el servidor.  
✔️ **Validación de sensores:** Asegúrate de que el `device_code` esté registrado y el sensor esté en estado `activo` antes de enviar datos.  
✔️ **Monitoreo de alertas:** Revisa las alertas enviadas por WebSocket para tomar acciones inmediatas ante valores anómalos.  
✔️ **Uso de filtros:** Utiliza parámetros como `fecha_inicio` y `fk_bancal_id` para consultas específicas y optimizar el rendimiento.

---

## **Integraciones Comunes**

▸ **Notificaciones:** Alertas en tiempo real vía WebSocket cuando los datos exceden umbrales (ej. temperatura > 50°C).  
▸ **Evapotranspiración:** Los datos se usan para calcular la evapotranspiración en `/iot/evapotranspiracion/calcular/`.  
▸ **Reportes:**  
    • Reportes PDF con históricos y promedios diarios.  
    • Visualización en gráficos en tiempo real en la interfaz de Agrosoft.  
▸ **Trazabilidad:** Asociación con bancales para monitoreo de condiciones agrícolas.

--- 