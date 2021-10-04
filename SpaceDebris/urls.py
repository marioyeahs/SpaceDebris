from django.urls import path

from . import views

app_name='SpaceDebris'

urlpatterns = [
    path('', views.index, name='index'),
    path('satellite/<str:satellite>/', views.info, name="info")
]