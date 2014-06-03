Components.utils.import("resource://myweb/common.js");
Components.utils.import("resource://myweb/messageCount.js");

if ("undefined" == typeof(MyWebChrome)) {
  var MyWebChrome = {};
};

MyWebChrome.BrowserOverlay = {

  sayHello : function(aEvent) {
    //window.addEventListener("load", MyWebChrome.Requete.onPageLoad, false);
    let stringBundle = document.getElementById("myweb-string-bundle");
    let messageCount;
    let message;

    Myweb.MessageCount.increment();
    messageCount = Myweb.MessageCount.count;
    message =
      stringBundle.getFormattedString(
        "myweb.greeting.label", [ messageCount ]);
    window.alert(message);
    }
};


MyWebChrome.LocalStorage = {
  
  getLocalDirectory : function() {
    
    let directoryService = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties); 
    let localDir = directoryService.get("ProfD", Ci.nsIFile); 
    localDir.append("Myweb"); 
    if (!localDir.exists() || !localDir.isDirectory())  
        localDir.create(Ci.nsIFile.DIRECTORY_TYPE, 0774); 
    return localDir; 
  },
  
  readFile: function(link) {
    
    let myFile = MyWebChrome.LocalStorage.getLocalDirectory();
    
    myFile.append(link);
    
     if (myFile.exists() == false)
        myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, 0774); 
    
    var data = ""; 
    var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream); 
    var cstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"].createInstance(Components.interfaces.nsIConverterInputStream); 
    fstream.init(myFile, -1, 0, 0); 
    cstream.init(fstream, "UTF-8", 0, 0); 
    let (str = {}) { 
        let read = 0; 
        do { 
            read = cstream.readString(0xffffffff, str); 
            data += str.value; 
        } while (read != 0); 
    } 
    cstream.close();
    return data; 
  }
};


MyWebChrome.Requete = {
  
    onPageLoad: function(aEvent) {
      var doc = aEvent.originalTarget;
      if (doc.location) {
        var url = doc.location.href;
      }
      var re = new RegExp("[a-zA-Z0-9\.\-_(http://)]+/myweb/[a-zA-Z0-9\.\-\_]+\.json");
      if (re.test(url))
      {
        window._content.document.body.hidden = true;
        
        var xhr;
        try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
        catch (e)
        {
          try {   xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
          catch (e2)
          {
            try {  xhr = new XMLHttpRequest();  }
            catch (e3) {  xhr = false;   }
          }
        }
        
      xhr.onreadystatechange  = function(){
        if(xhr.readyState  == 4)
       {
          if(xhr.status  == 200){
            var data = xhr.responseText;
            MyWebChrome.Requete.onLoadData(data,url);
          }      
        }
      }; 
        
      xhr.open( "GET", url,  true);
      xhr.send(null);
      }
    },
    
    
    onLoadData: function(data,url){
     var data2 = JSON.parse("{"+data+"}");
     var elem = url.search("myweb/");
     var nom = url.slice(elem+6);
     var nomF = nom.split('.');
     var templateLink = MyWebChrome.LocalStorage.getLocalDirectory();
      templateLink.append(nomF[1]+".template");
      
    if (templateLink.exists() == false) {
      var xhr2;
        try {  xhr2 = new ActiveXObject('Msxml2.XMLHTTP');   }
        catch (e)
        {
          try {   xhr2 = new ActiveXObject('Microsoft.XMLHTTP'); }
          catch (e2)
          {
            try {  xhr2 = new XMLHttpRequest();  }
            catch (e3) {  xhr2 = false;   }
          }
        }
        
      xhr2.onreadystatechange  = function(){
        if(xhr2.readyState  == 4)
       {
          if(xhr2.status  == 200){
            var template = xhr2.responseText;
            MyWebChrome.Requete.onLoadTemplate(template,data2,templateLink);
          }      
        }
      }; 
        
      xhr2.open( "GET", url+"&template=false",  true);
      xhr2.send(null);
      
    }else{
      var template = MyWebChrome.LocalStorage.readFile(nomF[1]+".template");
      var result = Mustache.to_html(template,data2);
       window._content.document.body.innerHTML = result;
       window._content.document.body.hidden = false;
    }
  
      
     
    },
    onLoadTemplate: function(template, data, templateLink){
      var aFile = Components.classes["@mozilla.org/file/local;1"]
                .createInstance(Components.interfaces.nsILocalFile);
        aFile.initWithFile(templateLink);
        var aStream = Components.classes['@mozilla.org/network/file-output-stream;1']
                .createInstance(Components.interfaces.nsIFileOutputStream);
        aStream.init(aFile, 0x02 | 0x08 | 0x20, 0777, null);
        aStream.write(template, template.length);
        aStream.close();
       
      var result = Mustache.to_html(template,data);
       window._content.document.body.innerHTML = result;
       window._content.document.body.hidden = false;
    }
};
window.addEventListener("DOMContentLoaded", MyWebChrome.Requete.onPageLoad,false);




