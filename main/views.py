from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.utils import timezone
from django.utils import translation
from django.conf import settings
import requests
import json
import random
from .models import PaddyRecommendation
from django.db.models import Avg, Count, Max, Min, Q
from django.utils import timezone
from datetime import timedelta

def home(request):
    """Home page view"""
    return render(request, 'home.html')

def dashboard(request):
    """Dashboard view"""
    return render(request, 'dashboard.html')

def weather(request):
    """Weather page view"""
    context = {}
    
    if request.method == 'POST':
        location = request.POST.get('location', '').strip()
        print(f"Weather search requested for location: {location}")
        if location:
            # Try multiple geocoding strategies for very specific locations
            success = False
            
            # Strategy 1: Try with OpenStreetMap Nominatim (most comprehensive)
            headers = {
                'User-Agent': 'PaddySense/1.0 (https://paddysense.com; contact@example.com)',
                'Accept': 'application/json'
            }
            
            # Try exact search first
            geocode_url = f"https://nominatim.openstreetmap.org/search?q={location}&format=json&limit=5&addressdetails=1"
            print(f"Strategy 1 - Exact search URL: {geocode_url}")
            
            try:
                geocode_response = requests.get(geocode_url, headers=headers, timeout=10)
                print(f"Strategy 1 response status: {geocode_response.status_code}")
                
                if geocode_response.status_code == 200 and geocode_response.text.strip():
                    try:
                        geocode_data = geocode_response.json()
                        print(f"Strategy 1 response: {geocode_data}")
                        
                        if geocode_data and len(geocode_data) > 0:
                            # Use the best match (highest importance or first result)
                            best_match = geocode_data[0]
                            lat = float(best_match['lat'])
                            lon = float(best_match['lon'])
                            display_name = best_match['display_name'].split(',')[0]
                            print(f"Strategy 1 success - Coordinates: {lat}, {lon}, Display: {display_name}")
                            
                            success = get_weather_data(lat, lon, display_name, location, context, "OpenStreetMap")
                            
                    except json.JSONDecodeError as e:
                        print(f"Strategy 1 JSON decode error: {e}")
                
                if not success:
                    # Strategy 2: Try with more specific search parameters
                    print("Strategy 1 failed, trying Strategy 2...")
                    specific_url = f"https://nominatim.openstreetmap.org/search?q={location}&format=json&limit=10&addressdetails=1&extratags=1&namedetails=1"
                    specific_response = requests.get(specific_url, headers=headers, timeout=10)
                    
                    if specific_response.status_code == 200 and specific_response.text.strip():
                        try:
                            specific_data = specific_response.json()
                            if specific_data and len(specific_data) > 0:
                                best_match = specific_data[0]
                                lat = float(best_match['lat'])
                                lon = float(best_match['lon'])
                                display_name = best_match['display_name'].split(',')[0]
                                print(f"Strategy 2 success - Coordinates: {lat}, {lon}, Display: {display_name}")
                                
                                success = get_weather_data(lat, lon, display_name, location, context, "OpenStreetMap (Detailed)")
                        except json.JSONDecodeError as e:
                            print(f"Strategy 2 JSON decode error: {e}")
                
                if not success:
                    # Strategy 3: Try Open-Meteo Geocoding API
                    print("Strategy 2 failed, trying Strategy 3...")
                    fallback_url = f"https://geocoding-api.open-meteo.com/v1/search?name={location}&count=5&language=en&format=json"
                    print(f"Strategy 3 URL: {fallback_url}")
                    
                    fallback_response = requests.get(fallback_url, timeout=10)
                    if fallback_response.status_code == 200:
                        try:
                            fallback_data = fallback_response.json()
                            if fallback_data.get('results') and len(fallback_data['results']) > 0:
                                result = fallback_data['results'][0]
                                lat = float(result['latitude'])
                                lon = float(result['longitude'])
                                display_name = result['name']
                                print(f"Strategy 3 success - Coordinates: {lat}, {lon}, Display: {display_name}")
                                
                                success = get_weather_data(lat, lon, display_name, location, context, "Open-Meteo Geocoding")
                        except Exception as e:
                            print(f"Strategy 3 error: {e}")
                
                if not success:
                    # Strategy 4: Try with location parts (split by commas)
                    print("Strategy 3 failed, trying Strategy 4...")
                    location_parts = [part.strip() for part in location.split(',') if part.strip()]
                    if len(location_parts) > 1:
                        # Try with just the main part (first part)
                        main_location = location_parts[0]
                        print(f"Strategy 4 - Trying main part: {main_location}")
                        
                        main_url = f"https://nominatim.openstreetmap.org/search?q={main_location}&format=json&limit=3"
                        main_response = requests.get(main_url, headers=headers, timeout=10)
                        
                        if main_response.status_code == 200 and main_response.text.strip():
                            try:
                                main_data = main_response.json()
                                if main_data and len(main_data) > 0:
                                    best_match = main_data[0]
                                    lat = float(best_match['lat'])
                                    lon = float(best_match['lon'])
                                    display_name = best_match['display_name'].split(',')[0]
                                    print(f"Strategy 4 success - Coordinates: {lat}, {lon}, Display: {display_name}")
                                    
                                    success = get_weather_data(lat, lon, display_name, location, context, "OpenStreetMap (Main Part)")
                            except json.JSONDecodeError as e:
                                print(f"Strategy 4 JSON decode error: {e}")
                
                if not success:
                    # Strategy 5: Try with Google-style search (remove specific details)
                    print("Strategy 4 failed, trying Strategy 5...")
                    # Remove common specific terms and try again
                    cleaned_location = location.replace('street', '').replace('road', '').replace('lane', '').replace('avenue', '').strip()
                    if cleaned_location != location:
                        print(f"Strategy 5 - Trying cleaned location: {cleaned_location}")
                        
                        cleaned_url = f"https://nominatim.openstreetmap.org/search?q={cleaned_location}&format=json&limit=3"
                        cleaned_response = requests.get(cleaned_url, headers=headers, timeout=10)
                        
                        if cleaned_response.status_code == 200 and cleaned_response.text.strip():
                            try:
                                cleaned_data = cleaned_response.json()
                                if cleaned_data and len(cleaned_data) > 0:
                                    best_match = cleaned_data[0]
                                    lat = float(best_match['lat'])
                                    lon = float(best_match['lon'])
                                    display_name = best_match['display_name'].split(',')[0]
                                    print(f"Strategy 5 success - Coordinates: {lat}, {lon}, Display: {display_name}")
                                    
                                    success = get_weather_data(lat, lon, display_name, location, context, "OpenStreetMap (Cleaned)")
                            except json.JSONDecodeError as e:
                                print(f"Strategy 5 JSON decode error: {e}")
                
                if not success:
                    # All strategies failed
                    print("All geocoding strategies failed")
                    context.update({
                        'error': 'Location not found. The location might be too specific or not in our database. Try using a nearby city or town name.',
                        'location_query': location,
                        'suggestions': [
                            'Try using just the city/town name',
                            'Use nearby larger city names',
                            'Check spelling of the location',
                            'Try English names if available'
                        ]
                    })
                        
            except requests.RequestException as e:
                print(f"Request error: {e}")
                context.update({
                    'error': f'Network error: {str(e)}. Please check your internet connection.',
                    'location_query': location
                })
            except Exception as e:
                print(f"Error in weather view: {e}")
                context.update({
                    'error': f'Error fetching weather data: {str(e)}',
                    'location_query': location
                })
    
    return render(request, 'weather.html', context)

