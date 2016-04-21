var browserSync = require('browser-sync');
var gulp = require('gulp');
var sass = require('gulp-sass');
var surge = require('gulp-surge');

gulp.task('sass', function(){
  return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('default', ['browserSync', 'sass'], function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task('deploy', [], function() {
  return surge({
    project: './',
    domain: 'theelminn.com'
  })
});