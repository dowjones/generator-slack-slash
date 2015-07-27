var helpers = require('../helpers');
var assert = require('assert');

describe('Helper Functions', function () {

  describe('stringNotEmpty', function () {
    it('returns true if string is not empty', function (done) {
      assert.ok(helpers.stringNotEmpty('test'));
      done();
    });

    it('returns false if string is empty', function (done) {
      assert.strictEqual(helpers.stringNotEmpty(''), false);
      done();
    });
  });

  describe('filterHandlers', function () {
    it('returns an array of trimmed strings', function (done) {
      var inStr = 'handler-one,handler-two ,handler-three, handler-four';
      var outArr = ['handler-one', 'handler-two', 'handler-three', 'handler-four'];
      assert.deepEqual(helpers.filterHandlers(inStr), outArr);
      done();
    });
  });

  describe('cleanSlashCmd', function () {
    it('strips out a leading slash', function (done) {
      assert.strictEqual(helpers.cleanSlashCmd('/cmd'), 'cmd');
      assert.strictEqual(helpers.cleanSlashCmd('cmd'), 'cmd');
      done();
    });
  });

  describe('pkgToTokenVar', function () {
    it('converts hyphenated package name to env var with underscores', function (done) {
      var inStr = 'package-name-to-test';
      var outStr = 'package_name_to_test_token';
      assert.strictEqual(helpers.pkgToTokenVar(inStr), outStr);
      done();
    });
  });

  describe('initFirst', function () {
    it('returns a string with the first letter capitalized', function (done) {
      var inStr = 'packageName';
      var outStr = 'PackageName';
      assert.strictEqual(helpers.initFirst(inStr), outStr);
      done();
    });
  });
});
