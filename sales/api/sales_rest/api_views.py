from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Salesperson, Customer, Sale
import json

from common.json import ModelEncoder


## We need a list, post, and delete for each model (salespeople, customer, and sales)
# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET"])
def api_automobiles(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse({"autos": automobiles}, encoder=AutomobileVOEncoder)


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse({"salespeople": salespeople}, encoder=SalespersonEncoder)
    elif request.method == "POST":
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_salespeople_delete(request, pk):
    count, _ = Salesperson.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerEncoder)
    elif request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_customers_delete(request, pk):
    count, _ = Customer.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid Vin #"}, status=400)
        try:
            employee_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Person does not exist"}, status=400)
        try:
            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})
        sale = Sale.objects.create(**content)
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_sales_delete(request, pk):
    count, _ = Sale.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})
