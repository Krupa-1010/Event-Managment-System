from rest_framework import viewsets, status
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import QueryDict

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if request.user.profile.role != 'organizer':
            return Response({"error": "You are not allowed to create an event"}, status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        if request.user.profile.role != 'organizer':
            return Response({"error": "You are not allowed to edit this event"}, status=status.HTTP_403_FORBIDDEN)

        if isinstance(request.data, QueryDict):
            mutable_data = request.data.copy()
        else:
            mutable_data = request.data

        if not request.FILES.get('poster') and 'poster' not in mutable_data:
            mutable_data['poster'] = event.poster

        serializer = self.get_serializer(event, data=mutable_data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        event = self.get_object()
        if request.user.profile.role != 'organizer':
            return Response({"error": "You are not allowed to delete this event"}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        event = self.get_object()
        user_role = request.user.profile.role  # Get the user's role

        # Serialize event data
        serializer = self.get_serializer(event)
        event_data = serializer.data
        event_data['user_role'] = user_role  # Include the user role in the response

        return Response(event_data)
