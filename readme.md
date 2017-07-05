# Isomorphic handlebars demo
A demo to illustrate how to use handlebars partials in unison client side & server side. Avoiding writing any HTML in your JavaScript file.

## Prerequisites
* [Node.js](https://nodejs.org)
* [Gulp](http://gulpjs.com)

## Install
* clone the project files.
* Run `npm install` to setup.

## Introduction

This is a tutorial on creating a handlebars templated setup where the same template is used on the server side as the client side.

Often when using a templating engine there is duplication of code. Server side code for non javascript browsers. and client side to handle requests through javascript and ajax.

This tutorial will guide you through a common scenario of filtering search results using handlebars templates.  The outcome will be an ajax filtering system that works server side avoiding writing any HTML in your JavaScript file.

The tutorial uses Node.js for the server application taking advantage of express for ease of setup.  You may choose any other server setup.  The setup here is purely for demonstration purposes. This tutorial will not cover [Node.js server setup, you can learn more about that here](https://nodejs.org).

___

## Getting started

Once you have downloaded the files and run the initial `npm install` command you should have all the files necessary to complete this tutorial.

### Finding your way around.

* All the HTML files are constructed from handlebars templates (`.hbs`) and live in the `views` folder.

* Constructed HTML files are published into the root of the `public` folder.

* All website assets are created and live in the `public` folder.

* Running `gulp` in the terminal window will generate an HTML index in the root of the `public` folder.

* Running `npm start` will start your local server on port `3001`
