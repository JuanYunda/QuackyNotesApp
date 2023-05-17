
from rest_framework import serializers
from .models import Usuarios


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'nombre','apellidos','celular','username','fecha_registro', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'fecha_registro': {'read_only':True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance