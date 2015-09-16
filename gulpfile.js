var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var less = require('gulp-less');
var path = require('path');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'style': './public/styles/**/*.less',
};


// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));

});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('app:start', function () {
	require('./keystone');
});

gulp.task('style:vendor_build', function () {
  return gulp.src('./public/styles/vendor.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('style:build', function () {
  return gulp.src('./public/styles/site.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('style:reload', function() {
  browserSync.init({
    proxy: '0.0.0.0:3000',
    port: 3001
  });
  gulp.watch(paths.style, ['style:build']);
  gulp.watch('./templates/**/*.jade', reload);
});

gulp.task('dev', ['app:start', 'style:reload', 'style:vendor_build'], function () {

});