(function(){
  'use strict';

  var utils = require('../utils/common');
  var templateHelpers = require('../templateHelpers.js')();

  function createModel(staticData, contentData, canonicalUrl) {
    return {
      layout: false,
      helpers: templateHelpers,
      data: staticData,
      contentData: contentData,
      canonicalUrl: canonicalUrl,
      theme: contentData.theme,
      uuid: utils.randomGuid()
    };
  }

  module.exports = function(staticData, contentData, canonicalUrl) {
    return createModel(staticData, contentData, canonicalUrl);
  };

}());
