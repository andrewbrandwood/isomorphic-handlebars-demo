(function () {
  'use strict';

  var utils = require('../utils/common');
  var templateHelpers = require('../templateHelpers.js')();

  function createModel(staticData, colArr, canonicalUrl) {

		return {
      layout: false,
      data: staticData,
      helpers: templateHelpers,
      colors: colArr,
      canonicalUrl: canonicalUrl,
      uuid: utils.randomGuid()
		};
	}

	module.exports = function(staticData, blogItemData, canonicalUrl) {
    return createModel(staticData, blogItemData, canonicalUrl);
  };
}());
