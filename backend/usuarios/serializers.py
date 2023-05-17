from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Usuarios


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellidos', 'celular', 'username', 'fecha_registro', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'fecha_registro': {'read_only': True}
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise ValidationError("La contraseña debe tener al menos 8 caracteres.")
        if not any(char.isupper() for char in value):
            raise ValidationError("La contraseña debe contener al menos una letra mayúscula.")
        if not any(char.islower() for char in value):
            raise ValidationError("La contraseña debe contener al menos una letra minúscula.")
        if not any(char.isdigit() for char in value):
            raise ValidationError("La contraseña debe contener al menos un número.")
        if not any(char.isalnum() for char in value):
            raise ValidationError("La contraseña debe contener al menos un carácter especial.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
