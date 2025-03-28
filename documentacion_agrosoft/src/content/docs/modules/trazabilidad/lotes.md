---
title: "Gestión de Lotes"
description: "Cómo administrar lotes en el módulo de trazabilidad de Agrosoft."
---

# Gestión de Lotes

Los **lotes** son unidades de cultivo dentro de un terreno agrícola. Cada lote tiene una ubicación, tamaño y estado específico dentro del sistema.


| Campo           | Tipo de Dato  | Descripción |
|---------------|-------------|-------------|
| **ID**       | `Integer`    | Identificador único del lote |
| **Nombre**   | `CharField`  | Nombre del lote (máx. 15 caracteres, único) |
| **Descripción** | `TextField` | Información opcional sobre el lote |
| **Estado**   | `BooleanField` | Indica si el lote está activo o inactivo |
| **Tamaño X** | `DecimalField` | Dimensión en metros en el eje X |
| **Tamaño Y** | `DecimalField` | Dimensión en metros en el eje Y |
| **Posición X** | `DecimalField` | Ubicación en el eje X dentro del terreno |
| **Posición Y** | `DecimalField` | Ubicación en el eje Y dentro del terreno |

## Ejemplo de API para crear un lote
```json
POST /cultivo/lotes
{
  "nombre": "Lote A",
  "descripcion": "Lote principal del cultivo",
  "activo": true,
  "tam_x": 10.50,
  "tam_y": 15.75,
  "pos_x": 5.00,
  "pos_y": 3.50
}
