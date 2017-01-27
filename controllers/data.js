'use strict';

var fs = require('fs');
var path = require('path');

var DataController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}
		var colorFilter = request.query.color || 'all';
		var dataUrl = path.join(__dirname,'../public/_data/content.json');
		fs.stat(dataUrl, function(err) {
			var data = null;
			if (err === null) {
        data = require(dataUrl);
        var filteredData = data;
        if(colorFilter !== 'all'){
          filteredData = [];
          for(var item in data){
            if(data[item].colour === colorFilter){
              filteredData.push(data[item]);
            }
          }
          if(filteredData.length <= 0){
            filteredData ='no results';
          }
        }

			}
			response.send(filteredData);
		});
	}
};

module.exports = DataController;
