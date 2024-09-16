const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


async function loadImagemin() {
  return (await import('gulp-imagemin')).default;
}

const paths = {
  html: 'app/**/*.html',
  scss: 'app/scss/**/*.scss',
  js: 'app/js/**/*.js',
  img: 'app/img/**/*',
};

function htmlTask() {
  return gulp.src(paths.html)
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
}

function scssTask() {
  return gulp.src(paths.scss)
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
}

function jsTask() {
  return gulp.src(paths.js)
      .pipe(concat('script.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
}

async function imgTask() {
  const imagemin = await loadImagemin();
  return gulp.src(paths.img)
      .pipe(imagemin())
      .pipe(gulp.dest('dist/imgs'));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch(paths.html, htmlTask);
  gulp.watch(paths.scss, scssTask);
  gulp.watch(paths.js, jsTask);
  gulp.watch(paths.img, imgTask);
}


exports.htmlTask = htmlTask;
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.serve = serve;

exports.default = gulp.series(
  gulp.parallel(htmlTask, scssTask, jsTask, imgTask),
  serve
);
