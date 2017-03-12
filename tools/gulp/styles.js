var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();
var conf = require('../config');
var _ = require('underscore');

gulp.task('styles', _.partial(styles, 'dev'));
function styles(type) {
  var injectCfg = {
    files: gulp.src([path.join(conf.paths.appSrc, '/**/*.scss')], {read: false}),
    options: {
      transform: function (filePath) {
        filePath = filePath.replace(conf.paths.app + '/', '');
        return '@import "' + filePath + '";';
      },
      starttag: '// injector',
      endtag: '// end-injector',
      addRootSlash: false
    }
  };

  return gulp.src(path.join(conf.paths.app, '/boot.scss'))
    .pipe($.inject(injectCfg.files, injectCfg.options))
    // .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}).on('error', conf.errorHandler('Sass')))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    // .pipe($.sourcemaps.write(''))
    .pipe(gulp.dest(conf.paths.builds[type]))
    .pipe(browserSync.stream());
}
