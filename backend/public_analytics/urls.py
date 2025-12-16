from django.urls import path
from . import views

urlpatterns = [
    path('graduates-performance/', views.public_graduates_performance, name='public_graduates_performance'),
]
