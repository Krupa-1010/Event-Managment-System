
from django.db import models
from django.contrib.auth.models import User
from eventapp.models import Event  # Assuming 'eventapp' holds your Event model

class Volunteer(models.Model):
    SEMESTER_CHOICES = [
        ('S1', 'S1'),
        ('S3', 'S3'),
        ('S5', 'S5'),
        ('S7', 'S7'),
    ]
    
    CLASS_CHOICES = [
        ('CSA', 'CSA'),
        ('CSB', 'CSB'),
        ('AIDS', 'AIDS'),
        ('AI', 'AI'),
        ('CY', 'CY'),
        ('ME', 'ME'),
        ('CE', 'CE'),
        ('EEE', 'EEE'),
        ('ECE', 'ECE'),
    ]
    
    ROLE_CHOICES = [
        ('media', 'Media'),
        ('decoration', 'Decoration'),
        ('management', 'Management'),
        ('finance', 'Finance'),
        ('reception', 'Reception Team'),
    ]
    
    name = models.CharField(max_length=100)
    semester = models.CharField(max_length=3, choices=SEMESTER_CHOICES)
    class_name = models.CharField(max_length=10, choices=CLASS_CHOICES)
    email = models.EmailField()
    volunteer_id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} - {self.role}'

