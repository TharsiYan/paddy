from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
    """Home page view"""
    return render(request, 'home.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')

def contact(request):
    """Contact page view"""
    return render(request, 'contact.html')

def dashboard(request):
    """Dashboard view for crop monitoring and analytics"""
    # Mock data for demonstration - in real app, this would come from database/APIs
    context = {
        'crop_data': {
            'name': 'Basmati Rice',
            'variety': 'Pusa Basmati 1',
            'planting_date': '2025-06-15',
            'expected_harvest': '2025-10-15',
            'growth_stage': 'Vegetative',
            'health_score': 85,
            'moisture_level': 60,
            'soil_temperature': 72,
            'days_to_harvest': 14,
        },
        'weather_forecast': [
            {'date': '2025-08-14', 'temp': 28, 'condition': 'Sunny', 'humidity': 65},
            {'date': '2025-08-15', 'temp': 26, 'condition': 'Partly Cloudy', 'humidity': 70},
            {'date': '2025-08-16', 'temp': 24, 'condition': 'Light Rain', 'humidity': 80},
            {'date': '2025-08-17', 'temp': 27, 'condition': 'Sunny', 'humidity': 68},
        ],
        'recommendations': [
            'Water levels are optimal for current growth stage',
            'Consider applying nitrogen fertilizer in next 3 days',
            'Monitor for signs of rice blast disease',
            'Prepare for upcoming rainfall on August 16th'
        ]
    }
    return render(request, 'dashboard.html', context)

def weather(request):
    """Weather page view with detailed weather information and recommendations"""
    # Mock weather data for demonstration - in real app, this would come from weather APIs
    context = {
        'current_weather': {
            'temperature': 28,
            'condition': 'Sunny',
            'humidity': 65,
            'rainfall': 0,
            'wind_speed': 12,
            'feels_like': 30,
            'uv_index': 'High',
            'visibility': '10 km'
        },
        'seven_day_forecast': [
            {'date': '2025-08-14', 'day': 'Today', 'min_temp': 22, 'max_temp': 28, 'condition': 'Sunny', 'rain_probability': 0, 'humidity': 65, 'icon': '☀️'},
            {'date': '2025-08-15', 'day': 'Tomorrow', 'min_temp': 20, 'max_temp': 26, 'condition': 'Partly Cloudy', 'rain_probability': 20, 'humidity': 70, 'icon': '⛅'},
            {'date': '2025-08-16', 'day': 'Saturday', 'min_temp': 18, 'max_temp': 24, 'condition': 'Light Rain', 'rain_probability': 80, 'humidity': 85, 'icon': '🌧️'},
            {'date': '2025-08-17', 'day': 'Sunday', 'min_temp': 21, 'max_temp': 27, 'condition': 'Sunny', 'rain_probability': 10, 'humidity': 68, 'icon': '☀️'},
            {'date': '2025-08-18', 'day': 'Monday', 'min_temp': 23, 'max_temp': 29, 'condition': 'Partly Cloudy', 'rain_probability': 15, 'humidity': 62, 'icon': '⛅'},
            {'date': '2025-08-19', 'day': 'Tuesday', 'min_temp': 24, 'max_temp': 30, 'condition': 'Sunny', 'rain_probability': 5, 'humidity': 58, 'icon': '☀️'},
            {'date': '2025-08-20', 'day': 'Wednesday', 'min_temp': 22, 'max_temp': 28, 'condition': 'Cloudy', 'rain_probability': 40, 'humidity': 72, 'icon': '☁️'},
        ],
        'recommendations': [
            'Current conditions are optimal for outdoor farming activities',
            'No irrigation needed today due to adequate soil moisture',
            'Consider applying foliar fertilizer in the morning hours',
            'Prepare for potential rainfall on Saturday - delay field work',
            'UV index is high - ensure proper sun protection for workers',
            'Wind conditions are favorable for pesticide application if needed'
        ],
        'alerts': [
            {'type': 'info', 'message': 'Light rain expected on Saturday - plan irrigation accordingly'},
            {'type': 'warning', 'message': 'High UV index today - limit outdoor work during peak hours'}
        ]
    }
    return render(request, 'weather.html', context)

