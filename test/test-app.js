/*global describe, before, it */

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var expectedFiles = [
  '.npmignore',
  'handlers.json',
  'server.js',
  'LICENSE.md',
  'README.md',
  'package.json',
  '.jshintrc',
  'bin/www',
  'routes/index.js'
];

// Test Utility Functions
function checkCreatedFiles() {
  expectedFiles.forEach(function (file) {
    var testName = 'creates ' + file;
    it(testName, function () {
      assert.file(file);
    });
  });
}

// Base Test, no options
describe('slack-slash:app base', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true
      })
      .on('end', done);
  });

  checkCreatedFiles();

  it('updates package.json with correct data', function () {
    assert.fileContent('package.json', '"name": "slack-slash"');
  });
});

// Test with options
describe('slack-slash:app options', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true
      })
      .withPrompts({
        appName: 'slack-slash-test',
        initialHandlers: true,
        handlers: ['handler-one', 'handler-two'],
        'handler-one_command': 'h1',
        'handler-one_token': 'h1Token',
        'handler-two_command': 'h2',
        'handler-two_token': 'h2Token'
      })
      .on('end', done);
  });

  checkCreatedFiles();

  it('updates package.json with correct data', function () {
    assert.fileContent('package.json', '"name": "slack-slash-test"');
  });

  it('updates bin/www with correct data', function () {
    assert.fileContent('bin/www', 'var debug = require(\'debug\')(\'slack-slash-test\');');
  });

  it('updates handlers.json with correct data', function () {
    assert.fileContent('handlers.json', /\s*{\n\s*"command"\s*:\s*"h1",\n\s*"pkg"\s*:\s*"handler-one",\n\s*"tokenVar"\s*:\s*"h1Token"\n\s*},/);
    assert.fileContent('handlers.json', /\s*{\n\s*"command"\s*:\s*"h2",\n\s*"pkg"\s*:\s*"handler-two",\n\s*"tokenVar"\s*:\s*"h2Token"\n\s*}/);
  });
});
