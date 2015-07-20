'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('slack-slash:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ appName: 'slack-slash' })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      'handlers.json',
      'server.js',
      'LICENSE.md',
      'README.md',
      'package.json',
      '.jshintrc',
      'bin/www',
      'routes/index.js'
    ]);
  });
});
