(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	var Website = Website || {};

	Website = function() {

		var _self = this;

		function addPartial(e){
			var myButton = Object.getOwnPropertyDescriptor(e.target.dataset, 'demoButton');
			console.log(myButton);
			if(myButton === undefined) return;
			//querySelector('[data-demo-button]')
			/* Non nested partial */
			var template = window.Demo.templates['item-listing'];
			var container = document.querySelector('[data-item-list]');
			container.innerHTML += template({title: 'this is a clientside title', description: 'this is a clientside description', linkText: 'clientside button'});
		}

		function init() {
			/* Register the partial here as it will we re-used throughout.
				This is a nested partial within a partial.
				If a non nested partial then a template model is used.
			*/
			Handlebars.registerPartial('button/button', window.Demo.templates['button']);


			document.addEventListener('click', addPartial);

		}

		init();
	};

	var website = new Website();

})(window);
