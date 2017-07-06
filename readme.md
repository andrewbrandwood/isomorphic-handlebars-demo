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

* Running `gulp` in the terminal window will generate an HTML index in the root of the `public` folder. Here we're using the [gulp-handlebars](https://www.npmjs.com/package/gulp-handlebars) package to compile our templates.

* Running `npm start` will start your local server on port `3001`

___

## Let's begin

If you haven't already, run `gulp` and `npm start` to get the initial website built.

Open `http://localhost:3001` to view the website.

You'll see a results page showing all coloured pencils. A filter bar at the top works by choosing an option and pressing the filter results button.

You'll notice this is currently all done with a page refresh.  

The functionality currently is done server side by hitting an API to return results.

### understanding the results

To understand where the results come from and the format they are presented in you can hit the url following urls

 * All results - [http://localhost:3001/search/](http://localhost:3001/search/)

 by adding a `color` query string parameter you can get specific colours

 * [http://localhost:3001/search/?color=red](http://localhost:3001/search/?color=red)  [green, blue]

We will use these urls to make our ajax requests.

 ### Compiling handlebars templates
 On the server side our Node.js setup handles all the template generation, however in order to get things isomorphic we will need to compile our templates for the client side.

 To do this we are going to use [Gulp](http://gulpjs.com) to generate the templates we require on the client side.  We will be using the  [gulp-handlebars](https://www.npmjs.com/package/gulp-handlebars) package to compile the templates we need.

 Take a look at the `gulpfile.js` in the root.  Here you will see a pre-configured solution to compiling the templates.  However there is a crucial part missing.

 ```js
 gulp.task('compile-handlebars', function() {
 	//reference to partials and templates.
 	var templatesArr = [];
 	gulp.src(templatesArr)
 		.pipe(handlebars({handlebars: require('handlebars')}))
 		.pipe(wrap('Handlebars.template(<%= contents %>)'))
 		.pipe(declare({
 			namespace: 'Demo.templates',
 			noRedeclare: true // Avoid duplicate declarations
 		})).pipe(concat('templates.js'))
 		.pipe(gulp.dest('public/templates'));
 });

 ```

 Notice the `templatesArr` is empty.  This is where we are going to build up out references to our partials.

 Take a look at the `index.hbs` file in the `views` folder. This is the core layout page that will be the basis for the HTML output.

 ```HTML
 {{> header}}
 <h1 class="page-title">Demo for using handlebars clientside and serverside in unison</h1>
 <article class="search-results">
   {{> filters/filters }}
   <div data-item-list>
     {{> item-listing/item-list }}
   </div>
 </article>
 {{> footer JS=true  }}
 ```
 We are going to be concentrating on the bits that have data attached to them. In this case we need to open the `item-listing/item-list` from the `views/_partials` folder.

 If we open it up we can see a loop


 ```HTML
 <div class="item-list">
   {{#each contentData}}
     {{> item-listing/item-listing this linkText="Buy now" }}
   {{/each}}
 </div>
 ```
 the `contentData` passed into the loop is our data from the api.  This is handled by the Node.js application and is pushed won into the view model. Note the `linkText` attribute.

 We are going to take advantage of this in our client side JavaScript.

 Let's now take a look at the content put out in the loop.  Open up `item-listing/item-listing` from the `views/_partials` folder

in here we will look at the data  and match it up to our json output from the search.

```HTML
<div class="item-listing">
  <figure class="item-listing__figure">
    <img class="item-listing__image" src="{{imageUrl}}" alt=" " />
    <figcaption>{{{imageDescription}}}</figcaption>
  </figure>
  <div class="item-listing__description">
    <h2 class="item-listing__title">{{{title}}}</h2>
    {{{description}}}
    {{> button/button buttonText=linkText }}
  </div>
</div>
```

This is pretty straight forward, but there is one thing to note here.  We have a partial within a partial.  

```
{{> button/button buttonText=linkText }}
```
We are passing down data that has been passed down from a parent partial.  This is here to demonstrate how partials within partials along with dynamic data can be included in an isomorphic solution.

## The client side

Let's get our data first of all through ajax.  Open the file `public/js/main.js`.

We're going to create a function for all of our event listeners.

```js
(function(window, undefined) {
	'use strict';

	function addEventListeners(){
			document.addEventListener('click', getData);
		}

	function init() {
		addEventListeners();
	}

	init();

})(window);
```

put this in `main.js` above the `init` function and call it in the init.  We are using [Event Delegation](https://davidwalsh.name/event-delegate) here so we are attaching the click event to the body.

Next we will handle that event and retrieve the data using the getData function.

```js

function isCorrectButton(e, button){
  return Object.getOwnPropertyDescriptor(e.target.dataset, button) === undefined ? false : true;
}


function getData(e){
		if (!isCorrectButton(e, 'demoButton')) return;

		const filter = e.target.value;

		const request = new XMLHttpRequest();
		request.open('GET', `/search/?color=${filter}`, true);

		request.onload = () => {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    const data = JSON.parse(request.responseText);
				addPartial(data);
		  } else {
		    // We reached our target server, but it returned an error
				handleError('error');
		  }
		};

		request.onerror = () => {
		  // There was a connection error of some sort
			handleError('connection error');
		};
		request.send();
	}
```

First we need to handle click using event delegation. We check if it's the button we are expecting. if not then we do nothing and return out of the function.

Having clicked the correct button (one of the filters) we then send an ajax request to the search page updating the query string with the value of our filter.

The handle `error` function is a simple console output for the purpose of this demo.

## The interesting bit.

Adding the partial using the addPartial function is where *some* of the magic happens.

```js
function addPartial(data){
		/* Non nested partial */
		var template = window.Demo.templates['item-list'];
		var container = document.querySelector('[data-item-list]');
		container.innerHTML = template({contentData:data});
	}
```

If you are familiar with handlebars on the client side this will look familiar.  The difference here is our initial template declaration is referencing an object rather than building some HTML to put into the page.

That object holds the reference to our HTML partial `item-list` from our `_partials` folder.

This object is generated from our gulp task.  Our gulp task currently has an empty `templatesArr`.

Putting the reference to the partial required in the `templatesArr` will create that object and create a `templates.js` file in the public folder.

`'views/_partials/item-listing/item-list.hbs'`

Running gulp now will produce the `template.js` in a `templates folder` and should look like this

```js
this["Demo"] = this["Demo"] || {};
this["Demo"]["templates"] = this["Demo"]["templates"] || {};
this["Demo"]["templates"]["item-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["item-listing/item-listing"],depth0,{"name":"item-listing/item-listing","hash":{"linkText":"Buy now"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"item-list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.contentData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true});
```

### Nearly done.
If you try to run the project in your browser you will notice something isn't quite right.  We have the following error

```js
handlebars.runtime-v4.0.5.js:1185 Uncaught
Exception {description: undefined, fileName: undefined, lineNumber: undefined, message: "The partial item-listing/item-listing could not be found", name: "Error"…}
```

### The important part that makes it all work

If we take a look at the partial `item-list` we can see that it includes a partial.  Handlebars requires us to register those partials as partials, not as templates.  

This is a simple step that allows us to include partials within partials and pass the data down through them all.

There are 2 steps to this

1. As before we need to create a reference in your gulp task.  Add the partial `item-listing` and don't forget within there you have another partial `button`.  Add that reference also.

you will then have a templatesArr that looks something like this.

```js
var templatesArr = [
		'views/_partials/item-listing/item-list.hbs',
		'views/_partials/item-listing/item-listing.hbs',
		'views/_partials/button/button.hbs'
	];
```
2. We need to register our partial to bind that reference to the object created in step one.

```js
function registerPartials(){
		Handlebars.registerPartial('item-listing/item-listing', window.Demo.templates['item-listing']);
		Handlebars.registerPartial('button/button', window.Demo.templates['button']);
	}
```
Call the registerPartial in the `init` function.  Run gulp and test your project.

### Final bit of UX

As we are now updating the filters imediately on click of the filter, there is no need for the `Filter results` button.

```js
  document.getElementsByTagName('html')[0].classList.add('js');
```

Adding a class of `js` to the body of the document will allow you to hide the button when JavaScript is enabled.

## Conclusion
