'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('../utils/common');
var contentRepository = require('../data/content-repository');
var ViewModel = require('../view_models/styleguide');

function getFileContents(file) {

  var colorItem;
  var regHex = /#\w+;/g;
  var colArr = [];

  file = fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      console.error('Styleguide error trying to read SCSS file', err);
    }

    colorItem = regHex.exec(data);
    while (colorItem){
      var color = colorItem[0].replace(';','');
      if(colArr.indexOf(color) === -1){
        colArr.push(color);
      }

      colorItem = regHex.exec(data);
    }

    return data;

  });

  return colArr;
}

var StyleguideController = {

	get: function(request, response) {

		if (!request.body) {
			return response.sendStatus(400);
		}

		contentRepository.get(function(staticData) {

      var sassColors = path.resolve(__dirname, '../_source/styles/_settings/_settings.colors.scss');
	    var colArr = getFileContents(sassColors);

			var canonicalUrl = utils.getCanonicalUrl(request);
			var viewModel = new ViewModel(staticData, colArr, canonicalUrl);

      response.setHeader('X-Robots-Tag', 'noindex, nofollow');
			response.render('styleguide', viewModel);
		});
	}
};

module.exports = StyleguideController;
