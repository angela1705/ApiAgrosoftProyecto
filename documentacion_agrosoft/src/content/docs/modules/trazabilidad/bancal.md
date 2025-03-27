---
title: "Gestión de Bancales"
---

Los **bancales** son subdivisiones de los lotes que permiten una gestión más detallada del cultivo. Cada bancal tiene dimensiones y ubicación específica dentro de un lote.

## ¿Cómo registrar un bancal?
Para registrar un nuevo bancal en Agrosoft:
1. Ir a la sección **Cultivo → Bancales**.
2. Hacer clic en el botón **"Registrar Bancal"**.
3. Completar los siguientes campos:
   - **Nombre del Bancal:** Nombre único del bancal.
   - **Tamaño X:** Dimensión horizontal en metros.
   - **Tamaño Y:** Dimensión vertical en metros.
   - **Posición X:** Coordenada horizontal dentro del lote.
   - **Posición Y:** Coordenada vertical dentro del lote.
   - **Lote:** Lote al que pertenece el bancal.
4. Guardar los cambios.

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

## Relación con Lotes
Los bancales están asociados a un lote específico mediante una relación de clave foránea. Esto permite:
- Organizar el terreno en unidades más pequeñas y manejables
- Asignar cultivos específicos a cada bancal
- Realizar seguimiento individualizado de cada sección del lote

## Consideraciones
- Los nombres de bancal deben ser únicos en todo el sistema
- Las dimensiones y posiciones admiten valores decimales con precisión de centímetros
- Un bancal no puede existir sin estar asociado a un lote
