/*global describe, before, it */
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

var expectedFiles = [
  'index.js',
  'lib/slash-cmd.js',
  'test/slash-cmd-test.js',
  'package.json',
  'README.md',
  'gulpfile.js',
  'LICENSE',
  '.jshintrc',
  '.gitignore'
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

// Handler Test with options
describe('slack-slash:handler', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/handler'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        command: 'cmd',
        handlerDescription: 'Test handler.'
      })
      .on('end', done);
  });
  
  checkCreatedFiles();

  it('updates index.js with correct data', function () {
    assert.fileContent('index.js', 'require(\'./lib/slash-cmd\');');
  });

  it('updates lib/slash-cmd.js with correct data', function () {
    assert.fileContent([
      ['lib/slash-cmd.js', '* slash-cmd.js'],
      ['lib/slash-cmd.js', '* Test handler.'],
      ['lib/slash-cmd.js', 'module.exports = slashCmd;'],
      ['lib/slash-cmd.js', 'slashCmd.prototype.handle = function (req, cb) {']
    ]);
  });

  it('updates test/slash-cmd-test.js with correct data', function () {
    assert.fileContent([
      ['test/slash-cmd-test.js', 'SlashCmd = require(\'../lib/slash-cmd\');'],
      ['test/slash-cmd-test.js', 'describe(\'slack-slash-cmd\', function () {'],
      ['test/slash-cmd-test.js', 'slashCmd = new SlashCmd(token, options);'],
      ['test/slash-cmd-test.js', 'slashCmd.handle(req, function (error, response) {']
    ]);
  });

  it('updates README.md with correct data', function () {
    assert.fileContent([
      ['README.md', '#slack-slash-cmd'],
      ['README.md', 'Command handler for [slack-slash][ss]. Test handler.'],
      ['README.md', 'Once installed and configured you can type `/cmd` into Slack'],
      ['README.md', '![Slack Response](slack-slash-cmd-response.png)'],
      ['README.md', '3. Run `npm install slack-slash-cmd --save`'],
      ['README.md', 'In order to use slack-slash-cmd as part of [slack-slash][ss],'],
      ['README.md', /\n\s*"command"\s*:\s*"cmd",\n\s*"pkg"\s*:\s*"slack-slash-cmd",\n\s*"tokenVar"\s*:\s*"slack_slash_cmd_token",\n/],
    ]);
  });

  it('updates package.json with correct data', function () {
    assert.fileContent('package.json', '"name": "slack-slash-cmd"');
  });

});