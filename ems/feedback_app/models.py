# models.py
from django.db import models
from django.contrib.auth.models import User
from eventapp.models import Event  # Assuming you have an Event model in eventapp

class Feedback(models.Model):
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
    
    RATING_CHOICES = [(5, '5'), (4, '4'), (3, '3'), (2, '2'), (1, '1')]
    
    name = models.CharField(max_length=100)
    semester = models.CharField(max_length=3, choices=SEMESTER_CHOICES)
    class_name = models.CharField(max_length=10, choices=CLASS_CHOICES)
    email = models.EmailField()
    feedback_id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ratings = models.IntegerField(choices=RATING_CHOICES)
    comments = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} - {self.ratings} - {self.event.name}'

