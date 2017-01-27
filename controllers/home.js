'use strict';

var templateHelpers = require('../templateHelpers.js')();
var promiseGet = require('request-promise');

var HomeController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}
		var colorFilter = request.query.color || 'all';
		var baseUrl = request.protocol + '://' + request.headers.host + '/search';
		var query = request.url;

		promiseGet(baseUrl + query).then(function (data) {
			response.render('index', {
				layout: false,
				helpers: templateHelpers,
				contentData: JSON.parse(data)
			});
		}).catch(function (err) {
			response.render('index', {
			 layout: false,
			 helpers: templateHelpers,
			 contentData: 'error'
		 });
		});
	}
};

module.exports = HomeController;
