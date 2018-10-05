'use strict';

const gulp = require('gulp');
const style = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');



/*SCSS convert in CSS*/
gulp.task('styles', function(){
	return gulp.src('css/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(style())
		.on('error', notify.onError(function(err) {
			return {
				title: 'Styles',
				message: err.message
			};
		}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css/'))
});
/* run server and watch on change in files*/
gulp.task('serve', function(){
	browserSync.init({
        server: './',
        notify: false
	});

	browserSync.watch('**/*.*').on('change', browserSync.reload);
});


gulp.task('watch', function(){
	gulp.watch('css/sass/**/*.scss', ['styles']);
});


gulp.task('default', ['watch', 'serve']);