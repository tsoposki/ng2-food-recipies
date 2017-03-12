var gulp = require('gulp');
var browserSync = require('browser-sync');
var conf = require('../config');
var ts = require('gulp-typescript');


gulp.task('scripts', ['javascript', 'typescript']);

gulp.task('javascript', function () {
  return gulp.src(conf.files.js)
    .pipe(gulp.dest(conf.paths.builds.dev));
});

gulp.task('typescript', function () {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = gulp.src(conf.files.ts)
    .pipe(tsProject());

  return tsResult
    .js
    .pipe(gulp.dest(conf.paths.builds.dev))
    .pipe(browserSync.stream());
});
