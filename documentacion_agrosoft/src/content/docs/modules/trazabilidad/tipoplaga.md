---
title: "Gestión de tipos de plaga"
---

## Estructura de Datos

| Campo           | Tipo            | Descripción |
|-----------------|-----------------|-------------|
| **id**          | `AutoField`     | Identificador único |
| **nombre**      | `CharField(30)` | Nombre del tipo de plaga (único) |
| **descripcion** | `TextField`     | Descripción detallada |
| **img**         | `ImageField`    | Imagen representativa (opcional) |

---

## Ejemplo de API

### **POST /tipos-plaga/**
Crea un nuevo tipo de plaga

**Solicitud:**
```json
{
  "nombre": "Hongos",
  "descripcion": "Organismos patógenos que afectan cultivos",
  "img": null
}
```

**Respuesta exitosa (201 Created):**
```json
{
  "id": 1,
  "nombre": "Hongos",
  "descripcion": "Organismos patógenos que afectan cultivos",
  "url_imagen": null
}
```

### **GET /tipos-plaga/{id}**
Obtiene un tipo de plaga específico

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Hongos",
  "descripcion": "Organismos patógenos que afectan cultivos",
  "url_imagen": "/media/tipos_plaga_images/hongos.jpg"
}
```

### **PUT /tipos-plaga/{id}**
Actualiza un tipo de plaga existente

**Solicitud:**
```json
{
  "descripcion": "Organismos patógenos que afectan cultivos. Se propagan en condiciones de humedad.",
  "img": "nueva_imagen.jpg"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "message": "Tipo de plaga actualizado correctamente",
  "url_imagen": "/media/tipos_plaga_images/nueva_imagen.jpg"
}
```

### **DELETE /tipos-plaga/{id}**
Elimina un tipo de plaga

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Tipo de plaga eliminado correctamente",
  "id": 1
}
```

**Error (409 Conflict) - Cuando hay plagas asociadas:**
```json
{
  "error": "No se puede eliminar",
  "detail": "Existen plagas asociadas a este tipo"
}
```

---


## Notas Importantes

1. **Manejo de imágenes:**
   - Se almacenan en `/media/tipos_plaga_images/`
   - Al actualizar, la imagen anterior se elimina automáticamente
   - Proporciona URL completa en las respuestas
