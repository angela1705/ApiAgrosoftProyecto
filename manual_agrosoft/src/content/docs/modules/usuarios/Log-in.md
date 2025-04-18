---
title: Gestion de Ingreso al sistema
slug: modules/usuarios/Log-in
description: "Como administrar roles de un usuario en el modulo de usuarios en Agrosoft."
---

#  Ingreso al sistema

Una vez realizada la configuración y el despliegue del sistema, el usuario podrá acceder al sistema mediante una interfaz de inicio de sesión. Para iniciar la aplicación, el usuario debe ingresar su correo y contraseña en los campos designados. A continuación se presentan las principales funcionalidades relacionadas con el acceso al sistema:.
- 1.	Inicio de sesión: El usuario ingresa su número de documento y contraseña (si esta previamente registrado) en los campos correspondientes. Si la autenticación es exitosa, el sistema lo redirige al panel principal del sistema.

<img src="/public/CompletoLOG.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />


Al iniciar la aplicación se crea un usuario con permisos de administrador por defecto el cual se crea automaticamente, esto para facilitar la interacción de los usuarios nuevos con el sistema y evitar conflictos de permisos, al estar en **Iniciar sesión** usa estas credenciales:
- Correo: **admin@gmail.com**
- Contraseña: **admin**
- Ejemplo de uso:
<img src="/public/log-in2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

con este admin podrás registrar y administrar todo tipo de información y adminstrarla sin restricciones 
eso incluye registrar otros usuarios y definir sus permisos en el sistema.

## Registro de nuevos usuarios:
- 2.Si deseas registrate en el sistema debes dirigirte a la parte inferior del registro, busca esto:
 ¿No estas registrado? **Regístrate** :
<img src="/public/log-3.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

 Tendras una vista del formulario de registro de usuarios:

<img src="/public/registro1.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

- Ejemplo de uso:

<img src="/public/registro2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />
- Si el formulario fue diligenciado de una forma correcta, podra ver este mensaje:

- **"Usuario registrado correctamente"**
<img src="/public/registro3.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

⚠️ cada ususario tiene datos unicos, no puedes usar credenciales(nombres, correos) ya registradas,
teniendo en cuenta eso **NO** puedes usar el correo admin@gmail.com o nombre **admin** en ningún registro ya que existe un  usuario por defecto con estas credenciales 


  Para crear una cuenta, los datos deben cumplir estos requisitos:
- **Nombre**: Unicamente ingresa texto, sin números o caracteres especiales 
- ⚠️Solo ingresa texto, evita ingresar numeros:(1-2-3)
- ⚠️Solo ingresa texto, evita ingresar Caracteres especiales:(+#&%)
- **Apellido**: Unicamente ingresa texto, sin números o caracteres especiales 
- ⚠️Solo ingresa texto, evita ingresar numeros:(1-2-3)
- ⚠️Solo ingresa texto, evita ingresar Caracteres especiales:(+#&%)
- **Contraseña**: usa una contraseña segura con caracteres variados que te sea faclíl de recordar.
- **Username**: Nombre de usuario el cual puedes personalizar libremente.
- **Email**: Dirección de correo electronico
- Siguiendo los requisitos podrás registrate facilmente.
- ❗**Rol**: Este campo es asignado automaticamente por el sistema bajo el rol de **Aprendiz** este rol puede ser cambiado unicamente por un **Adminstrador** 
<img src="/public/Editaruser.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />


3.	Recuperación de contraseña: Si el usuario olvida su contraseña, tiene la opción de hacer clic en el botón "¿Olvidó su contraseña?". Al hacerlo, se le pedirá que ingrese su **Correo electrónico**. El sistema enviará un código de verificación al correo del usuario, permitiéndole restablecer su contraseña.

<img src="/public/recuperacion.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 90%; border-radius: 12px;" />

4.	Resultado esperado: Una vez el usuario haya iniciado sesión correctamente, será redirigido a la pantalla de inicio del sistema, donde podrá acceder a todas las funcionalidades disponibles

- sin foto
 ## Consideraciones Legales sobre Datos Personales
 <img src="/public/ministerio.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

El sistema implementado maneja información personal sensible como nombres, correos electrónicos, documentos de identidad, teléfonos de contacto y otros datos de identificación de los usuarios. Por tal motivo, se debe cumplir con la **Ley 1581 de 2012**, también conocida como la Ley de Protección de Datos Personales en Colombia.

Esta ley establece que:

- Toda recolección y tratamiento de datos personales requiere la autorización expresa del titular.

- La información recolectada debe tener una finalidad clara y legítima.

- El sistema debe garantizar los principios de seguridad, confidencialidad y acceso restringido a la información.

- Los usuarios deben tener la posibilidad de consultar, actualizar o eliminar su información cuando así lo deseen.

- Se recomienda contar con una Política de Tratamiento de Datos visible en la plataforma.

Además, si el sistema está en producción y es operado por una entidad legal, se debe registrar la base de datos en el Registro Nacional de Bases de Datos (RNBD) ante la Superintendencia de Industria y Comercio (SIC).