def get_weather_data(lat, lon, display_name, original_query, context, source):
    """Helper function to get weather data for given coordinates"""
    try:
        # Get weather data from Open-Meteo API
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto"
        print(f"Weather URL: {weather_url}")
        weather_response = requests.get(weather_url, timeout=10)
        
        # Check if weather request was successful
        if weather_response.status_code != 200:
            print(f"Weather API error: Status {weather_response.status_code}")
            context.update({
                'error': f'Weather service error (Status: {weather_response.status_code})',
                'location_query': original_query
            })
            return False
        
        try:
            weather_data = weather_response.json()
        except json.JSONDecodeError as e:
            print(f"Weather JSON decode error: {e}")
            context.update({
                'error': 'Invalid response from weather service. Please try again.',
                'location_query': original_query
            })
            return False
        
        print(f"Weather response: {weather_data}")
        
        if 'current' in weather_data:
            current = weather_data['current']
            context.update({
                'search_performed': True,
                'location_query': original_query,
                'display_name': display_name,
                'latitude': lat,
                'longitude': lon,
                'current_weather': {
                    'temperature': current.get('temperature_2m'),
                    'humidity': current.get('relative_humidity_2m'),
                    'rainfall': current.get('precipitation', 0),
                    'wind_speed': current.get('wind_speed_10m'),
                    'condition': 'Sunny' if current.get('weather_code') == 0 else 'Cloudy',
                    'feels_like': current.get('temperature_2m'),
                    'visibility': 10.0,
                    'timestamp': current.get('time')
                },
                'source': source
            })
            print(f"Context updated with weather data: {context}")
            return True
        else:
            context.update({
                'error': 'Weather data not available for this location',
                'location_query': original_query
            })
            return False
            
    except Exception as e:
        print(f"Error getting weather data: {e}")
        context.update({
            'error': f'Error fetching weather data: {str(e)}',
            'location_query': original_query
        })
        return False

def weather_analytics(request):
    """Weather analytics page view"""
    return render(request, 'weather_analytics.html')

