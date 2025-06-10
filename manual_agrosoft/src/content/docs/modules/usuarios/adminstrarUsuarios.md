---
title: "Administrar usuarios"
slug: modules/usuarios/adminstrarUsuarios
description: "Guía básica para entender cómo administrar usuarios, siendo administrador del sistema Agrosoft."
---
- Esta guia es exclusivamente para administradores
## ¿Que es el Rol de administrador?
Un administrador en un sistema es el usuario con los mayores privilegios, responsable de gestionar y controlar el funcionamiento del sistema. Puede crear, editar o eliminar usuarios, asignar roles, configurar parámetros y supervisar la seguridad y el acceso a la información.

## Acceso Perfil predeterminado de usuario

Al iniciar la aplicación se crea un usuario con permisos de administrador por defecto el cual se crea automaticamente, esto para facilitar la interacción de los usuarios nuevos con el sistema y evitar conflictos de permisos, al estar en **Iniciar sesión** usa estas credenciales:
- Numero de documento: **123456**
- Contraseña: **admin**
- Haz click en **Ingresar**
- Ejemplo de uso:
<img src="/public/usuarios/log-in2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

con este admin podrás registrar y administrar todo tipo de información y adminstrarla sin restricciones 
eso incluye registrar otros usuarios y definir sus permisos en el sistema
<img src="/public/usuarios/userpanel.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

## Vista de usuarios
-Ubica el modulo de usuarios de la siguiente forma:
<img src="/public/usuarios/sideBaruser.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 30%; border-radius: 12px;" />

- Obtendrás una vista de todos los usuarios registrados, con su respectiva información
<img src="/public/usuarios/AdminView.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 120%; border-radius: 12px;" />

## Opciones presentes en el modulo:
## Registro de usuarios
- Este boton te conduce a un formulario:
<img src="/public/usuarios/registros.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />
**Formulario:**
- Puedes registrar un usuario haciendo uso de ese formulario:
- Campos requeridos (Obligatorios):
- Nombre 
- Apellido
- Numero de documento
<img src="/public/usuarios/registroUsuarios.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

