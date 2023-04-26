from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technicians, Appointment, AutomobileVO
from django.http import JsonResponse

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
    "vin",
    "sold",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technicians
    properties = [
        "id",
        "first_name", 
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date",
        "time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technicians.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        technicians = Technicians.objects.create(**content)
        return JsonResponse(
            technicians,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods("GET")
def api_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )
@require_http_methods(["DELETE"])
def api_delete_techinicians(request, pk):
    if request.method == "DELETE":
        count, _ = Technicians.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def api_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician_name = content["technician"]
            technician = Technicians.objects.get(first_name=technician_name)
            content["technician"] = technician
        except Technicians.DoesNotExist: 
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=400,
            )
        appointments = Appointment.objects.create(**content)       
        return JsonResponse(
            appointments,
            encoder=AppointmentEncoder,
            safe=False,
        )
@require_http_methods(["DELETE", "PUT"]) 
def api_modify_appointment(request, pk):
    if request.method == 'DELETE':
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse ({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = Technicians.objects.filter(id=content["technician"])
                content["technician"] = technician
        except Technicians.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )
        appointment = Appointment.objects.get(id=pk)
        Appointment.objects.filter(id=pk).update(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
@require_http_methods(["PUT"]) 
def api_finish_appointment(request, pk):
    if request.method == 'PUT':
        content = json.loads(request.body)
        if "status" in content:
            status = "finish"
            content["status"] = status
        appointment = Appointment.objects.get(id=pk)
        Appointment.objects.filter(id=pk).update(**content)
        return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
        )

@require_http_methods(["PUT"]) 
def api_delete_appointment(request, pk):
    if request.method == 'PUT':
        content = json.loads(request.body)
        if "status" in content:
            status = "canceled"
            content["status"] = status
        appointment = Appointment.objects.get(id=pk)
        Appointment.objects.filter(id=pk).update(**content)
        return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
        )


