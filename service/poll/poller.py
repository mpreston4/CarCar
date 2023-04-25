import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()
from service_rest.models import AutomobileVO
# Import models from service_rest, here.
# from service_rest.models import Something
def get_automobiles():
    url = "http://project-beta-inventory-api-1:8000/api/automobiles"
    response = requests.get(url)
    content = json.loads(response.content)
    print("hi")
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin = automobile["vin"],
            defaults = {}
        )
def poll(repeat = True):
    while True:
        print('Service poller polling for data')
        try:
            get_automobiles()
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)

        if not repeat:
            break

        time.sleep(10)


if __name__ == "__main__":
    poll()
