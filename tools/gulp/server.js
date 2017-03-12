var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');
var paths = config.paths;
var historyApiFallback = require('connect-history-api-fallback');



gulp.task('serve', ['build', 'watch'], function () {
  browserSync.init({
    server: {
      baseDir: paths.builds.dev,
      routes: {
        "/node_modules": "node_modules"
      },
      middleware: [
        historyApiFallback()
      ]
    },
    port: 8080
  });
});
