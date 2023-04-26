from django.urls import path

from .api_views import (
    api_salespeople,
    api_salespeople_delete,
    api_customers,
    api_customers_delete,
    api_sales,
    api_sales_delete,
    api_automobiles,
)

urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path(
        "salespeople/<int:pk>/", api_salespeople_delete, name="api_salespeople_delete"
    ),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customers_delete, name="api_customers_delete"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sales_delete, name="api_sales_delete"),
    path("automobiles/", api_automobiles, name="api_automobiles"),
]
