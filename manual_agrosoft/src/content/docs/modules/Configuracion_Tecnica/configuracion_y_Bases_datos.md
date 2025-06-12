---
title: Configuracion tecnica y configuracion de bases de datos
slug: modules/Configuracion_Tecnica/configuracion_y_Bases_datos
---


El sistema de base de datos del software de manejo de trazabilidad agrícola tiene como objetivo centralizar y organizar la información relacionada con las actividades agrícolas y la gestión de recursos. Este sistema permite registrar y administrar datos cruciales sobre los cultivos, los insumos utilizados, mapas de las áreas de cultivo, datos recolectados por sensores IoT (Internet de las Cosas), así como información sobre los sistemas de riego y otras funciones asociadas a la automatización agrícola.

El propósito principal de la base de datos es garantizar una trazabilidad eficiente y en tiempo real de todos los elementos que influyen en el proceso agrícola, optimizando la gestión de recursos, el monitoreo de condiciones ambientales, y la mejora de la producción agrícola. Además, facilita la integración de tecnologías avanzadas como sensores y dispositivos IoT, permitiendo una recolección precisa de datos y análisis para la toma de decisiones informadas.

---

## 1. Requisitos tecnicos para instalción
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



### Instalación en macOS

1.	Usa Homebrew, Primero abre la terminal y ejecuta este comando:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Eto instalará Homebrew, que es un gestor de paquetes para macOS.
2.	Instalar pgAdmin usando Homebrew: Una vez que Homebrew esté instalado, puedes usarlo para instalar pgAdmin. Ejecuta el siguiente comando en la Terminal:

brew install --cask pgadmin4

Esto descargará e instalará la última versión de pgAdmin en tu Mac.

3.	Abrir pgAdmin: Después de la instalación, puedes abrir pgAdmin desde el Launchpad  usando Spotlight (presiona Cmd + Espacio, luego escribe "pgAdmin" y presiona Enter).

 
##  2. Configuracion base de datos
### Acceso a PostgreSQL usando Pgadmin

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


 
### Guía para visualizar las tablas y esquemas en pgAdmin
Una vez que el software ha creado la base de datos y las tablas automáticamente, el usuario puede verificar su existencia y estructura utilizando pgAdmin, la herramienta gráfica oficial para gestionar bases de datos PostgreSQL.
-  Dentro de la base de datos trazabilidad_agricola, expande la carpeta Schemas señalada:.
## Visualizar datos
### Resultado
<img src="/public/database/data_schema.png" alt="Gestión de database" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

- Haz click derecho sobre **public** (esquema por defecto),expande la carpeta Tables para ver todas las tablas del proyecto:
<img src="/public/database/data_public.png" alt="Gestión de database" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

- Haz clic derecho en una tabla y selecciona View/Edit Data > All Rows para ver su contenido.
<img src="/public/database/data_table_icon.png" alt="Gestión de database" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />
- Como resultadado verás el contenido de la tabla con sus detalles y registros 
(si tiene previamente) como podemos ver:
<img src="/public/database/data_schema_table.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
- Los datos traídos de la tabla de ejemplo en este caso bancales, es debido a una consulta SQL: **SELECT * FROM public.bancal_bancal order by id ASC**
<img src="/public/database/data_schema_table2.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />


Explicación por partes:

1.	SELECT * 

Esto indica que se desea seleccionar todas las columnas de la tabla. El asterisco (*) es un comodín que representa todas las columnas disponibles en la tabla.

2.	FROM public.bancal_bancal

Aquí se especifica la tabla desde la que se obtendrán los datos:
o	public es el esquema de la base de datos (esquema por defecto en PostgreSQL).
o	bancal_bancal es el nombre de la tabla.
En Django, este nombre se forma como appname_modelname, por eso es bancal_bancal si tu app se llama bancal y el modelo también se llama Bancal.

3.	ORDER BY id ASC

