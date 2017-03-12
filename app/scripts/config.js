/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var paths = {
    // paths serve as alias
    'npm:': 'node_modules/',
    'bower:': 'bower_components/'
  };

  var map = {
    'src': 'src', // 'dist',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    'moment': 'node_modules/moment/moment.js',
    'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',

    'rxjs': 'node_modules/rxjs',
    '@ngrx/core': 'node_modules/@ngrx/core/bundles/core.min.umd.js',
    '@ngrx/store': 'node_modules/@ngrx/store/bundles/store.min.umd.js',

    'immutable': 'node_modules/immutable/dist/immutable.js',
    'moment-timezone': 'node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',
    'jquery': 'node_modules/jquery/dist/jquery.min.js',
    'lodash': 'node_modules/lodash/lodash.js',
    'typed-immutable-record': 'node_modules/typed-immutable-record/dist',
    "ng2-toastr": "npm:ng2-toastr"
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'src':           { main: 'boot.js',  defaultExtension: 'js' },
    'rxjs':          { defaultExtension: 'js' },
    '@ngrx/core':    { main: 'index.js', format: 'cjs' },
    '@ngrx/store':   { main: 'index.js', format: 'cjs' },
    'fuzzy':         { defaultExtension: 'js' },
    'typed-immutable-record': { main: 'index.js', format: 'cjs' }
  };


  var config = {
    defaultJSExtensions: true,
    map: map,
    paths: paths,
    packages: packages
  };
  System.config(config);
})(this);
