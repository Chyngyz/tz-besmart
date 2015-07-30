var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var imagemin = require("gulp-imagemin");
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var clean = require('gulp-clean');
var size = require('gulp-size');

// Setup scss path
var paths = {
    scss: ['./src/scss/*.scss'],
    scssProd: './css/*.css',
    jsSrc: ['./src/js/*.js', '!./src/js/vendor/*.js'],
    jsProd: './js/**/*.js',
    jsVendor: './src/js/vendor/*.js',
    img: './src/img/*'
};

// Clean css
gulp.task('clean-sass', function () {
    return gulp.src(paths.scssProd, {read: false})
        .pipe(clean());
});

// Sass task
gulp.task('sass', ['clean-sass'], function() {
    return gulp.src(paths.scss)

        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(plumber())
        .pipe(gulp.dest('./css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./css')) 
        /* Reload the browser CSS after every change */
        .pipe(reload({
            stream: true
        }));
});

// Clean js
gulp.task('clean-scripts', function () {
  return gulp.src(paths.jsProd, {read: false})
    .pipe(clean());
});


// JS task
gulp.task('scripts',['clean-scripts'], function() {
    // Copy vendors
    gulp.src(paths.jsVendor).pipe(gulp.dest('./js/vendor'));

    // Concat minify js
    return gulp.src(paths.jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// Images task
gulp.task('images', function() {
    return gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'));
});


// Reload task
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// BrowserSync server at localhost:3000 
gulp.task('browser-sync', function() {
    browserSync.init(['./css/*.css', './js/**/*.js', 'index.html'], {
        server: {
            baseDir: './'
        }
    });
});

// View total size
gulp.task('stats', function () {
    var s = size();
    return gulp.src([paths.scssProd, paths.jsProd,'./img/*', './*.html'])
        .pipe(s)
        .pipe(notify({
            onLast: true,
            message: function () {
                return 'Total size ' + s.prettySize;
            }
        }));
});

// Clean
gulp.task('clean', ['clean-sass', 'clean-scripts']);


// Default task
gulp.task('default', ['sass', 'browser-sync', 'scripts', 'images'], function() {
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.img, ['images']);
    gulp.watch(['./*.html'], ['bs-reload']);
});
