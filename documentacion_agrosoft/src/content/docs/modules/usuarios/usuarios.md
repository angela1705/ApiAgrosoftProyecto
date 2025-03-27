---
title: Gestion de Usuarios
slug: modules/usuarios/usuarios
description: "Como administrar usuarios en el modulo de usuarios en Agrosoft."
---

#  Gestion de Usuarios

Los **Usuarios** son indivduos que interactúa con el sistema y tienen un rol asignado, lo que define qué permisos y acciones puede realizar.

## ¿Cómo registrar un usuario?
Para registrar un nuevo lote en Agrosoft:
1. Ve a la pagina de Bienvenida o al Incio de sesión principal.
2. Hacer clic en el botón **"Registrar"**.
3. Completar los siguientes campos:
   - **Nombre:** Nombre único del usuario.
   - **Apellido:** Apellido único del usuario.
   - **Contraseña:** cadena de caracteres utilizada para autenticar y verificar la identidad del usuario al acceder a un sistema.
   - **Username:** Nombre corto personalizado único del usuario.
   - **Email:** Dirección de contacto mail única del usuario.


## Datos de un usuario
Cada usuario tiene la siguiente información:
| Campo        | Tipo de Dato  | Descripción |
|-------------|-------------|-------------|
| **Nombre**   | `CharField`  |             |
| **Apellido** | `CharField`  |             |
| **Contraseña** | `CharField`  |             |
| **Username**   | `CharField`  |             |
| **Email**    | `EmailField`  |             |


## Ejemplo de API para crear un lote
```json
headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },

POST /usuario/
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "contraseña": "Clave123",
  "username": "juanperez01",
  "email": "juanperez@gmail.com"
}
- **Response:**
   creara un nuevo usuario.

