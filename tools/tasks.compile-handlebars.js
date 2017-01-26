/* ============================================================ *\
    MOVE / Handlebars compile templates
\* ============================================================ */

'use strict';

var path = require('path');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');

module.exports = function(gulp, config) {

  gulp.task('compile-handlebars', function() {
    //reference to partials and templates.
    var templatesArr = [
      config.paths.src.components + 'item-listing/item-listing.hbs',
      config.paths.src.components + 'button/*.hbs',
    ];
    gulp.src(templatesArr)
      .pipe(handlebars({handlebars: require('handlebars')}))
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace: 'Demo.templates',
        noRedeclare: true // Avoid duplicate declarations
      })).pipe(concat('templates.js'))
      .pipe(gulp.dest(config.paths.dest.templates));
  });
};
