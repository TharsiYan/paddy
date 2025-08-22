from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Farm(models.Model):
    """Farm model to represent agricultural properties"""
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=500)
    area_hectares = models.DecimalField(max_digits=10, decimal_places=2)
    soil_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - {self.owner.username}"

class Field(models.Model):
    """Individual field within a farm"""
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='fields')
    name = models.CharField(max_length=100)
    area_hectares = models.DecimalField(max_digits=8, decimal_places=2)
    field_type = models.CharField(max_length=50, choices=[
        ('paddy', 'Paddy'),
        ('vegetables', 'Vegetables'),
        ('fruits', 'Fruits'),
        ('pulses', 'Pulses'),
        ('other', 'Other')
    ])
    status = models.CharField(max_length=20, choices=[
        ('active', 'Active'),
        ('fallow', 'Fallow'),
        ('maintenance', 'Maintenance')
    ])
    
    def __str__(self):
        return f"{self.name} ({self.farm.name})"

class Crop(models.Model):
    """Crop information and management"""
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='crops')
    name = models.CharField(max_length=100)
    variety = models.CharField(max_length=100)
    planting_date = models.DateField()
    expected_harvest_date = models.DateField()
    growth_stage = models.CharField(max_length=50, choices=[
        ('germination', 'Germination'),
        ('vegetative', 'Vegetative'),
        ('flowering', 'Flowering'),
        ('maturity', 'Maturity'),
        ('harvest', 'Harvest')
    ])
    health_score = models.IntegerField(default=100)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.variety} ({self.field.name})"
    
    @property
    def days_to_harvest(self):
        """Calculate days remaining until harvest"""
        if self.expected_harvest_date:
            delta = self.expected_harvest_date - timezone.now().date()
            return max(0, delta.days)
        return 0

class SensorData(models.Model):
    """Environmental sensor readings"""
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='sensor_data')
    timestamp = models.DateTimeField(auto_now_add=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    humidity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    soil_moisture = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    soil_ph = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    light_intensity = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    rainfall = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.field.name} - {self.timestamp}"

class WeatherForecast(models.Model):
    """Weather forecast data"""
    location = models.CharField(max_length=200)
    forecast_date = models.DateField()
    temperature_high = models.DecimalField(max_digits=4, decimal_places=1)
    temperature_low = models.DecimalField(max_digits=4, decimal_places=1)
    humidity = models.IntegerField()
    wind_speed = models.DecimalField(max_digits=4, decimal_places=1)
    precipitation_probability = models.IntegerField()
    condition = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['forecast_date']
    
    def __str__(self):
        return f"{self.location} - {self.forecast_date}"

class Recommendation(models.Model):
    """AI-powered farming recommendations"""
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='recommendations')
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=[
        ('irrigation', 'Irrigation'),
        ('fertilizer', 'Fertilizer'),
        ('pest_control', 'Pest Control'),
        ('disease_management', 'Disease Management'),
        ('harvest_timing', 'Harvest Timing'),
        ('soil_health', 'Soil Health')
    ])
    severity = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical')
    ])
    priority = models.IntegerField(default=1)
    estimated_impact = models.TextField()
    suggested_actions = models.JSONField(default=list)
    deadline = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('snoozed', 'Snoozed')
    ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['priority', 'deadline']
    
    def __str__(self):
        return f"{self.title} - {self.crop.name}"

class IrrigationSchedule(models.Model):
    """Irrigation scheduling and management"""
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='irrigation_schedules')
    scheduled_time = models.DateTimeField()
    duration_minutes = models.IntegerField()
    water_amount_liters = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=[
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], default='scheduled')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.field.name} - {self.scheduled_time}"

class FertilizerApplication(models.Model):
    """Fertilizer application tracking"""
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name='fertilizer_applications')
    fertilizer_type = models.CharField(max_length=100)
    amount_kg_per_hectare = models.DecimalField(max_digits=6, decimal_places=2)
    application_date = models.DateField()
    method = models.CharField(max_length=50, choices=[
        ('broadcast', 'Broadcast'),
        ('band', 'Band'),
        ('foliar', 'Foliar'),
        ('drip', 'Drip Irrigation')
    ])
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.field.name} - {self.fertilizer_type} ({self.application_date})"

class YieldRecord(models.Model):
    """Crop yield records"""
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='yield_records')
    harvest_date = models.DateField()
    yield_kg_per_hectare = models.DecimalField(max_digits=8, decimal_places=2)
    quality_grade = models.CharField(max_length=10, choices=[
        ('A', 'Grade A'),
        ('B', 'Grade B'),
        ('C', 'Grade C'),
        ('D', 'Grade D')
    ])
    market_price_per_kg = models.DecimalField(max_digits=6, decimal_places=2)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.crop.name} - {self.harvest_date} ({self.yield_kg_per_hectare} kg/ha)"

