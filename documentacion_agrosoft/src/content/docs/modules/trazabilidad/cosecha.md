---
title: "Gestión de cosecha"
---

Los registros de **Cosecha** documentan la producción obtenida de cada cultivo. Esta documentación cubre los endpoints RESTful para su gestión.

---

## **Datos de una Cosecha**

Cada registro de cosecha contiene la siguiente información:

| Campo               | Tipo de Dato        | Descripción |
|--------------------|-------------------|-------------|
| **ID**            | `Integer`          | Identificador único automático |
| **id_cultivo**    | `ForeignKey`       | Cultivo asociado (relación con tabla Cultivos) |
| **cantidad**      | `IntegerField`     | Cantidad cosechada (valor entero positivo) |
| **unidades_de_medida** | `CharField`  | Unidad de medida (kg, g, lb, ton, cajas, unidades) |
| **fecha**         | `DateField`        | Fecha de cosecha (formato YYYY-MM-DD) |

---

## **Ejemplo de API para crear una cosecha**

```json
POST cultivo/cosechas/
{
  "id_cultivo": 45,
  "cantidad": 120,
  "unidades_de_medida": "kg",
  "fecha": "2023-11-20"
}
```

---

## **Endpoints de la API**

### **GET cultivo/cosechas/**
Obtiene todas las cosechas registradas.

**Ejemplo de respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "id_cultivo": 45,
    "cantidad": 120,
    "unidades_de_medida": "kg",
    "fecha": "2023-11-20"
  }
]
```

### **GET cultivo/cosechas/{id}**
Obtiene una cosecha específica por su ID.

**Ejemplo de respuesta (200 OK):**
```json
{
  "id": 1,
  "id_cultivo": 45,
  "cantidad": 120,
  "unidades_de_medida": "kg",
  "fecha": "2023-11-20"
}
```

### **PUT cultivo/cosechas/{id}**
Actualiza un registro existente.

**Ejemplo de solicitud:**
```json
{
  "cantidad": 90,
  "unidades_de_medida": "kg"
}
```

### **DELETE /cosechas/{id}**
Elimina un registro de cosecha.

**Respuesta exitosa (200 OK):**
```json
{
  "message": "Registro de cosecha eliminado",
  "id": 1
}
```

---

## **Validaciones**

1. **Campos requeridos**:
   - `id_cultivo` (debe existir)
   - `cantidad` (entero positivo)
   - `unidades_de_medida`
   - `fecha` (no puede ser futura)

2. **Unidades de medida aceptadas**:
   ```python
   ['kg', 'g', 'lb', 'ton', 'cajas', 'unidades']
   ```

