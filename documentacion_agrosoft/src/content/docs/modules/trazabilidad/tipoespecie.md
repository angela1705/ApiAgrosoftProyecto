---
title: "Gestión de tipos de especie"
---
Los **Tipos de Especie** son clasificaciones que permiten organizar y categorizar las diferentes especies vegetales o animales manejadas en el sistema Agrosoft.


## Datos de un Tipo de Especie
Cada tipo de especie tiene la siguiente información:

| Campo           | Tipo de Dato  | Descripción |
|---------------|-------------|-------------|
| **ID**       | `Integer`    | Identificador único automático |
| **Nombre**   | `CharField`  | Nombre del tipo (máx. 30 caracteres, único) |
| **Descripción** | `TextField` | Información detallada sobre el tipo |

## Ejemplo de API para crear un Tipo de Especie
```json
POST /cultivo/tipo_especie/
{
  "nombre": "Frutales de Clima Templado",
  "descripcion": "Árboles frutales que requieren inviernos fríos para su correcto desarrollo",
}
```

**Ejemplo de respuesta (201 Created):**
```json
{
  "id": 7,
  "nombre": "Frutales de Clima Templado",
  "descripcion": "Árboles frutales que requieren inviernos fríos para su correcto desarrollo",
}
```

### **GET /cultivo/tipo_especie/{id}**
Obtiene un tipo de especie específico por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 7,
  "nombre": "Frutales de Clima Templado",
  "descripcion": "Árboles frutales que requieren inviernos fríos para su correcto desarrollo",
}
```

### **PUT /cultivo/tipo_especie/{id}**
Actualiza un tipo de especie existente.

**Ejemplo de solicitud:**
```json
{
  "descripcion": "Árboles frutales que requieren entre 600-1200 horas de frío invernal",
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": 7,
  "message": "Tipo de especie actualizado correctamente",
}
```

### **DELETE /cultivo/tipo_especie/{id}**
Desactiva un tipo de especie (eliminación lógica).

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Tipo de especie eliminado correctamente",
}
```

---

## **Validaciones Adicionales**

1. **Nombre único**:
   - No puede repetirse en el sistema (case-insensitive)
   - Máximo 30 caracteres
   - No permite caracteres especiales excepto guiones


## Características importantes
- **Nombres únicos:** No puede haber duplicados en los tipos de especie
- **Descripción detallada:** Permite documentar características comunes del grupo



## Consideraciones
1. Usar nombres descriptivos pero concisos
2. Proporcionar descripciones completas que ayuden a identificar el grupo
4. Mantener una estructura jerárquica lógica (ej: "Hortalizas" > "Hortalizas de Fruto")