from rest_framework import serializers
from .models import Notas


class NotasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notas
        fields = ['id', 'titulo', 'descripcion', 'fecha_creacion','archivo','id_etiqueta', 'id_usuario']
        extra_kwargs = {
            'fecha_registro': {'read_only':True}
        }

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance