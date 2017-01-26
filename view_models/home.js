(function () {
  'use strict';

  var templateHelpers = require('../templateHelpers.js')();

  function createModel(staticData) {

		return {
			layout: false,
			data: staticData,
			helpers: templateHelpers
		};
	}

	module.exports = function(staticData) {
    return createModel(staticData);
  };
}());
