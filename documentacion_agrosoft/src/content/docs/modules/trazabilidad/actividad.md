---
title: Gestión de actividades
---

Las **Actividades** son tareas programadas relacionadas con el manejo de cultivos, que involucran recursos, personal, herramientas, insumos y planificación.

## ¿Cómo registrar una actividad?
Para registrar una nueva actividad en Agrosoft:
1. Navega al módulo de Actividades.
2. Haz clic en el botón **"Nueva Actividad"**.
3. Completa los siguientes campos obligatorios:
   - **Tipo de actividad**: Selecciona de la lista disponible.
   - **Fechas**: Define inicio y fin de la actividad (en formato `YYYY-MM-DD HH:MM:SS`).
   - **Cultivo**: Selecciona el cultivo afectado.
   - **Usuarios responsables**: Asigna uno o más usuarios.
   - **Estado**: Selecciona el estado (PENDIENTE, EN_PROCESO, COMPLETADA, CANCELADA; por defecto: PENDIENTE).
   - **Prioridad**: Selecciona la prioridad (ALTA, MEDIA, BAJA; por defecto: MEDIA).
4. Opcionalmente, agrega:
   - **Descripción**: Detalles de la actividad.
   - **Instrucciones adicionales**: Notas específicas.
   - **Insumos**: Lista de insumos con cantidades usadas.
   - **Herramientas**: Lista de herramientas con cantidades entregadas.

## Datos de una actividad
Cada actividad tiene la siguiente información:

| Campo                     | Tipo                | Descripción                              |
|---------------------------|---------------------|------------------------------------------|
| **id**                    | `AutoField`         | Identificador único                      |
| **tipo_actividad**        | `ForeignKey`        | Relación con tabla TipoActividad         |
| **descripcion**           | `TextField`         | Detalles de la actividad                 |
| **fecha_inicio**          | `DateTimeField`     | Fecha y hora de inicio                   |
| **fecha_fin**             | `DateTimeField`     | Fecha y hora de finalización             |
| **cultivo**               | `ForeignKey`        | Cultivo asociado                         |
| **usuarios**              | `ManyToManyField`   | Usuarios responsables                    |
| **estado**                | `CharField`         | Estado de la actividad (PENDIENTE, EN_PROCESO, COMPLETADA, CANCELADA) |
| **prioridad**             | `CharField`         | Prioridad (ALTA, MEDIA, BAJA)            |
| **instrucciones_adicionales** | `TextField`     | Instrucciones específicas (opcional)     |

### Préstamo de Insumos
| Campo                     | Tipo                | Descripción                              |
|---------------------------|---------------------|------------------------------------------|
| **actividad**             | `ForeignKey`        | Actividad asociada                       |
| **insumo**                | `ForeignKey`        | Insumo utilizado                         |
| **cantidad_usada**        | `IntegerField`      | Cantidad de insumo utilizada             |
| **cantidad_devuelta**     | `IntegerField`      | Cantidad de insumo devuelta              |
| **fecha_devolucion**      | `DateTimeField`     | Fecha de devolución (opcional)           |
| **unidad_medida**         | `ForeignKey`        | Unidad de medida del insumo (opcional)   |

### Préstamo de Herramientas
| Campo                     | Tipo                | Descripción                              |
|---------------------------|---------------------|------------------------------------------|
| **actividad**             | `ForeignKey`        | Actividad asociada                       |
| **herramienta**           | `ForeignKey`        | Herramienta utilizada                    |
| **bodega_herramienta**    | `ForeignKey`        | Bodega de la herramienta (opcional)      |
| **cantidad_entregada**    | `IntegerField`      | Cantidad de herramientas entregadas      |
| **cantidad_devuelta**     | `IntegerField`      | Cantidad de herramientas devueltas       |
| **entregada**             | `BooleanField`      | Indica si la herramienta fue entregada   |
| **devuelta**              | `BooleanField`      | Indica si la herramienta fue devuelta    |
| **fecha_devolucion**      | `DateTimeField`     | Fecha de devolución (opcional)           |

