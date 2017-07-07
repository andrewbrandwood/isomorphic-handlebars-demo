# Isomorphic handlebars demo

This tutorial will demonstrate a simple search results page with ajax filters. Using a setup where the same [handlebarsjs](http://handlebarsjs.com/) template is used on the server side as the client side.

Often when using ajax and a templating engine there is duplication of code. Server side code for non javascript output and client side to handle requests through JavaScript and ajax.

This tutorial will guide you through a common scenario of filtering search results using handlebars templates.  The outcome will be a solution that avoids writing HTML in your JavaScript file.

The tutorial uses Node.js for the server application taking advantage of express for ease of setup. The setup here is purely for demonstration purposes. This tutorial will not cover [Node.js server setup, you can learn more about that here](https://nodejs.org).

## Prerequisites
* [Node.js](https://nodejs.org)
* [Gulp](http://gulpjs.com)

## Install
* clone the project files.
* Run `npm install` to setup.

___

## Getting started

Once you have downloaded the files and run the initial `npm install` command you should have all the files necessary to complete this tutorial.

### Finding your way around.

* All the HTML files are constructed from handlebars templates (`.hbs`) and live in the `views` folder.

* Constructed HTML files are published into the root of the `public` folder.

* All website assets are created and live in the `public` folder.

* Running `gulp` in the terminal window will generate an HTML index in the root of the `public` folder by using the [gulp-handlebars](https://www.npmjs.com/package/gulp-handlebars) package to compile our templates for the client side. Server side templating is defined in the `server.js`

* Running `npm start` will start your local server on port `3001`

___

## Let's begin

If you haven't already, run `gulp` and `npm start` to get the initial website built.

Open `http://localhost:3001` to view the website.

You'll see a results page showing all coloured pencils. A filter bar at the top works by choosing an option and pressing the filter results button.

You'll notice this is currently all done with a page refresh and doesn't use JavaScript at this stage.  

### understanding the results

To understand the results and where they come from, hit any of the following urls.

 * All results - [http://localhost:3001/search/](http://localhost:3001/search/)

 by adding a `color` query string parameter you can get specific colours

 * [http://localhost:3001/search/?color=red](http://localhost:3001/search/?color=red)  [green, blue]


### Compiling handlebars templates
 On the server side the Node.js setup handles all the template generation, however in order to get things isomorphic we will need to compile the templates for the client side. To do this we are going to use [Gulp](http://gulpjs.com) as the task runner.  

 We will be using the  [gulp-handlebars](https://www.npmjs.com/package/gulp-handlebars) package to compile the templates we need.

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

 Notice the `templatesArr` is empty.  This is where we are going to add references to our partials.

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
 {{> footer }}
 ```
 We are going to be concentrating on the bits that have data attached to them. In this case we need to open the `item-listing/item-list` from the `views/_partials` folder.

 ```HTML
 <div class="item-list">
   {{#each contentData}}
     {{> item-listing/item-listing this linkText="Buy now" }}
   {{/each}}
 </div>
 ```
 The file contains a loop where `contentData` is used. `contentData` is the data from the api.  For the server side this is handled by the Node.js application and is pushed won into the view model. Note the `linkText` attribute.

 We are going to take advantage of this in our client side JavaScript.

 Let's now take a look at the content in the loop.  Open up `item-listing/item-listing` from the `views/_partials` folder

The `json` output from the search should match the references in this partial.

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

This is pretty straight forward, but there is one thing to note here.  There is a partial within a partial.  

```
{{> button/button buttonText=linkText }}
```
We are passing down data that has been passed down from a parent partial.  This is here to demonstrate how partials within partials along with dynamic data can be included in an isomorphic solution.  

The parent partial passes a default value `linkText="Buy now"`

Results from the json overwrite `linkText` if it exists.

## The client side

We are going to hook up the results to an ajax request.

Open the file `public/js/main.js`.

Create a function for the event listeners.

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

We are using [Event Delegation](https://davidwalsh.name/event-delegate) method here so we are attaching the click event to the body.

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

First we need to handle click using event delegation, check if it's the button we are expecting. if not, do nothing and return out of the function.

Having clicked the correct button (one of the filters) we send an ajax request to the search page. The query string is populated with the value of our filter.

The `handleError` function is a simple console output for the purpose of this demo.

## The interesting bit.

Adding the partial using the `addPartial` function is where *some* of the magic happens.

```js
function addPartial(data){
		var template = window.Demo.templates['item-list'];
		var container = document.querySelector('[data-item-list]');
		container.innerHTML = template({contentData:data});
	}
```

If you are familiar with handlebars on the client side this will look familiar.  The difference here is the initial template declaration is referencing an object. No HTML is created with JavaScript.

That object holds the reference to our HTML partial `item-list` from our `_partials` folder.

The object is generated from the gulp task in `gulpfile.js`.

`'views/_partials/item-listing/item-list.hbs'`

Putting the reference to the partial required in the `templatesArr` will create an object in a file called `templates.js`. Run `gulp` to create the file that is generated in `public/templates` folder.

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
Open the webpage. You will notice something isn't quite right.  The following error is produced.

```js
handlebars.runtime-v4.0.5.js:1185 Uncaught
Exception {description: undefined, fileName: undefined, lineNumber: undefined, message: "The partial item-listing/item-listing could not be found", name: "Error"…}
```

### The important part that makes it all work

Look at the partial `item-list`. It includes a partial.  Handlebars requires us to register those partials.  

This is a simple step that allows us to include partials within partials which can utilise the data.

There are 2 steps to this.

1. Create a reference in your gulp task.  Add the partial `item-listing`. Don't forget within there you have another partial `button`.  Add that reference also.

The `templatesArr` should look like this.

```js
var templatesArr = [
		'views/_partials/item-listing/item-list.hbs',
		'views/_partials/item-listing/item-listing.hbs',
		'views/_partials/button/button.hbs'
	];
```

*Be careful to only identify the templates you need as `templates.js` is referenced at runtime. This is an extra resource the client needs to download*

2. In `main.js` register the partial to bind the reference to the object.

```js
function registerPartials(){
		Handlebars.registerPartial('item-listing/item-listing', window.Demo.templates['item-listing']);
		Handlebars.registerPartial('button/button', window.Demo.templates['button']);
	}
```
Call the `registerPartial` in the `init` function.  

Run gulp and test your project.

### Final bit of UX

As we are now updating the filters immediately on click of the filter, there is no need for the `Filter results` button.

```js
  document.getElementsByTagName('html')[0].classList.add('js');
```

Adding a class of `js` to the body of the document will allow you to hide the button when JavaScript is enabled.
