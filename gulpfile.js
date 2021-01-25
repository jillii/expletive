'use strict';
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minify      = require('gulp-clean-css'),
    minify_js   = require('gulp-minify'),
    notify      = require("gulp-notify"),
    shell       = require('gulp-shell'),
    browserSync = require('browser-sync').create();

// gulp.task('default', function(done){
// 	done();
// });

//compile and minify sass
gulp.task('sass', function(done) {

    gulp.src('assets/_sass/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(minify({compatibility: 'ie8'}))
	    .pipe(gulp.dest('assets/css'))
	    .pipe(notify("don't scss me"))
	    .pipe(browserSync.reload({stream:true}));
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
	.pipe(gulp.dest('assets/js'))
	.pipe(browserSync.reload({stream:true}));
	done();
});
// watch
gulp.task('watch', function(done) {
    browserSync.init({server: {baseDir: '_site/'}});

    gulp.watch('assets/_sass/*.scss', gulp.series(['sass']));
    gulp.watch('assets/_js/*.js', gulp.series(['compress']));
    browserSync.reload;
    done();
});
