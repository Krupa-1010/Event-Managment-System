from django.urls import path
from .views import SubmitFeedback, FeedbackListView

urlpatterns = [
    path('events/<int:event_id>/submit-feedback/', SubmitFeedback.as_view(), name='submit-feedback'),
    path('events/<int:event_id>/feedback-list/', FeedbackListView.as_view(), name='feedback-list'), 
]
