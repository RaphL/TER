import string,cgi,time,re,os
from os import curdir, sep
from BaseHTTPServer import HTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
from StringIO import StringIO


class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            if self.path.find('&template=false') != -1:
                #print curdir + sep + "test/template/"+self.query_string[0:-5]
                vide, path=self.path.split('/',1)
                nom, rq=path.split('&',1)
                nomf, ext=nom.split('.',1)
                #print "nomf :"+nomf+ "\next :"+ext
                #print "nom :"+nom +"\nrq :"+rq
                #print "vide :"+vide+"\npath :"+path
                chemin=curdir + sep + ext +"/template"+ sep + nomf + ".myweb"
                print "chemin :"+chemin
                f1 = open(chemin)#need securite
                message = ""
                for line in f1:
                    message=message+line+"</br>"
                self.send_response(200)
                self.send_header('Content-type',    'text/html')
                self.end_headers()
                self.wfile.write(message)
                f1.close()
                return
            if self.path.endswith(".test"):
                vide, nom=self.path.split('/',1)
                nomf, ext=nom.split('.',1)
                print "nomf :"+nomf
                print "ext :"+ext
                f1 = open(curdir + sep + "test/" + nomf + "."+ ext)#need securite
                message = "<body>"
                for line in f1:
                    message=message+line+"</br>"
                message=message +"</body>"
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
