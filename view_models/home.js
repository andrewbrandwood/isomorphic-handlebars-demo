(function () {
  'use strict';

  var utils = require('../utils/common');
  var templateHelpers = require('../templateHelpers.js')();

  function createModel(staticData, canonicalUrl) {

		return {
			layout: false,
			data: staticData,
			helpers: templateHelpers,
			canonicalUrl: canonicalUrl,
			uuid: utils.randomGuid()
		};
	}

	module.exports = function(staticData, canonicalUrl) {
    return createModel(staticData, canonicalUrl);
  };
}());
