var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://myweb/common.js");

/**
 * A very simple counter.
 */
Myweb.MessageCount = {

  /* Current message count.  */
  _count : 0,

  /**
   * Returns the current message count.
   * @return the current message count.
   */
  get count() { return this._count; },

  /**
   * Increments the message count by one.
   */
  increment : function() {
    this._count++;
  }
};

/*
Myweb.init = {
  init:function(){
    alert("init");
  }
}
window.addEventListener("load", Myweb.init, false);
*/
/*
MyWeb.init = function(){
  alert("init");
  //gBrowser.addEventListener("DOMContentLoaded", MyWeb.onPageLoad, false);
};
*/
/*
MyWeb.onPageLoad = function(event)
{
  // Get the document that loaded
  var doc = event.originalTarget;

  // Ignore frames that load
  if (doc.defaultView != doc.defaultView.parent)
    return;

  // Ignore if this isn't the active tab
  var browser = gBrowser.getBrowserForDocument(doc);
  if (browser != gBrowser.selectedBrowser)
    return;

  alert("Page loaded in current tab: " + doc.defaultView.location.href);
};

// Wait for the browser window to finish loading before adding event listeners
window.addEventListener("load", MyWeb.init, false);
*/