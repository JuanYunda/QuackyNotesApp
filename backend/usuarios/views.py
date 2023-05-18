from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from .serializers import UserSerializer
from .models import Usuarios
from django.utils.translation import gettext_lazy as _

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        print(data)
        
        nombre = data.get('nombre', '')
        apellidos = data.get('apellidos', '')
        celular = data.get('celular', '')
        password = data.get('password', '')

        if nombre == '':
            print("\nnombre\n")
            raise ValidationError(_("Se requiere un nombre válido."))
        if apellidos == '':
            print("\napellidos\n")
            raise ValidationError(_("Se requieren apellidos válidos."))
        if celular == '':
            print("\ncelular\n")
            raise ValidationError(_("Se requiere un número de celular válido."))

        if len(password) < 8:
            raise ValidationError(_("La contraseña debe tener al menos 8 caracteres."))
        if not any(char.isupper() for char in password):
            raise ValidationError(_("La contraseña debe contener al menos una letra mayúscula."))
        if not any(char.islower() for char in password):
            raise ValidationError(_("La contraseña debe contener al menos una letra minúscula."))
        if not any(char.isdigit() for char in password):
            raise ValidationError(_("La contraseña debe contener al menos un número."))
        if not any(char.isalnum() for char in password):
            raise ValidationError(_("La contraseña debe contener al menos un carácter especial."))

        serializer = UserSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'message': 'Usuario registrado correctamente',
            'user': serializer.data
        })

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = Usuarios.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        serializer = UserSerializer(user)

        return Response({
            'message': 'Usuario logeado correctamente',
            'user': serializer.data
        })