
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from Apis.models import Tutorial,Spacs

from Apis.serializers import TutorialSerializer,SpacsSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
     if request.method == 'GET':
        tutorials = Tutorial.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            tutorials = tutorials.filter(title__icontains=title)
        
        tutorials_serializer = TutorialSerializer(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)
def spacs_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
     if request.method == 'GET':
        spacs = Spacs.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            spacs = spacs.filter(title__icontains=title)
        
        spacs_serializer = SpacsSerializer(spacs, many=True)
        return JsonResponse(spacs_serializer.data, safe=False)

def Spacs_id(request, pk):
   if request.method == 'GET': 
        spacs = Spacs.objects.get(pk=pk) 
        spacs_serializer = SpacsSerializer(spacs) 
        return JsonResponse(spacs_serializer.data) 



def tutorial_detail(request, pk):
 
   if request.method == 'GET': 
        tutorial = Tutorial.objects.get(pk=pk) 
        tutorial_serializer = TutorialSerializer(tutorial) 
        return JsonResponse(tutorial_serializer.data) 