## Ejemplo de API para gestionar actividades

### **Crear una actividad (POST)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span>  </p>
 
**URL:** `http://127.0.0.1:8000/actividades/`  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de solicitud:**  
```json
{
  "tipo_actividad": 3,
  "descripcion": "Aplicación de fertilizante orgánico",
  "fecha_inicio": "2023-11-20T08:00:00",
  "fecha_fin": "2023-11-21T17:00:00",
  "cultivo": 45,
  "usuarios": [12, 15],
  "estado": "PENDIENTE",
  "prioridad": "MEDIA",
  "instrucciones_adicionales": "Aplicar en la mañana",
  "insumos": [
    {
      "insumo": 8,
      "cantidad_usada": 5
    }
  ],
  "herramientas": [
    {
      "herramienta": 2,
      "cantidad_entregada": 1,
      "entregada": true
    }
  ]
}
```

**Validaciones:**  
- `fecha_inicio` no puede ser posterior a `fecha_fin`.  
- `cultivo` debe estar activo.  
- Cada insumo debe tener suficiente stock disponible.  
- Cada herramienta debe tener suficiente cantidad disponible en `bodega_herramienta`.  
- `cantidad_usada` y `cantidad_entregada` deben ser mayores que 0.  
- `usuarios` debe contener al menos un ID válido.  

**Ejemplo de respuesta exitosa (201 Created):**  
```json
{
  "id": 1,
  "tipo_actividad": 3,
  "tipo_actividad_nombre": "Fertilización",
  "descripcion": "Aplicación de fertilizante orgánico",
  "fecha_inicio": "2023-11-20T08:00:00",
  "fecha_fin": "2023-11-21T17:00:00",
  "cultivo": 45,
  "cultivo_nombre": "Lechuga Romana - B2",
  "usuarios": [12, 15],
  "usuarios_data": [
    {"nombre": "Juan Pérez"},
    {"nombre": "Ana Gómez"}
  ],
  "estado": "PENDIENTE",
  "prioridad": "MEDIA",
  "instrucciones_adicionales": "Aplicar en la mañana",
  "prestamos_insumos": [
    {
      "id": 1,
      "insumo": 8,
      "insumo_nombre": "Fertilizante Orgánico 5kg",
      "cantidad_usada": 5,
      "cantidad_devuelta": 0,
      "fecha_devolucion": null,
      "unidad_medida": "kg"
    }
  ],
  "prestamos_herramientas": [
    {
      "id": 1,
      "herramienta": 2,
      "herramienta_nombre": "Pala",
      "bodega_herramienta": 1,
      "bodega_herramienta_cantidad": 9,
      "cantidad_entregada": 1,
      "cantidad_devuelta": 0,
      "entregada": true,
      "devuelta": false,
      "fecha_devolucion": null
    }
  ]
}
```

**Posibles errores:**  
- `400 Bad Request`: Si faltan campos obligatorios o las validaciones fallan.  
- `409 Conflict`: Si hay solapamiento de fechas con otras actividades o insuficiente stock.

### **Listar actividades (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span>  </p>
  
**URL:** `http://127.0.0.1:8000/actividades/`  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de respuesta (200 OK):**  
```json
[
  {
    "id": 1,
    "tipo_actividad": 3,
    "tipo_actividad_nombre": "Fertilización",
    "descripcion": "Aplicación de fertilizante orgánico",
    "fecha_inicio": "2023-11-20T08:00:00",
    "fecha_fin": "2023-11-21T17:00:00",
    "cultivo": 45,
    "cultivo_nombre": "Lechuga Romana - B2",
    "usuarios": [12, 15],
    "usuarios_data": [
      {"nombre": "Juan Pérez"},
      {"nombre": "Ana Gómez"}
    ],
    "estado": "PENDIENTE",
    "prioridad": "MEDIA",
    "instrucciones_adicionales": "Aplicar en la mañana",
    "prestamos_insumos": [
      {
        "id": 1,
        "insumo": 8,
        "insumo_nombre": "Fertilizante Orgánico 5kg",
        "cantidad_usada": 5,
        "cantidad_devuelta": 0,
        "fecha_devolucion": null,
        "unidad_medida": "kg"
      }
    ],
    "prestamos_herramientas": [
      {
        "id": 1,
        "herramienta": 2,
        "herramienta_nombre": "Pala",
        "bodega_herramienta": 1,
        "bodega_herramienta_cantidad": 9,
        "cantidad_entregada": 1,
        "cantidad_devuelta": 0,
        "entregada": true,
        "devuelta": false,
        "fecha_devolucion": null
      }
    ]
  }
]
```

