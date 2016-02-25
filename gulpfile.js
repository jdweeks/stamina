const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src([
    'assets/js/jquery-*.js',
    'assets/js/bootstrap.min.js',
    'assets/js/angular/angular.min.js',
    'assets/js/angular/angular-*.js',
    'assets/js/app.js',
    'assets/js/controllers/*.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('watch', function() {
  gulp.watch('assets/js/**/*.js', ['default']);
});
