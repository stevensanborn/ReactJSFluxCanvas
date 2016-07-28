var gulp = require('gulp');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var rename = require("gulp-rename");
var less = require('gulp-less');
var runSequence = require('run-sequence').use(gulp);


gulp.task('webpack', function(done){
	return gulp.src('src/client.js')
	.pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('www/js/src/')).on('end', function() {
			 console.log("done");

		});
});


//less to css task
gulp.task('less', function(done) {
    gulp.src('src/css/main.less')
    .pipe(less())
    .pipe(gulp.dest('www/css/'))
    .on('end', function() {
      console.log("less complete");
      done();
    });;
});

//less to css task
gulp.task('copy-data', function(done) {
    gulp.src('src/data/**/*')
    .pipe(gulp.dest('www/data'))
    .on('end', function() {
      console.log("copy data done!");
      done();
    });;
});


gulp.task('watch', function(obj){
	
	gulp.watch('src/**/*.js', function(){
		runSequence('webpack','reload-server');
	});

	gulp.watch('src/**/*.less',  function(){
		runSequence('less','reload-server');
	});

  gulp.watch('data/**/*',  function(){
    runSequence('copy-data','reload-server');
  });

});


gulp.task('webserver', function() {
  
  var dir= "www";
  console.log("webserver");
    browserSync.init({
      server: {
              baseDir: dir
      }
    });

});

gulp.task('reload-server',function(){
    browserSync.reload();
});


gulp.task('default',function(){
	runSequence('webpack',  'less','copy-data','webserver','watch');
});

