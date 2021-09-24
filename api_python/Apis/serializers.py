from rest_framework import serializers 
from Apis.models import Tutorial,Spacs
 
 
class TutorialSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Tutorial
        fields = ('id',
                  'title',
                  'description',
                  'published')
class SpacsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Spacs
        fields = ('id',
                  'name',
                  'cik',
                  'id_sponsor',
                  'is_hot_list'
                  )