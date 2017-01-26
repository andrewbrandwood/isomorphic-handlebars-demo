(function () {
	'use strict';

	var util = require('util');

	module.exports =  {

			formatDateNum: function(dateNum){
				return (dateNum < 10) ? '0' + dateNum : String(dateNum);
			},
			formatDate: function(isoString) {

				var date = new Date(isoString);

				return util.format('%s.%s.%s',
					this.formatDateNum(date.getDate()),
					this.formatDateNum(date.getMonth() + 1),
					date.getFullYear());
			},
			getCanonicalUrl: function(request){
				return request.protocol + '://' + request.get('host') + request.originalUrl.replace(/\/$/, '');
			},
			randomGuid: function() {
	      var d = new Date().getTime();

	      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
	      });

	      return uuid;
	    }
		};
}());
