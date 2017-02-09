(function(window, undefined) {
	/*jshint undef:false*/
	'use strict';

	function isCorrectButton(e, button){
		return Object.getOwnPropertyDescriptor(e.target.dataset, button) === undefined ? false : true;
	}

	function getData(e){
		if (!isCorrectButton(e, 'demoButton')) return;

		const filter = e.target.value;

		const request = new XMLHttpRequest();
		request.open('GET', '/search/?color=' + filter, true);

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

	function handleError(error){
		console.log(error);
	}

	function addPartial(data){
		/* Non nested partial */
		var template = window.Demo.templates['item-list'];
		var container = document.querySelector('[data-item-list]');
		container.innerHTML = '';
		container.innerHTML += template({contentData:data});
	}

	function registerPartials(){
		/* Register the partial here as it will we re-used throughout.
			This is a nested partial within a partial.
			If a non nested partial then a template model is used.
		*/
		Handlebars.registerPartial('item-listing/item-listing', window.Demo.templates['item-listing']);
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


})(window);

//# sourceMappingURL=main.js.map