def analytics(request):
    """Comprehensive analytics view with intelligent data analysis"""
    from django.db.models import Avg, Count, Max, Min
    from django.utils import timezone
    from datetime import timedelta
    
    # Get all stored recommendations
    all_recommendations = PaddyRecommendation.objects.all()
    
    # Calculate key performance indicators
    total_recommendations = all_recommendations.count()
    total_locations = all_recommendations.values('location').distinct().count()
    total_fields = all_recommendations.values('field_name').distinct().count()
    
    # Temperature analysis
    temp_stats = all_recommendations.aggregate(
        avg_temp=Avg('soil_temperature'),
        max_temp=Max('soil_temperature'),
        min_temp=Min('soil_temperature')
    )
    

    
    # Soil type analysis
    soil_type_stats = all_recommendations.values('soil_type').annotate(
        count=Count('id'),
        avg_temp=Avg('soil_temperature')
    ).order_by('-count')
    
    # Season analysis
    season_stats = all_recommendations.values('planting_season').annotate(
        count=Count('id'),
        avg_temp=Avg('soil_temperature')
    ).order_by('-count')
    
    # Location performance
    location_stats = all_recommendations.values('location').annotate(
        count=Count('id'),
        avg_temp=Avg('soil_temperature'),
        success_rate=Count('id', filter=Q(success=True)) * 100.0 / Count('id')
    ).order_by('-count')[:5]
    
    # Recent trends (last 30 days)
    thirty_days_ago = timezone.now() - timedelta(days=30)
    recent_recommendations = all_recommendations.filter(timestamp__gte=thirty_days_ago)
    
    # Monthly yield trends (simulated based on temperature conditions)
    monthly_yield_data = []
    current_month = timezone.now().month
    for i in range(6):
        month_num = (current_month - i) % 12 or 12
        month_name = timezone.now().replace(month=month_num).strftime('%B')
        
        # Simulate yield based on temperature conditions for that month
        month_recommendations = all_recommendations.filter(timestamp__month=month_num)
        if month_recommendations.exists():
            avg_temp = month_recommendations.aggregate(avg=Avg('soil_temperature'))['avg']
            # Yield calculation based on temperature (optimal temp = higher yield)
            if avg_temp and 22 <= avg_temp <= 30:
                actual_yield = 2800 + (30 - abs(avg_temp - 26)) * 50  # Optimal range
                target_yield = 3000
            elif avg_temp and avg_temp < 22:
                actual_yield = 2000 + (avg_temp - 15) * 40  # Cold conditions
                target_yield = 2500
            else:
                actual_yield = 2200 + (35 - avg_temp) * 30  # Hot conditions
                target_yield = 2700
            
            performance = (actual_yield / target_yield) * 100
            monthly_yield_data.append({
                'month': month_name,
                'actual_yield': round(actual_yield),
                'target_yield': target_yield,
                'performance': round(performance, 1)
            })
    
    # Weather impact score (based on temperature conditions)
    weather_impact_score = 0
    if temp_stats['avg_temp']:
        if 22 <= temp_stats['avg_temp'] <= 30:
            weather_impact_score = 85  # Excellent conditions
        elif 20 <= temp_stats['avg_temp'] < 22 or 30 < temp_stats['avg_temp'] <= 32:
            weather_impact_score = 70  # Good conditions
        elif 18 <= temp_stats['avg_temp'] < 20 or 32 < temp_stats['avg_temp'] <= 35:
            weather_impact_score = 55  # Moderate conditions
        else:
            weather_impact_score = 35  # Poor conditions
    
    # Soil conditions (last 7 days)
    seven_days_ago = timezone.now() - timedelta(days=7)
    recent_soil_data = all_recommendations.filter(timestamp__gte=seven_days_ago).order_by('-timestamp')
    
    soil_conditions = []
    for rec in recent_soil_data[:7]:
        # Simulate moisture and pH based on soil type and temperature
        if rec.soil_type == 'clay':
            moisture = 75 + (rec.soil_temperature - 20) * 0.5
            ph = 6.2 + (rec.soil_temperature - 25) * 0.02
        elif rec.soil_type == 'sandy':
            moisture = 45 + (rec.soil_temperature - 20) * 0.8
            ph = 6.8 + (rec.soil_temperature - 25) * 0.01
        else:  # loamy
            moisture = 60 + (rec.soil_temperature - 20) * 0.6
            ph = 6.5 + (rec.soil_temperature - 25) * 0.015
        
        soil_conditions.append({
            'date': rec.timestamp.strftime('%Y-%m-%d'),
            'moisture': round(moisture, 1),
            'temp': rec.soil_temperature,
            'ph': round(ph, 1)
        })
    
    # Performance summary calculations
    total_yield = sum(item['actual_yield'] for item in monthly_yield_data)
    efficiency = weather_impact_score
    revenue = total_yield * 18.5  # Assuming ₹18.5 per kg
    net_profit = revenue - (total_yield * 15)  # Assuming ₹15 cost per kg
    
    # Intelligent insights and recommendations
    insights = []
    

    
    if soil_type_stats and soil_type_stats[0]['count'] > total_recommendations * 0.4:
        insights.append(f"🏗️ {soil_type_stats[0]['soil_type'].title()} soil is your primary type - optimize for this")
    
    if location_stats and location_stats[0]['success_rate'] > 80:
        insights.append(f"📍 {location_stats[0]['location']} shows excellent performance - replicate strategies")
    
    if weather_impact_score < 60:
        insights.append("🌦️ Weather conditions are challenging - consider protective measures")
    
    context = {
        'total_recommendations': total_recommendations,
        'total_locations': total_locations,
        'total_fields': total_fields,
        'temp_stats': temp_stats,

        'soil_type_stats': soil_type_stats,
        'season_stats': season_stats,
        'location_stats': location_stats,
        'monthly_yield_data': monthly_yield_data,
        'weather_impact_score': weather_impact_score,
        'soil_conditions': soil_conditions,
        'performance_summary': {
            'total_yield': total_yield,
            'efficiency': efficiency,
            'revenue': round(revenue),
            'net_profit': round(net_profit)
        },
        'insights': insights
    }
    
    return render(request, 'analytics.html', context)

