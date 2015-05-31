var gulp = require('gulp');
var express = require('express');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

var port = 4000;

gulp.task('express', function(){
	
	var app = express();
	app.use(require('connect-livereload')({port: 4002}));
	app.use(express.static(__dirname));
	app.listen(port);

});

gulp.task('style', function(){
	
	return gulp.src('src/style/*.scss')
  		   .pipe(sass({style: 'expanded'}))
         .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         }))
         .pipe(gulp.dest('src/style'))
         .pipe(minifycss())
         .pipe(rename(function(path){
            path.extname = ".min.css";
         }))
  		   .pipe(gulp.dest('src/style'));

});

gulp.task('build', ['style'], function(){

  return gulp.src('src/js/pg-ng-range.js')
         .pipe(gulp.dest('dest'))
         .pipe(uglify({mangle: false}))
         .pipe(rename(function(path){
           path.extname = ".min.js";
         }))
         .pipe(gulp.dest('dest'));

});

gulp.task('watch', function() {

  gulp.watch('src/style/*.scss', ['style']);
  gulp.watch('src/style/*.css', notifyLiveReload, ['style']);
  gulp.watch('index.html', notifyLiveReload);
  gulp.watch('src/js/*.js', notifyLiveReload);

});


var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('server', ['style', 'express', 'livereload', 'watch'], function(){
  console.log('Awesomeness happens at local port: ' + port);
});