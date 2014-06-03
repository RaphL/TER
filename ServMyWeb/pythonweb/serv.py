import string,cgi,time,re,os
from os import curdir, sep
from BaseHTTPServer import HTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
from StringIO import StringIO


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if re.search('/myweb/[a-zA-Z0-9\.\-\_]+\.json\&template=false', self.path) != None:
                print "template"+self.path
                vide, route=self.path.split('/',1)
                myweb, nom=route.split('/',1)
                nomf, exttemp=nom.split('.',1)
                ext, temp=exttemp.split('&',1)
                print "nomf :"+nomf+ "\next :"+ext
                print "nom :"+nom +"\nmyweb :"+myweb
                print "vide :"+vide+"\nexttemp :"+exttemp
                chemin=curdir + sep + ext +"/template"+ sep + nomf + ".template"
                print "chemin :"+chemin
                f1 = open(chemin)
                message = ""
                for line in f1:
                    message=message+line
                self.send_response(200)
                self.send_header('Content-type',    'text/html')
                self.end_headers()
                self.wfile.write(message)
                f1.close()
                return
            if re.search('/myweb/[a-zA-Z0-9\.\-\_]+\.json', self.path) != None:
                print "data"+self.path
                vide, route=self.path.split('/',1)
                myweb, nom=route.split('/',1)
                nomf, ext=nom.split('.',1)
                f1 = open(curdir + sep + "json/" + nomf + "."+ ext)
                message = ""
                for line in f1:
                    message=message+line
                self.send_response(200)
                self.send_header('Content-type',    'text/html')
                self.end_headers()
                self.wfile.write(message)
                f1.close()
                return
        except IOError:
            self.send_error(404,'File Not Found: %s' % self.path)

def main():
    try:
        server = HTTPServer(('', 80), MyHandler)
        print 'started httpserver...'
        server.serve_forever()
    except KeyboardInterrupt:
        print '^C received, shutting down server'
        server.socket.close()

if __name__ == '__main__':
    main()