def user_input(request):
    """User input form view"""
    context = {}
    
    if request.method == 'POST':
        location = request.POST.get('location', '').strip()
        field_name = request.POST.get('field_name', '').strip()
        soil_temperature = request.POST.get('soil_temperature', '').strip()
        soil_type = request.POST.get('soil_type', 'loamy').strip()  # Default to loamy
        season = request.POST.get('season', 'current').strip()  # Default to current season
        
        if location and soil_temperature:
            try:
                soil_temp = float(soil_temperature)
                
                # Get intelligent paddy recommendations
                recommendations = get_paddy_recommendations(soil_temp, soil_type, season, location)
                
                # Save to database
                paddy_rec = PaddyRecommendation.objects.create(
                    location=location,
                    field_name=field_name,
                    soil_temperature=soil_temp,
                    soil_type=soil_type,
                    planting_season=season,
                    primary_varieties=recommendations['primary_varieties'],
                    secondary_varieties=recommendations['secondary_varieties'],
                    planting_timing=recommendations['planting_timing'],
                    soil_preparation=recommendations['soil_preparation'],
                    water_management=recommendations['water_management'],
                    fertilizer_tips=recommendations['fertilizer_tips'],
                    risk_factors=recommendations['risk_factors'],
                    optimal_conditions=recommendations['optimal_conditions'],
                    current_time_recommendations=recommendations['current_time_recommendations'],
                    seasonal_varieties=recommendations['seasonal_varieties'],
                    immediate_actions=recommendations['immediate_actions'],
                    explanation=recommendations['explanation'],
                    success=True
                )
                
                # Get recent entries for display
                recent_entries = PaddyRecommendation.objects.all()[:5]
                
                context.update({
                    'success': True,
                    'location': location,
                    'field_name': field_name,
                    'soil_temperature': soil_temp,
                    'soil_type': soil_type,
                    'season': season,
                    'recommendations': recommendations,
                    'message': f'Data received successfully! Location: {location}, Temperature: {soil_temp}°C',
                    'recent_entries': recent_entries,
                    'entry_id': paddy_rec.id
                })
                
                print(f"Paddy recommendations generated and saved to database: {recommendations}")
                
            except ValueError:
                context.update({
                    'error': 'Please enter a valid soil temperature (e.g., 25.5)',
                    'location': location,
                    'field_name': field_name,
                    'soil_temperature': soil_temperature
                })
        else:
            context.update({
                'error': 'Please fill in all required fields',
                'location': location,
                'field_name': field_name,
                'soil_temperature': soil_temperature
            })
    
    # Get recent entries for display (even on GET request)
    if 'recent_entries' not in context:
        context['recent_entries'] = PaddyRecommendation.objects.all()[:5]
    
    return render(request, 'user_input.html', context)

