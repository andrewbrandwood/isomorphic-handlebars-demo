(function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var dataDirectory = '../_data/';
  var rimraf = require('rimraf');


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
    },

    saveDataToFile: function(location, data, callback) {

      var folderPath = path.join(__dirname, dataDirectory);
      var filePath = getAbsoluteFilePath(location);

      if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, function() {
          fs.writeFile(filePath, JSON.stringify(data), callback);
        });
      } else {
        fs.writeFile(filePath, JSON.stringify(data), callback);
      }
    },

    deleteFile: function(fileName, callback) {
      fs.unlink(fileName, function(error){
        callback(error);
      });
    },

    deleteJSONFile: function(location, callback) {
      this.deleteFile(getAbsoluteFilePath(location),callback);
    },

    deleteFilesAtPath: function(relativePath, callback) {
      var folderPath = path.join(__dirname, dataDirectory) + relativePath;
      rimraf(folderPath, function(error){
        callback(error);
      });
    }
  };
}());
