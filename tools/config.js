var path = require('path');
var gutil = require('gulp-util');

exports.paths = {
  app: 'app',
  appSrc: 'app/src',
  builds: {
    dev: 'builds/dev'
  },
  npm: 'node_modules'
};

exports.files = {
  ts: path.join(this.paths.app, '/**/*.ts'),
  js: path.join(this.paths.app, '/**/*.js'),
  scss: path.join(this.paths.app, '/**/*.scss'),
  html: path.join(this.paths.app, '/**/*.html'),
  error: path.join(this.paths.app, '/error/**/*'),
  assets: path.join(this.paths.app, '/assets/**/*')
};


/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
