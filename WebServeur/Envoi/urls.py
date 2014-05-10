from django.conf.urls import patterns, url


urlpatterns = patterns('Envoi.views',
	url(r'^accueil/$', 'home'),
)