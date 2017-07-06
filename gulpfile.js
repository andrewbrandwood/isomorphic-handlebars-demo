/* ============================================================ *\
	SETUP
\* ============================================================ */

/*jslint node: true */
'use strict';

// Gulp
var gulp   = require('gulp');
var runSeq = require('run-sequence');

/* ============================================================ *\
	TASK MODULES
\* ============================================================ */

// Dependencies
var path = require('path');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');

gulp.task('compile-handlebars', function() {
	//reference to partials and templates.
	var templatesArr = ['views/_partials/item-listing/item-list.hbs'];
	gulp.src(templatesArr)
		.pipe(handlebars({handlebars: require('handlebars')}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'Demo.templates',
			noRedeclare: true // Avoid duplicate declarations
		})).pipe(concat('templates.js'))
		.pipe(gulp.dest('public/templates'));
});

/* ============================================================ *\
	MAIN TASKS
\* ============================================================ */

// Task for local dev
gulp.task('default', function(cb){
	return runSeq(['compile-handlebars'], cb);
});
