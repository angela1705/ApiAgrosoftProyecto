---
title: Gestion de Ingreso al sistema
slug: modules/usuarios/Log-in
description: "Como administrar roles de un usuario en el modulo de usuarios en Agrosoft."
---

#  Ingreso al sistema

Una vez realizada la configuración y el despliegue del sistema, el usuario podrá acceder al sistema mediante una interfaz de inicio de sesión. Para iniciar la aplicación, el usuario debe ingresar su correo y contraseña en los campos designados. A continuación se presentan las principales funcionalidades relacionadas con el acceso al sistema: 

1.	Inicio de sesión: El usuario ingresa su número de documento y contraseña en los campos correspondientes. Si la autenticación es exitosa, el sistema lo redirige al panel principal del sistema.


## Datos de un rol
Cada rol tiene la siguiente información:
| Campo        | Tipo de Dato  | Descripción |
|-------------|-------------|-------------|
| **ID**       | `AutoField`  | Identificador único del rol. |
| **Nombre**   | `CharField`  | Nombre del rol unico. |


## Ejemplo de API para gestionar roles
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">POST</span>  </p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">  <div class="expressive-code"><figure class="frame not-content"><figcaption class="header"></figcaption><pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/usuarios/roles/</span></div></div></code></pre><div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/usuarios/roles/"><div></div></button></div></figure></div>  </section>

**Encabezados de la solicitud**
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |

- Crea un nuevo rol.

**Ejemplo de solicitud:**

```json

{
    "nombre": "Aprendiz",
}
```

**Validaciones:**
- `Nombre`:
- Este campo debe llenarse obligatoriamente con un nombre de unico.

**Ejemplo de respuesta exitosa (201 Created):**
<span class="sl-badge success small astro-avdet4wd">Success</span>

```json
{

    "id": 1,
    "nombre": "Aprendiz"

}
```

**Posibles errores:**
- `400 Bad Request`: Si faltan campos obligatorios.
- `409 Conflict`: Si el rol ya existe.

---

<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span>  </p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">  <div class="expressive-code"><figure class="frame not-content"><figcaption class="header"></figcaption><pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/usuarios/roles/</span></div></div></code></pre><div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/usuarios/roles/"><div></div></button></div></figure></div>  </section>

**Encabezados de la solicitud**
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |
- Obtiene todos los usuarios registrados.

**Ejemplo de respuesta (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>

```json
[
    {
        "id": 1,
        "rol": "Aprendiz"
    },
    {
        "id": 2,
        "rol": "Instructor"
    }
    ]
```


---
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">GET</span>  </p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">  <div class="expressive-code"><figure class="frame not-content"><figcaption class="header"></figcaption><pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/usuarios/roles/{id}/</span></div></div></code></pre><div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/usuarios/roles/{id}/"><div></div></button></div></figure></div>  </section>

**Encabezados de la solicitud**
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |
- Obtiene un rol específico por su ID.

**Ejemplo de respuesta (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>

```json
[
    {
        "id": 1,
        "rol": "Aprendiz"
    }
]
```
---

**Posibles errores:**
- `404 Not Found`: Si el ID no existe.

---
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">PUT</span>  </p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">  <div class="expressive-code"><figure class="frame not-content"><figcaption class="header"></figcaption><pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/usuarios/roles/{id}/</span></div></div></code></pre><div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/usuarios/roles/{id}/"><div></div></button></div></figure></div>  </section>

**Encabezados de la solicitud**
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |
- Actualiza un rol existente.

**Ejemplo de solicitud:**
```json
    {
        "rol": "Aprendiz oficina"
    }
```


**Ejemplo de respuesta (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>

```json
{
       
        "id": 1,
        "rol": "Aprendiz oficina"
    
}
```
**Posibles errores:**
- `404 Bad Request`: Si el ID no existe.

**Notas:**
- Se pueden actualizar campos individualmente.
- El `nombre`, debe seguir siendo único.

---
<p> <strong>Método:</strong> <span class="sl-badge success small astro-avdet4wd">DELTE</span>  </p>
URL:
<section id="tab-panel-58" aria-labelledby="tab-58" role="tabpanel">  <div class="expressive-code"><figure class="frame not-content"><figcaption class="header"></figcaption><pre data-language="http" tabindex="0"><code><div class="ec-line"><div class="code"><span style="--0:#D6DEEB;--1:#403F53">http://127.0.0.1:8000/usuarios/roles/{id}/</span></div></div></code></pre><div class="copy"><button title="Copiar al portapapeles" data-copied="¡Copiado!" data-code="http://127.0.0.1:8000/usuarios/roles/{id}/"><div></div></button></div></figure></div>  </section>

**Encabezados de la solicitud**
| Encabezado     | Valor                         | Descripción                                               |
|----------------|-------------------------------|-----------------------------------------------------------|
| **Content-Type** | `application/json`            | Indica que los datos se envían en formato JSON.           |
| **Authorization** | `Bearer <token_de_acceso>`    | Token de autenticación necesario para acceder al recurso. |
| **Accept**       | `application/json`            | Indica que la respuesta debe estar en formato JSON.       |
Elimina un rol (si no está en uso).

**Ejemplo de respuesta exitosa (200 OK):**
<span class="sl-badge success small astro-avdet4wd">Success</span>

```json
{
  "message": "Rol eliminado correctamente"
}
```

**Posibles errores:**
- `404 Not Found`: Si el ID no existe.
- `409 Conflict`: Si el rol está en uso por los usuarios.

---
## ** Ejemplos de Uso**

### **Crear y luego actualizar un rol:**
```bash
# Crear (POST)
Metodo: POST http://127.0.0.1:8000/usuarios/roles/
{
    "nombre": "Aprendiz",
}

# Actualizar (PUT)
Metodo: PUT http://127.0.0.1:8000/usuarios/roles/1/
{
  "nombre": "Aprendiz_nuevo"
}
```

### **Listar usuarios:**
```bash
# Obtener (GET)
Metodo: GET http://127.0.0.1:8000/usuarios/roles/
{
    "id": 1 ,
    "nombre": "Apremdiz_nuevo",
}

```


---

## **Manejo de Errores**

### **Ejemplo de error (nombre duplicado):**
```json
{
  "error": "ValidationError",
  "detail": {
    "nombre": ["Ya existe un rol con este nombre."]
  },
  "status": 400
}
```

### **Códigos de estado comunes:**
| Código | Descripción |
|--------|-------------|
| `200` | OK (GET, PUT, DELETE exitoso) |
| `201` | Created (POST exitoso) |
| `400` | Bad Request (datos inválidos) |
| `404` | Not Found (recurso no existe) |
| `409` | Conflict (restricción de integridad) |

---

## **Relaciones en el Sistema**
- **Roles** (ejemplo: "Juan rojas" → "Juan rojas-> rol_id: 4 (Adminstrador)").
- **Asignación de roles(Administrador)** (para asignar roles a otros usuarios recurrentes).


---



### **Buenas Prácticas**
✔️ **Nombres para los roles**: ("Nombres claros,descriptivos para los roles").  
