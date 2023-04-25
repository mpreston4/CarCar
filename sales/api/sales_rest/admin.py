from django.contrib import admin
from .models import Sale, AutomobileVO

# Register your models here.


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass
