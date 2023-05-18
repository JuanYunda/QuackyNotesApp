from django.core.exceptions import ValidationError
from rest_framework import serializers
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

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        try:
            instance = super().create(validated_data)
            if password is not None:
                instance.set_password(password)
            return instance
        except ValidationError as e:
            raise serializers.ValidationError(str(e))