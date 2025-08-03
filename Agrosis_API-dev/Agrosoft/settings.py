from pathlib import Path
import os
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-y25f0nlxx-^y1tc$12**4)gsf=uy7wkcvt%ahr(*l)cf=7#m5i'
DEBUG = True

ALLOWED_HOSTS = ['*']
    


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.Usuarios.usuarios',
    'apps.Usuarios.roles',
    'apps.Cultivo.bancal',
    'apps.Cultivo.tipo_plaga',
    'apps.Cultivo.plagas',
    'apps.Cultivo.especies',
    'apps.Cultivo.tipo_especies',
    'apps.Cultivo.cultivos',
    'apps.Cultivo.tipo_control',
    'apps.Cultivo.semillero',
    'apps.Cultivo.afecciones',
    'apps.Cultivo.controles',
    'apps.Cultivo.plantaciones',
    'apps.Cultivo.tipo_actividad',
    'apps.Cultivo.actividades',
    'apps.Cultivo.ReportePlaga',
    'apps.Iot.datos_meteorologicos',
    'apps.Iot.sensores',
    'apps.Finanzas.pagos',
    'apps.Finanzas.venta',
    'apps.Finanzas.salario',
    'apps.Inventario.herramientas',
    'apps.Inventario.insumos',
    'apps.Finanzas.costo_beneficio',
    'apps.Inventario.precio_producto',
    'apps.Inventario.bodega',
    'apps.Inventario.bodega_insumo',
    'apps.Inventario.bodega_herramienta',
    'apps.Inventario.bodega_precio_producto',
    'rest_framework',
    'rest_framework_simplejwt',
    'drf_yasg',
    'apps.Cultivo.residuos',
    'apps.Cultivo.tipos_residuos',
    'apps.Cultivo.cosechas',
    'apps.Cultivo.lotes',
    'apps.Autenticacion.autenticacion',
    'channels',
    'corsheaders',
    'django_filters',
    'apps.Iot.evapotranspiracion',
    'apps.mapa',
    'apps.Cultivo.Notificacion',
    'apps.Cultivo.calendario',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_EXPOSE_HEADERS = ['Content-Disposition']

ROOT_URLCONF = 'Agrosoft.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Agrosoft.wsgi.application'
ASGI_APPLICATION = 'Agrosoft.asgi.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis", 6379)],
        },
    },
}


# Database
# https://docs.djangoproject.com/en/5.1/ref/settizngs/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',

        'NAME': os.getenv('POSTGRES_DB', 'agrosoft_db'),
        'USER': os.getenv('POSTGRES_USER', 'postgres'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD', 'root'),
        'HOST': os.getenv('DB_HOST', 'db'),  
        'PORT': os.getenv('DB_PORT', '5432'), 

    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/Bogota'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = './static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7), 
    'ROTATE_REFRESH_TOKENS': True,  
    'BLACKLIST_AFTER_ROTATION': True,  

    'ALGORITHM': 'HS256',  
    'SIGNING_KEY': SECRET_KEY, 
    'AUTH_HEADER_TYPES': ('Bearer',),  
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}

AUTH_USER_MODEL = 'usuarios.Usuarios'
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CORS_ALLOW_ALL_ORIGINS = True  # Acepta solicitudes de cualquier origen
CORS_ALLOW_CREDENTIALS = False
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
    "http://192.168.1.118:5173",
    "http://192.168.1.118:8000",
    "http://*:5173",
    "http://*:8000",
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}