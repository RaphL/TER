
import string,cgi,time,re,os
from os import curdir, sep
from BaseHTTPServer import HTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
from StringIO import StringIO



class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            #formulaire=cgi.FieldStorage()
            #print "informations recues du service web [prenom=%s,nom=%s,age=%s]" % (formulaire.getlist("prenom"),formulaire.getlist("nom"),formulaire.getlist("age")) 
            #print "info : requete=%s" % (formulaire.getlist("myweb"))
            #envoi de reponse
            #message_parts = [
            #    'ye swi un serveur MyWeb'
            #    ]
            #message = '\r\n'.join(message_parts)
            #self.send_response(200)
            #self.end_headers()
            #self.wfile.write(message)
            #return
            if self.path == "/index.html":
                print "test"
            if self.path.endswith(".test"):
                
                f1 = open(curdir + sep + self.path)

                message = ""
                for line in f1:
                    message=message+line+"</br>"
                #self.send_response(200)
                #self.send_header('Content-type',    'text/html')
                #self.end_headers()
                #self.wfile.write(message)
                f1.close()

                self.path, self.query_string=self.path.split("/test/",1)
                #print curdir + sep + "test/template/"+self.query_string[0:-5]
                f2 = open(curdir + sep + "test/template/"+self.query_string[0:-5]+".myweb")

                message2 = "$template$"+"</br>"
                for line in f2:
                    message2=message2+line+"</br>"
                self.send_response(200)
                #self.send_header('Content-type',    'message')
                #self.end_headers()
                self.wfile.write(message+message2)
                f2.close()



                return


                #f = open(curdir + sep + self.path) #self.path has /test.html
#note that this potentially makes every file on your computer readable by the internet

                #self.send_response(200)
                #self.send_header('Content-type',    'text/html')
                #self.end_headers()
                #self.wfile.write(f.read())
                #f.close()
                #return

            #if self.path.endswith(".html"):
            #    f = open(curdir + sep + self.path) #self.path has /test.html
#note that this potentially makes every file on your computer readable by the internet

            #    self.send_response(200)
            #    self.send_header('Content-type',	'text/html')
            #    self.end_headers()
            #    self.wfile.write(f.read())
            #    f.close()
            #    return
            #if self.path.endswith(".esp"):   #our dynamic content
            #    self.send_response(200)
            #    self.send_header('Content-type',	'text/html')
            #    self.end_headers()
            #    self.wfile.write("hey, today is the" + str(time.localtime()[7]))
            #    self.wfile.write(" day in the year " + str(time.localtime()[0]))
            #    return
                
            return
                
        except IOError:
            self.send_error(404,'File Not Found: %s' % self.path)
     

    def do_POST(self):
        global rootnode
        try:
            ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
            if ctype == 'multipart/form-data':
                query=cgi.parse_multipart(self.rfile, pdict)
            self.send_response(301)
            
            self.end_headers()
            upfilecontent = query.get('upfile')
            print "filecontent", upfilecontent[0]
            self.wfile.write("<HTML>POST OK.<BR><BR>");
            self.wfile.write(upfilecontent[0]);
            
        except :
            pass

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

