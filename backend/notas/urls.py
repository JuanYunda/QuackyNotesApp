from django.urls import path
from .views import AllNotes

urlpatterns = [
    path('notes/', AllNotes.as_view())
]