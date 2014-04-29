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
