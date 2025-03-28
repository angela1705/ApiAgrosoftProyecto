---
title: "Gestión de actividades"
---
## Estructura de Datos

| Campo               | Tipo                | Descripción |  
|---------------------|---------------------|-------------|  
| **id**              | `AutoField`         | Identificador único |  
| **tipo_actividad**  | `ForeignKey`        | Relación con tabla TipoActividad |  
| **programacion**    | `ForeignKey`        | Relación con tabla Programación |  
| **descripcion**     | `TextField`         | Detalles de la actividad |  
| **fecha_inicio**    | `DateField`         | Fecha de inicio |  
| **fecha_fin**       | `DateField`         | Fecha de finalización |  
| **usuario**         | `ForeignKey`        | Usuario responsable |  
| **cultivo**         | `ForeignKey`        | Cultivo asociado |  
| **insumo**          | `ForeignKey`        | Insumo utilizado |  
| **cantidadUsada**   | `IntegerField`      | Cantidad de insumo utilizada |  

---

## Ejemplo de API  

```json  
POST /actividades/  
{  
  "tipo_actividad": 3,  
  "programacion": 5,  
  "descripcion": "Aplicación de fertilizante orgánico",  
  "fecha_inicio": "2023-11-20",  
  "fecha_fin": "2023-11-21",  
  "usuario": 12,  
  "cultivo": 45,  
  "insumo": 8,  
  "cantidadUsada": 5  
}  
```  

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 1,
  "tipo_actividad": 3,
  "programacion": 5,
  "descripcion": "Aplicación de fertilizante orgánico",
  "fecha_inicio": "2023-11-20",
  "fecha_fin": "2023-11-21",
  "usuario": 12,
  "cultivo": 45,
  "insumo": 8,
  "cantidadUsada": 5
}
```

### ** GET /actividades/{id}**
Obtiene una actividad específica por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "tipo_actividad": {
    "id": 3,
    "nombre": "Fertilización"
  },
  "programacion": {
    "id": 5,
    "nombre": "Programación Noviembre"
  },
  "descripcion": "Aplicación de fertilizante orgánico",
  "fecha_inicio": "2023-11-20",
  "fecha_fin": "2023-11-21",
  "usuario": {
    "id": 12,
    "nombre": "Juan Pérez"
  },
  "cultivo": {
    "id": 45,
    "nombre": "Lechuga Romana - B2"
  },
  "insumo": {
    "id": 8,
    "nombre": "Fertilizante Orgánico 5kg"
  },
  "cantidadUsada": 5
}
```

### **PUT /actividades/{id}**
Actualiza una actividad existente.

**Ejemplo de solicitud:**
```json
{
  "descripcion": "Aplicación de fertilizante orgánico (dosis doble)",
  "cantidadUsada": 10,
  "fecha_fin": "2023-11-22"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": 1,
  "message": "Actividad actualizada correctamente"
}
```

**Restricciones:**
- No se puede modificar `cultivo` o `tipo_actividad` después de creado
- `fecha_inicio` solo editable si la actividad no ha comenzado

### **DELETE /actividades/{id}**
Elimina una actividad.

**Respuesta exitosa (200 OK):**
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

---

## **Validaciones Adicionales**

1. **Fechas**:
   - `fecha_inicio` no puede ser posterior a `fecha_fin`
   - No puede solaparse con otras actividades en el mismo cultivo

2. **Relaciones**:
   - `cultivo` debe estar activo
   - `insumo` debe tener suficiente stock disponible

3. **Cantidad**:
   - `cantidadUsada` debe ser mayor que 0
   - No puede superar el stock disponible del insumo

---

## **Ejemplo Completo de Uso**

1. **Crear nueva actividad**:
```bash
POST /actividades/
{
  "tipo_actividad": 1,
  "programacion": 2,
  "descripcion": "Riego por goteo",
  "fecha_inicio": "2023-11-25",
  "fecha_fin": "2023-11-25",
  "usuario": 15,
  "cultivo": 32,
  "insumo": null,
  "cantidadUsada": 0
}
```

2. **Filtrar actividades por cultivo**:
```bash
GET /actividades/?cultivo=45
```

3. **Actualizar cantidad de insumo**:
```bash
PUT /actividades/8
{
  "cantidadUsada": 3,
  "descripcion": "Ajuste de cantidad según recomendación técnica"
}
```

---

## **Notas Importantes**

1. Las actividades consumen insumos automáticamente:
   - Se actualiza el stock al confirmar la actividad
   - Se revierte el stock si se elimina la actividad

2. Las actividades con cultivos inactivos:
   - Se pueden consultar pero no crear/modificar

3. Campos especiales:
   - `insumo` puede ser null para actividades que no consumen recursos
   - `cantidadUsada` debe ser 0 cuando no hay insumo

4. Seguimiento:
   - Todas las modificaciones quedan registradas en el historial de cambios