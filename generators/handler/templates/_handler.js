/**
 * <%= slashCmd %>.js
 * <%= handlerDescription %>
 */

module.exports = <%= moduleName %>;

function <%= moduleName %> (token, options) {
  this.token = token;
  this.options = options;
}

/**
 * Main Handle Function
 * @param {Object} req   Request object that contains the Slack post body inside req.body
 * @param {Function} cb  Callback - called with an error (which can be null) and your formatted message
 */

<%= moduleName %>.prototype.handle = function (req, cb) {
  var bodyText = req.body.text;  
  cb(null, 'Received commmand with text: ' + bodyText);
};