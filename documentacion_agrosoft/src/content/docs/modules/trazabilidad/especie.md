---
title: "Gestión de especies"
---
Las **Especies** representan las variedades vegetales o animales específicas que se cultivan o crían en el sistema Agrosoft, asociadas a un tipo de especie general.


## Datos de una Especie

| Campo               | Tipo de Dato        | Descripción |
|--------------------|-------------------|-------------|
| **ID**            | `Integer`          | Identificador único automático |
| **Tipo Especie**  | `ForeignKey`       | Categoría general de la especie |
| **Nombre**        | `CharField`        | Nombre específico (máx. 30 chars, único) |
| **Descripción**   | `TextField`        | Detalles característicos |
| **Días Crecimiento** | `IntegerField`  | Ciclo vegetativo en días |
| **Imagen**        | `ImageField`       | Foto representativa (en 'especies_images/') |


## **Endpoints de la API**

### **GET /cultivo/especies**
Obtiene todas las especies registradas.


**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
  "fk_tipo_especie": 3,
    "nombre": "Tomate Cherry",
    "descripcion": "Variedad de tomate pequeño, dulce y productivo",
    "largoCrecimiento": 75,
    "imagen_url": "/media/especies_images/tomate_cherry.jpg"
  }
]
```

### **GET /cultivo/especies/{id}**
Obtiene una especie específica por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "fk_tipo_especie": 3,
  "nombre": "Tomate Cherry",
  "descripcion": "Variedad de tomate pequeño, dulce y productivo",
  "largoCrecimiento": 75,
  "imagen_url": "/media/especies_images/tomate_cherry.jpg"
}
```

### **POST /cultivo/especies/**
Crea una nueva especie.

**Ejemplo de solicitud:**
```json
{
  "fk_tipo_especie": 3,
  "nombre": "Tomate Cherry",
  "descripcion": "Variedad de tomate pequeño, dulce y productivo",
  "largoCrecimiento": 75,
  "img": "img.jpg"
}
```

**Validaciones:**
- `nombre` debe ser único (máx. 30 caracteres)
- `fk_tipo_especie` debe existir
- `largoCrecimiento` debe ser ≥ 1
- `img` opcional (formato base64)

### * PUT /cultivo/especies/{id}**
Actualiza una especie existente.

**Ejemplo de solicitud:**
```json
{
  "descripcion": "Variedad mejorada de tomate cherry",
  "largoCrecimiento": 70
}
```

**Restricciones:**
- No se puede cambiar el `tipo_especie` asociado
- El `nombre` solo puede modificarse si permanece único

### **🔹 DELETE /cultivo/especies/{id}**
Elimina una especie (solo si no tiene cultivos asociados).

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Especie eliminada correctamente",
  "id": 1
}
```

**Error común (409 Conflict):**
```json
{
  "error": "No se puede eliminar",
  "detail": "Existen cultivos asociados a esta especie"
}
```

---