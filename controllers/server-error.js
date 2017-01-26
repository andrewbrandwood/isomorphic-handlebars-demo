'use strict';

var contentRepository = require('../data/content-repository');
var utils = require('../utils/common');
var ViewModel = require('../view_models/standard-page');

var ErrorController = {

	get: function(request, response) {
		response.status(500);

		contentRepository.get(function(data) {
	    response.render('500', new ViewModel(
				data,
				utils.getCanonicalUrl(request)
			));
		});
	}
};

module.exports = ErrorController;
