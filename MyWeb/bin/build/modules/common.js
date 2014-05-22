var EXPORTED_SYMBOLS = [ "Myweb" ];

const Cc = Components.classes;
const Ci = Components.interfaces;

/**
 * Myweb namespace.
 */
if ("undefined" == typeof(Myweb)) {
  var Myweb = {};
};

/*
var urlChangeListener =
   {
       // fonction appelée à chaque changement de page ou d'onglet
       onLocationChange:function(aWebProgress, aRequest, aLocation)
       {
           if (aLocation) // on verifie qu'il y a une url indiquée
           {
               // aLocation.spec permet de récuperer l'url à charger
               var url = aLocation.spec;
               alert(url);
               // Petit test pour voir si url == "http://www.google.fr/"
               if (url == "http://www.google.fr/")
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

window.getBrowser().addProgressListener( urlChangeListener , Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
*/