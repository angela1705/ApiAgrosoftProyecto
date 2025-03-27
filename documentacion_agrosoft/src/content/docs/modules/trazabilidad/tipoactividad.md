---
title: "Gestión de tipo de actividad"
---
Los **Tipos de Actividad** permiten clasificar las diferentes labores agrícolas realizadas en el sistema (siembra, riego, fertilización, poda, cosecha, etc.). Esta documentación cubre los endpoints RESTful para su gestión.

---

## **Endpoints de la API**

### **GET /actividades/tipos**
Obtiene todos los tipos de actividad registrados.

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Riego",
    "descripcion": "Aplicación controlada de agua a los cultivos"
  },
  {
    "id": 2,
    "nombre": "Fertilización",
    "descripcion": "Aporte de nutrientes al suelo"
  }
]
```

**Parámetros opcionales:**
- `?search=riego`: Busca tipos por nombre (búsqueda insensible a mayúsculas).

---

### **GET /actividades/tipos/{id}**
Obtiene un tipo de actividad específico por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Riego",
  "descripcion": "Aplicación controlada de agua a los cultivos"
}
```

**Posibles errores:**
- `404 Not Found`: Si el ID no existe.

---

### **POST /actividades/tipos**
Crea un nuevo tipo de actividad.

**Ejemplo de solicitud:**
```json
{
  "nombre": "Poda",
  "descripcion": "Corte de ramas para mejorar el crecimiento"
}
```

**Validaciones:**
- `nombre`: Requerido, máximo 255 caracteres, único.
- `descripcion`: Opcional.

**Ejemplo de respuesta exitosa (201 Created):**
```json
{
  "id": 3,
  "nombre": "Poda",
  "descripcion": "Corte de ramas para mejorar el crecimiento"
}
```

**Posibles errores:**
- `400 Bad Request`: Si faltan campos obligatorios.
- `409 Conflict`: Si el nombre ya existe.

---

### **PUT /actividades/tipos/{id}**
Actualiza un tipo de actividad existente.

**Ejemplo de solicitud:**
```json
{
  "nombre": "Poda de formación",
  "descripcion": "Poda para guiar la estructura de la planta"
}
```

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 3,
  "nombre": "Poda de formación",
  "descripcion": "Poda para guiar la estructura de la planta"
}
```

**Notas:**
- Se pueden actualizar campos individualmente.
- El `nombre` debe seguir siendo único.

---

### **DELETE /actividades/tipos/{id}**
Elimina un tipo de actividad (si no está en uso).

**Ejemplo de respuesta exitosa (200 OK):**
```json
{
  "message": "Tipo de actividad eliminado correctamente"
}
```

**Posibles errores:**
- `404 Not Found`: Si el ID no existe.
- `409 Conflict`: Si el tipo está asociado a actividades registradas.

---

## ** Ejemplos de Uso**

### **Crear y luego actualizar un tipo:**
```bash
# Crear (POST)
POST /actividades/tipos
{
  "nombre": "Deshierbe",
  "descripcion": "Eliminación de malezas"
}

# Actualizar (PUT)
PUT /actividades/tipos/4
{
  "descripcion": "Eliminación manual o química de malezas"
}
```

### **Listar tipos de actividad:**
```bash
GET /actividades/tipos
```

---

## **Manejo de Errores**

### **Ejemplo de error (nombre duplicado):**
```json
{
  "error": "ValidationError",
  "detail": {
    "nombre": ["Ya existe un tipo de actividad con este nombre."]
  },
  "status": 400
}
```

### **Códigos de estado comunes:**
| Código | Descripción |
|--------|-------------|
| `200` | OK (GET, PUT, DELETE exitoso) |
| `201` | Created (POST exitoso) |
| `400` | Bad Request (datos inválidos) |
| `404` | Not Found (recurso no existe) |
| `409` | Conflict (restricción de integridad) |

---

## **Relaciones en el Sistema**
Los **Tipos de Actividad** se vinculan con:
- **Actividades agrícolas** (ejemplo: "Riego" → "Riego por goteo en Bancal 3").
- **Planificación de labores** (para programar actividades recurrentes).

---



### **Buenas Prácticas**
✔️ **Nomenclatura clara**: Usar nombres descriptivos (ej: "Fertilización foliar" en lugar de "Aplicación 1").  
✔️ **Descripciones útiles**: Incluir detalles como métodos comunes o precauciones.  
✔️ **Evitar duplicados**: Revisar tipos existentes antes de crear nuevos.