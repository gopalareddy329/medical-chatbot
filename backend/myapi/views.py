from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Usersdata
from .serializers import UsersDataSerializer
import urllib.request
import json
# Create your views here.

@api_view(['GET'])
def getDetails(request):

    querrydata=Usersdata.objects.all()
    raw_data=UsersDataSerializer(querrydata,many=True)
    return Response(raw_data.data)


@api_view(['GET'])
def getResponse(request):

        question=request.GET.get("question")
        id=request.GET.get("id")
        url="https://dummyjson.com/products/"+str(id)
        
        req = urllib.request.Request(url)
        
        with urllib.request.urlopen(req) as response:
            the_page = json.loads(response.read())
            serial=UsersDataSerializer(data={"name":the_page["title"]+the_page["description"]})
            if serial.is_valid():
                serial.save()
            return Response(serial.data)

