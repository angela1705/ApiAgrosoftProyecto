---
title: Módulo de Pagos - Gestión de Pagos
slug: modules/finanzas/pagos
description: Cómo administrar pagos a trabajadores en el módulo de Pagos de Agrosoft, calculando automáticamente el total a pagar basado en actividades completadas, horas trabajadas y salario por jornal.
---

Las **Pagos** son registros financieros que calculan la compensación de trabajadores basados en las actividades completadas, las horas trabajadas derivadas de estas actividades, y el salario por jornal asociado al rol del usuario.

## ¿Cómo registrar un pago?
Para registrar un nuevo pago en Agrosoft:
1. Navega al módulo de Pagos.
2. Haz clic en el botón **"Calcular Pago"**.
3. Completa los siguientes campos obligatorios:
   - **Usuario**: Selecciona el usuario al que corresponde el pago.
   - **Fecha Inicio**: Define la fecha de inicio del período (formato `YYYY-MM-DD`).
   - **Fecha Fin**: Define la fecha de fin del período (formato `YYYY-MM-DD`).
4. Opcionalmente, el sistema calculará automáticamente:
   - **Horas Trabajadas**: Basado en las actividades completadas.
   - **Jornales**: Calculado dividiendo las horas trabajadas por 8 (horas por jornal).
   - **Total a Pagar**: Multiplicando los jornales por el valor del salario por jornal.
   - **Fecha de Cálculo**: Fecha y hora en que se genera el pago.
   - **Actividades**: Actividades completadas asociadas al usuario en el período.
   - **Salario**: Salario activo asociado al rol del usuario.

## Datos de un Pago
Cada pago tiene la siguiente información:

| Campo               | Tipo de Dato         | Descripción                                      |
|---------------------|----------------------|--------------------------------------------------|
| **id**              | `AutoField`          | Identificador único del pago                    |
| **usuario**         | `ForeignKey`         | Relación con el modelo `Usuarios`               |
| **actividades**     | `ManyToManyField`    | Actividades completadas asociadas al pago       |
| **salario**         | `ForeignKey`         | Relación con el modelo `Salario` (salario/jornal) |
| **fecha_inicio**    | `DateField`          | Fecha de inicio del período                     |
| **fecha_fin**       | `DateField`          | Fecha de fin del período                        |
| **horas_trabajadas**| `DecimalField`       | Horas trabajadas calculadas (máx. 10 dígitos, 2 decimales) |
| **jornales**        | `DecimalField`       | Jornales calculados (máx. 10 dígitos, 2 decimales) |
| **total_pago**      | `DecimalField`       | Total a pagar calculado (máx. 10 dígitos, 2 decimales) |
| **fecha_calculo**   | `DateTimeField`      | Fecha y hora de cálculo del pago (automático)   |

## Ejemplo de API para gestionar pagos

### **Calcular un pago (POST)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/calcular_pago/`

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de solicitud:**  
```json
{
  "usuario_id": 5,
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-11-30"
}
```

**Validaciones:**  
- `fecha_inicio` no puede ser posterior a `fecha_fin`.  
- `usuario_id` debe corresponder a un usuario existente con un rol asignado.  
- Debe existir un salario activo para el rol del usuario.  
- No debe existir un pago previo para el mismo usuario y rango de fechas.  
- Deben existir actividades completadas asociadas al usuario en el rango de fechas.  

**Ejemplo de respuesta exitosa (201 Created):**  
```json
{
  "id": 1,
  "usuario": 5,
  "usuario_nombre": "Juan Pérez",
  "usuario_rol": "Trabajador Agrícola",
  "actividades": [1, 2],
  "salario": 1,
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-11-30",
  "horas_trabajadas": 40.00,
  "jornales": 5.00,
  "total_pago": 1000.00,
  "fecha_calculo": "2025-07-30T21:42:00Z"
}
```

**Posibles errores:**  
- `400 Bad Request`: Si faltan campos, las fechas son inválidas, no hay actividades completadas, o ya existe un pago para el rango de fechas.  
  ```json
  {
    "error": "Ya existe un pago calculado para este usuario y rango de fechas."
  }
  ```

### **Listar pagos (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/`

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Parámetros de consulta (opcional):**  
- `usuario`: Filtra por ID de usuario (ej. `usuario=5`).  
- `fecha_inicio`: Filtra por fecha de inicio (formato `YYYY-MM-DD`).  
- `fecha_fin`: Filtra por fecha de fin (formato `YYYY-MM-DD`).  

**Ejemplo de respuesta (200 OK):**  
```json
[
  {
    "id": 1,
    "usuario": 5,
    "usuario_nombre": "Juan Pérez",
    "usuario_rol": "Trabajador Agrícola",
    "actividades": [1, 2],
    "salario": 1,
    "fecha_inicio": "2023-11-01",
    "fecha_fin": "2023-11-30",
    "horas_trabajadas": 40.00,
    "jornales": 5.00,
    "total_pago": 1000.00,
    "fecha_calculo": "2025-07-30T21:42:00Z"
  }
]
```