### **Obtener una actividad (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span>  </p> 
**URL:** `http://127.0.0.1:8000/actividades/{id}/`  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de respuesta (200 OK):**  
```json
{
  "id": 1,
  "tipo_actividad": 3,
  "tipo_actividad_nombre": "Fertilización",
  "descripcion": "Aplicación de fertilizante orgánico",
  "fecha_inicio": "2023-11-20T08:00:00",
  "fecha_fin": "2023-11-21T17:00:00",
  "cultivo": 45,
  "cultivo_nombre": "Lechuga Romana - B2",
  "usuarios": [12, 15],
  "usuarios_data": [
    {"nombre": "Juan Pérez"},
    {"nombre": "Ana Gómez"}
  ],
  "estado": "PENDIENTE",
  "prioridad": "MEDIA",
  "instrucciones_adicionales": "Aplicar en la mañana",
  "prestamos_insumos": [
    {
      "id": 1,
      "insumo": 8,
      "insumo_nombre": "Fertilizante Orgánico 5kg",
      "cantidad_usada": 5,
      "cantidad_devuelta": 0,
      "fecha_devolucion": null,
      "unidad_medida": "kg"
    }
  ],
  "prestamos_herramientas": [
    {
      "id": 1,
      "herramienta": 2,
      "herramienta_nombre": "Pala",
      "bodega_herramienta": 1,
      "bodega_herramienta_cantidad": 9,
      "cantidad_entregada": 1,
      "cantidad_devuelta": 0,
      "entregada": true,
      "devuelta": false,
      "fecha_devolucion": null
    }
  ]
}
```

**Posibles errores:**  
- `404 Not Found`: Si el ID no existe.

### **Actualizar una actividad (PUT)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span>  </p>
**URL:** `http://127.0.0.1:8000/actividades/{id}/`  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de solicitud:**  
```json
{
  "descripcion": "Aplicación de fertilizante orgánico (dosis doble)",
  "fecha_fin": "2023-11-22T17:00:00",
  "prioridad": "ALTA",
  "instrucciones_adicionales": "Aplicar con precaución",
  "insumos": [
    {
      "insumo": 8,
      "cantidad_usada": 10
    }
  ],
  "herramientas": [
    {
      "herramienta": 2,
      "cantidad_entregada": 2,
      "entregada": true
    }
  ]
}
```

**Restricciones:**  
- No se puede modificar `tipo_actividad` o `cultivo` después de creado.  
- `fecha_inicio` solo editable si la actividad no ha comenzado.  
- Insumos y herramientas reemplazan los anteriores; stock y cantidades se validan.  

**Ejemplo de respuesta (200 OK):**  
```json
{
  "id": 1,
  "message": "Actividad actualizada correctamente"
}
```

### **Eliminar una actividad (DELETE)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span>  </p>
 
**URL:** `http://127.0.0.1:8000/actividades/{id}/`  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de respuesta exitosa (200 OK):**  
```json
{
  "message": "Actividad eliminada correctamente",
  "id": 1
}
```

**Error común (400 Bad Request):**  
```json
{
  "error": "No se puede eliminar",
  "detail": "La actividad ya ha comenzado"
}
```

