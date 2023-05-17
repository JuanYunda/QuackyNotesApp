from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class Usuarios(AbstractUser):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=100)
    celular = models.CharField(max_length=20)
    username = models.EmailField(max_length=100, unique=True, default='defaultEmail@hotmail.com')
    fecha_registro = models.DateField(auto_now_add=True)
    password = models.CharField(max_length=128, default='my_default_password', validators=[validate_password])
    REQUIRED_FIELDS = []

    def clean(self):
        super().clean()
        if not self.nombre:
            raise ValidationError(_("Se requiere un nombre válido."))
        if not self.apellidos:
            raise ValidationError(_("Se requieren apellidos válidos."))
        if not self.celular:
            raise ValidationError(_("Se requiere un número de celular válido."))
