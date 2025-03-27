---
title: "Gestión de tipos de especie"
---
Los **Tipos de Especie** son clasificaciones que permiten organizar y categorizar las diferentes especies vegetales o animales manejadas en el sistema Agrosoft.

## ¿Cómo registrar un Tipo de Especie?
Para registrar un nuevo tipo de especie en Agrosoft:
1. Ir a la sección **Catálogos → Tipos de Especie**.
2. Hacer clic en el botón **"Registrar Tipo de Especie"**.
3. Completar los siguientes campos:
   - **Nombre del Tipo:** Nombre único de la categoría (ej: "Hortalizas", "Frutales", "Ganado Bovino").
   - **Descripción:** Información detallada sobre las características comunes de esta categoría.
   - **Imagen:** Imagen representativa del tipo de especie (opcional).
4. Guardar los cambios.

## Datos de un Tipo de Especie
Cada tipo de especie tiene la siguiente información:

| Campo           | Tipo de Dato  | Descripción |
|---------------|-------------|-------------|
| **ID**       | `Integer`    | Identificador único automático |
| **Nombre**   | `CharField`  | Nombre del tipo (máx. 30 caracteres, único) |
| **Descripción** | `TextField` | Información detallada sobre el tipo |
| **Imagen**   | `ImageField` | Imagen representativa (almacenada en 'tipos_especie_images/') |

## Ejemplo de API para crear un Tipo de Especie
```json
POST /catalogos/tipos-especie
{
  "nombre": "Frutales de Clima Templado",
  "descripcion": "Árboles frutales que requieren inviernos fríos para su correcto desarrollo",
  "img": "base64_encoded_image_data"
}
```

## Características importantes
- **Nombres únicos:** No puede haber duplicados en los tipos de especie
- **Imágenes opcionales:** Se pueden asociar imágenes representativas
- **Descripción detallada:** Permite documentar características comunes del grupo

## Uso en el sistema
Los tipos de especie sirven como categoría padre para:
- Clasificar especies específicas
- Organizar reportes y estadísticas
- Filtrar información en el sistema
- Agrupar tratamientos y manejo agronómico


## Consideraciones
1. Usar nombres descriptivos pero concisos
2. Proporcionar descripciones completas que ayuden a identificar el grupo
3. Utilizar imágenes representativas cuando sea posible
4. Mantener una estructura jerárquica lógica (ej: "Hortalizas" > "Hortalizas de Fruto")