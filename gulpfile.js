'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

var PORT = 3000;

gulp.task('default', ['webpack-dev-server']);

gulp.task('build', ['webpack:build']);

gulp.task('webpack-dev-server', function (cb) {
    var myConfig = Object.create(webpackConfig);
    myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + PORT, 'webpack/hot/dev-server'); // for inline refresh webpack dev server
    //myConfig.devtool = "sourcemap";
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

gulp.task('webpack:build', function (cb) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        cb();
    });
});