### **Obtener un pago (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/{id}/`

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
  "usuario": 5,
  "usuario_nombre": "Juan Pérez",
  "usuario_rol": "Trabajador Agrícola",
  "actividades": [1, 2],
  "salario": 1,
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-11-30",
  "horas_trabajadas": 40.00,
  "jornales": 5.00,
  "total_pago": 1000.00,
  "fecha_calculo": "2025-07-30T21:42:00Z"
}
```

**Posibles errores:**  
- `404 Not Found`: Si el ID no existe.  
  ```json
  {
    "error": "No existe el pago especificado"
  }
  ```

### **Actualizar un pago (PUT)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/{id}/`

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de solicitud:**  
```json
{
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-12-01"
}
```

**Restricciones:**  
- No se pueden modificar `usuario`, `horas_trabajadas`, `jornales`, `total_pago`, `salario`, `actividades`, o `fecha_calculo`.  
- Para recalcular el pago, elimina el registro existente y usa `/calcular_pago/`.  
- `fecha_inicio` no puede ser posterior a `fecha_fin`.  

**Ejemplo de respuesta (200 OK):**  
```json
{
  "id": 1,
  "usuario": 5,
  "usuario_nombre": "Juan Pérez",
  "usuario_rol": "Trabajador Agrícola",
  "actividades": [1, 2],
  "salario": 1,
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-12-01",
  "horas_trabajadas": 40.00,
  "jornales": 5.00,
  "total_pago": 1000.00,
  "fecha_calculo": "2025-07-30T21:42:00Z"
}
```

### **Eliminar un pago (DELETE)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELETE</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/{id}/`

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de respuesta exitosa (200 OK):**  
```json
{
  "message": "Pago eliminado correctamente"
}
```

**Posibles errores:**  
- `404 Not Found`: Si el ID no existe.  
  ```json
  {
    "error": "No existe el pago especificado"
  }
  ```

### **Reporte de pagos en PDF (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/reporte_pdf/`

**Parámetros de consulta (obligatorio):**  
- `fecha_inicio`: Fecha de inicio (formato `YYYY-MM-DD`).  
- `fecha_fin`: Fecha de fin (formato `YYYY-MM-DD`).  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de solicitud:**  
```bash
GET /api/pagos/reporte_pdf/?fecha_inicio=2023-11-01&fecha_fin=2023-11-30
```

**Respuesta:**  
- Un archivo PDF descargable (`reporte_pagos_por_mes.pdf`) con un resumen de pagos por mes, incluyendo usuario y total pagado, junto con un resumen general del período.

**Posibles errores:**  
- `400 Bad Request`: Si faltan `fecha_inicio` o `fecha_fin`.  
  ```json
  {
    "error": "Debes proporcionar 'fecha_inicio' y 'fecha_fin'"
  }
  ```

### **Datos para gráficas (GET)**  
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span> </p>

**URL:** `http://127.0.0.1:8000/api/pagos/datos_graficas/`

**Parámetros de consulta (obligatorio):**  
- `fecha_inicio`: Fecha de inicio (formato `YYYY-MM-DD`).  
- `fecha_fin`: Fecha de fin (formato `YYYY-MM-DD`).  

**Encabezados de la solicitud**  
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`          | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`  | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`          | Indica que la respuesta debe estar en formato JSON.       |

**Ejemplo de respuesta (200 OK):**  
```json
{
  "por_mes": {
    "meses": ["2023-11"],
    "total_pago": [1000.00],
    "usuario_top": ["Juan Pérez"]
  },
  "por_usuario": {
    "usuarios": ["Juan Pérez", "Ana Gómez"],
    "total_pago": [1000.00, 500.00]
  },
  "por_dia_semana": {
    "dias": ["Lunes", "Martes"],
    "total_pago": [600.00, 400.00]
  }
}
```

**Posibles errores:**  
- `400 Bad Request`: Si faltan `fecha_inicio` o `fecha_fin`.  
  ```json
  {
    "error": "Debes proporcionar 'fecha_inicio' y 'fecha_fin'"
  }
  ```

## Ejemplos de Uso

### **Calcular y actualizar un pago:**  
```bash
# Calcular pago (POST)
POST /api/pagos/calcular_pago/
{
  "usuario_id": 5,
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-11-30"
}

# Actualizar fechas (PUT)
PUT /api/pagos/1/
{
  "fecha_inicio": "2023-11-01",
  "fecha_fin": "2023-12-01"
}
```

### **Filtrar pagos:**  
```bash
# Por usuario
GET /api/pagos/?usuario=5

# Por rango de fechas
GET /api/pagos/?fecha_inicio=2023-11-01&fecha_fin=2023-11-30
```

## Relaciones en el Sistema
Las **Pagos** se vinculan con:  
- **Usuarios** (trabajador al que se le paga).  
- **Actividades** (tareas completadas que determinan las horas trabajadas, relación ManyToMany).  
- **Salarios** (tarifa por jornal asociada al rol del usuario).  

## Buenas Prácticas  
- **Períodos claros**: Definir rangos de fechas precisos para evitar solapamientos en los cálculos.  
- **Verificación de actividades**: Asegurarse de que las actividades asociadas estén en estado `COMPLETADA`.  
- **Actualización limitada**: Usar `/calcular_pago/` para recalcular pagos en lugar de editar directamente.  
- **Reportes periódicos**: Generar reportes PDF mensuales para auditorías financieras.  
- **Análisis de datos**: Utilizar `/datos_graficas/` para identificar tendencias en pagos por usuario o día de la semana.