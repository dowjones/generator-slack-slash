'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var helpers = require('../../helpers');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('slack-slash') + ' handler generator!'
    ));

    this.log('This generator will create a new ' + chalk.red('slack-slash') + ' handler.');
    this.log('To create a new slack-slash app instead, run ' + chalk.yellow('yo slack-slash') + '.\n');

    var prompts = [{
      type: 'input',
      name: 'command',
      message: 'What\'s the slash command for your handler? (/:command)',
      validate: helpers.emptyStrCheck,
      filter: helpers.cleanSlashCmd
    },
    {
      type: 'input',
      name: 'handlerName',
      message: 'What\s the name of your handler?',
      default: function (answers) { return 'slack-slash-' + answers.command; }
    },
    {
      type: 'input',
      name: 'handlerDescription',
      message: 'Give a short description for your handler:'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  modifyProps: function () {
    this.props.slashCmd = 'slash-' + this.props.command;
    this.props.moduleName = 'slash' + helpers.initFirst(this.props.command);
    this.props.className = 'Slash' + helpers.initFirst(this.props.command);
    this.props.handlerTokenName = helpers.pkgToTokenVar(this.props.handlerName);
  },

  paths: function () {
    // Save handler into directory with handler name
    this.destinationRoot(this.props.handlerName + '/');
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_index.js'),
        this.destinationPath('index.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_handler.js'),
        this.destinationPath('lib/' + this.props.slashCmd + '.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_handler-test.js'),
        this.destinationPath('test/' + this.props.slashCmd + '-test.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_README'),
        this.destinationPath('README.md'),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );

      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );

      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    this.log('\nCongratulations! ' + chalk.red(this.props.handlerName) + ' is now ready.\n');
  }
});
