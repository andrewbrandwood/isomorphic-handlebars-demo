(function () {
  'use strict';

	var promiseGet = require('request-promise');
  var baseUrl = process.env.API_URL || 'http://api.codecomputerlove.com';

	module.exports = {
    get: function(url, callback) {
      promiseGet(baseUrl + url).then(function (data) {
        callback(JSON.parse(data));
      }).catch(function (err) {
         console.error(err);
         callback(null);
      });
		}
  };
}());
