'use strict';
var gulp = require('gulp');
var clean = require('gulp-clean');
var gls = require('gulp-live-server');

gulp.task('default', ['js_html'], function () {
    gulp.watch([
        'src/lib.js',
        'src/index.html'
    ], ['js_html']);

    gulp.watch([
        'src/animation.css'
    ], ['css']);

    var server = gls.static('dist', 3001);
    server.start();
    gulp.watch(['dist/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('clean-scripts', function () {
    return gulp.src('dist').pipe(clean({read: false}));
});

gulp.task('js_html', function () {
    return gulp.src([
        './src/index.html',
        './src/lib.js'
    ], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

gulp.task('publish', function () {
    return gulp.src([
        './src/lib.js'
    ], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});