def analytics(request):
    """Analytics page view with detailed performance metrics and charts"""
    # Mock analytics data for demonstration - in real app, this would come from database/APIs
    context = {
        'kpis': [
            {
                'title': 'Total Yield',
                'value': '2,847 kg',
                'change': '+12.5%',
                'trend': 'up',
                'icon': 'fas fa-chart-line',
                'color': 'success',
                'description': 'vs. last season'
            },
            {
                'title': 'Crop Health Score',
                'value': '85%',
                'change': '+8.2%',
                'trend': 'up',
                'icon': 'fas fa-heartbeat',
                'color': 'info',
                'description': 'vs. last month'
            },
            {
                'title': 'Water Efficiency',
                'value': '92%',
                'change': '+5.1%',
                'trend': 'up',
                'icon': 'fas fa-tint',
                'color': 'primary',
                'description': 'vs. target'
            },
            {
                'title': 'Cost per kg',
                'value': '₹18.50',
                'change': '-3.2%',
                'trend': 'down',
                'icon': 'fas fa-rupee-sign',
                'color': 'warning',
                'description': 'vs. last season'
            }
        ],
        'yield_trends': [
            {'month': 'Jan', 'yield': 0, 'target': 0},
            {'month': 'Feb', 'yield': 0, 'target': 0},
            {'month': 'Mar', 'yield': 0, 'target': 0},
            {'month': 'Apr', 'yield': 0, 'target': 0},
            {'month': 'May', 'yield': 0, 'target': 0},
            {'month': 'Jun', 'yield': 0, 'target': 0},
            {'month': 'Jul', 'yield': 125, 'target': 120},
            {'month': 'Aug', 'yield': 280, 'target': 275},
            {'month': 'Sep', 'yield': 420, 'target': 400},
            {'month': 'Oct', 'yield': 580, 'target': 550},
            {'month': 'Nov', 'yield': 720, 'target': 700},
            {'month': 'Dec', 'yield': 722, 'target': 700}
        ],
        'soil_moisture_data': [
            {'date': '2025-08-08', 'moisture': 65, 'temperature': 24, 'ph': 6.8},
            {'date': '2025-08-09', 'moisture': 68, 'temperature': 25, 'ph': 6.7},
            {'date': '2025-08-10', 'moisture': 72, 'temperature': 26, 'ph': 6.6},
            {'date': '2025-08-11', 'moisture': 70, 'temperature': 25, 'ph': 6.7},
            {'date': '2025-08-12', 'moisture': 67, 'temperature': 24, 'ph': 6.8},
            {'date': '2025-08-13', 'moisture': 65, 'temperature': 23, 'ph': 6.9},
            {'date': '2025-08-14', 'moisture': 60, 'temperature': 22, 'ph': 7.0}
        ],
        'performance_data': [
            {
                'season': '2024-25',
                'crop': 'Basmati Rice',
                'area': '2.5 acres',
                'yield': '2,847 kg',
                'revenue': '₹52,665',
                'cost': '₹52,669',
                'profit': '₹-4',
                'efficiency': '85%'
            },
            {
                'season': '2023-24',
                'crop': 'Basmati Rice',
                'area': '2.3 acres',
                'yield': '2,531 kg',
                'revenue': '₹46,823',
                'cost': '₹48,200',
                'profit': '₹-1,377',
                'efficiency': '78%'
            },
            {
                'season': '2022-23',
                'crop': 'Basmati Rice',
                'area': '2.0 acres',
                'yield': '2,100 kg',
                'revenue': '₹38,850',
                'cost': '₹42,000',
                'profit': '₹-3,150',
                'efficiency': '72%'
            }
        ],
        'weather_impact': [
            {'factor': 'Temperature', 'impact': 'Positive', 'score': 8.5, 'description': 'Optimal growing conditions'},
            {'factor': 'Rainfall', 'impact': 'Positive', 'score': 7.8, 'description': 'Adequate moisture levels'},
            {'factor': 'Humidity', 'impact': 'Neutral', 'score': 6.5, 'description': 'Within acceptable range'},
            {'factor': 'Wind', 'impact': 'Negative', 'score': 4.2, 'description': 'Some crop damage reported'},
            {'factor': 'Sunlight', 'impact': 'Positive', 'score': 9.1, 'description': 'Excellent photosynthesis conditions'}
        ]
    }
    return render(request, 'analytics.html', context)