### **Finalizar una actividad (POST)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span>  </p>
**URL:** `http://127.0.0.1:8000/actividades/{id}/finalizar/`  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de solicitud:**  
```json
{
  "fecha_fin": "2023-11-21T17:00:00"
}
```

**Validaciones:**  
- `fecha_fin` es obligatoria.  
- La actividad no debe estar ya completada.  

**Ejemplo de respuesta (200 OK):**  
```json
{
  "message": "Actividad finalizada correctamente",
  "insumos_devueltos": 1,
  "herramientas_devueltas": 1
}
```

**Posibles errores:**  
- `400 Bad Request`: Si la actividad ya está completada o falta `fecha_fin`.

### **Reporte de costos (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span>  </p>

**URL:** `http://127.0.0.1:8000/actividades/grafico_costos/`  

**Parámetros de consulta (opcional):**  
- `fecha_inicio`: Filtra por fecha de inicio (formato `YYYY-MM-DD`).  
- `fecha_fin`: Filtra por fecha de fin (formato `YYYY-MM-DD`).  
- `tipo_grafico`: Tipo de gráfico (por defecto: `barra`).  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de respuesta (200 OK):**  
```json
{
  "tipo_grafico": "barra",
  "periodo": {
    "fecha_inicio": "2023-11-01",
    "fecha_fin": "2023-11-30"
  },
  "data": [
    {
      "actividad": "Fertilización",
      "costo_total": 150.50,
      "desglose": {
        "insumos": 100.00,
        "herramientas": 20.50,
        "mano_de_obra": 30.00
      },
      "tiempo_invertido_horas": 33.5,
      "fecha_inicio": "2023-11-20",
      "fecha_fin": "2023-11-21",
      "usuarios": ["Juan Pérez", "Ana Gómez"]
    }
  ]
}
```

## **Ejemplos de Uso**

### **Crear y actualizar una actividad:**  
```bash
# Crear (POST)
POST /actividades/
{
  "tipo_actividad": 1,
  "descripcion": "Riego por goteo",
  "fecha_inicio": "2023-11-25T08:00:00",
  "fecha_fin": "2023-11-25T17:00:00",
  "cultivo": 32,
  "usuarios": [15, 16],
  "estado": "PENDIENTE",
  "prioridad": "BAJA",
  "insumos": [
    {
      "insumo": 4,
      "cantidad_usada": 3
    }
  ],
  "herramientas": [
    {
      "herramienta": 1,
      "cantidad_entregada": 2
    }
  ]
}

# Actualizar (PUT)
PUT /actividades/8/
{
  "descripcion": "Ajuste de riego por goteo",
  "prioridad": "MEDIA",
  "insumos": [
    {
      "insumo": 4,
      "cantidad_usada": 5
    }
  ]
}
```

### **Filtrar actividades:**  
```bash
# Por cultivo
GET /actividades/?cultivo=45

# Por rango de fechas
GET /actividades/?fecha_inicio=2023-11-01&fecha_fin=2023-11-30

# Por estado
GET /actividades/?estado=COMPLETADA
```

## **Relaciones en el Sistema**
Las **Actividades** se vinculan con:  
- **Usuarios** (responsables de ejecución, relación ManyToMany).  
- **Cultivos** (afectados por la actividad).  
- **Insumos** (a través de `PrestamoInsumo`).  
- **Herramientas** (a través de `PrestamoHerramienta`).  

## **Buenas Prácticas**  
- **Planificación anticipada**: Programar actividades con al menos 3 días de anticipación.  
- **Verificación de stock**: Confirmar disponibilidad de insumos y herramientas antes de crear actividades.  
- **Actualización oportuna**: Registrar cambios en fechas, cantidades o estado tan pronto ocurran.  
- **Documentación detallada**: Usar los campos `descripcion` e `instrucciones_adicionales` para notas relevantes.  
- **Finalización correcta**: Usar el endpoint `/finalizar/` para cerrar actividades y registrar devoluciones.  
- **Seguimiento de costos**: Consultar el endpoint `/grafico_costos/` para analizar costos de insumos, herramientas y mano de obra.