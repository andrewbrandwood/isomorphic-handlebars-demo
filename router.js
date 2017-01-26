'use strict';

module.exports = function(app) {
	var homeController = require('./controllers/home');
	app.get('/', homeController.get);
};
