from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('weather/', views.weather, name='weather'),
    path('analytics/', views.analytics, name='analytics'),
    path('recommendations/', views.recommendations, name='recommendations'),
    path('test-buttons/', views.test_buttons, name='test_buttons'),
    path('mobile-test/', views.mobile_test, name='mobile_test'),
]


