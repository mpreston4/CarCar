from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technicians, Appointment, AutomobileVO
from django.http import JsonResponse

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
    "vin",
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
        try:
            content = json.loads(request.body)
            technicians = Technicians.objects.create(**content)
            return JsonResponse(
                technicians,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technicians.DoesNotExist:
            return JsonResponse(
                {"message": "Cannot Post Technician"},
                status=400,
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
    try:
        technician = Technicians.objects.get(id=pk)
        technician.delete()
        return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
    except Technicians.DoesNotExist:
        return JsonResponse({"message": "Does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.filter(status="created")
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
            appointments = Appointment.objects.create(**content)       
            return JsonResponse(
                appointments,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Technicians.DoesNotExist: 
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=400,
            )
       
@require_http_methods(["GET", "POST"])
def api_appointment_all(request):
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
            appointments = Appointment.objects.create(**content)       
            return JsonResponse(
                appointments,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Technicians.DoesNotExist: 
            return JsonResponse(
                {"message": "Invalid Technician"},
                status=400,
            )
       

@require_http_methods(["DELETE"]) 
def api_delete_appointment(request, pk):
    if request.method == 'DELETE':
        try:
            count, _ = Appointment.objects.get(id=pk).delete()
            return JsonResponse(
                count,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=404)


@require_http_methods(["PUT"]) 
def api_finish_appointment(request, pk):
    if request.method == 'PUT':
        try:
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
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["PUT"]) 
def api_cancel_appointment(request, pk):
    if request.method == 'PUT':
        try:
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
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response



