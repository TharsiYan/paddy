from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('weather/', views.weather, name='weather'),
    path('weather-analytics/', views.weather_analytics, name='weather_analytics'),
    path('user-input/', views.user_input, name='user_input'),
    path('analytics/', views.analytics, name='analytics'),
    path('set-language/', views.set_language, name='set_language'),
    path('api/test-weather/', views.test_weather_api, name='test_weather_api'),
    path('api/test-paddy/', views.test_paddy_recommendations, name='test_paddy_recommendations'),
    path('api/debug-language/', views.debug_language, name='debug_language'),
    
    # Dashboard Action Buttons
    path('api/schedule-irrigation/', views.schedule_irrigation, name='schedule_irrigation'),
    path('api/apply-fertilizer/', views.apply_fertilizer, name='apply_fertilizer'),
    path('api/request-expert/', views.request_expert, name='request_expert'),
    path('api/water-crop/', views.water_crop, name='water_crop'),
    path('api/check-soil/', views.check_soil, name='check_soil'),
    path('api/view-report/', views.view_report, name='view_report'),
    path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
    
    # Data History
    path('paddy-history/', views.paddy_history, name='paddy_history'),
    path('api/recommendation-details/<int:rec_id>/', views.recommendation_details, name='recommendation_details'),
    
    # API Endpoints
    path('api/weather-update/', views.weather_update, name='weather_update'),
    path('api/notifications/', views.notifications, name='notifications'),
]


