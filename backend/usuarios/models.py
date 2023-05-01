from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuarios(AbstractUser):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    username = models.EmailField(max_length=100, unique=True, default='defaultEmail@hotmail.com')
    fecha_registro = models.DateField(auto_now_add=True)
    password = models.CharField(max_length=128, default='my_default_password')
    REQUIRED_FIELDS = []    