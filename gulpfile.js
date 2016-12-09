var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');

var styleSources = ['src/scss/**/*.scss'];
var layout = ['dist/**/*.html']

gulp.task('styles', function() {
    return gulp.src(styleSources)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('refresh', function() {
    return gulp.src(layout)
        .pipe(browserSync.stream());
});

gulp.task('server', function() {
    browserSync.init({
        server: 'dist'
    });
    gulp.watch(styleSources, ['styles']);
    gulp.watch(layout, ['refresh']);
});

gulp.task('default', function() {
  gulp.start('server');
});