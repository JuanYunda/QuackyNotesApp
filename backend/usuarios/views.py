from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from validate_email_address import validate_email
from .serializers import UserSerializer
from .models import Usuarios

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        
        nombre = data.get('nombre', '')
        apellidos = data.get('apellidos', '')
        celular = data.get('celular', '')
        username = data.get('username', '')
        password = data.get('password', '')

        if nombre == '':
            raise ValidationError("Se requiere un nombre válido.")
        if apellidos == '':
            raise ValidationError("Se requieren apellidos válidos.")
        if celular == '' or len(celular) < 10 or not(char.isdigit() for char in celular):
            raise ValidationError("Se requiere un número de celular válido.")
        if not validate_email(username):
            raise ValidationError("Se requiere una dirección de correo electrónico válida.")

        if len(password) < 8:
            raise ValidationError("La contraseña debe tener al menos 8 caracteres.")
        if not any(char.isupper() for char in password):
            raise ValidationError("La contraseña debe contener al menos una letra mayúscula.")
        if not any(char.islower() for char in password):
            raise ValidationError("La contraseña debe contener al menos una letra minúscula.")
        if not any(char.isdigit() for char in password):
            raise ValidationError("La contraseña debe contener al menos un número.")
        if not any(char.isalnum() for char in password):
            raise ValidationError("La contraseña debe contener al menos un carácter especial.")

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

        if user.password != password:
            raise AuthenticationFailed('Incorrect password!')
        serializer = UserSerializer(user)

        return Response({
            'message': 'Usuario logeado correctamente',
            'user': serializer.data
        })