Esto ordena los resultados por la columna id en orden ascendente (ASC = ascending):
o	Es decir, los registros aparecerán del más antiguo (id más bajo) al más reciente (id más alto).
o	Si no se usa ORDER BY, los registros pueden aparecer en un orden no garantizado.

## Editar datos

- Editar, manipular datos de las tablas correctamente

Esto lo consigues con un doble click cualquier casilla a la que deseas cambiar sus valores, se habilitará la escritura y podrás realizar el cambio:
<img src="/public/database/data_table_edit.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- Ingresas el nuevo valor:

<img src="/public/database/data_table_edit2.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

### Guardar cambios
Al dar click en “OK” veras el cambio, pero este no será aplicado al dato, solo es una visualización, para que el cambio se dé realmente seleccionas **save data change**
Como se muestra aquí:
<img src="/public/database/data_table_edit3.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

### Resultado:
- Resultado:
<img src="/public/database/data_table_edit3.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

## Eliminar información
-  En caso de querer eliminar un elemento por completo

**⚠️(Algo de mucho cuidado, recomendable no hacerlo en lo posible):**

- Da Click sobre el número del registro de la tabla que deseas eliminar, y luego selecciona la opción con el icono de bote de basura
<img src="/public/database/data_table_delete.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
- Ocurrirá esto al seleccionar la opción:
el objeto se marcará con una extensa línea color rojo
<img src="/public/database/data_table_delete2.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />
- Nuevamente para que el cambio se dé finalmente seleccionas save data change
Como se muestra aquí:
<img src="/public/database/data_table_delete3.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

### Resultado: 
- Elemento **numero 4 eliminado** 
<img src="/public/database/data_table_delete4.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />


## 3. Creación de copias de seguridad
- Click derecho en la base de datos, elije la opción Backup
<img src="/public/database/data_table_backup.png" alt="Gestión de database" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

- Completa los respectivos campos: 
- **Dar nombre y ubicacion a la copia**
<img src="/public/database/data_table_backup2.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

-  La ubicación y nombre del archivo no tienen una regla, tienes libertad sobre estos aspectos, la momento de elegir el formato de la copia de seguridad
Tendrás a elegir entre **SQL file y BACKUP file**
lo recomendable es usar **BACKUP file** por su fácil uso
<img src="/public/database/data_table_backup3.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

### Resultado:
- Después de navegar en tu equipo y dar nombre a la copia haz click en Backup y se creará la copia de seguridad.
 <img src="/public/database/data_table_backup5.png" alt="Gestión de database" style="display: block; margin: auto; width: 20%; border-radius: 12px;" />

## 4. Como usar una copia de seguridad:
- ¿Por qué debes crear una nueva base de datos para usar la copia de seguridad?
PostgreSQL no crea automáticamente una base de datos al hacer restore, sino que espera que ya exista y esté lista para recibir los datos.
Se debe tener creada una base de datos vacía, ya que el proceso de restauración necesita un "contenedor" donde colocar toda la información guardada en el archivo de respaldo.

### Creación de una nueva base de datos para la copia de seguridad
En la sección de servers busca Database y haz click derecho, ve a Create > Database
- Después de navegar en tu equipo y dar nombre a la copia haz click en Backup y se creará la copia de seguridad.
 <img src="/public/database/data_table_create.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- Dale nombre a tu Nueva base de datos, de esta manera sobre la casilla Database:
En este caso será nueva base, no hace falta añadir algo más, para finalizar haz click en **Save** 
 <img src="/public/database/data_table_create2.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- si la base de datos se creó exitosamente, podrás ver un mensaje como este:
 <img src="/public/database/data_table_create3.png" alt="Gestión de database" style="display: block; margin: auto; width: 60%; border-radius: 12px;" />

### Selección de la nueva base de datos
Dirigirte al apartado de Servers, la base de datos y la opción **Restore**:
En este caso **Nueva_Base > Restore:**

 <img src="/public/database/data_table_restore.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- Esta opción te llevara a un recuadro con un campo llamado **filename** haz Click en el icono de la carpeta

 <img src="/public/database/data_table_restore2.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- Luego de esto podrás navegar en tu equipo y buscar una copia de seguridad en tu carpeta de preferencia :

