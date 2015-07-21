var should = require('should'),
    <%= className %> = require('../lib/<%= slashCmd %>');

describe('<%= handlerName %>', function () {
  var token = '',
      options = null,
      req = { body: {text: 'sample body text'} },
      cb = function (){},
      <%= moduleName %>;

  beforeEach(function () {
    <%= moduleName %> = new <%= className %>(token, options);
  });

  describe('handle', function () {
    it('returns message', function (done) {
      <%= moduleName %>.handle(req, function (error, response) {
        response.should.equal('Received commmand with text: sample body text');
        done();
      });
    });
  });
});