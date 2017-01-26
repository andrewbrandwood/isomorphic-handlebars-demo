(function () {
  'use strict';

  var fileService = require('../services/file-service');

  module.exports =  {
    get: function(callback) {
      fileService.get('content', callback);
    }
  };
}());
