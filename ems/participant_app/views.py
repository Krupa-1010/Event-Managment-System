from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Event, Participant
from .serializers import ParticipantSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class RegisterParticipant(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        try:
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        # Add event and user to the participant data
        data = request.data.copy()
        data['event'] = event_id
        data['user'] = request.user.id

        serializer = ParticipantSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParticipantListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the event_id from the URL parameters
        event_id = self.kwargs['event_id']
        # Return participants related to the specific event
        return Participant.objects.filter(event_id=event_id)

    def get_serializer_class(self):
        return ParticipantSerializer
