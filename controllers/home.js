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
		console.log(baseUrl + query);

		promiseGet(baseUrl + query).then(function (data) {
			console.log(data);
			response.render('index', {
				layout: false,
				helpers: templateHelpers,
				contentData: JSON.parse(data)
			});
		}).catch(function (err) {
			//console.log(request);
			response.render('index', {
			 layout: false,
			 helpers: templateHelpers,
			 contentData: 'error'
		 });
		});


		// fs.stat(dataUrl, function(err) {
		// 	var data = null;
		// 	if (err === null) {
		// 		data = require(dataUrl);
		// 	}
		// 	response.render('index', {
		// 		layout: false,
		// 		helpers: templateHelpers,
		// 		contentData: data
		// 	});
		// });
	}
};

module.exports = HomeController;
