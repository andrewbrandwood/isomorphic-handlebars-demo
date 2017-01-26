'use strict';

var contentRepository = require('../data/content-repository');
var ViewModel = require('../view_models/home');

var HomeController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}

		contentRepository.get(function(staticData) {
			var viewModel = new ViewModel(staticData);

			response.render('index', viewModel);
		});
	}
};

module.exports = HomeController;
