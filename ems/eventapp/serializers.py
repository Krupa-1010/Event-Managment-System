from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','name', 'description', 'poster', 'venue', 'organizer', 'last_date_of_registration', 'start_event_time']
