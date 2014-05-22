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

// Wait for the browser window to finish loading before adding event listeners
//window.addEventListener("load", MyWebChrome.Requete.init, false);
MyWebChrome.Requete = {
  onLocationChange:function(aWebProgress, aRequest, aLocation){
    if (aLocation) // on verifie qu'il y a une url indiquée
    {
      // aLocation.spec permet de récuperer l'url à charger
      var url = aLocation.spec;
      alert(url);
      // Petit test pour voir si url == "http://www.google.fr/"
      if (url == "https://www.google.fr/")
      {
        // Si le test est vrai, alors on change la valeur "location"
        // du navigateur ce qui correspond a une redirection en interne
        window._content.document.location = "http://xulfr.org";
      }
    }
  },
  // on définit les autres fonctions de l'interface, même si on n'y fait rien
       // sinon cela provoque des erreurs javascript
  onProgressChange  :function ( webProgress, request, curSelfProgress,
                                maxSelfProgress, curTotalProgress, maxTotalProgress ){ },
  onSecurityChange: function ( webProgress, request, state ){ },
  onStateChange: function ( webProgress, request, stateFlags, status){ },
  onStatusChange: function( webProgress,request , status, message ){ },
  QueryInterface : function (iid) {
    if(!iid.equals(Components.interfaces.nsISupports) &&
      !iid.equals(Components.interfaces.nsIWebProgressListener))
      throw Components.results.NS_ERROR_NO_INTERFACE;
        return this;
  }
};
window.getBrowser().addProgressListener( MyWebChrome.Requete , Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
