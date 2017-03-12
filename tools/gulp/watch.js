var gulp = require('gulp');
var path = require('path');
var bs = require('browser-sync');

var $ = require('gulp-load-plugins')();
var conf = require('../config');

var scripts = require('./scripts');

gulp.task('watch', function () {

  gulp.watch(conf.files.ts, ['typescript']);
  gulp.watch(conf.files.scss, ['styles']);
  gulp.watch(conf.files.html, ['html']).on('change', bs.reload);
  gulp.watch(conf.files.assets, ['assets']).on('change', bs.reload);
  gulp.watch(conf.files.error, ['error']).on('change', bs.reload);

});

