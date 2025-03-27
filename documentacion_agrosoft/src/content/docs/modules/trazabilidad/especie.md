---
title: "Gestión de especies"
---
Las **Especies** representan las variedades vegetales o animales específicas que se cultivan o crían en el sistema Agrosoft, asociadas a un tipo de especie general.

## ¿Cómo registrar una Especie?
Para registrar una nueva especie en Agrosoft:
1. Ir a la sección **Catálogos → Especies**.
2. Hacer clic en el botón **"Registrar Especie"**.
3. Completar los siguientes campos:
   - **Tipo de Especie:** Seleccionar la categoría general (ej: "Hortalizas", "Frutales").
   - **Nombre:** Nombre único de la especie (ej: "Manzano Fuji", "Maíz Híbrido 3000").
   - **Descripción:** Características específicas de la especie.
   - **Días de Crecimiento:** Tiempo estimado desde siembra hasta cosecha.
   - **Imagen:** Fotografía representativa (opcional).
4. Guardar los cambios.

## Datos de una Especie

| Campo               | Tipo de Dato        | Descripción |
|--------------------|-------------------|-------------|
| **ID**            | `Integer`          | Identificador único automático |
| **Tipo Especie**  | `ForeignKey`       | Categoría general de la especie |
| **Nombre**        | `CharField`        | Nombre específico (máx. 30 chars, único) |
| **Descripción**   | `TextField`        | Detalles característicos |
| **Días Crecimiento** | `IntegerField`  | Ciclo vegetativo en días |
| **Imagen**        | `ImageField`       | Foto representativa (en 'especies_images/') |

## Ejemplo de API para crear una Especie

```json
POST /catalogos/especies
{
  "fk_tipo_especie": 3,
  "nombre": "Tomate Cherry",
  "descripcion": "Variedad de tomate pequeño, dulce y productivo",
  "largoCrecimiento": 75,
  "img": "base64_encoded_image_data"
}
```

## Relaciones y Funcionalidad

 **Jerarquía de Clasificación:**
```
Tipo Especie (ej: Hortalizas)
  └─ Especie (ej: Tomate Cherry)
     └─ Variedades (opcional)
```

 **Uso del ciclo de crecimiento:**
- Programación automática de cosechas
- Alertas de cuidados en etapas clave
- Cálculo de rotación de cultivos


## Buenas Prácticas

1. **Nomenclatura consistente:** Usar nombres científicos o comerciales estándar
2. **Datos de crecimiento:** Actualizar según experiencias locales
3. **Documentación completa:** Incluir en descripción:
   - Requerimientos climáticos
   - Susceptibilidades
   - Rendimientos esperados
4. **Imágenes:** Usar fotos que muestren:
   - Planta adulta
   - Fruto/parte útil
   - Características distintivas
