from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

class SubmitFeedback(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id):
        # Add event and user to the feedback data
        data = request.data.copy()
        data['event'] = event_id
        data['user'] = request.user.id  # Assuming user is authenticated

        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeedbackListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the event_id from the URL parameters
        event_id = self.kwargs['event_id']
        # Return feedback related to the specific event
        return Feedback.objects.filter(event_id=event_id)

    def get_serializer_class(self):
        return FeedbackSerializer
