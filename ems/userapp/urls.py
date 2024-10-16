from django.urls import path
from .views import register, login_view, logout_view,ProfileView

urlpatterns = [
    path('register/', register, name='register'),  # Register a new user
    path('login/', login_view, name='login'),      # Login user
    path('logout/', logout_view, name='logout'),   # Logout user
    path('profile/', ProfileView.as_view(), name='user-profile'),
   
]