import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import browsersync from 'browser-sync';

const { src, dest, watch, series, parallel } = gulp;
const sass = gulpSass(dartSass);
const browserSync = browsersync.create();

// Таск для HTML
function htmlTask() {
    return src('app/html/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Таск для SCSS
function scssTask() {
    return src('app/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// Таск для JS
function jsTask() {
    return src('app/js/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// Таск для зображень
function imgTask() {
    return src('app/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/imgs'))
        .pipe(browserSync.stream());
}

// Налаштування BrowserSync
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    cb();
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}


function watchTask() {
    watch('app/html/*.html', htmlTask);
    watch('app/scss/*.scss', scssTask);
    watch('app/js/*.js', jsTask);
    watch('app/img/*', imgTask);
    watch('dist/*.html', browserSyncReload);
}


export default series(
    parallel(htmlTask, scssTask, jsTask, imgTask),
    browserSyncServe,
    watchTask
);
