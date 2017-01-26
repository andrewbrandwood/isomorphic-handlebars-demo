'use strict';

var fs = require('fs');
var path = require('path');

var SitemapController = {

	get: function(request, response) {

		var sitemapPath = path.resolve(__dirname, '../sitemap.xml');

		fs.readFile(sitemapPath, (err, data) => {
		  if (err) { throw err; }

			response.header('Content-Type', 'application/xml');
			response.send(data);
		});
	}
};

module.exports = SitemapController;
