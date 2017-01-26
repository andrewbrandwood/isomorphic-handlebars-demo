(function () {
	'use strict';
  var xmlBuilder = require('xmlbuilder');
	var parseString = require('xml2js').parseString;

  module.exports = {
    createXml: function(data) {

			var elements = [];

			for (var i = 0; i < data.length; i++) {
				var element = {
					'@val': data[i].title,
					'#text': data[i].value
				};
				elements.push(element);
			}

			var obj = {
				  Leads: {
				    row: {
							'@no': 1,
							FL: elements
						}
				  }
			};
			var root = xmlBuilder.create(obj);
			return root;
    },
		parseXml: function(xml, callback) {
			parseString(xml, function (err, result) {
				if (err) {
					console.log('error:' + err);
				}
				callback(result);
			});
		}
  };
}());
