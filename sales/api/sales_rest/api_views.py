from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Salesperson, Customer, Sale
import json

from .encoders import (
    AutomobileVOEncoder,
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


@require_http_methods(["GET"])
def api_automobiles(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse({"autos": automobiles}, encoder=AutomobileVOEncoder)


@require_http_methods("PUT")
def api_automobiles_update(request, vin):
    content = json.loads(request.body)
    AutomobileVO.objects.filter(vin=vin).update(**content)
    automobile = AutomobileVO.objects.get(vin=vin)
    return JsonResponse(automobile, encoder=AutomobileVOEncoder, safe=False)


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
    try:
        salesperson = Salesperson.objects.get(id=pk)
        salesperson.delete()
        return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
    except Salesperson.DoesNotExist:
        return JsonResponse({"Message": "This object does not exist"}, status=404)


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
    try:
        customer = Customer.objects.get(id=pk)
        customer.delete()
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    except Customer.DoesNotExist:
        return JsonResponse({"Message": "This object does not exist"}, status=404)


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
            return JsonResponse({"message": "Invalid Vin #"}, status=404)
        try:
            employee_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=employee_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Person does not exist"}, status=404)
        try:
            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"}, status=404)
        sale = Sale.objects.create(**content)
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_sales_delete(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
        sale.delete()
        return JsonResponse(sale, encoder=SaleEncoder, safe=False)
    except Sale.DoesNotExist:
        return JsonResponse({"Message": "This object does not exist"}, status=404)