class PestDisease(models.Model):
    """Pest and disease monitoring"""
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='pest_diseases')
    type = models.CharField(max_length=50, choices=[
        ('pest', 'Pest'),
        ('disease', 'Disease'),
        ('weed', 'Weed')
    ])
    name = models.CharField(max_length=200)
    severity = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('severe', 'Severe')
    ])
    affected_area_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    detection_date = models.DateField()
    treatment_applied = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[
        ('active', 'Active'),
        ('under_control', 'Under Control'),
        ('resolved', 'Resolved')
    ], default='active')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.crop.name} ({self.severity})"

class FinancialRecord(models.Model):
    """Financial tracking for farming operations"""
    farm = models.ForeignKey(Farm, on_delete=models.CASCADE, related_name='financial_records')
    date = models.DateField()
    category = models.CharField(max_length=50, choices=[
        ('income', 'Income'),
        ('expense', 'Expense')
    ])
    subcategory = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    payment_method = models.CharField(max_length=50, blank=True)
    reference_number = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.category} - {self.subcategory} ({self.amount}) - {self.date}"

class WeatherHistory(models.Model):
    """Store weather search history"""
    location = models.CharField(max_length=200)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    temperature = models.FloatField(null=True, blank=True)
    humidity = models.IntegerField(null=True, blank=True)
    rainfall = models.FloatField(null=True, blank=True)
    wind_speed = models.FloatField(null=True, blank=True)
    condition = models.CharField(max_length=100, null=True, blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = "Weather History"
    
    def __str__(self):
        return f"{self.location} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

class PaddyRecommendation(models.Model):
    """Store paddy farming recommendations and inputs"""
    # User Input Data
    location = models.CharField(max_length=200, help_text="Farm location")
    field_name = models.CharField(max_length=100, help_text="Field identifier")
    soil_temperature = models.FloatField(help_text="Soil temperature in Celsius")
    soil_type = models.CharField(max_length=50, choices=[
        ('clay', 'Clay (Good water retention)'),
        ('sandy', 'Sandy (Well drained)'),
        ('loamy', 'Loamy (Ideal balance)'),
        ('silt', 'Silt (Fine texture)'),
        ('other', 'Other')
    ])
    planting_season = models.CharField(max_length=50, choices=[
        ('yala', 'Yala (Feb-May)'),
        ('maha', 'Maha (Sep-Mar)'),
        ('current', 'Current Season'),
        ('other', 'Other')
    ])
    
    # Generated Recommendations
    primary_varieties = models.JSONField(help_text="Primary paddy varieties recommended")
    secondary_varieties = models.JSONField(help_text="Secondary paddy varieties")
    planting_timing = models.TextField(help_text="Planting timing recommendations")
    soil_preparation = models.TextField(help_text="Soil preparation advice")
    water_management = models.TextField(help_text="Water management tips")
    fertilizer_tips = models.TextField(help_text="Fertilizer recommendations")
    risk_factors = models.JSONField(help_text="Risk factors identified")
    optimal_conditions = models.JSONField(help_text="Optimal growing conditions")
    current_time_recommendations = models.TextField(help_text="Current time-based advice")
    seasonal_varieties = models.JSONField(help_text="Season-specific varieties")
    immediate_actions = models.JSONField(help_text="Immediate actions required")
    explanation = models.TextField(help_text="Overall explanation and summary")
    
    # Metadata
    timestamp = models.DateTimeField(default=timezone.now, help_text="When recommendation was generated")
    success = models.BooleanField(default=True, help_text="Whether recommendation was successful")
    notes = models.TextField(blank=True, help_text="Additional notes or feedback")
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = "Paddy Recommendations"
        indexes = [
            models.Index(fields=['location', 'timestamp']),
            models.Index(fields=['soil_temperature', 'timestamp']),
            models.Index(fields=['soil_type', 'timestamp']),
            models.Index(fields=['planting_season', 'timestamp']),
        ]
    
    def __str__(self):
        return f"{self.field_name} - {self.location} ({self.timestamp.strftime('%Y-%m-%d %H:%M')})"
    
    def get_temperature_category(self):
        """Get temperature category for analysis"""
        if self.soil_temperature < 20:
            return 'cold'
        elif 20 <= self.soil_temperature <= 30:
            return 'optimal'
        elif 30 < self.soil_temperature <= 35:
            return 'warm'
        else:
            return 'hot'
    
    def get_season_period(self):
        """Get season period for analysis"""
        month = self.timestamp.month
        if month in [2, 3, 4, 5]:
            return 'yala'
        elif month in [9, 10, 11, 12, 1]:
            return 'maha'
        else:
            return 'transition'
