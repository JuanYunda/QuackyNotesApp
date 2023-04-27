from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuarios(AbstractUser):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    email = models.EmailField(max_length=100, unique=True)
    fecha_registro = models.DateField(auto_now_add=True)
    password = models.CharField(max_length=128, default='my_default_password')
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []    