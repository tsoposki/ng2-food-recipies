var path = require('path');
var gulp = require('gulp');
var del = require('del');
var _ = require('underscore');
var es = require('event-stream');

var $ = require('gulp-load-plugins')();
var conf = require('../config');

gulp.task('html', _.partial(html, 'dev'));
function html(type) {
  var indexPath = path.join(conf.paths.app, '/index.html');
  var destination = conf.paths.builds[type];

  return es.merge(
    gulp.src([conf.files.html, '!' + indexPath])
      .pipe(gulp.dest(destination)),
    gulp.src(indexPath)
      .pipe($.useref())
      .pipe($.changed(destination))
      .pipe(gulp.dest(destination))
  );
}

gulp.task('assets', _.partial(assets, 'dev'));
function assets(type) {
  var buildDest = conf.paths.builds[type];

  return es.merge(
    gulp.src(conf.files.assets)
      .pipe(
        gulp.dest(path.join(buildDest, '/assets'))
      )
  )
}

gulp.task('clean', _.partial(clean, 'dev'));
function clean(type) {
  return del.sync([
    conf.paths.builds[type]
  ]);
}
