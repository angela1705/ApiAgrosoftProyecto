from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_admin_user(apps, schema_editor):
    Usuarios = apps.get_model('usuarios', 'Usuarios')
    Roles = apps.get_model('roles', 'Roles')
    admin_role = Roles.objects.get(id=4)

    admin_role = Roles.objects.filter(nombre='Administrador').first()
    if not admin_role:
        return  
    
    Usuarios.objects.get_or_create(
        email='admin01@gmail.com',
        defaults={
            'username': '@admin#',
            'nombre': 'Administer',
            'apellido': 'Userauth',
            'numero_documento':166600666,
            'password': make_password('admin'),  
            'rol': admin_role,
            'is_staff': True,
            'is_superuser': True,
        }
    )

class Migration(migrations.Migration):
    dependencies = [
        ('usuarios', '0001_initial'),
        ('roles', '0002_auto_20250312_1419'), 
    ]

    operations = [
        migrations.RunPython(create_admin_user),
    ]
