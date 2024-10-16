from django.urls import path
from .views import RegisterParticipant,ParticipantListView

urlpatterns = [
    path('events/<int:event_id>/register-participant/', RegisterParticipant.as_view(), name='register-participant'),
    path('events/<int:event_id>/participants/', ParticipantListView.as_view(), name='participant-list'), 
  
]
