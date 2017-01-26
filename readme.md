# handlebars-demo
A demo to illustrate how to use handlebars partials in unison clientside & serverside

## Prerequisites
* Git installed on command line
* Node & NPM installed

## Install
* Checkout the project from Bitbucket.
* Run npm install to setup Cartridge & Gulp.

## Getting started
To get started type `gulp` in the command line at the project root. The default task runs in development mode, without watch tasks. The following flasg can be used:

* `--prod` - Run production tasks
* `--watch` - Watch for file changes
___

## Coding Standards

The following coding standards should be used for this project:
* Back end standards (TBC)
* [Front end standards](https://github.com/code-computerlove/frontend-guidelines)

---

## Cartridge

This project uses [Cartridge](https://github.com/cartridge/cartridge), a set of modules that makes up the Code Computerlove gulp setup.
This project was created with Cartridge cli, using version 0.1.5 of cartridge on 25/01/2017

### Modules
The following Cartridge modules are used in this project

[//]: <> (Modules start)
Module | Version | Repo
------ | ------- | -----
cartridge-images | 1.0.0 | https://github.com/cartridge/cartridge-imagescartridge-sass | 2.2.2 | https://github.com/cartridge/cartridge-sasscartridge-javascript | 1.0.0 | https://github.com/cartridge/cartridge-javascript
[//]: <> (Modules end)

### Adding modules

Additional modules can be added with the [Cartridge command line tool](https://github.com/cartridge/cartridge-cli). To use it you must install it globally using npm.

```bash
> npm i -g cartridge-cli
```
Modules can then be added to the project using npm

```bash
> npm install <<module_name>> --save-dev
```

more details can be found on the [Cartridge cli github page](https://github.com/cartridge/cartridge-cli)
