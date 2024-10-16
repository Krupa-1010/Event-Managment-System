from rest_framework import serializers
from .models import Participant  # Assuming you have a Participant model

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['name', 'semester', 'branch', 'email', 'event', 'user']  # Add fields as necessary

    def validate(self, data):
        # Add any custom validation here if needed
        return data
