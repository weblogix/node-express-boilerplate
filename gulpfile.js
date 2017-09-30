const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('nodemon');
const concat = require('gulp-concat');

const cssPath = 'public/css';
const sassPath = 'src/scss/**/*.scss';
const sassIncludPaths = [
    'node_modules/foundation-sites/scss/'
];
const jsPath = [];

gulp.task('styles', () => {
  return gulp.src(sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: sassIncludPaths
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssPath))
    .pipe(livereload());
});

gulp.task('views', () => {
  return gulp.src('views/**/*.pug')
  .pipe(livereload());
});

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
  .pipe(livereload());
});

gulp.task('build-js', () => {
  return gulp.src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(sassPath, ['styles']);
  gulp.watch('views/**/*.pug', ['views']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch(jsPath, ['build-js']);
});

gulp.task('server', () => {    
  nodemon({
    script: 'index.js',
  });
});

gulp.task('dev', ['server', 'styles', 'build-js', 'watch']);
gulp.task('build', ['styles', 'build-js']);
