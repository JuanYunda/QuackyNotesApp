from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notas
from .serializers import NotasSerializer

# Create your views here.
class AllNotes(APIView):
    serializer_class = NotasSerializer
    
    def post(self, request):
      id_usuario = request.data['id_usuario']
      user_notes = Notas.objects.filter(id_usuario=id_usuario)
      serializar = NotasSerializer(user_notes, many=True)

      return Response(serializar.data)