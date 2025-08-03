---
title: "Manual Técnico: Configuración Ambiente AgroSoft"
slug: modules/Configuracion_Tecnica/Manual_Tecnico
---
**Agrosoft**
**Versión:** 1.0

## HISTORIAL DE REVISIÓN

| VERSIÓN | FECHA       | ELABORACIÓN                   | FECHA       | REVISIÓN         | FECHA       | APROBACIÓN       |
|---------|-------------|-------------------------------|-------------|------------------|-------------|------------------|
| 1.0     | 01/08/2025  | Haison Leandro Toro López     | 01/09/2025  | Carlos Sterling  | 01/10/2025  | Carlos Sterling  |

---

## Tabla de contenido
1. Introducción  
2. Alcance  
3. Definiciones, siglas y abreviaturas  
4. Responsables e involucrados  
5. Aspectos Técnicos  
6. Requisitos de Configuración  
7. Proceso de Configuración o Despliegue  
8. Ingreso al Sistema  
9. Otras Consideraciones  

---

## 1. Introducción

El uso adecuado de un software depende en gran medida del nivel de conocimiento que se tenga sobre él. Por ello, hemos creado este manual con el propósito de detallar los aspectos técnicos necesarios para la instalación y el funcionamiento del sistema. Además, proporciona una descripción de los requisitos mínimos para que el software opere correctamente en un equipo con las características indicadas.

AgroSoft ha sido desarrollado con el objetivo de ofrecer un sistema de información integral para la gestión de cultivos en la unidad productiva PAE.

El propósito principal de este documento es servir como una guía estructurada para las personas encargadas de administrar, editar o actualizar el software, asegurando su correcto mantenimiento y una gestión eficiente de los datos almacenados.

---

## 2. Alcance

- Facilitar al administrador los conocimientos esenciales para gestionar el software, incluyendo los programas y herramientas utilizados en el desarrollo y configuración de la aplicación AgroSoft.  
- Especificar los requisitos mínimos de hardware y software necesarios para la instalación y operación del sistema en un entorno óptimo.  
- Explicar las características técnicas del software para promover una comprensión clara de sus funcionalidades.  
- Detallar las herramientas empleadas en el diseño y desarrollo de la aplicación que contribuyeron a su finalización.

---

## 3. Definiciones, siglas y abreviaturas

- **AgroSoft**: Sistema de información diseñado para la gestión completa de cultivos en la unidad productiva PAE.  
- **PAE**: Iniciativa agrícola enfocada en el desarrollo de prácticas dentro de un entorno educativo.  
- **Software**: Colección de programas y sistemas requeridos para realizar tareas específicas.  
- **Hardware**: Componentes físicos de un sistema esenciales para el funcionamiento del software.  
- **Manual Técnico**: Documento que detalla los aspectos técnicos necesarios para la instalación, operación y mantenimiento del sistema.

---

## 4. Responsables e involucrados

| Nombre                        | Tipo         | Rol         |
|------------------------------|--------------|--------------|
| Oscar Mauricio Audor Bernal  | Involucrado  | Líder / Dev  |
| Haison Leandro Toro López    | Involucrado  | Desarrollador |
| Juan José Manrique Sosa      | Involucrado  | Desarrollador |
| Giovanni Steven Tunubala     | Involucrado  | Desarrollador |

---

## 5. Aspectos Técnicos

**Equipo de cómputo recomendado:**

- RAM: 16 GB (recomendado 32 GB o más)  
- Almacenamiento: Mínimo 250 GB SSD (recomendado 500 GB)  
- Procesador: Intel Core i5-12400 o superior (recomendado Intel Xeon Silver 4210 o superior)  

**Servidor recomendado:**

- Procesador: Intel Xeon Gold 6254 (3.10 GHz) o superior  
- RAM instalada: 64 GB o más  
- Disco duro: SSD NVMe de 1 TB o superior  
- Sistema operativo: Ubuntu Server 24.04 LTS  
- Tipo de sistema: 64 bits x64  

**Sistemas operativos compatibles:**

- Windows 11  
- Ubuntu Server 24.04 LTS  
- macOS Monterey  

**Navegadores compatibles:**

- Google Chrome (última versión)  
- Mozilla Firefox (última versión)  
- Microsoft Edge (última versión)  

---

## 6. Requisitos de Configuración

