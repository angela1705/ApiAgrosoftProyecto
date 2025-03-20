---
sidebar_position: 1
---

# Introducción al Tutorial

Descubramos **Django Rest Framework (DRF) en menos de 5 minutos**.

## Primeros Pasos

Para comenzar, necesitas tener instalado **Django** y **Django Rest Framework**.

### Requisitos Previos

- [Python](https://www.python.org/downloads/) versión 3.8 o superior.
- [pip](https://pip.pypa.io/en/stable/installation/) para la gestión de paquetes de Python.
- Un entorno virtual recomendado (`venv`).

## Instalación de la API

Si ya cuentas con la API, solo necesitas instalar las dependencias necesarias:

```bash
pip install -r requirements.txt
```

Asegúrate de que el archivo `settings.py` tenga configurado `rest_framework` en `INSTALLED_APPS`.

## Ejecutar el Servidor y Probar la API

Navega al directorio del proyecto y ejecuta el servidor:

```bash
python manage.py runserver
```

La API estará disponible en `http://127.0.0.1:8000/api/`. Desde aquí, puedes probar los endpoints utilizando herramientas como Postman o la interfaz web de DRF.

Si necesitas realizar migraciones para asegurarte de que la base de datos esté actualizada, ejecuta:

```bash
python manage.py migrate
```

¡Listo! Ahora puedes comenzar a interactuar con la API. 🚀

