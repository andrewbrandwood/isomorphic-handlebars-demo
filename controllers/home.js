'use strict';

var promiseGet = require('request-promise');

var HomeController = function(app){

	return {

		get: function(request, response) {

			if (!request.body) {
				return response.sendStatus(400);
			}

			var baseUrl = request.protocol + '://' + request.headers.host + '/search';
			var query = request.url;
			promiseGet(baseUrl + query).then(function (data) {
				response.render('index', {
					layout: false,
					helpers: app.settings.templateHelpers,
					contentData: JSON.parse(data)
				});
			}).catch(function (err) {
				response.render('index', {
				 layout: false,
				 helpers: app.templateHelpers,
				 contentData: 'error'
			 });
			});
		}
	}
};

module.exports = HomeController;
