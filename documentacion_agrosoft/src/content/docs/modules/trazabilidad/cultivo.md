---
title: "Gestión de cultivos"
---
Los **Cultivos** representan instancias específicas de siembra de una especie en un bancal particular, con seguimiento de su ciclo productivo.  


## Estructura de Datos  

| Campo               | Tipo                | Descripción |  
|---------------------|---------------------|-------------|  
| **ID**              | `AutoField`         | Identificador único |  
| **Especie**         | `ForeignKey`        | Relación con tabla Especies |  
| **Bancal**          | `ForeignKey`        | Ubicación física en campo |  
| **Nombre**          | `CharField(50)`     | Identificador único (ej: "Zanahoria-N4-2023") |  
| **Unidad de medida**| `CharField(10)`     | Unidad para cosecha (kg, lbs, etc.) |  
| **Activo**          | `BooleanField`      | True = En crecimiento, False = Finalizado |  
| **FechaSiembra**    | `DateField`         | Fecha de establecimiento |  

---

## Ejemplo de API  

```json  
POST /cultivo/cultivos  
{  
  "Especie": 45,  
  "Bancal": 12,  
  "nombre": "Lechuga Romana - B2",  
  "unidad_de_medida": "kg",  
  "activo": true,  
  "fechaSiembra": "2023-11-15"  
}  
```  

---


**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "Especie": 45,
    "Bancal": 12,
    "nombre": "Lechuga Romana - B2",
    "unidad_de_medida": "kg",
    "activo": true,
    "fechaSiembra": "2023-11-15"
  }
]
```

### ** GET /cultivo/cultivos/{id}**
Obtiene un cultivo específico por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "Especie": 45,
  "Bancal": 12,
  "nombre": "Lechuga Romana - B2",
  "unidad_de_medida": "kg",
  "activo": true,
  "fechaSiembra": "2023-11-15"
}
```

### **PUT /cultivo/cultivos/{id}**
Actualiza un cultivo existente.

**Ejemplo de solicitud:**
```json
{
  "activo": false,
  "unidad_de_medida": "g"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": 1,
  "message": "Cultivo actualizado correctamente"
}
```

**Restricciones:**
- No se puede modificar `Especie` o `Bancal` después de creado
- `fechaSiembra` solo editable dentro de los primeros 3 días

### **DELETE /cultivo/cultivos/{id}**
Elimina un cultivo (solo si no tiene cosechas asociadas).

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Cultivo eliminado correctamente",
  "id": 1
}
```

**Error común (409 Conflict):**
```json
{
  "error": "No se puede eliminar",
  "detail": "Existen cosechas asociadas a este cultivo"
}
```

---

## **Validaciones Adicionales**

1. **Nombre único**:
   - No puede repetirse en el sistema
   - Máximo 50 caracteres

2. **Relaciones**:
   - `Especie` debe existir en el catálogo
   - `Bancal` debe existir y estar activo

3. **Fechas**:
   - `fechaSiembra` no puede ser futura
   - No puede haber cultivos superpuestos en el mismo bancal

---

## **Ejemplo Completo de Uso**

1. **Actualizar estado de cultivo**:
```bash
PUT /cultivo/cultivos/1
{
  "activo": false,
  "observaciones": "Cultivo finalizado por cosecha completa"
}
```

2. **Obtener cultivos activos**:
```bash
GET /cultivo/cultivos/?activo=true
```

3. **Eliminar cultivo**:
```bash
DELETE /cultivo/cultivos/15
```

---

## **Notas Importantes**

1. Los cambios de estado a `activo=false` generan automáticamente:
   - Registro en historial de actividades
   - Liberación del bancal para nuevos cultivos

2. La eliminación es solo permitida para cultivos:
   - Sin cosechas registradas
   - Creados en los últimos 7 días

3. Para cultivos con cosechas, usar `activo=false` en lugar de DELETE