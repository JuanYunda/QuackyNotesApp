from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


class Usuarios(AbstractUser):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    username = models.EmailField(max_length=100, unique=True, default='defaultEmail@hotmail.com')
    fecha_registro = models.DateField(auto_now_add=True)
    password = models.CharField(max_length=128, default='Admin123*')
    REQUIRED_FIELDS = []

