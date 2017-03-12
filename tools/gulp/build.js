var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);


//required by serve
gulp.task('build', function(callback) {
  runSequence(
    'clean',
    [
      'scripts',
      'styles',
      'assets',
      'html'
    ],
    callback
  )
});
