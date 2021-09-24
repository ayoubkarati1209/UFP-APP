from django.conf.urls import url 
from Apis import views 
 
urlpatterns = [ 
    url(r'^api/spacs$', views.spacs_list),
    url(r'^api/spacs/(?P<pk>[0-9]+)$', views.Spacs_id),
    
]