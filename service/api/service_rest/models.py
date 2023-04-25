from django.db import models

# Create your models here.
class Technicians (models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.first_name
    
class AutomobileVO (models.Model):
    vin = models.CharField(max_length=17, unique=True)
    
    def __str__(self):
        return self.vin

class Appointment (models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=200)
    vin = models.ForeignKey(
        AutomobileVO,
        related_name= "appointment_vin",
        on_delete=models.CASCADE,
    )
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technicians,
        related_name="appointment_technician",
        on_delete=models.CASCADE,        
    )