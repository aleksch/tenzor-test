var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    babel = require('gulp-babel');

gulp.task('browser-sync', function () {
    browsersync({
        server: {
            baseDir: 'public'
        },
        notify: false
    })
});

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.*')
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
        .pipe(gulp.dest('public/css'))
        .pipe(browsersync.reload({ stream: true }))
});

gulp.task('js', function () {
    return gulp.src([
        'app/js/jquery.min.js',
        'app/js/classes/Battleground.js',
        'app/js/classes/Player.js',
        'app/js/classes/AIPlayer.js',
        'app/js/classes/HumanPlayer.js',        
        'app/js/classes/GameController.js',
        'app/js/common.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browsersync.reload({ stream: true }))
});

gulp.task('watch', ['sass', 'js', 'html', 'browser-sync'], function () {
    gulp.watch('app/sass/**/*.*', ['sass']);
    gulp.watch(['app/js/**/*.js'], ['js']);
    gulp.watch('app/*.html', ['html'])
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(gulp.dest('public/'))
        .pipe(browsersync.reload({ stream: true }));
});

gulp.task('default', ['watch']);
