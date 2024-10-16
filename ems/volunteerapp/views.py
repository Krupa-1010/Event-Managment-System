from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Volunteer, Event
from .serializers import VolunteerSerializer

# Register a Volunteer
class RegisterVolunteer(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        try:
            # Ensure that the event exists
            event = Event.objects.get(pk=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        # Add event and user to the volunteer data
        data = request.data.copy()
        data['event'] = event_id  # Add event_id to the request data
        data['user'] = request.user.id  # Automatically link the user

        # Validate and save volunteer data
        serializer = VolunteerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List Volunteers for a specific event
class VolunteerListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = VolunteerSerializer

    def get_queryset(self):
        # Retrieve volunteers only for the given event
        event_id = self.kwargs['event_id']
        return Volunteer.objects.filter(event_id=event_id)
