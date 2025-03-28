---
title: Autenticación
slug: guides/authentication
description: Métodos de autenticación en la API de Agrosoft.
---

#  Autenticación en Agrosoft API

Aquí aprenderás cómo autenticarte en la API usando tokens.
- Primeramente debes estar previamente registrado en el sistema como requisito obligatorio
- si nececitas informacion sobre el registro ve al modulo de **Usuarios**

# Contextualización
**Token**
- El token se usa en una aplicación para manejar la autenticación (verificar la identidad de un usuario) y la autorización (determinar qué acciones puede realizar dentro del sistema). Funciona como una credencial digital.
- tiene un tiempo de vida limitado para mayor seguridad. Cuando expira, se usa un refresh token para obtener uno nuevo sin necesidad de volver a iniciar sesión.

# ¿Como generar un Token?

**Campos de un usuario:**

```json

{
    "nombre": "Juan",
    "apellido": "Rojas",
    "email": "juan.rojas@gmail.com",
    "username": "juan123",
    "password": "Segura123!",
    "rol_id": 1
}
```
**Campos que usas para generar un token:**

```json

{
    "email": "juan.rojas@gmail.com",
    "password": "Segura123!",
}
```
# API para generar el Token
# POST /auth/login/
{ "Content-Type": "application/json" }

**Ejemplo de solicitud:**

```json

{
    "email": "juan.rojas@gmail.com",
    "password": "Segura123!",
}
```
**Validaciones:**
- `Email` y `Password`: Deben coincidir

**Ejemplo de respuesta exitosa (201):**
```json
{

    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzczNzI5MywiaWF0IjoxNzQzMTMyNDkzLCJqdGkiOiIwYTRhZjYzMTgyNGQ0MjdhYjZlZDU1OTI3ZTFiZWFhMyIsInVzZXJfaWQiOjF9.ag2GOVAnfXSv8SQWLDKsxF3gXsLhxqMggfWidsZRlwQ",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMTM2MDkzLCJpYXQiOjE3NDMxMzI0OTMsImp0aSI6IjA1ZTc0MGI3NTg5ZTRkODM4YTZlZDk3YzMwM2YwOTU0IiwidXNlcl9pZCI6MX0.R_bAWDkPT5J61XD6y6SK9xW9KJPt0R9cpW7bvAnouzY"

}
```
**Posibles errores:**
- `400 Bad Request`: Si faltan campos obligatorios.
- `401 Unauthorized`: Si la informacion es erronea o no coincide.

# Uso del Token en el API
- 1 Ir a la pestaña "Authorization".
- 2 En la parte superior de la petición, selecciona la pestaña "Authorization"
- 3 Elegir el tipo "Bearer Token".
- 4 En el menú desplegable de "Type", selecciona "Bearer Token".
- 5 En el campo "Token", pega el token ya generado.
- 6 Haz clic en "Send" para ejecutar la petición con el token en la cabecera de autorización.

**Si la ejecucion fue correcta:**
- **Respuesta exitosa, devuelve contenido de la consulta: (200).**

# API para usar el Refresh del token
# POST /auth/token/refresh/
{ "Content-Type": "application/json" }

- 1 Ir al endpoint "Refresh".
- 2 Elige el metodo "POST"
- 3 Pegar el **Token Refresh** en el Body {Json} que generaste anteriormente 
- descarta el "**Token Access**".
- 4 En el menú desplegable de "Type", selecciona "Bearer Token".
- 5 En el campo "Token", pega el token ya generado.
- 6 Haz clic en "Send" para ejecutar la petición.

**Token generado anteriormente:**
- **Descarta el access (Importante)**

```json
{

    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzczNzI5MywiaWF0IjoxNzQzMTMyNDkzLCJqdGkiOiIwYTRhZjYzMTgyNGQ0MjdhYjZlZDU1OTI3ZTFiZWFhMyIsInVzZXJfaWQiOjF9.ag2GOVAnfXSv8SQWLDKsxF3gXsLhxqMggfWidsZRlwQ",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMTM2MDkzLCJpYXQiOjE3NDMxMzI0OTMsImp0aSI6IjA1ZTc0MGI3NTg5ZTRkODM4YTZlZDk3YzMwM2YwOTU0IiwidXNlcl9pZCI6MX0.R_bAWDkPT5J61XD6y6SK9xW9KJPt0R9cpW7bvAnouzY"

}
```

**Ejemplo de Consulta:**

```json

{
    "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Mzc0Mjk0MCwiaWF0IjoxNzQzMTM4MTQwLCJqdGkiOiJkMjVjMWRiNjExYzQ0MTdhYTZmMmFjYmUwODFjMmYzZiIsInVzZXJfaWQiOjF9.GvwIlbg5np9RiVPBQpkTwOBnTKH8dgg6QMB8PIw_pz4"
}
```
**Validaciones:**
- `Formato de envio`: El refresh debe ser enviado como **JSON body** y no como Bearer Token 

**Ejemplo de respuesta exitosa (201):**
- **Renovacion del Token:**

```json
{

    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzczNzI5MywiaWF0IjoxNzQzMTMyNDkzLCJqdGkiOiIwYTRhZjYzMTgyNGQ0MjdhYjZlZDU1OTI3ZTFiZWFhMyIsInVzZXJfaWQiOjF9.ag2GOVAnfXSv8SQWLDKsxF3gXsLhxqMggfWidsZRlwQ",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMTM2MDkzLCJpYXQiOjE3NDMxMzI0OTMsImp0aSI6IjA1ZTc0MGI3NTg5ZTRkODM4YTZlZDk3YzMwM2YwOTU0IiwidXNlcl9pZCI6MX0.R_bAWDkPT5J61XD6y6SK9xW9KJPt0R9cpW7bvAnouzY"

}
```


# Manejo de errores
**Si el token no fue añadido en el campo Token:**
- `Unauthorized`: (401).
```json
{

    "detail": "Authentication credentials were not provided."

}
```
**Si el token añadido esta mal escrito o expiró:**
- `Unauthorized`: (401).
```json
{

 "detail": "Given token not valid for any token type",
    "code": "token_not_valid",
    "messages": [
        {
            "token_class": "AccessToken",
            "token_type": "access",
            "message": "Token is invalid or expired"
        }
    ]
}
```
**Si el token añadido no es el esperado:**
- ej:
**Usar el token refresh en el endpoint de authorization:**

- `Unauthorized`: (401).
```json
{

 "detail": "Given token not valid for any token type",
    "code": "token_not_valid",
    "messages": [
        {
            "token_class": "AccessToken",
            "token_type": "access",
            "message": "Token has a wrong type"
        }
    ]
}
```

**Si el token no fue añadido en el campo Bearer > Token:**
- `Unauthorized`: (401).
```json
{

    "detail": "Authentication credentials were not provided."

}
```




