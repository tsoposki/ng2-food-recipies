/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
// Require all tasks in tools/gulp/tasks, including sub folders
requireDir('./tools/gulp', {recurse: true});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  //gulp.start('build');
});