def get_paddy_recommendations(soil_temp, soil_type, season, location):
    """Generate intelligent paddy recommendations based on multiple factors"""
    
    from datetime import datetime
    
    recommendations = {
        'primary_varieties': [],
        'secondary_varieties': [],
        'planting_timing': '',
        'soil_preparation': '',
        'water_management': '',
        'fertilizer_tips': '',
        'risk_factors': [],
        'optimal_conditions': {},
        'explanation': '',
        'current_time_recommendations': '',
        'seasonal_varieties': [],
        'immediate_actions': []
    }
    
    # Get current month for seasonal recommendations
    current_month = datetime.now().month
    current_season = get_current_season(current_month)
    
    # Current time recommendations
    recommendations['current_time_recommendations'] = get_current_time_recommendations(current_month, soil_temp)
    
    # Temperature-based recommendations
    if soil_temp < 20:
        recommendations['risk_factors'].append('Soil temperature is too cold for optimal paddy growth')
        recommendations['planting_timing'] = 'Wait for soil to warm up to 22-30°C'
        recommendations['water_management'] = 'Use warm water for irrigation if possible'
        recommendations['immediate_actions'].append('Delay planting until soil warms up')
        recommendations['immediate_actions'].append('Prepare nursery beds for early varieties')
        
        # Cold-tolerant varieties for current conditions
        recommendations['primary_varieties'] = [
            'IR64 (Cold-tolerant, High yielding)',
            'Swarna (Cold-resistant, Popular)',
            'Pusa Basmati 1 (Cold-adapted, Aromatic)',
            'IR36 (Early maturing, Cold-hardy)'
        ]
        recommendations['secondary_varieties'] = [
            'Pusa 44 (Cold-hardy, Disease resistant)',
            'IR8 (High yield potential, Quick maturing)'
        ]
        
    elif 20 <= soil_temp <= 30:
        recommendations['optimal_conditions']['temperature'] = 'Optimal temperature range for paddy'
        recommendations['planting_timing'] = 'Ideal time for planting'
        recommendations['water_management'] = 'Standard irrigation practices'
        recommendations['immediate_actions'].append('Proceed with planting - conditions are perfect')
        recommendations['immediate_actions'].append('Prepare field for direct seeding')
        
        # Standard varieties for optimal conditions
        recommendations['primary_varieties'] = [
            'IR64 (High yielding, Disease resistant)',
            'Swarna (Popular, High quality)',
            'Pusa Basmati 1 (Aromatic, Premium quality)',
            'IR36 (Early maturing, Quick harvest)'
        ]
        recommendations['secondary_varieties'] = [
            'Pusa 44 (Disease resistant, High yield)',
            'IR8 (High yield potential, Popular)'
        ]
        
    elif 30 < soil_temp <= 35:
        recommendations['risk_factors'].append('Soil temperature is getting warm')
        recommendations['planting_timing'] = 'Plant early morning or evening'
        recommendations['water_management'] = 'Increase irrigation frequency to cool soil'
        recommendations['immediate_actions'].append('Plant during cooler hours')
        recommendations['immediate_actions'].append('Increase irrigation frequency')
        
        # Heat-tolerant varieties
        recommendations['primary_varieties'] = [
            'IR64 (Heat-tolerant, High yielding)',
            'Swarna (Adaptable, Heat-resistant)',
            'Pusa Basmati 1 (Heat-resistant, Aromatic)',
            'IR36 (Quick maturing, Heat-adapted)'
        ]
        recommendations['secondary_varieties'] = [
            'Pusa 44 (Heat-adapted, Disease resistant)',
            'IR8 (Quick cycle, Heat-tolerant)'
        ]
        
    else:  # > 35°C
        recommendations['risk_factors'].append('Soil temperature is too hot for optimal growth')
        recommendations['planting_timing'] = 'Avoid planting during peak heat hours'
        recommendations['water_management'] = 'Frequent irrigation and shade management needed'
        recommendations['immediate_actions'].append('Consider delaying planting until cooler weather')
        recommendations['immediate_actions'].append('Use shade nets if planting is necessary')
        
        # Heat-resistant varieties
        recommendations['primary_varieties'] = [
            'IR64 (Heat-resistant, High yielding)',
            'Swarna (Stress-tolerant, Adaptable)'
        ]
        recommendations['secondary_varieties'] = [
            'IR36 (Quick cycle, Heat-adapted)',
            'Pusa 44 (Stress-adapted, Quick maturing)'
        ]
    
    # Soil type considerations
    if soil_type == 'clay':
        recommendations['soil_preparation'] = 'Clay soil holds water well but needs good drainage'
        recommendations['fertilizer_tips'] = 'Add organic matter to improve structure'
        recommendations['immediate_actions'].append('Improve drainage with raised beds')
    elif soil_type == 'sandy':
        recommendations['soil_preparation'] = 'Sandy soil needs more frequent irrigation and fertilization'
        recommendations['fertilizer_tips'] = 'Use slow-release fertilizers and organic matter'
        recommendations['immediate_actions'].append('Add organic matter to improve water retention')
    elif soil_type == 'loamy':
        recommendations['soil_preparation'] = 'Loamy soil is ideal for paddy cultivation'
        recommendations['fertilizer_tips'] = 'Standard fertilization practices work well'
        recommendations['immediate_actions'].append('Maintain current soil structure')
    else:
        recommendations['soil_preparation'] = 'Ensure proper soil preparation and drainage'
        recommendations['fertilizer_tips'] = 'Test soil pH and add appropriate amendments'
        recommendations['immediate_actions'].append('Test soil pH and add amendments')
    
    # Location-based adjustments
    if 'sri lanka' in location.lower() or 'srilanka' in location.lower():
        recommendations['explanation'] = f'Based on Sri Lankan conditions: Soil temp {soil_temp}°C is {"optimal" if 22 <= soil_temp <= 30 else "suboptimal"} for paddy cultivation.'
        recommendations['optimal_conditions']['region'] = 'Sri Lanka - Tropical climate suitable for paddy'
        
        # Add Sri Lankan specific varieties based on current season
        seasonal_varieties = get_sri_lankan_seasonal_varieties(current_month, soil_temp)
        recommendations['seasonal_varieties'] = seasonal_varieties
        
        # Add location-specific varieties
        if 'jaffna' in location.lower():
            recommendations['primary_varieties'].extend(['Jaffna Local (Traditional, Local adapted)', 'Northern Red (Local variety, High quality)'])
        elif 'colombo' in location.lower() or 'western' in location.lower():
            recommendations['primary_varieties'].extend(['Western White (Local variety, High yield)', 'Colombo Special (Adapted, Disease resistant)'])
        elif 'kandy' in location.lower() or 'central' in location.lower():
            recommendations['primary_varieties'].extend(['Central Highland (Local variety, Cool climate)', 'Kandy Traditional (Adapted, Aromatic)'])
    
    # Season considerations
    if season == 'yala' or 'summer' in season.lower():
        recommendations['planting_timing'] += ' - Yala season (Feb-May)'
        recommendations['water_management'] += ' - Higher irrigation needs during dry season'
        recommendations['immediate_actions'].append('Prepare for higher irrigation needs')
    elif season == 'maha' or 'winter' in season.lower():
        recommendations['planting_timing'] += ' - Maha season (Sep-Mar)'
        recommendations['water_management'] += ' - Monitor rainfall patterns'
        recommendations['immediate_actions'].append('Monitor rainfall and adjust irrigation')
    
    # Final recommendations summary
    if recommendations['risk_factors']:
        recommendations['explanation'] += f" ⚠️ Risks: {', '.join(recommendations['risk_factors'])}"
    
    recommendations['explanation'] += f" 🌱 Best varieties: {', '.join(recommendations['primary_varieties'][:2])}"
    
    return recommendations

def get_current_season(month):
    """Get current season based on month"""
    if month in [2, 3, 4, 5]:
        return 'yala'
    elif month in [9, 10, 11, 12, 1]:
        return 'maha'
    else:
        return 'transition'

def get_current_time_recommendations(month, soil_temp):
    """Get recommendations based on current time of year"""
    if month in [2, 3]:  # February-March
        if soil_temp < 22:
            return "🌱 Early Yala Season: Prepare nursery beds, wait for soil to warm up"
    else:
        return "🌱 Early Yala Season: Perfect time to start planting early varieties"
    
    if month in [4, 5]:  # April-May
        if soil_temp > 32:
            return "🌱 Late Yala Season: High temperatures - use heat-tolerant varieties"
        else:
            return "🌱 Late Yala Season: Good conditions for late Yala planting"
    
    elif month in [9, 10]:  # September-October
        if soil_temp < 20:
            return "🌱 Early Maha Season: Cool conditions - use cold-tolerant varieties"
        else:
            return "🌱 Early Maha Season: Excellent conditions for Maha season start"
    
    elif month in [11, 12, 1]:  # November-January
        if soil_temp < 18:
            return "🌱 Peak Maha Season: Cold conditions - delay planting or use cold-hardy varieties"
        else:
            return "🌱 Peak Maha Season: Good conditions for main Maha crop"
    
    else:  # June-August (transition)
        return "🌱 Transition Period: Prepare fields for next season, test soil conditions"

