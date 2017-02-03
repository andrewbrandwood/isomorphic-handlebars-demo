(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	var Website = Website || {};

	Website = function() {

		var _self = this;

		function getData(e){
			var myButton = Object.getOwnPropertyDescriptor(e.target.dataset, 'demoButton');
			if(myButton === undefined) return;

			var filter = e.target.value;

			var request = new XMLHttpRequest();
			request.open('GET', '/search/?color=' + filter, true);

			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			    // Success!
			    var data = JSON.parse(request.responseText);
					addPartial(data);
			  } else {
			    // We reached our target server, but it returned an error
					handleError('error');
			  }
			};

			request.onerror = function() {
			  // There was a connection error of some sort
				handleError('connection error');
			};

			request.send();

		}

		function handleError(error){
			console.log(error);
		}

		function addPartial(data){
			/* Non nested partial */
			var template = window.Demo.templates['item-listing'];
			var container = document.querySelector('[data-item-list]');
			container.innerHTML = '';
			for(var i = 0; i < data.length; i++){
				container.innerHTML += template(data[i]);
			}
		}

		function registerPartials(){
			/* Register the partial here as it will we re-used throughout.
				This is a nested partial within a partial.
				If a non nested partial then a template model is used.
			*/
			Handlebars.registerPartial('button/button', window.Demo.templates['button']);
		}

		function addEventListeners(){
			document.addEventListener('click', getData);
		}

		function addJSHelper(){
			// adds a class to the html element so we can hide element that are not needed when JS is available.
			document.getElementsByTagName('html')[0].classList.add('js');
		}

		function init() {
			registerPartials();
			addEventListeners();
			addJSHelper();
		}

		init();
	};

	var website = new Website();

})(window);

//# sourceMappingURL=main.js.map
