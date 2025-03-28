---
title: "Gestión de plagas"
---

## Estructura de Datos

| Campo               | Tipo                | Descripción |  
|---------------------|---------------------|-------------|  
| **id**              | `AutoField`         | Identificador único |  
| **fk_tipo_plaga**   | `ForeignKey`        | Relación con tabla TipoPlaga |  
| **nombre**          | `CharField(30)`     | Nombre identificador (único) |  
| **descripcion**     | `TextField`         | Características y detalles |  
| **img**             | `ImageField`        | Imagen representativa (opcional) |  

---

## Ejemplo de API  

```json  
POST /cultivo/plagas/  
{  
  "fk_tipo_plaga": 2,  
  "nombre": "Mosca blanca",  
  "descripcion": "Insecto chupador que debilita las plantas",  
  "img": null  
}  
```  

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 1,
  "fk_tipo_plaga": 2,
  "nombre": "Mosca blanca",
  "descripcion": "Insecto chupador que debilita las plantas",
  "img": null,
  "url_imagen": null
}
```

### ** GET  /cultivo/plagas/{id}**
Obtiene una plaga específica por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "tipo_plaga": {
    "id": 2,
    "nombre": "Insectos"
  },
  "nombre": "Mosca blanca",
  "descripcion": "Insecto chupador que debilita las plantas",
  "url_imagen": "/media/plagas_images/mosca_blanca.jpg"
}
```

### **PUT  /cultivo/plagas/{id}**
Actualiza una plaga existente.

**Ejemplo de solicitud:**
```json
{
  "descripcion": "Insecto chupador que debilita las plantas. Afecta principalmente a solanáceas.",
  "img": "nueva_imagen.jpg"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": 1,
  "message": "Plaga actualizada correctamente",
  "url_imagen": "/media/plagas_images/nueva_imagen.jpg"
}
```

**Restricciones:**
- No se puede modificar `fk_tipo_plaga` después de creado
- `nombre` debe mantenerse único

### **DELETE  /cultivo/plagas/{id}**
Elimina una plaga (solo si no tiene registros asociados).

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Plaga eliminada correctamente",
  "id": 1
}
```

**Error común (409 Conflict):**
```json
{
  "error": "No se puede eliminar",
  "detail": "Existen registros de tratamientos asociados a esta plaga"
}
```

---

## **Validaciones Adicionales**

1. **Nombre único**:
   - Máximo 30 caracteres
   - No distingue mayúsculas/minúsculas (case-insensitive)

2. **Imagen**:
   - Formatos permitidos: JPG, PNG, WEBP
   - Tamaño máximo: 2MB

3. **Relaciones**:
   - `fk_tipo_plaga` debe existir
   - No se puede eliminar si tiene:
     - Tratamientos asociados
     - Registros de detección

---

## **Ejemplo Completo de Uso**

1. **Crear plaga con imagen** (multipart/form-data):
```bash
POST /plagas/
Content-Type: multipart/form-data

{
  "fk_tipo_plaga": 3,
  "nombre": "Oídio",
  "descripcion": "Hongo que forma manchas blancas en hojas",
  "img": [FILE]
}
```


---

## **Notas Importantes**

1. Manejo de imágenes:
   - Las imágenes se almacenan en `/media/plagas_images/`
   - Se provee URL de acceso en las respuestas
   - Al actualizar la imagen, la anterior se elimina automáticamente
