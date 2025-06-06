---
title: "Gestión de Sensores"
slug: modules/IoT/sensores
description: "Documentación de la API para la gestión de sensores en el módulo de IoT de Agrosoft."
---

# **Gestión de Sensores**

Los **Sensores** son dispositivos IoT que recopilan datos meteorológicos en tiempo real, como temperatura, humedad, luminosidad, lluvia, viento y propiedades del suelo, asociados a bancales de cultivo. Esta documentación cubre los endpoints RESTful para la gestión de sensores.

---

## **Estructura de Datos**

| Campo             | Tipo           | Descripción                                      | Obligatorio |
|-------------------|----------------|--------------------------------------------------|-------------|
| **id**            | `AutoField`    | Identificador único                              | No          |
| **nombre**        | `CharField`    | Nombre del sensor (máx. 100 caracteres, único)   | Sí          |
| **tipo_sensor**   | `ForeignKey`   | Tipo de sensor (referencia a TipoSensor)         | Sí          |
| **descripcion**   | `TextField`    | Información adicional (opcional)                 | No          |
| **bancal**        | `ForeignKey`   | Bancal asociado (opcional, puede ser nulo)       | No          |
| **medida_minima** | `DecimalField` | Valor mínimo registrable (10 dígitos, 2 decimales) | Sí        |
| **medida_maxima** | `DecimalField` | Valor máximo registrable (10 dígitos, 2 decimales) | Sí        |
| **estado**        | `CharField`    | Estado del sensor ("activo" o "inactivo")        | Sí          |
| **device_code**   | `CharField`    | Código único del dispositivo (máx. 100 caracteres, opcional) | No |

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/sensores/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/sensores/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Obtiene todos los sensores registrados.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
[
  {
    "id": 1,
    "nombre": "Sensor DHT22 Patio",
    "tipo_sensor_nombre": "DHT22",
    "unidad_medida": "°C/%",
    "descripcion": "Sensor de temperatura y humedad",
    "bancal_nombre": "Patio 1",
    "medida_minima": 0.00,
    "medida_maxima": 50.00,
    "estado": "activo",
    "device_code": "DHT22_001"
  }
]
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/sensores/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/sensores/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Obtiene un sensor específico.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_nombre": "DHT22",
  "unidad_medida": "°C/%",
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_nombre": "Patio 1",
  "medida_minima": 0.00,
  "medida_maxima": 50.00,
  "estado": "activo",
  "device_code": "DHT22_001"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/sensores/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/sensores/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Crea un nuevo sensor.

**Request:**
```json
{
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_id": 1,
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_id": 1,
  "medida_minima": 0.0,
  "medida_maxima": 50.0,
  "estado": "activo",
  "device_code": "DHT22_001"
}
```

**Response (201 Created):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_nombre": "DHT22",
  "unidad_medida": "°C/%",
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_nombre": "Patio 1",
  "medida_minima": 0.00,
  "medida_maxima": 50.00,
  "estado": "activo",
  "device_code": "DHT22_001"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-54" href="/iot">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;">http://127.0.0.1:8000/iot/sensores/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/sensores/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type**  | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Actualiza un sensor existente.

**Request:**
```json
{
  "nombre": "Sensor DHT22 Patio Modificado",
  "descripcion": "Sensor actualizado"
}
```

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "id": 1,
  "nombre": "Sensor DHT22 Patio Modificado",
  "tipo_sensor_nombre": "DHT22",
  "unidad_medida": "°C/%",
  "descripcion": "Sensor actualizado",
  "bancal_nombre": "Patio 1",
  "medida_minima": 0.00,
  "medida_maxima": 50.00,
  "estado": "activo",
  "device_code": "DHT22_001"
}
```

---

<p><strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span></p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">
  <div class="expressive-code">
    <figure class="frame not-content">
      <pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/iot/sensores/{id}/</span></div></div></code></pre>
      <div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/iot/sensores/{id}/"><div></div></button></div>
    </figure>
  </div>
</section>

**Encabezados de la solicitud**
| Encabezado        | Valor                         | Descripción                                               |
|-------------------|-------------------------------|-----------------------------------------------------------|
| **Authorization** | `Bearer <token_de_acceso>`    | Token JWT necesario para autenticación.                   |
| **Accept**        | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

Resultado: Elimina un sensor.

**Response (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>
```json
{
  "message": "Sensor eliminado correctamente",
  "id": 1
}
```

---

## **Ejemplos de Uso**

### **Crear y actualizar un sensor:**
```bash
Método: POST 
URL: http://127.0.0.1:8000/iot/sensores/
{
  "nombre": "Sensor DHT22 Patio",
  "tipo_sensor_id": 1,
  "descripcion": "Sensor de temperatura y humedad",
  "bancal_id": 1,
  "medida_minima": 0.0,
  "medida_maxima": 50.0,
  "estado": "activo",
  "device_code": "DHT22_001"
}

Método: PUT 
URL: http://127.0.0.1:8000/iot/sensores/1/
{
  "nombre": "Sensor DHT22 Patio Modificado",
  "descripcion": "Sensor actualizado"
}
```

### **Listar sensores:**
```bash
Método: GET 
URL: http://127.0.0.1:8000/iot/sensores/
```

---

## **Validaciones**

1. **Campos requeridos:**
   ```python
   ["nombre", "tipo_sensor_id", "medida_minima", "medida_maxima", "estado"]
   ```

2. **Restricciones:**
   - `nombre`: Máximo 100 caracteres, debe ser único (insensible a mayúsculas/minúsculas).
   - `tipo_sensor_id`: Debe corresponder a un `TipoSensor` existente.
   - `bancal_id`: Opcional, debe corresponder a un `Bancal` existente si se proporciona.
   - `medida_minima`: Valor decimal (máx. 10 dígitos, 2 decimales, por defecto 0.0).
   - `medida_maxima`: Valor decimal (máx. 10 dígitos, 2 decimales, por defecto 0.0).
   - `estado`: Solo permite "activo" o "inactivo".
   - `device_code`: Opcional, máximo 100 caracteres, debe ser único si se proporciona.

3. **Unicidad:**
   - Combinación de `nombre` y `device_code` (si se proporciona) debe ser única.

---

## **Manejo de Errores**

**Error (400 Bad Request):**
```json
{
  "error": "Bad Request",
  "detail": "Faltan campos obligatorios: nombre, tipo_sensor_id."
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
  "detail": "Ya existe un sensor con nombre 'Sensor DHT22 Patio' o device_code 'DHT22_001'."
}
```

---

## **Buenas Prácticas**

✔️ **Configuración de device_code:** Asegúrate de que el `device_code` coincida exactamente con el configurado en el dispositivo físico para la comunicación WebSocket.  
✔️ **Estado del sensor:** Usa sensores con estado "activo" para procesar datos meteorológicos en tiempo real.  
✔️ **Asociación con bancales:** Vincula sensores a bancales específicos para mejorar la trazabilidad de los datos.  
✔️ **Validación previa:** Verifica la existencia de `tipo_sensor_id` y `bancal_id` antes de enviar solicitudes para evitar errores.

---

## **Integraciones Comunes**

▸ **Datos Meteorológicos:** Los sensores envían datos a `/iot/datosmeteorologicos/` y `/ws/realtime/` para monitoreo en tiempo real.  
▸ **Trazabilidad:** Asociación con bancales para correlacionar datos meteorológicos con cultivos.  
▸ **Alertas:** Configuración de umbrales en `medida_minima` y `medida_maxima` para generar alertas en el módulo de datos meteorológicos.  
▸ **Configuración:** Uso de `TipoSensor` para definir características comunes de los sensores.

---
 