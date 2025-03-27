---
title: "Módulo de IoT - Gestión de Sensores"
slug: modules/IoT/sensores
description: "Cómo administrar sensores en el módulo de IoT de Agrosoft para monitoreo en tiempo real de condiciones meteorológicas en cultivos."
---

# Módulo de IoT - Gestión de Sensores

El módulo de IoT en Agrosoft permite conectar **sensores** físicos para recopilar datos meteorológicos en tiempo real, como temperatura y humedad, en los bancales de cultivo. Estos datos se integran con el módulo de trazabilidad para un control completo del proceso agrícola. Los sensores tienen un nombre, tipo, unidad de medida y rangos específicos, y sus datos se asocian a un bancal dentro de un lote para su monitoreo.

## Características principales
- Registro de **sensores** asociados a lotes de cultivo.
- Monitoreo en tiempo real de **temperatura** y **humedad** mediante WebSocket.
- Almacenamiento de **datos históricos** a través de peticiones HTTP.
- Visualización de datos en la interfaz de Agrosoft.
- Integración con el módulo de **Trazabilidad** para asociar datos a lotes específicos.

## ¿Cómo registrar un sensor?
Para registrar un nuevo sensor en Agrosoft:
1. Ir a la sección **IoT → Sensores**.
2. Hacer clic en el botón **"Registrar Sensor"**.
3. Completar los siguientes campos:
   - **Nombre del Sensor:** Nombre único del sensor (por ejemplo, "DHT22_001").
   - **Tipo de Sensor:** Tipo de sensor (por ejemplo, "DHT22").
   - **Unidad de Medida:** Unidad de los datos (por ejemplo, "Celsius/%").
   - **Descripción:** Información adicional sobre el sensor (opcional).
   - **Medida Mínima:** Valor mínimo que el sensor puede registrar.
   - **Medida Máxima:** Valor máximo que el sensor puede registrar.
4. Guardar los cambios.
   - **Nota:** La asociación del sensor a un bancal se realiza al configurar los datos enviados por el dispositivo.

## Datos de un Sensor
Cada sensor tiene la siguiente información:

| Campo             | Tipo de Dato    | Descripción                                      |
|-------------------|-----------------|--------------------------------------------------|
| **ID**            | `Integer`       | Identificador único del sensor                  |
| **Nombre**        | `CharField`     | Nombre del sensor (máx. 15 caracteres, único)   |
| **Tipo**          | `CharField`     | Tipo de sensor (ej. "DHT22")                    |
| **Unidad**        | `CharField`     | Unidad de medida (ej. "Celsius/%")              |
| **Descripción**   | `TextField`     | Información opcional sobre el sensor            |
| **Medida Mínima** | `DecimalField`  | Valor mínimo que el sensor puede registrar      |
| **Medida Máxima** | `DecimalField`  | Valor máximo que el sensor puede registrar      |

## Ejemplos de API para gestionar sensores

### POST /api/sensors - Crear un sensor
```json
{
  "nombre": "DHT22_001",
  "tipo": "DHT22",
  "unidad": "Celsius/%",
  "descripcion": "Sensor de temperatura y humedad",
  "medida_minima": -40.00,
  "medida_maxima": 80.00
}
```

### GET /api/sensors - Listar sensores
```json
[
  {
    "id": 1,
    "nombre": "DHT22_001",
    "tipo": "DHT22",
    "unidad": "Celsius/%",
    "descripcion": "Sensor de temperatura y humedad",
    "medida_minima": -40.00,
    "medida_maxima": 80.00
  }
]
```

### GET /api/sensors/1 - Obtener un sensor por ID
```json
{
  "id": 1,
  "nombre": "DHT22_001",
  "tipo": "DHT22",
  "unidad": "Celsius/%",
  "descripcion": "Sensor de temperatura y humedad",
  "medida_minima": -40.00,
  "medida_maxima": 80.00
}
```

### PUT /api/sensors/1 - Actualizar un sensor
```json
{
  "nombre": "DHT22_001_modificado",
  "descripcion": "Sensor actualizado"
}
```

### DELETE /api/sensors/1 - Eliminar un sensor
```json
{}
```