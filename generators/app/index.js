var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var helpers = require('../../helpers');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('slack-slash') + ' app generator!'
    ));

    this.log('This generator will create a new ' + chalk.red('slack-slash') + ' app.');
    this.log('To create a new slack-slash handler instead, run ' + chalk.yellow('yo slack-slash:handler') + '.\n');

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Name your app:',
      default: 'slack-slash'
    }, {
      type: 'confirm',
      name: 'initialHandlers',
      message: 'Set up inital handlers?',
      default: false
    }, {
      type: 'input',
      name: 'handlers',
      message: 'List handlers to use (comma separated):',
      validate: helpers.stringNotEmpty,
      filter: helpers.filterHandlers,
      when: function (answers) {
        return answers.initialHandlers;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  handlersSetup: function () {
    if (this.props.handlers && this.props.handlers.length) {
      var done = this.async();
      var prompts = [];
      _.each(this.props.handlers, function (handler) {
        var commandPrompt = {
          type: 'input',
          name: handler + '_command',
          message: 'What is the /:command for ' + handler + '?',
          filter: helpers.cleanSlashCmd,
          default: handler
        };
        var tokenVarPrompt = {
          type: 'input',
          name: handler + '_token',
          message: 'Environment variable for your slack token:',
          default: helpers.pkgToTokenVar(handler)
        };
        prompts.push(commandPrompt, tokenVarPrompt);
      });

      this.prompt(prompts, function (props) {
        _.assign(this.props, props);
        done();
      }.bind(this));
    }
  },

  createHandlersObj: function () {
    var self = this;
    this.props.h = [];
    _.each(this.props.handlers, function (handler) {
      self.props.h.push({
        pkgName: handler,
        command: self.props[handler + '_command'],
        token: self.props[handler + '_token']
      });
    });
  },

  writing: {
    app: function () {
      var self = this;
      var basePath = path.join(__dirname, '..', '..');
      var ssPath = path.join(basePath, 'node_modules', 'slack-slash');
      var ssFiles = ['.gitignore', 'LICENSE.md', 'README.md', 'server.js'];

      _.each(ssFiles, function (file) {
        self.fs.copy(
          path.join(ssPath, file),
          self.destinationPath(file)
        );
      });

      this.fs.copyTpl(
        this.templatePath('www'),
        this.destinationPath('bin', '/www'),
        this.props
      );

      this.fs.copy(
        path.join(ssPath, 'routes', '*'),
        this.destinationPath('routes')
      );
    },

    templates: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_handlers.json'),
        this.destinationPath('handlers.json'),
        this.props
      );

      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    var handlersMsg = 'Be sure to set your handler token environment variables ';
    var noHandlersMsg = 'Now go add some handlers ';
    var endMsg = 'then run ' + chalk.yellow('npm start') + ' to start the app.\n';

    this.log('\nCongratulations! ' + chalk.red(this.props.appName) + ' is now installed.\n');
    this.log((this.props.initialHandlers ? handlersMsg : noHandlersMsg) + endMsg);
  }
});
