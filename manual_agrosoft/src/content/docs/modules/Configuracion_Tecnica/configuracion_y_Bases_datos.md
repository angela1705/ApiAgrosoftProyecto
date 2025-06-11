---
title: Configuracion tecnica y configuracion de bases de datos
slug: modules/Configuracion_Tecnica/configuracion_y_Bases_datos
---

## Configuracion tecnica y configuracion de bases de datos

El sistema de base de datos del software de manejo de trazabilidad agrícola tiene como objetivo centralizar y organizar la información relacionada con las actividades agrícolas y la gestión de recursos. Este sistema permite registrar y administrar datos cruciales sobre los cultivos, los insumos utilizados, mapas de las áreas de cultivo, datos recolectados por sensores IoT (Internet de las Cosas), así como información sobre los sistemas de riego y otras funciones asociadas a la automatización agrícola.

El propósito principal de la base de datos es garantizar una trazabilidad eficiente y en tiempo real de todos los elementos que influyen en el proceso agrícola, optimizando la gestión de recursos, el monitoreo de condiciones ambientales, y la mejora de la producción agrícola. Además, facilita la integración de tecnologías avanzadas como sensores y dispositivos IoT, permitiendo una recolección precisa de datos y análisis para la toma de decisiones informadas.

---

### 1. Requisitos tecnicos
- Sistema operativo
• Linux: Ubuntu 22.04 LTS, CentOS 8,  distribuciones basadas Debian Red Hat.
• Windows: Windows 10 (versión 22H2)  Windows 11.
• macOS: macOS Ventura 13.x  macOS Monterey 12.x.



Instalación de herramienta de administración y gestión de base de datos
¿Qué es un gestor de base de datos?	
Un gestor de base de datos (DBMS, por sus siglas en inglés) es un software que permite crear, gestionar, y manipular bases de datos. Facilita el almacenamiento, recuperación, y administración de datos de manera estructurada y eficiente, asegurando que las aplicaciones puedan interactuar con la base de datos de forma segura y optimizada.
-La base de datos usada para este proyecto, se gestiona en PostgreSQL
Con la ayuda de la herramienta visual pgAdmin


### Instalación en Windows
**1.	Descargar el instalador:**
	Ve a la página oficial de pgAdmin:

URL:

https://www.pgadmin.org/download/pgadmin-4-windows/

- Selecciona la versión para Windows y descarga el archivo .exe.

**2. Ejecutar el instalador:**
	Una vez descargado el archivo, haz doble clic en el instalador (pgadmin4x.y.z-x86.exe).
    Si se solicita, confirma los permisos para permitir que el instalador haga cambios en el sistema.
**3.	Seguir el asistente de instalación:**
	Acepta los términos y condiciones de la licencia.
	Elige la carpeta de instalación  deja la predeterminada.
	Haz clic en Next y luego en Install para comenzar la instalación.
**4.	Completar la instalación:**
	Una vez finalizada la instalación, haz clic en Finish.
	pgAdmin debería abrirse automáticamente  puedes buscarlo en el menú de inicio de Windows.
**5.	Configurar pgAdmin:**
	La primera vez que abras pgAdmin, te pedirá que configures una contraseña maestra para acceder a la aplicación.
	Luego, podrás agregar tu servidor PostgreSQL y empezar a gestionar bases de datos.


 
### Instalación en Linux

- primero agrega la clave del repositorio ejecutando sudo curl, la encontrarás aquí:
https://www.pgadmin.org/static/packages_pgadmin_org.pub 
**1. Ejecuta este comando en el terminal de Linux:**
 sudo tee /etc/apt/trusted.gpg.d/pgadmin.asc,
**2. luego este comando:**
sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/debian/ pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'
Ese comando Agrega el repositorio de pgAdmin a tu sistema para que el gestor de paquetes APT pueda descargar e instalar pgAdmin desde la fuente oficial.
Después, actualiza la lista de paquetes con el comando sudo apt update e instala pgAdmin ejecutando sudo apt install pgadmin4. Una vez instalado, puedes iniciar pgAdmin con pgadmin4 desde el menú de aplicaciones  la terminal y configurar la contraseña maestra la primera vez que lo abras.



## Instalación en macOS

1.	Usa Homebrew, Primero abre la terminal y ejecuta este comando:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Eto instalará Homebrew, que es un gestor de paquetes para macOS.
2.	Instalar pgAdmin usando Homebrew: Una vez que Homebrew esté instalado, puedes usarlo para instalar pgAdmin. Ejecuta el siguiente comando en la Terminal:

brew install --cask pgadmin4

Esto descargará e instalará la última versión de pgAdmin en tu Mac.

3.	Abrir pgAdmin: Después de la instalación, puedes abrir pgAdmin desde el Launchpad  usando Spotlight (presiona Cmd + Espacio, luego escribe "pgAdmin" y presiona Enter).

 
## Acceso a PostgreSQL usando Pgadmin

**1.	Abrir pgAdmin:**

Puedes abrir pgAdmin desde el menú de inicio de Windows, buscando pgAdmin.
La primera vez que lo abras, se te pedirá que configures una contraseña maestra. Esta contraseña no es la misma que la de PostgreSQL, es solo para proteger el acceso a la interfaz de pgAdmin.

**2.	Conectar pgAdmin al servidor de PostgreSQL:**

Después de abrir pgAdmin, deberás conectar el servidor de PostgreSQL:
Haz clic en el ícono de Conexión (el servidor en la barra lateral izquierda).
En el cuadro de diálogo de Conexión del Servidor, completa los siguientes campos:
	Nombre: "PostgreSQL"  el nombre que prefieras.
	Host: localhost (ya que estás usando el servidor local).
	Puerto: 5432 (el puerto predeterminado de PostgreSQL).
	Usuario: postgres (el usuario predeterminado).
	Contraseña: La contraseña que configuraste durante la instalación de PostgreSQL.

**3.	Haz clic en Guardar para conectar.**

-Siguiente:
Ya habiendo configurado correctamente los parámetros del gestor Pgadmin 
Lo siguiente es la interacción con la base de datos, esta base de datos ya ha 
Sido trabajada y moldeada anteriormente y se obtendrá  de forma
 Automática al iniciar el software y tener el gestor de base de datos
Correctamente configurado, pasos que hemos recorrido anteriormente.

 
Interacción con la base de datos
1. Verificar la existencia de la base de datos
Al iniciar la aplicación, el software verifica si la base de datos ya existe. Si no existe, se crea automáticamente.

```json
{
if not exists:
    cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(database_name)))
    print(f"Base de datos '{database_name}' creada con éxito.")
else:
    print(f"La base de datos '{database_name}' ya existe.")
cur.close()
con.close()
}

```


---
una fragmento de código en el correspondiente lenguaje similar a este se encargara de la creación automática al iniciar la aplicación


 
Guía para visualizar las tablas y esquemas en pgAdmin
Una vez que el software ha creado la base de datos y las tablas automáticamente, el usuario puede verificar su existencia y estructura utilizando pgAdmin, la herramienta gráfica oficial para gestionar bases de datos PostgreSQL.
• Dentro de la base de datos trazabilidad_agricola, expande la carpeta Schemas señalada.
