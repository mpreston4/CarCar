from django.contrib import admin
from .models import Technicians, AutomobileVO, Appointment
@admin.register(Technicians)
class AutomobileAdmin(admin.ModelAdmin):
     list_display = (
          "first_name",
          "last_name",
          "employee_id",
     )

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
     list_display = (
          "date_time",
          "reason",
          "status",
          "vin",
          "customer",
          "technician",
     )