## Restricciones del registro:
- **Nombre y apellido:**
- ⚠️No ingresar numeros(12345) o caracteres especiales (*!"#$)
- **Numero de documento:**
- ⚠️(Debe ser Unico)
- **sigue las indicaciones para evitar Errores**
## Ejemplo de registro:
<img src="/public/usuarios/registroUsuariosEjemplo.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

**Notificacion:**
<img src="/public/usuarios/registroUsuariosNotificacion.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

- Para ver el resultado ve a listar usuarios:
<img src="/public/usuarios/ListarUsuarios.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
**Resultado**
-Podrás ver al nuevo usuario en la tabla junto a su informacion
<img src="/public/usuarios/registroUsuariosLista.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

## Registro Masivo de usuarios por excel
- Este boton te conduce a las Opciones del registro masivo:
<img src="/public/usuarios/registros2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />
- Obtendrás una ventana con las opciones de generar el excel y hacer envio del mismo:
- **Generar excel**
- **Enviar excel**

## Generar excel:

<img src="/public/usuarios/RegistroMasivoGenerar.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

- Se descargará un excel automaticamente y se guardará en la ubicación predeterminada:
<img src="/public/usuarios/DescargaExcel.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />
- Vista del excel:
<img src="/public/usuarios/VistaExcel.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />
Este excel de registro masivo contiene los campos requeridos ya vistos:
- Nombre
- Apellido
- Numero de documento
- **⚠️ Estos cuentan con las restricciones ya vistas**

## Ejemplo de registro masivo de usuarios

A diferencia del formulario pasado, el metodo de registro por excel permite el regisrto de multiples usuarios, siendo esto una gran herramienta para la gestion de registros extensos.
- **⚠️ No hay un limite de registros por excel, el administrador lo manejara de forma que considere sea necesaria**

<img src="/public/usuarios/VistaExcel2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />
- **⚠️ Despues de ingresados los usuarios NO olvide guadar los cambios**

## Enviar excel
- Este boton le llevara al almacenamiento de su dispositivo para elegir el archivo a subir para el registro masivo de los usuarios.
<img src="/public/usuarios/RegistroMasivoEnviar.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />
- **Vista del archivo en el almacenamiento:**
- La ubicación por defecto es el **Descargas** pero esta ubicación puede variar
<img src="/public/usuarios/EnviarExcel.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
- Para finalizar el registro haga click en **Abrir**
- **Resultado:**
Los usuarios se registrarán exitosamente:
<img src="/public/usuarios/ListaMasiva.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

## Busqueda de usuarios:
- **En la esquina superior izquierda contara con una herramienta de busqueda**
<img src="/public/usuarios/busqueda1.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- esta funciona leyendo  y tomando los distintos datos del usuario:
- **Resultado**
<img src="/public/usuarios/busqueda2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

## Campos que de definen automaticamente al registrar:
- el registro de usuarios tanto en formulario y en excel solicitan unicamente 3 datos:
- **Obligatorios**
- Nombre
- Apellido
- Numero de documento
- Estos otros se definen automaticamente por el sistema:
- **Definidos automaticamente:**
- Username: (**Nombre+Apellido**)
- Contraseña: (**Primer letra del nombre en minuscula + Numero de documento**)
- **Definido por el usuario:**
- correo electronico: (Este lo puede definir el mismo usuario al editar su perfil)

## Guia de contraseña:

| Nombre      | Apellido | Correo | Numero Documento |Contraseña |
|-------------|-------------|-------------|-------------|-------------|
| **Juan**   | **Rojas**  |`Jrojas@gmail.com`  | 100508320| J100508320

## Estado de un usuario:
Todos los usuarios tienen un estado,(**Activo-Inactivo**)
- Activo color verde
- Inactivo color gris
<img src="/public/usuarios/ListaEstados.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
- **Usuario activo:** Puede interactuar y acceder al sistema con normalidad, dependiendo de su **Rol**.
- **Usuario Inactivo:** No puede interactuar con el sistema de ninguna forma, ni ingresar al sistenma.
- ⚠️ El manejo de estado de usuarios es responsabilidad del administrador o encargado

## Editar un usuario:
- En la esquina derecha de la tabla de usuarios podrás ver el icono de un lapiz en la columna **Acciones**
<img src="/public/usuarios/ListaEditar.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
- Al acceder a esta opción, Tendrás a disposicion la informacion del usuario y la posibilidad de editar esta misma.
- Ten en cuenta el tipo de información para no tener problemas al actualizar

<img src="/public/usuarios/EditarFormulario.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />
- Para guardar cambios haga click en confirmar:
<img src="/public/usuarios/EditarFormulario2.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

- **Resultado**:
<img src="/public/usuarios/EditarNotificacion.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />
- **Usuario actualizado exitosamente:**
<img src="/public/usuarios/EditarFormulario3.png" alt="Gestión de usuarios" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

## Roles que puede tener un usuario:

**Los roles se otorgan editando al usuario una vez registrado**

**Administrador**

- Tiene control total del sistema.

- Puede ver, crear, editar y eliminar toda la información.

- Puede gestionar usuarios, roles, y acceder a todos los módulos.


**Instructor**

- Tiene permisos para ingresar y modificar información.

- Accede a los módulos de registro y edición de datos.

- No puede eliminar usuarios ni cambiar configuraciones del sistema.

**Pasante**

- Solo puede visualizar la información.

- Puede descargar reportes disponibles.

- No puede modificar ni registrar datos.

**Aprendiz**

- Igual que el pasante: acceso solo de lectura.

- Puede visualizar y descargar reportes.

- Su perfil es limitado y de consulta.


- Con esta guia podras administrar y atender situaciones correctamente sobre usuarios y s