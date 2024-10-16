# serializers.py (in volunteerapp)
from rest_framework import serializers
from .models import Volunteer

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['volunteer_id', 'name', 'semester', 'class_name', 'email', 'role', 'event', 'user', 'registered_at']
