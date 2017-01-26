'use strict';

var express = require('express'),
	path = require('path'),
	logger = require('express-logger'),
	json = require('express-json'),
	bodyParser = require('body-parser'),
	methodOverride = require('express-method-override'),
	exphbs = require('express-handlebars');

var app = express();

app.set('views', path.join(__dirname, './views'));
app.enable('strict routing');
app.engine('hbs', exphbs({
	extname:'hbs',
	layoutsDir:'./views',
	defaultLayout:'index.hbs',
	partialsDir: ['./views/_partials']
}));
app.set('view engine', 'hbs');
app.set('locale', 'en-gb');
app.use(express.static(path.join(__dirname, './public')));
app.use(logger({path: './logs/logfile.txt'}));
app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(require('./middleware/expiry-headers'));
app.use(require('./middleware/strip-slash'));

// Setup routing
require('./router')(app);

var port = process.env.PORT || 3001;

app.listen(port, function(){
	console.log('Website ready, listening on port: ' + port);
});

module.exports = app;
