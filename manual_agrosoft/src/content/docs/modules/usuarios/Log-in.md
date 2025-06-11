---
title: Gestion de Ingreso al sistema
slug: modules/usuarios/Log-in
description: "Como administrar roles de un usuario en el modulo de usuarios en Agrosoft."
---

#  Ingreso al sistema 
**A continuación se presentan las principales funcionalidades relacionadas con el acceso al sistema:**
## Inicio de sesión:
Una vez realizada la configuración y el despliegue del sistema, el usuario podrá acceder al sistema mediante una interfaz de inicio de sesión. Para iniciar la aplicación, el usuario debe ingresar:
 - **Numero de documento y contraseña**, en caso de estar previamente registrado
   Si la autenticación es exitosa, el sistema lo redirige al panel principal. 


<img src="/public/usuarios/CompletoLOG.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## 1 Usuario creado por defecto:

Al iniciar la aplicación se crea un usuario con permisos de administrador por defecto el cual se crea automaticamente, esto para facilitar la interacción de los usuarios nuevos con el sistema y evitar conflictos de permisos, al estar en **Iniciar sesión** usa estas credenciales:
- Numero de documento: **123456**
- Contraseña: **admin**
- Haz click en **Ingresar**
- Ejemplo de uso:
<img src="/public/usuarios/log-in2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

con este admin podrás registrar y administrar todo tipo de información y adminstrarla sin restricciones 
eso incluye registrar otros usuarios y definir sus permisos en el sistema.

## 2 Registro de nuevos usuarios:
- .Si deseas registrate en el sistema debes dirigirte a la parte inferior del registro, busca esto:
 ¿No estas registrado? **Regístrate** :
<img src="/public/usuarios/log-3.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

 Tendras una vista del formulario de registro de usuarios:

<img src="/public/usuarios/registro1.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

- Ejemplo de uso:

<img src="/public/usuarios/registro2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />
- Si el formulario fue diligenciado de una forma correcta, podra ver este mensaje:

- **"Usuario registrado correctamente"**
<img src="/public/usuarios/registro3.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

## ✖️ Errores al registrar:
- **Credenciales unicas**

 Cada ususario tiene datos unicos, no puedes usar credenciales(**Numero de documento, correo**)    
 ya registradas en otro usuario previamente
 - el sistema marcará si la información ingresada ya esta en uso
 - corrige la información ingresada para que proceso siga su curso correctamente

<img src="/public/usuarios/registroerror1.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- **Formulario incompleto**
- **❗Llenar todos los campos es OBLIGATORIO**

Los Datos requeridos por el Formulario de registro son obligatorios y necesarios para el correcto registro del usuario, al omitir alguno de los campos no se podrá realizar el registro 

 - el sistema marcará si hay algun campo del formulario esta vacío
 - ingresa la información requerida para que proceso siga su curso correctamente

<img src="/public/usuarios/registroerror2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />


- **Restricciones de los campos**
Los campos siguen una norma que debe ser respetada:
  Para crear una cuenta, los datos deben cumplir estos requisitos:
- **Nombre y Apellido**: Unicamente ingresa texto, sin números o caracteres especiales 
- ⚠️Solo ingresa texto, evita ingresar numeros:(1-2-3)
- ⚠️Solo ingresa texto, evita ingresar Caracteres especiales:(+#&%)
- **Numero de documento**:Solo ingresa números
- **Email**: Dirección de correo electronico
- ✅ Siguiendo los requisitos podrás registrate facilmente.
<img src="/public/usuarios/registroerror4.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

## ¿Cual es mi contraseña?
- **Tu contraseña esta compuesta de elementos de tu registro**
- **Primer letra de tu nombre + Número de documento**
- **Ejemplo**:
- Generación de contraseñas:

| Nombre      | Apellido | Correo | Numero Documento |Contraseña |
|-------------|-------------|-------------|-------------|-------------|
| **Juan**   | **Rojas**  |`Jrojas@gmail.com`  | 100508320| J100508320

## Recuperación de contraseña: 
Si el usuario olvida su contraseña,en el formulario de **Incio de sesión**.

tiene la opción de hacer clic en **"¿Olvidó su contraseña?"**

<img src="/public/usuarios/recuperacion1.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

Al hacerlo, se le pedirá que ingrese su **Correo electrónico** este correo electronico debe pertenecer a tu cuenta.
<img src="/public/usuarios/recuperacion.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

 El sistema enviará un código de verificación al correo del usuario, permitiéndole obtener el link para restablecer la contraseña.
 - Si el correo que enviaste es valido, verás un mensaje como este:
<img src="/public/usuarios/recuperacion3.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

encontrará este mensaje en su correo, el cual contiene el link para el restablecimiento de su contraseña:
<img src="/public/usuarios/recuperacion4.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

Al dar click al link de recuperación, sera llevado a un formulario para ingresar su nueva contraseña:
- Ingrese su nueva contraseña
- Ingrese nuevamente la contraseña para confirmar

<img src="/public/usuarios/recuperacion5.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

Al dar click en **Restablecer** podra ver el siguiente mensaje:
<img src="/public/usuarios/recuperacion6.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

El restablecimiento de su contraseña ha sido exitoso✅.

## ✖️ Errores al restablecer contraseña:

**Correo no valido**
- **Usar un correo que NO esta registrado en el sistema:**
- si el correo que proporcionaste para la recuperación no esta registrado en el sistema verás un mensaje como este:
<img src="/public/usuarios/recuperacion7.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

**link no valido**
- El link que llega a tu correo tiene una vigencia de **10 minutos** pasado ese tiempo no podrás realizar el restablecimiento:
<img src="/public/usuarios/recuperacion9.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

Ten en cuenta el tiempo que ha pasado desde que se generó el link:
<img src="/public/usuarios/recuperacion8.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

Sigue correctamente los pasos y recomendaciones para un restablecimiento de contraseña exitoso.
 ## Consideraciones Legales sobre Datos Personales
 <img src="/public/usuarios/ministerio.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

El sistema implementado maneja información personal sensible como nombres, correos electrónicos, documentos de identidad, teléfonos de contacto y otros datos de identificación de los usuarios. Por tal motivo, se debe cumplir con la **Ley 1581 de 2012**, también conocida como la Ley de Protección de Datos Personales en Colombia.

Esta ley establece que:

- Toda recolección y tratamiento de datos personales requiere la autorización expresa del titular.

- La información recolectada debe tener una finalidad clara y legítima.

- El sistema debe garantizar los principios de seguridad, confidencialidad y acceso restringido a la información.

- Los usuarios deben tener la posibilidad de consultar, actualizar o eliminar su información cuando así lo deseen.

- Se recomienda contar con una Política de Tratamiento de Datos visible en la plataforma.

Además, si el sistema está en producción y es operado por una entidad legal, se debe registrar la base de datos en el Registro Nacional de Bases de Datos (RNBD) ante la Superintendencia de Industria y Comercio (SIC).
