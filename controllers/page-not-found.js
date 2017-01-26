'use strict';

var contentRepository = require('../data/content-repository');
var utils = require('../utils/common');
var ViewModel = require('../view_models/standard-page');

var PageNotFoundController = {

	get: function(request, response) {
		response.status(404);

		contentRepository.get(function(data) {
	    response.render('404', new ViewModel(
				data,
				utils.getCanonicalUrl(request)
			));
		});
	}
};

module.exports = PageNotFoundController;
