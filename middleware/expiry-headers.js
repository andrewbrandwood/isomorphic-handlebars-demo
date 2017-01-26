(function () {
	'use strict';

	module.exports = function(req, res, next) {
	    if(req.url.indexOf('/') === 0){
	    	res.setHeader('Cache-Control', 'public, max-age=3600000'); // 1 hour
	        res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
	    } 
	    if(req.url.indexOf('/_client/styles/') === 0 || 
	    	req.url.indexOf('/_client/images/') === 0 || 
	    	req.url.indexOf('/_client/fonts/') === 0) {
	        res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 7 days
	        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
	    }

	    return next();
	};
}());