'use strict';
/* Helper Functions */

var helpers = {
  emptyStrCheck:  function (str) { return str.trim() !== ''; },
  filterHandlers: function (str) { return str.split(',').map(function (str) { return str.trim(); }); },
  cleanSlashCmd: function (str) { return str.charAt(0) === '/' ? str.slice(1, str.length) : str; },
  pkgToTokenVar: function (str) { return str.replace(/-/g, '_') + '_token'; },
  initFirst: function (str) { return str.charAt(0).toUpperCase() + str.slice(1, str.length); }
};

module.exports = helpers;