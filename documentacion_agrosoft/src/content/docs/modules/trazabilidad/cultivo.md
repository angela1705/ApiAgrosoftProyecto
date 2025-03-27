---
title: "Gestión de cultivos"
---
Los **Cultivos** representan instancias específicas de siembra de una especie en un bancal particular, con seguimiento de su ciclo productivo.  

## ¿Cómo registrar un Cultivo?  
Para registrar un nuevo cultivo en Agrosoft:  
1. Navegar a **Producción → Cultivos**  
2. Seleccionar **"Nuevo Cultivo"**  
3. Completar los campos obligatorios:  
   - **Especie:** Seleccionar del catálogo de especies registradas  
   - **Bancal:** Ubicación física asignada  
   - **Nombre único:** Identificador descriptivo (ej: "Tomate Cherry - Bancal 3A")  
   - **Fecha de siembra:** Día de establecimiento  
   - **Estado:** Activo/Inactivo  
   - **Unidad de medida:** (Opcional) kg, g, toneladas, etc.  
4. Confirmar con **"Guardar"**  

---

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
POST /produccion/cultivos  
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




