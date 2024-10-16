from django.urls import path
from .views import RegisterVolunteer, VolunteerListView

urlpatterns = [
    # Route to register a volunteer for a specific event
    path('events/<int:event_id>/register-volunteer/', RegisterVolunteer.as_view(), name='register-volunteer'),
    
    # Route to view the list of volunteers for a specific event
    path('events/<int:event_id>/volunteers/', VolunteerListView.as_view(), name='volunteer-list'),
]