def get_sri_lankan_seasonal_varieties(month, soil_temp):
    """Get Sri Lankan paddy varieties best suited for current season and conditions"""
    seasonal_varieties = []
    
    if month in [2, 3, 4, 5]:  # Yala Season
        if soil_temp < 22:
            seasonal_varieties.extend([
                'BG 300 (Early Yala, Cold-tolerant)',
                'BG 352 (Early Yala, Quick maturing)',
                'AT 306 (Early Yala, High yield)'
            ])
        else:
            seasonal_varieties.extend([
                'BG 300 (Early Yala, High yielding)',
                'BG 352 (Early Yala, Disease resistant)',
                'AT 306 (Early Yala, Popular)'
            ])
    
    elif month in [9, 10, 11, 12, 1]:  # Maha Season
        if soil_temp < 20:
            seasonal_varieties.extend([
                'BG 94-1 (Maha, Cold-hardy)',
                'BG 250 (Maha, Cold-tolerant)',
                'AT 308 (Maha, Cold-resistant)'
            ])
    else:
            seasonal_varieties.extend([
                'BG 94-1 (Maha, High yielding)',
                'BG 250 (Maha, Popular variety)',
                'AT 308 (Maha, Disease resistant)'
            ])
    
    return seasonal_varieties

def set_language(request):
    """Language switcher view"""
    if request.method == 'POST':
        language = request.POST.get('language', 'en')
    elif request.method == 'GET':
        language = request.GET.get('language', 'en')
    else:
        return redirect('/')
    
    if language in [lang[0] for lang in settings.LANGUAGES]:
        # Store language preference in session
        request.session['django_language'] = language
        print(f"Language changed to: {language}")
    else:
        print(f"Invalid language: {language}")
    
    # Redirect to the previous page or home
    return redirect(request.META.get('HTTP_REFERER', '/'))

def debug_language(request):
    """Debug language settings"""
    current_lang = translation.get_language()
    session_lang = request.session.get('django_language')
    
    return JsonResponse({
        'current_language': current_lang,
        'session_language': session_lang,
        'available_languages': list(settings.LANGUAGES),
        'django_language': translation.get_language(),
        'session_data': dict(request.session)
    })

def test_weather_api(request):
    """Test weather API endpoint"""
    try:
        # Test with a sample location
        location = "Coimbatore"
        
        # Get coordinates
        geocode_url = f"https://nominatim.openstreetmap.org/search?q={location}&format=json&limit=1"
        geocode_response = requests.get(geocode_url, timeout=10)
        geocode_data = geocode_response.json()
        
        if geocode_data:
            lat = float(geocode_data[0]['lat'])
            lon = float(geocode_data[0]['lon'])
            
            # Get weather data
            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto"
            weather_response = requests.get(weather_url, timeout=10)
            weather_data = weather_response.json()
            
            return JsonResponse({
                'status': 'success',
                'location': location,
                'coordinates': {'lat': lat, 'lon': lon},
                'weather': weather_data,
                'timestamp': timezone.now().isoformat()
            })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'Location not found'
            }, status=404)
            
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)

