(function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var dataDirectory = '../public/_data/';


  function getAbsoluteFilePath(relativePath) {
    return path.join(__dirname, dataDirectory) + relativePath + '.json';
  }

  module.exports = {

    get: function(location, callback) {

      fs.stat(getAbsoluteFilePath(location), function(err) {
        var data = null;
        if (err === null) {
          data = require(dataDirectory + location);
        }

        callback(data);
      });
    }
  };
}());
