'use strict';

module.exports = function(app) {
	var homeController = require('./controllers/home')(app);
	var colorController = require('./controllers/data');
	app.get('/search/', colorController.get);
	app.get('/', homeController.get);
};
