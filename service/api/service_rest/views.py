from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technicians
from django.http import JsonResponse

class TechnicianEncoder(ModelEncoder):
    model = Technicians
    properties = [
        "first_name", 
        "last_name",
        "employee_id",
    ]

@require_http_methods(["GET", "POST", "DELETE",])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technicians.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            