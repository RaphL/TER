#-*- coding: utf-8 -*-
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from datetime import datetime
from django.utils.encoding import smart_str


def home(request):
	text = """<h1>Bienvenue sur le site de dl de resource</h1>"""
	
	return HttpResponse(text)
	
	
def traitement(request, fichier):
	
	response = HttpResponse(mimetype = 'application/force-download')
	response['Content-Disposition'] = 'attachement; filename=%s' % smart_str(fichier)
	response['X-sendfile'] = smart_str(u"C:\\Users\\VIktor\\Documents\\GitHub\\TER\\WebServeur\\asset\\"+fichier,encoding='utf-8')
	
	return response
# Create your views here.


def ajout_template(request, fichier, template):
	if(template == false):
		response = HttpReponse(mimetype = 'application/force-download')
		response['Content-Disposition'] = 'attachement; filename=%s' % smart_str(fichier)
		response['X-sendfile'] = smart_str(u"C:\\Users\\VIktor\\Documents\\GitHub\\TER\\WebServeur\\asset\\"+fichier,encoding='utf-8')
		response['X-sendfile'] = smart_str(u"C:\\Users\\VIktor\\Documents\\GitHub\\TER\\WebServeur\\asset\\tempalte\\"+fichier[0:-4]+'.myWeb',encoding='utf-8')
		
		return response
	else:
		response['Content-Disposition'] = 'attachement; filename=%s' % smart_str(fichier)
		response['X-sendfile'] = smart_str(u"C:\\Users\\VIktor\\Documents\\GitHub\\TER\\WebServeur\\asset\\"+fichier,encoding='utf-8')
		return response