<img src="/public/database/data_table_restore3.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- 	Haz click en abrir y verás que la casilla filename ahora tiene la dirección de tu copia deseguridad:

<img src="/public/database/data_table_restore4.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />

- 	En la casilla Role name selecciona la opción **postgres**:

<img src="/public/database/data_table_restore5.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- Para tener todo listo el recuadro debe verse asi:

<img src="/public/database/data_table_restore6.png" alt="Gestión de database" style="display: block; margin: auto; width: 80%; border-radius: 12px;" />

- 	Haz click en **Restore** siguiente a esto verás el mensaje sobre el proceso y su fnalización :

<img src="/public/database/data_table_restore7.png" alt="Gestión de database" style="display: block; margin: auto; width: 70%; border-radius: 12px;" />

- Podrás ver mas detalles en la pestaña superior llamada **process**:

<img src="/public/database/data_table_restore8.png" alt="Gestión de database" style="display: block; margin: auto; width: 100% border-radius: 12px;" />

## 5. Precauciones

## ⚠️ Eliminacion de tablas 

- La cantidad de tablas es algo que debes respetar para no provocar graves **fallos** en tu software,

 **NO debes eliminar ninguna tabla y ten siempre copias de seguridad**

## ⚠️ Error al crear una base de datos
### crear bases datos con nombres de una ya existente
- Cuando intentas crear una base de datos en pgAdmin (la interfaz gráfica de PostgreSQL) y usas un nombre que ya existe, el sistema lanza un error porque los nombres de las bases de datos deben ser únicos dentro del mismo servidor

- PostgreSQL no permite tener dos bases de datos con el mismo nombre porque no podría diferenciarlas al momento de hacer conexiones, consultas o tareas administrativas. Es como tratar de guardar dos archivos con el mismo nombre en la misma carpeta: el sistema necesita un identificador único para cada base de datos.

- Para saber que bases de datos tienes y evitar equivocaciones, revisa el apartado de
 **Servers > Databases**.

<img src="/public/database/data_table_restore9.png" alt="Gestión de database" style="display: block; margin: auto; width: 50%; border-radius: 12px;" />

- Al crear una base de datos con un nombre ya existente no será posible completar la operación y verás un mensaje como este:

<img src="/public/database/data_table_restore10.png" alt="Gestión de database" style="display: block; margin: auto; width: 100%; border-radius: 12px;" />


-  ✅ Con estos pasos podras usar fácilmente  administrar la base de datos de nuestro producto.

### Soporte web


Recursos informativos para un mayor conocimiento y administración sobre bases de datos y su gestión:

• https://www.cybertec-postgresql.com/en/blog/

•  https://www.postgresql.org/community/

•  https://www.enterprisedb.com/blog

•  https://momjian.us/main/blogs/pgblog.html

•  https://www.crunchydata.com/blog/an-overview-of-distributed-postgresql-architectures

### Conclución

En este manual de uso de bases de datos para PostgreSQL, hemos cubierto aspectos esenciales para la instalación, configuración y administración del sistema, enfocándonos en la gestión y visualización de datos mediante pgAdmin. Se detallaron los pasos para instalar PostgreSQL y pgAdmin en Windows, Linux y macOS, junto con la manera de acceder a las bases de datos y explorar sus esquemas y tablas.
También discutimos la importancia de los backups, destacando la diferencia entre respaldar solo la estructura o incluir los datos. Un backup sin la opción "Data" solo guarda la estructura de la base de datos, útil para clonar esquemas sin información sensible.
Por último, proporcionamos recursos adicionales para profundizar en PostgreSQL, incluyendo blogs y tutoriales especializados. Con esta información, los usuarios podrán administrar, consultar y gestionar bases de datos de manera eficiente dentro del sistema de trazabilidad agrícola.
