Components.utils.import("resource://myweb/common.js");
Components.utils.import("resource://myweb/messageCount.js");

/**
 * MyWebChrome namespace.
 */
if ("undefined" == typeof(MyWebChrome)) {
  var MyWebChrome = {};
};

/**
 * Controls the browser overlay for the extension.
 */
MyWebChrome.BrowserOverlay = {
  /**
   * Says 'Hello' to the user.
   */
  sayHello : function(aEvent) {
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
  /*OLD
  sayHello : function(aEvent) {
    let stringBundle = document.getElementById("myweb-string-bundle");
    let message = stringBundle.getString("myweb.greeting.label");

    window.alert(message);
  }*/
};



/*
MyWebChrome.Requete = {
    myWebCheck : function(aEvent){
    let url = "localhost:80";    
    let request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
              .createInstance(Components.interfaces.nsIXMLHttpRequest);
    request.onload = function(aEvent) {
      window.alert("Response Text: " + aEvent.target.responseText);
    };
    request.onerror = function(aEvent) {
      window.alert("Error Status: " + aEvent.target.status);
    };
    request.open("GET", url, false);//false = bloquant
    request.overrideMimeType("text/xml");//force la reponse a etre parsé en XML
    request.send(null);
    window.alert("reponse serv recue");
  }
};
*/