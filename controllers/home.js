'use strict';

var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var ViewModel = require('../view_models/home');

var HomeController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}

		contentRepository.get(function(staticData) {
			var canonicalUrl = utils.getCanonicalUrl(request);
			var viewModel = new ViewModel(staticData, canonicalUrl);

			response.render('index', viewModel);
		});
	}
};

module.exports = HomeController;
