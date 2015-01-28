from django.conf.urls import patterns, include, url
from django.contrib import admin
from forum import views

urlpatterns = patterns('',
	url(r'^forum/', include('forum.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
)