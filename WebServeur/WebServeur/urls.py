from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('Envoi.views',
	url(r'^accueil/$','home'),
	url(r'^accueil/(?P<fichier>\w+\.\w+)/$','traitement'),
	url(r'^accueil/(?P<fichier>\w+\.\w+)\$(?P<template>)\w+', 'ajout_template'),
    # Examples:
    # url(r'^$', 'WebServeur.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
	url(r'^Envoi/',include('Envoi.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