def recommendations(request):
    """AI Recommendations page view with smart farming suggestions"""
    # Mock AI recommendations data for demonstration - in real app, this would come from AI models
    context = {
        'recommendations': [
            {
                'id': 1,
                'title': 'Immediate Irrigation Required',
                'severity': 'High',
                'category': 'Water Management',
                'crop_stage': 'Vegetative',
                'reason': 'Soil moisture has dropped to 60% - below optimal range for current growth stage',
                'description': 'Low soil moisture detected in field A3. Current levels are insufficient for proper root development and nutrient uptake.',
                'suggested_actions': [
                    'Schedule irrigation within the next 12 hours',
                    'Apply 2-3 inches of water to reach 70-75% moisture',
                    'Monitor soil moisture every 6 hours after irrigation'
                ],
                'priority': 1,
                'estimated_impact': 'High - Prevents growth stunting and yield reduction',
                'deadline': 'Within 12 hours',
                'icon': 'fas fa-tint',
                'color': 'danger'
            },
            {
                'id': 2,
                'title': 'Nitrogen Fertilizer Application',
                'severity': 'Medium',
                'category': 'Nutrient Management',
                'crop_stage': 'Vegetative',
                'reason': 'Leaf color analysis indicates nitrogen deficiency in 30% of plants',
                'description': 'Recent drone imagery shows yellowing leaves in the eastern section, suggesting nitrogen deficiency.',
                'suggested_actions': [
                    'Apply 25 kg/acre of urea fertilizer',
                    'Split application: 15 kg now, 10 kg in 7 days',
                    'Ensure proper soil moisture before application'
                ],
                'priority': 2,
                'estimated_impact': 'Medium - Improves leaf development and photosynthesis',
                'deadline': 'Within 3 days',
                'icon': 'fas fa-seedling',
                'color': 'warning'
            },
            {
                'id': 3,
                'title': 'Disease Prevention Protocol',
                'severity': 'Medium',
                'category': 'Pest & Disease',
                'crop_stage': 'Vegetative',
                'reason': 'Weather conditions favorable for rice blast disease development',
                'description': 'High humidity (85%) and moderate temperatures create ideal conditions for rice blast fungus.',
                'suggested_actions': [
                    'Apply preventive fungicide (Tricyclazole 75% WP)',
                    'Maintain proper field drainage',
                    'Monitor for early symptoms daily'
                ],
                'priority': 3,
                'estimated_impact': 'Medium - Prevents potential 15-20% yield loss',
                'deadline': 'Within 5 days',
                'icon': 'fas fa-shield-alt',
                'color': 'warning'
            },
            {
                'id': 4,
                'title': 'Optimal Harvest Timing',
                'severity': 'Low',
                'category': 'Harvest Planning',
                'crop_stage': 'Maturity',
                'reason': 'Grain moisture content approaching optimal harvest levels',
                'description': 'Current grain moisture is 22% - approaching the ideal 18-20% for harvest.',
                'suggested_actions': [
                    'Monitor grain moisture daily',
                    'Prepare harvesting equipment',
                    'Plan harvest for next 7-10 days'
                ],
                'priority': 4,
                'estimated_impact': 'Low - Ensures optimal grain quality and storage',
                'deadline': 'Within 10 days',
                'icon': 'fas fa-cut',
                'color': 'info'
            },
            {
                'id': 5,
                'title': 'Soil pH Adjustment',
                'severity': 'Low',
                'category': 'Soil Health',
                'crop_stage': 'All Stages',
                'reason': 'Soil pH trending towards alkaline (7.0) - optimal range is 6.0-6.8',
                'description': 'Recent soil tests show pH increasing from 6.8 to 7.0, which may affect nutrient availability.',
                'suggested_actions': [
                    'Apply elemental sulfur (500 kg/acre)',
                    'Monitor pH changes weekly',
                    'Consider organic matter addition'
                ],
                'priority': 5,
                'estimated_impact': 'Low - Improves nutrient uptake efficiency',
                'deadline': 'Before next season',
                'icon': 'fas fa-flask',
                'color': 'info'
            }
        ],
        'filters': {
            'severity_levels': ['High', 'Medium', 'Low'],
            'categories': ['Water Management', 'Nutrient Management', 'Pest & Disease', 'Harvest Planning', 'Soil Health'],
            'crop_stages': ['Germination', 'Vegetative', 'Flowering', 'Maturity', 'All Stages']
        },
        'summary': {
            'total_recommendations': 5,
            'high_priority': 1,
            'medium_priority': 2,
            'low_priority': 2,
            'estimated_impact': 'High - Potential 20-25% yield improvement if all recommendations followed'
        }
    }
    return render(request, 'recommendations.html', context)

def test_buttons(request):
    """Test page for button functionality"""
    return render(request, 'test-buttons.html')

def mobile_test(request):
    """Mobile access test page"""
    return render(request, 'mobile_test.html')
