---
title: "Gestión de Bancales"
---

Los **bancales** son subdivisiones de los lotes que permiten una gestión más detallada del cultivo. Cada bancal tiene dimensiones y ubicación específica dentro de un lote.

## Datos de un Bancal
Cada bancal tiene la siguiente información:

| Campo           | Tipo de Dato  | Descripción |
|---------------|-------------|-------------|
| **ID**       | `Integer`    | Identificador único del bancal |
| **Nombre**   | `CharField`  | Nombre del bancal (máx. 15 caracteres, único) |
| **Tamaño X** | `DecimalField` | Dimensión en metros en el eje X (max. 3 dígitos, 2 decimales) |
| **Tamaño Y** | `DecimalField` | Dimensión en metros en el eje Y (max. 3 dígitos, 2 decimales) |
| **Posición X** | `DecimalField` | Ubicación en el eje X dentro del lote |
| **Posición Y** | `DecimalField` | Ubicación en el eje Y dentro del lote |
| **Lote**     | `ForeignKey` | Lote al que pertenece el bancal |

## Ejemplo de API para crear un bancal
```json
POST /cultivo/bancales
{
  "nombre": "Bancal 1",
  "TamX": 2.50,
  "TamY": 1.75,
  "posX": 0.50,
  "posY": 0.25,
  "lote": 1
}
```
### **GET /cultivo/bancales/{id}**
Obtiene un bancal específico por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Bancal 1",
  "TamX": 2.50,
  "TamY": 1.75,
  "posX": 0.50,
  "posY": 0.25,
  "lote": {
    "id": 1,
    "nombre": "Lote Norte"
  },
  "cultivos_activos": 2
}
```


### **PUT /cultivo/bancales/{id}**
Actualiza un bancal existente.

**Ejemplo de solicitud:**
```json
{
  "TamX": 3.20,
  "TamY": 2.10
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": 1,
  "message": "Bancal actualizado correctamente"
}
```

**Restricciones:**
- No se puede modificar el `lote` asociado
- No se puede reducir tamaño si hay cultivos activos

### **DELETE /cultivo/bancales/{id}**
Elimina un bancal (solo si no tiene cultivos asociados).

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Bancal eliminado correctamente",
  "id": 1
}
```

**Error común (409 Conflict):**
```json
{
  "error": "No se puede eliminar",
  "detail": "Existen cultivos asociados a este bancal"
}
```

---

## Relación con Lotes
Los bancales están asociados a un lote específico mediante una relación de clave foránea. Esto permite:
- Organizar el terreno en unidades más pequeñas y manejables
- Asignar cultivos específicos a cada bancal
- Realizar seguimiento individualizado de cada sección del lote

## Consideraciones
- Los nombres de bancal deben ser únicos en todo el sistema
- Las dimensiones y posiciones admiten valores decimales con precisión de centímetros
- Un bancal no puede existir sin estar asociado a un lote
