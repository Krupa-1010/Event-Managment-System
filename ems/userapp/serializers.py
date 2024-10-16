from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()  # Use SerializerMethodField to get the role

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, role=role)
        return user

    def get_role(self, obj):  # Method to get the role from the Profile
        try:
            return obj.profile.role  # Assuming profile is the related name
        except Profile.DoesNotExist:
            return None  # Return None if the profile does not exist
