#!/usr/bin/env python

from BaseHTTPServer import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
import cgi

class HTTPHandler (SimpleHTTPRequestHandler):
  server_version = "MonServeurHTTP/0.1"

  def do_GET(self):
    if self.path.find('.jd') != -1:
      if self.path.find('?') != -1:
        self.path, self.requete = self.path.split('?', 1)
      else:
        self.requete = ''
      self.reponse()
    else:
      SimpleHTTPRequestHandler.do_GET(self)
     
  def do_POST(self):
    self.requete = self.rfile.read(int(self.headers['Content-Length']))
    self.reponse()
     
  def reponse(self):
    self.page = self.path[1:-3]
    self.args = dict(cgi.parse_qsl(self.requete))
    self.send_response(200, 'OK')
    self.send_header('Content-type', 'text/html')
    self.end_headers()
    if self.page == "index":
      self.index()
    elif self.page == "save":
      self.save()

  def index(self):
    self.wfile.write('<h2>Test</h2><form action="save.jd" method="POST">')
    self.wfile.write('<textarea name="texte" rows=10 cols=50></textarea><br>')
    self.wfile.write('<input type="submit" name="action" value="Sauvegarde"></form>')

  def save(self):
    self.wfile.write('<h2>Sauvegarde</h2>')
    self.wfile.write('%s' %self.args['texte'])
     
httpd = HTTPServer(('', 31284), HTTPHandler)
httpd.serve_forever()