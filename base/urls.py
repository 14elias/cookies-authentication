from django.urls import path
from .views import *


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('authenticated/', is_authenticated),
    path('register/', register),
    path('logout/', logout),
]