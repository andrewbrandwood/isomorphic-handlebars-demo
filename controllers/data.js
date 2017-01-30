'use strict';

var fs = require('fs');
var path = require('path');

var DataController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}
		var colorFilter = request.query.color || 'all';
		var dataUrl = path.join(__dirname,'../data/content.json');

		function checkFilter(value) {
			return value.colour === colorFilter;
		}

		function filterResults(err){
			var data = null;
			if (err) return;
      data = require(dataUrl);
      var filteredData = data;
      if(colorFilter !== 'all'){
        filteredData = [];
        filteredData = data.filter(checkFilter);
      }
			renderModel(filteredData);
		}

		function renderModel(filteredData){
			response.send(filteredData);
		}

		fs.stat(dataUrl, filterResults);
	}
};

module.exports = DataController;
