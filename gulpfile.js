'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackDevConfig = require('./webpack.dev.config');
var WebpackDevServer = require('webpack-dev-server');
var babel = require('gulp-babel');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

var PORT = 3000;

gulp.task('default', ['webpack-dev-server']);

gulp.task('build', ['compile_js', 'compile_css']);

gulp.task('compile_js', function () {
    return gulp.src('src/ScrollView.jsx')
        .pipe(babel({}))
        .pipe(gulp.dest('dist'));
});

gulp.task('compile_css', function () {
    return gulp.src('src/style.less')
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev-server', function (cb) {
    var myConfig = Object.create(webpackDevConfig);
    myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + PORT, 'webpack/hot/dev-server'); // for inline refresh webpack dev server
    myConfig.devtool = "eval";
    myConfig.debug = true;

    myConfig.plugins = myConfig.plugins.concat(
        new webpack.HotModuleReplacementPlugin()
    );

    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        hot: true,
        stats: {
            colors: true
        }
    }).listen(PORT, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:" + PORT + "/webpack-dev-server/index.html");
        // keep the server alive or continue?
        cb();
    });
});
