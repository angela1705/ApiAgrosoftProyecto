# Gestión de Productos de Control

## Estructura de Datos

| Campo               | Tipo                | Descripción |
|---------------------|---------------------|-------------|
| **id**              | `AutoField`         | Identificador único |
| **precio**          | `IntegerField`      | Valor en pesos (COP) |
| **nombre**          | `CharField(30)`     | Nombre comercial (único) |
| **compuestoActivo** | `CharField(50)`     | Principio activo |
| **fichaTecnica**    | `TextField`         | Especificaciones técnicas |
| **Contenido**       | `IntegerField`      | Cantidad contenida |
| **tipoContenido**   | `CharField(10)`     | Unidad de medida (ml, gr, kg, etc.) |
| **unidades**        | `IntegerField`      | Número de unidades por empaque |

---


### **POST cultivo/productos-control/**
Crea un nuevo producto de control

**Request:**
```json
{
  "precio": 85000,
  "nombre": "Fungicida XT-200",
  "compuestoActivo": "Azoxistrobina 25%",
  "fichaTecnica": "Fungicida sistémico para control de hongos...",
  "Contenido": 500,
  "tipoContenido": "ml",
  "unidades": 1
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "precio": 85000,
  "nombre": "Fungicida XT-200",
  "compuestoActivo": "Azoxistrobina 25%",
  "fichaTecnica": "Fungicida sistémico para control de hongos...",
  "Contenido": 500,
  "tipoContenido": "ml",
  "unidades": 1,
  "precioUnitario": 170.0
}
```

### **GET cultivo/productos-control/{id}**
Obtiene un producto específico

**Response (200 OK):**
```json
{
  "id": 1,
  "precio": 85000,
  "nombre": "Fungicida XT-200",
  "compuestoActivo": "Azoxistrobina 25%",
  "fichaTecnica": "Fungicida sistémico para control de hongos...",
  "Contenido": 500,
  "tipoContenido": "ml",
  "unidades": 1,
}
```

### **PUT cultivo/productos-control/{id}**
Actualiza un producto existente

**Request:**
```json
{
  "precio": 90000,
  "unidades": 2
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "message": "Producto actualizado correctamente",
  "nuevoPrecioUnitario": 90.0
}
```

### **DELETE /productos-control/{id}**
Elimina un producto

**Response (200 OK):**
```json
{
  "message": "Producto eliminado correctamente",
  "id": 1
}
```

**Error (409 Conflict):**
```json
{
  "error": "No se puede eliminar",
  "detail": "Existen registros de aplicación asociados a este producto"
}
```

---

## Validaciones

1. **Campos requeridos:**
   ```python
   ["precio", "nombre", "compuestoActivo", "Contenido", "tipoContenido"]
   ```

2. **Restricciones:**
   - `precio`: Valor positivo (min. $1,000)
   - `Contenido`: Entero positivo
   - `unidades`: Entero positivo (default=1)
   - `tipoContenido`: Valores permitidos: ["ml", "gr", "kg", "lt", "un"]

3. **Unicidad:**
   - `nombre` debe ser único (case-insensitive)

---


