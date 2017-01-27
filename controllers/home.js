'use strict';

var templateHelpers = require('../templateHelpers.js')();
var promiseGet = require('request-promise');
var fs = require('fs');
var path = require('path');

var HomeController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}
		var dataUrl = path.join(__dirname,'../public/_data/content.json');
		fs.stat(dataUrl, function(err) {
			var data = null;
			if (err === null) {
				data = require(dataUrl);
			}
			console.log(data);
			response.render('index', {
				layout: false,
				helpers: templateHelpers,
				contentData: data
			});

		});
		// promiseGet(dataUrl).then(function (data) {
		// 	response.render('index', {
		// 		layout: false,
		// 		helpers: templateHelpers,
		// 		contentData: JSON.parse(data)
		// 	});
		// }).catch(function (err) {
		// 	 console.error(err);
		// 	 response.render('index', {
		// 		 layout: false,
		// 		 helpers: templateHelpers,
		// 		 contentData: 'no-results'
		// 	 });
		// });
	}
};

module.exports = HomeController;
