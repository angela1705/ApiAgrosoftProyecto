---
title: "Gestión de Bodega Insumo"
slug: modules/inventario/bodega_insumo
description: "Documentación de la API para la gestión de bodegas e insumos en Agrosoft."
---

# **Gestión de Bodega Insumo**

Los **registros de Bodega Insumo** documentan la relación entre insumos y bodegas, incluyendo la cantidad disponible de cada insumo en una bodega específica. Esta documentación cubre los endpoints RESTful y las conexiones WebSocket para su gestión.

---

## **Endpoints de la API**

### **GET /inventario/bodega_insumo/**
Obtiene todas las relaciones entre bodegas e insumos registradas.

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "bodega": 1,
    "insumo": 2,
    "cantidad": 10
  }
]
```
**Parámetros opcionales:**
- `?bodega=1`: Filtra por ID de bodega
- `?insumo=2`: Filtra por ID de insumo

---

### **GET /inventario/bodega_insumo/{id}/**
Obtiene una relación específica entre bodega e insumo por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "bodega": 1,
  "insumo": 2,
  "cantidad": 10
}
```

---

### **POST /inventario/bodega_insumo/**
Registra una nueva relación entre una bodega y un insumo.

**Ejemplo de solicitud:**
```json
{
  "bodega": 1,
  "insumo": 2,
  "cantidad": 15
}
```

**Validaciones:**
- Campos obligatorios: `bodega`, `insumo`
- `cantidad` debe ser un entero

**Respuesta exitosa (201 Created):**
```json
{
  "id": 2,
  "bodega": 1,
  "insumo": 2,
  "cantidad": 15
}
```

---

### **PUT /inventario/bodega_insumo/{id}/**
Actualiza una relación existente entre bodega e insumo.

**Ejemplo de solicitud:**
```json
{
  "cantidad": 12
}
```

**Restricciones:**
- Solo se puede modificar `cantidad`

---

### **DELETE /inventario/bodega_insumo/{id}/**
Elimina una relación entre bodega e insumo.

**Respuesta exitosa (204 No Content):**
```json
{}
```

**Error común (404 Not Found):**
```json
{
  "detail": "No encontrado."
}
```

---

## **WebSocket**

**Conexión:** `ws/inventario/bodega_insumo/`

Permite actualizaciones en tiempo real de las relaciones entre bodegas e insumos.

### **Estado inicial:**
```json
{
  "action": "initial_state",
  "bodega_status": [
    {
      "id": 1,
      "bodega": "Bodega Central",
      "insumo": "Fertilizante",
      "cantidad": 10
    }
  ]
}
```

### **Eventos en tiempo real:**

#### **Creación/Actualización:**
```json
{
  "message_id": "create-1-uuid-aqui",
  "id": 1,
  "bodega": "Bodega Central",
  "insumo": "Fertilizante",
  "cantidad": 10,
  "accion": "create" 
}
```

#### **Eliminación:**
```json
{
  "message_id": "delete-1-uuid-aqui",
  "id": 1,
  "accion": "delete"
}
```

---

## **Relaciones Clave**
```mermaid
graph TD
    A[Bodega] --> B[BodegaInsumo]
    C[Insumo] --> B
```

---

## **Buenas Prácticas**
- **Registro inmediato:** Actualizar la cantidad tras cada movimiento de insumos.
- **Detalles específicos:** Verificar que la cantidad coincida con el inventario físico.
- **Sincronización:** Usar WebSocket para reflejar cambios en tiempo real en el frontend.

---

## **Integraciones Comunes**
- **Notificaciones:** Alertas cuando la cantidad de insumos cae por debajo de un umbral.
- **Inventario:** Actualización automática del stock en `Insumo` al modificar `BodegaInsumo`.
- **Reportes:**
  - Disponibilidad por bodega
  - Histórico de movimientos de insumos

---

### **Códigos de estado comunes:**
| Código | Descripción |
|--------|-------------|
| `200` | OK (GET, PUT, DELETE exitoso) |
| `201` | Created (POST exitoso) |
| `400` | Bad Request (datos inválidos) |
| `404` | Not Found (bodega insumo no encontrada) |
| `409` | Conflict (restricción de integridad) |