def test_paddy_recommendations(request):
    """Test paddy recommendations"""
    try:
        soil_temp = float(request.GET.get('temp', 25))
        location = request.GET.get('location', 'Test Location')
        
        # Simple paddy recommendations
        if soil_temp < 20:
            recommendation = "Too cold for paddy cultivation"
        elif 20 <= soil_temp <= 30:
            recommendation = "Optimal temperature for paddy"
        else:
            recommendation = "Too hot for paddy cultivation"
        
        return JsonResponse({
            'status': 'success',
            'soil_temperature': soil_temp,
            'location': location,
            'recommendation': recommendation,
            'timestamp': timezone.now().isoformat()
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)

def schedule_irrigation(request):
    """Schedule irrigation for crops"""
    if request.method == 'POST':
        duration = request.POST.get('duration', '2')  # hours
        start_time = request.POST.get('start_time', '06:00')
        field_id = request.POST.get('field_id', 'all')
        
        # Simulate irrigation scheduling
        irrigation_data = {
            'scheduled': True,
            'duration': f"{duration} hours",
            'start_time': start_time,
            'field_id': field_id,
            'status': 'Scheduled',
            'message': f'Irrigation scheduled for {start_time} for {duration} hours'
        }
        
        # Store in session for demo purposes
        request.session['irrigation_scheduled'] = irrigation_data
        
        return JsonResponse({
            'success': True,
            'message': irrigation_data['message'],
            'data': irrigation_data
        })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def apply_fertilizer(request):
    """Apply fertilizer to crops"""
    if request.method == 'POST':
        fertilizer_type = request.POST.get('fertilizer_type', 'NPK')
        amount = request.POST.get('amount', '50')  # kg per hectare
        field_id = request.POST.get('field_id', 'all')
        
        # Simulate fertilizer application
        fertilizer_data = {
            'applied': True,
            'type': fertilizer_type,
            'amount': f"{amount} kg/ha",
            'field_id': field_id,
            'status': 'Applied',
            'message': f'{fertilizer_type} fertilizer applied at {amount} kg/ha'
        }
        
        # Store in session for demo purposes
        request.session['fertilizer_applied'] = fertilizer_data
        
        return JsonResponse({
            'success': True,
            'message': fertilizer_data['message'],
            'data': fertilizer_data
        })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def request_expert(request):
    """Request expert consultation"""
    if request.method == 'POST':
        issue_type = request.POST.get('issue_type', 'general')
        description = request.POST.get('description', 'Need expert advice')
        priority = request.POST.get('priority', 'medium')
        
        # Simulate expert request
        expert_data = {
            'requested': True,
            'issue_type': issue_type,
            'description': description,
            'priority': priority,
            'status': 'Requested',
            'message': f'Expert consultation requested for {issue_type} issue'
        }
        
        # Store in session for demo purposes
        request.session['expert_requested'] = expert_data
        
        return JsonResponse({
            'success': True,
            'message': expert_data['message'],
            'data': expert_data
        })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def water_crop(request):
    """Manual water crop action"""
    if request.method == 'POST':
        field_id = request.POST.get('field_id', 'all')
        duration = request.POST.get('duration', '30')  # minutes
        
        # Simulate watering
        watering_data = {
            'watered': True,
            'field_id': field_id,
            'duration': f"{duration} minutes",
            'status': 'Completed',
            'message': f'Crop watered for {duration} minutes'
        }
        
        # Store in session for demo purposes
        request.session['crop_watered'] = watering_data
        
        return JsonResponse({
            'success': True,
            'message': watering_data['message'],
            'data': watering_data
        })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def check_soil(request):
    """Check soil conditions"""
    if request.method == 'POST':
        field_id = request.POST.get('field_id', 'all')
        
        # Simulate soil check with realistic data
        soil_data = {
            'checked': True,
            'field_id': field_id,
            'temperature': round(random.uniform(20, 30), 1),
            'moisture': round(random.uniform(40, 80), 1),
            'ph': round(random.uniform(5.5, 7.5), 1),
            'nitrogen': round(random.uniform(20, 60), 1),
            'status': 'Completed',
            'message': 'Soil conditions checked successfully'
        }
        
        # Store in session for demo purposes
        request.session['soil_checked'] = soil_data
        
        return JsonResponse({
            'success': True,
            'message': soil_data['message'],
            'data': soil_data
        })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def view_report(request):
    """Generate and view crop report"""
    if request.method == 'POST':
        report_type = request.POST.get('report_type', 'comprehensive')
        date_range = request.POST.get('date_range', '7d')
        
        # Simulate report generation
        report_data = {
            'generated': True,
            'type': report_type,
            'date_range': date_range,
            'status': 'Generated',
            'message': f'{report_type.title()} report generated for {date_range}',
            'download_url': f'/download-report/{report_type}/{date_range}/'
        }
        
        # Store in session for demo purposes
        request.session['report_generated'] = report_data
        
        return JsonResponse({
            'success': True,
            'message': report_data['message'],
            'data': report_data
        })
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def get_dashboard_data(request):
    """Get real-time dashboard data"""
    # Get stored action data from session
    irrigation_data = request.session.get('irrigation_scheduled', {})
    fertilizer_data = request.session.get('fertilizer_applied', {})
    expert_data = request.session.get('expert_requested', {})
    watering_data = request.session.get('crop_watered', {})
    soil_data = request.session.get('soil_checked', {})
    report_data = request.session.get('report_generated', {})
    
    dashboard_data = {
        'irrigation_status': irrigation_data.get('status', 'Ready to Schedule'),
        'fertilizer_status': fertilizer_data.get('status', 'Ready to Apply'),
        'expert_status': expert_data.get('status', 'Expert Available'),
        'watering_status': watering_data.get('status', 'Ready'),
        'soil_status': soil_data.get('status', 'Ready to Check'),
        'report_status': report_data.get('status', 'Ready to Generate'),
        'last_actions': {
            'irrigation': irrigation_data,
            'fertilizer': fertilizer_data,
            'expert': expert_data,
            'watering': watering_data,
            'soil': soil_data,
            'report': report_data
        }
    }
    
    return JsonResponse(dashboard_data)

def dashboard_data(request):
    """Get dashboard data for AJAX requests"""
    
    # Get recent recommendations
    recent_recommendations = PaddyRecommendation.objects.all()[:5]
    
    # Get statistics
    total_recommendations = PaddyRecommendation.objects.count()
    locations_count = PaddyRecommendation.objects.values('location').distinct().count()
    
    # Get temperature distribution
    temp_stats = {
        'cold': PaddyRecommendation.objects.filter(soil_temperature__lt=20).count(),
        'optimal': PaddyRecommendation.objects.filter(soil_temperature__gte=20, soil_temperature__lte=30).count(),
        'warm': PaddyRecommendation.objects.filter(soil_temperature__gt=30, soil_temperature__lte=35).count(),
        'hot': PaddyRecommendation.objects.filter(soil_temperature__gt=35).count(),
    }
    
    dashboard_data = {
        'total_recommendations': total_recommendations,
        'locations_count': locations_count,
        'temperature_stats': temp_stats,
        'recent_recommendations': list(recent_recommendations.values('field_name', 'location', 'soil_temperature', 'timestamp')[:5])
    }
    
    return JsonResponse(dashboard_data)

def paddy_history(request):
    """Display history of all paddy recommendations"""
    
    # Get filter parameters
    location_filter = request.GET.get('location', '')
    soil_type_filter = request.GET.get('soil_type', '')
    season_filter = request.GET.get('season', '')
    date_from = request.GET.get('date_from', '')
    date_to = request.GET.get('date_to', '')
    
    # Start with all recommendations
    recommendations = PaddyRecommendation.objects.all()
    
    # Apply filters
    if location_filter:
        recommendations = recommendations.filter(location__icontains=location_filter)
    if soil_type_filter:
        recommendations = recommendations.filter(soil_type=soil_type_filter)
    if season_filter:
        recommendations = recommendations.filter(planting_season=season_filter)
    if date_from:
        recommendations = recommendations.filter(timestamp__gte=date_from)
    if date_to:
        recommendations = recommendations.filter(timestamp__lte=date_to)
    
    # Get unique values for filter dropdowns
    locations = PaddyRecommendation.objects.values_list('location', flat=True).distinct()
    soil_types = PaddyRecommendation.objects.values_list('soil_type', flat=True).distinct()
    seasons = PaddyRecommendation.objects.values_list('planting_season', flat=True).distinct()
    
    # Pagination
    from django.core.paginator import Paginator
    paginator = Paginator(recommendations, 20)  # 20 per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'total_count': recommendations.count(),
        'locations': locations,
        'soil_types': soil_types,
        'seasons': seasons,
        'filters': {
            'location': location_filter,
            'soil_type': soil_type_filter,
            'season': season_filter,
            'date_from': date_from,
            'date_to': date_to,
        }
    }
    
    return render(request, 'paddy_history.html', context)

