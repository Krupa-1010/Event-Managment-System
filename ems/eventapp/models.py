from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField(max_length=255)
    poster = models.ImageField(upload_to='posters/')
    description = models.TextField()
    venue = models.CharField(max_length=255)
    start_event_time = models.DateTimeField()
    last_date_of_registration = models.DateField()
    organizer = models.CharField(max_length=255)

    def __str__(self):
        return self.name