- **Django**: Framework web en Python para el backend.  
- **PIP**: Gestor de paquetes Python.  
- **PostgreSQL**: Motor de base de datos.  
- **pgAdmin 4**: Cliente gráfico de PostgreSQL.  
- **React**: Librería JavaScript para frontend.  
- **TypeScript**: Superset de JavaScript con tipado.  
- **Astro**: Framework para documentación técnica.  
- **Node.js**: Entorno para ejecutar JS y compilar frontend.

## 7. Proceso de Configuración o Despliegue

## Requisitos previos

Asegúrate de contar con las siguientes herramientas instaladas:

- **Docker Engine** v20 o superior  
- **Docker Compose** v2 o superior  
- **Git** (si vas a clonar el proyecto)  
- **Editor de código** (se recomienda [Visual Studio Code](https://code.visualstudio.com))  

---

#### 1. Clonación del proyecto

Si el proyecto está en un repositorio remoto, puedes clonarlo usando el siguiente comando:

[Link del Repositorio ](https://github.com/angela1705/ApiAgrosoftProyecto.git)

#### 2. Estructura del proyecto AgroSoft

Tener bien organizada las carpetas es clave. Así sabe dónde va cada cosa.

#### 3. Configuración de Docker file para crear las imágenes

Se crea un archivo Dockerfile para construir la imagen de backend, frontend y base de datos.

#### 4. Ngix.conf

Este archivo configura Nginx para que sirva el sitio React, redirija /api/ hacia django y sirva archivos estáticos /media.

#### 5. Configuración de variables de entorno

Contiene variables configurables que el sistema necesita para funcionar correctamente. Son usados por los contenedores Docker (como PostgreSQL, Django, etc.) y por el código Python/JavaScript para no escribir valores sensibles directamente en el código fuente.

#### 6. Creación del entrypoint.sh

Se crea un script de arranque para contenedores Docker que usan Django y PostegresSQL. Asegura que la base de datos esté listo antes de iniciar el servidor Django, set -e Detiene el script si ocurre un error, hace un chequeo de base de datos y espera que PostgresSQL este listo ante de continuar, con makemigrations genera archivos de migración a partir de los modelos de Django y con el mígrate aplica las migraciones a la base de datos e inicia el servidor después de levantar el contenedor con Docker compose up –build -d.

#### 7. Creación de las imágenes

• Se crea un nuevo builder con soporte de multiplataforma se utiliza porque Docker tradicionalmente solo puede construir imágenes para la misma arquitectura del sistema. Si el sistema se desea compilar para ARM o x86 desde Windows o WSL, se necesita buildx.

• Con docker buildx inspect mybuilder –bootstrap muestra los detalles y –Bootstrap lo inicializa.

• docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t samboniwilson09/front\_Agrosoft:1.1.1 –push. Construye la imagen usando builder activo, fuerza una compilación limpia e ignora el cache, compila para múltiples arquitecturas como Linux-amd64 PC comunes, se etiqueta las imágenes samboniwilson09/front\_Agrosoft:1.1.1 y con el push sube la imagen automáticamente a Docker hub. El punto final hace referencia el contexto de build es el directorio actual (donde está el Dockerfile).

#### 8. Docker-compose.yml

Este archivo orquesta todos los contenedores, se definen los contenedores que forman parte del sistema, contenedor con PostgresSQL como base de datos, se manejan volúmenes que guardan la información persistente de PostgresSQL incluso si se borra el contenedor. La imagen de Docker se obtiene de Docker hub.

#### 9. Ejecutamiento del contenedor

Este comando se usa para ejecutar los contenedores con Docker compose up –builder -d, es el comando principal que usa el archivo Docker-compose.yml para levantar y gestionar multiples servicios (como backend, frontend, base de datos y doc-tecnica).

Así generalmente se ve los contenedores corriendo sobre una IP estática para todo el proyecto en general.

## 8. Ingreso al Sistema

Para ingresar al sistema solo se puede registrar un administrador como usuario semilla, para que este maneje el sistema en su totalidad. Después de haber un admistrador ya registrado como usuario base no dejara crear más administradores desde la ventana de register.

Este es el resultado esperado después haber levantado el contenedor con sus servicios y ya el software en producción.

Estando en la Dashboard como administrador se podrán crear mas usuarios administradores, aprendices pasantes e instructores, cada uno con su rol especifico y limitado para manejar el sistema.

## 9. Otras Consideraciones

Una de las consideraciones clave para el correcto funcionamiento del proyecto es la adecuada configuración de las variables de entorno, las cuales deben coincidir exactamente con lo especificado en el archivo Readme. Además, se incluye una guía detallada para facilitar la configuración del proyecto.
