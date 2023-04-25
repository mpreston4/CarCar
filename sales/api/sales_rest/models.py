from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.first_name


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return self.first_name


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_automoble",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson, related_name="sales_sales_person", on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer, related_name="sales_customer", on_delete=models.CASCADE
    )
    price = models.CharField(max_length=100)

    def __str__(self):
        return self.automobile
