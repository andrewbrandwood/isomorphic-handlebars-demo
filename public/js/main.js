(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	var Website = Website || {};

	Website = function() {

		var _self = this;

		function ajaxHelper(url){


		}

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
			for(var i = 0; i < data.length; i++){
				data[i].linkText = 'Buy now';
				container.innerHTML = template(data[i]);
			}
		}

		function init() {
			/* Register the partial here as it will we re-used throughout.
				This is a nested partial within a partial.
				If a non nested partial then a template model is used.
			*/
			Handlebars.registerPartial('button/button', window.Demo.templates['button']);


			document.addEventListener('click', getData);

		}

		init();
	};

	var website = new Website();

})(window);

//# sourceMappingURL=main.js.map
