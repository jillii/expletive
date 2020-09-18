'use srtict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-clean-css');
var minify_js = require('gulp-minify');
var notify = require("gulp-notify");

gulp.task('default', function(done){
	done();
});
//compile and minify sass
gulp.task('sass', function(done) {
    gulp.src('assets/_sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(notify("don't scss me")); 
    done();
});
// compress js
gulp.task('compress', function(done) {
	gulp.src('assets/_js/*.js')
	.pipe(minify_js({
		ext: {
			min: '.min.js'
		},
		mangler: false,
		noSource: true
	}))
	.pipe(gulp.dest('assets/js'));
	done();
});
// watch
gulp.task('watch', function(done) {
    gulp.watch('assets/_sass/*.scss', gulp.series(['sass']));
    gulp.watch('assets/_js/*.js', gulp.series(['compress']));
    done();
})