def recommendation_details(request, rec_id):
    """Get detailed view of a specific recommendation"""
    
    try:
        rec = PaddyRecommendation.objects.get(id=rec_id)
        
        # Create detailed HTML view
        html_content = f"""
        <div class="recommendation-details">
            <div class="row">
                <div class="col-md-6">
                    <h6 class="text-primary">Input Data</h6>
                    <table class="table table-sm">
                        <tr><td><strong>Field:</strong></td><td>{rec.field_name}</td></tr>
                        <tr><td><strong>Location:</strong></td><td>{rec.location}</td></tr>
                        <tr><td><strong>Soil Temp:</strong></td><td>{rec.soil_temperature}°C</td></tr>
                        <tr><td><strong>Soil Type:</strong></td><td>{rec.soil_type.title()}</td></tr>
                        <tr><td><strong>Season:</strong></td><td>{rec.planting_season.title()}</td></tr>
                        <tr><td><strong>Date:</strong></td><td>{rec.timestamp.strftime('%Y-%m-%d %H:%M')}</td></tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6 class="text-success">Recommendations</h6>
                    <div class="mb-2">
                        <strong>Top Varieties:</strong>
                        <ul class="list-unstyled">
                            {''.join([f'<li><i class="fas fa-check text-success"></i> {var}</li>' for var in rec.primary_varieties[:3]])}
                        </ul>
                    </div>
                    <div class="mb-2">
                        <strong>Planting Timing:</strong><br>
                        <small>{rec.planting_timing}</small>
                    </div>
                </div>
            </div>
            
            <div class="row mt-3">
                <div class="col-12">
                    <h6 class="text-info">Detailed Analysis</h6>
                    <div class="alert alert-info">
                        <strong>Explanation:</strong> {rec.explanation}
                    </div>
                    
                    {f'<div class="alert alert-warning"><strong>Risk Factors:</strong><ul>{"".join([f"<li>{risk}</li>" for risk in rec.risk_factors])}</ul></div>' if rec.risk_factors else ''}
                    
                    {f'<div class="alert alert-primary"><strong>Current Time Advice:</strong><br>{rec.current_time_recommendations}</div>' if rec.current_time_recommendations else ''}
                    
                    {f'<div class="alert alert-success"><strong>Immediate Actions:</strong><ul>{"".join([f"<li>{action}</li>" for action in rec.immediate_actions])}</ul></div>' if rec.immediate_actions else ''}
                </div>
            </div>
        </div>
        """
        
        return JsonResponse({'html': html_content})
        
    except PaddyRecommendation.DoesNotExist:
        return JsonResponse({'error': 'Recommendation not found'}, status=404)

def weather_update(request):
    """API endpoint for weather updates"""
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    
    if not lat or not lon:
        return JsonResponse({'error': 'Latitude and longitude required'}, status=400)
    
    try:
        # Get current weather for the coordinates
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=auto"
        weather_response = requests.get(weather_url, timeout=10)
        
        if weather_response.status_code == 200:
            weather_data = weather_response.json()
            current = weather_data.get('current', {})
            
            return JsonResponse({
                'temperature': current.get('temperature_2m'),
                'humidity': current.get('relative_humidity_2m'),
                'precipitation': current.get('precipitation'),
                'wind_speed': current.get('wind_speed_10m'),
                'weather_code': current.get('weather_code'),
                'timestamp': current.get('time')
            })
        else:
            return JsonResponse({'error': 'Weather API error'}, status=500)
            
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def notifications(request):
    """API endpoint for notifications"""
    
    # Get recent notifications (last 5 recommendations)
    recent_recommendations = PaddyRecommendation.objects.all().order_by('-timestamp')[:5]
    
    notifications_data = []
    for rec in recent_recommendations:
        # Create notification based on conditions
        if rec.soil_temperature < 20:
            priority = 'warning'
            message = f'Cold soil temperature ({rec.soil_temperature}°C) detected in {rec.field_name}'
        elif rec.soil_temperature > 35:
            priority = 'danger'
            message = f'High soil temperature ({rec.soil_temperature}°C) detected in {rec.field_name}'
        else:
            priority = 'info'
            message = f'Optimal conditions in {rec.field_name} ({rec.soil_temperature}°C)'
        
        notifications_data.append({
            'id': rec.id,
            'priority': priority,
            'message': message,
            'timestamp': rec.timestamp.isoformat(),
            'field': rec.field_name,
            'location': rec.location
        })
    
    return JsonResponse({
        'notifications': notifications_data,
        'count': len(notifications_data)
    })
