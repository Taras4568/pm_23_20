import gulp from 'gulp';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import inject from 'gulp-inject';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';

import copy from 'gulp-copy';

const sassCompiler = gulpSass(sass);


gulp.task('html', function () {
    const sources = gulp.src(['dist/image/*'], { read: false });
    return gulp.src('app/*.html')
        .pipe(inject(sources, { ignorePath: 'dist', addRootSlash: false })) 
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});


gulp.task('scss', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('dist/css')) 
        .pipe(browserSync.stream()); 
});
gulp.task('bootstrap', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ], { base: 'node_modules/bootstrap/dist', allowEmpty: true }) 
        .pipe(gulp.dest('dist')); 
});



gulp.task('scripts', function () {
    return gulp.src('app/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('dist/js')) 
        .pipe(browserSync.stream()); // Оновлення браузера
});


gulp.task('images', function () {
    return gulp.src ( "app/img/*.+(jpg|jpeg|png|gif)", { encoding: false })
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest('dist/image'))
});

// Watcher для відстеження змін
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
    gulp.watch('app/*.html', gulp.series('html')).on('change', browserSync.reload); // Watch HTML
    gulp.watch('app/scss/*.scss', gulp.series('scss')); // Watch SCSS
    gulp.watch('app/js/*.js', gulp.series('scripts')); // Watch JS
    gulp.watch('app/image/*.+(jpg|jpeg|png|gif)', gulp.series('images')); // Watch Images
});

// Default task
gulp.task('default', gulp.series('html','bootstrap', 'scss', 'scripts', 'images', 'watch'));