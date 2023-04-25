from django.urls import path
from .views import api_technicians, api_delete_techinicians, api_appointment, api_modify_appointment

urlpatterns = [
    path("technicians/", api_technicians, name="technicians_list"),
    path("technicians/<int:pk>/", api_delete_techinicians, name="technician"),
    path("appointments/", api_appointment, name="appointments"),
    path("appointments/<int:pk>/cancel", api_modify_appointment, name="appointment_cancel"),
    path("appointments/<int:pk>/finish", api_modify_appointment, name="appointment_finsh"),
    path("appointments/<int:pk>/", api_modify_appointment, name="appointment_delete"),
]