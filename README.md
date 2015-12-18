# generator-slack-slash [![Build Status](https://travis-ci.org/dowjones/generator-slack-slash.svg)](https://travis-ci.org/dowjones/generator-slack-slash)

> [Yeoman](http://yeoman.io) generator for [slack-slash](https://github.com/dowjones/slack-slash) app and handler plugins.


## Getting Started

If you're not familiar with Yeoman, you should [start here](http://yeoman.io/).

### Install yeoman

```
npm install -g yo
```

### Install the generator

```
npm install -g generator-slack-slash
```

## Generating a slack-slash app

###Initiate the app generator:

```
yo slack-slash
```

###Follow the steps

```
? Name your app:
```

Tell Yeoman what to call your app.

```
? Set up initial handlers?
```

Already know what handlers you want to include?

###Optional steps for adding initial handlers:

```
? List handlers to use (comma separated):
```

Comma-separated list of handler modules

```
? What is the /:command for [handler]?
```

Command used to invoke the handler from Slack (excluding '/')

```
? Environment variable for your slack token:
```

Environment variable name for the handler token

## Generating a slack-slash handler

###Initiate the handler generator:

```
yo slack-slash:handler
```

###Follow the steps

```
? What's the slash command for your handler? (/:command)
```

Command used to invoke the handler from Slack (excluding '/')


```
? Whats the name of your handler?
```

Module name. Defaults to slack-slash-[command].

```
? Give a short description for your handler:
```

Description will be used in the generated `README.md` file.

## License

[MIT](LICENSE)
