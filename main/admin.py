from django.contrib import admin
from .models import (
    Farm, Field, Crop, SensorData, WeatherForecast, Recommendation,
    IrrigationSchedule, FertilizerApplication, YieldRecord, PestDisease, FinancialRecord
)

@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'location', 'area_hectares', 'soil_type', 'created_at']
    list_filter = ['soil_type', 'created_at']
    search_fields = ['name', 'owner__username', 'location']
    date_hierarchy = 'created_at'

@admin.register(Field)
class FieldAdmin(admin.ModelAdmin):
    list_display = ['name', 'farm', 'area_hectares', 'field_type', 'status']
    list_filter = ['field_type', 'status', 'farm']
    search_fields = ['name', 'farm__name']

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ['name', 'variety', 'field', 'planting_date', 'expected_harvest_date', 'growth_stage', 'health_score']
    list_filter = ['growth_stage', 'planting_date', 'field__farm']
    search_fields = ['name', 'variety', 'field__name']
    date_hierarchy = 'planting_date'

@admin.register(SensorData)
class SensorDataAdmin(admin.ModelAdmin):
    list_display = ['field', 'timestamp', 'temperature', 'humidity', 'soil_moisture', 'soil_ph']
    list_filter = ['field__farm', 'timestamp']
    date_hierarchy = 'timestamp'
    readonly_fields = ['timestamp']

@admin.register(WeatherForecast)
class WeatherForecastAdmin(admin.ModelAdmin):
    list_display = ['location', 'forecast_date', 'temperature_high', 'temperature_low', 'condition', 'precipitation_probability']
    list_filter = ['location', 'forecast_date', 'condition']
    date_hierarchy = 'forecast_date'

@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ['title', 'crop', 'category', 'severity', 'priority', 'status', 'deadline']
    list_filter = ['category', 'severity', 'status', 'priority']
    search_fields = ['title', 'crop__name']
    date_hierarchy = 'created_at'

@admin.register(IrrigationSchedule)
class IrrigationScheduleAdmin(admin.ModelAdmin):
    list_display = ['field', 'scheduled_time', 'duration_minutes', 'water_amount_liters', 'status']
    list_filter = ['status', 'field__farm', 'scheduled_time']
    date_hierarchy = 'scheduled_time'

@admin.register(FertilizerApplication)
class FertilizerApplicationAdmin(admin.ModelAdmin):
    list_display = ['field', 'fertilizer_type', 'amount_kg_per_hectare', 'application_date', 'method']
    list_filter = ['fertilizer_type', 'method', 'field__farm']
    date_hierarchy = 'application_date'

@admin.register(YieldRecord)
class YieldRecordAdmin(admin.ModelAdmin):
    list_display = ['crop', 'harvest_date', 'yield_kg_per_hectare', 'quality_grade', 'total_revenue']
    list_filter = ['quality_grade', 'harvest_date', 'crop__field__farm']
    date_hierarchy = 'harvest_date'

@admin.register(PestDisease)
class PestDiseaseAdmin(admin.ModelAdmin):
    list_display = ['name', 'crop', 'type', 'severity', 'affected_area_percentage', 'detection_date', 'status']
    list_filter = ['type', 'severity', 'status', 'detection_date']
    search_fields = ['name', 'crop__name']
    date_hierarchy = 'detection_date'

@admin.register(FinancialRecord)
class FinancialRecordAdmin(admin.ModelAdmin):
    list_display = ['farm', 'date', 'category', 'subcategory', 'amount', 'description']
    list_filter = ['category', 'subcategory', 'date', 'farm']
    search_fields = ['description', 'farm__name']
    date_hierarchy = 'date'
