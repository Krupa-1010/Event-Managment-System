from django.db import models
from django.contrib.auth.models import User
from eventapp.models import Event  # Adjust this import according to your project structure

class Participant(models.Model):
    SEMESTER_CHOICES = [
        ('S1', 'S1'),
        ('S3', 'S3'),
        ('S5', 'S5'),
        ('S7', 'S7'),
    ]

    BRANCH_CHOICES = [
        ('CSA', 'CSA'),
        ('CSB', 'CSB'),
        ('AIDS', 'AIDS'),
        ('CY', 'CY'),
        ('AI', 'AI'),
        ('EEE', 'EEE'),
        ('ECE', 'ECE'),
        ('ME', 'ME'),
        ('CE', 'CE'),
    ]

    participant_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    semester = models.CharField(max_length=5, choices=SEMESTER_CHOICES)
    branch = models.CharField(max_length=10, choices=BRANCH_CHOICES)
    email = models.EmailField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

