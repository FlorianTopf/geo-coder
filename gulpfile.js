'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const server = require('gulp-develop-server');
const del = require('del');

const config = {
    srcFiles: './src/**/*.ts',
    distDir: './dist'
};

gulp.task('default', ['ts']);

gulp.task('ts', ['clean'], function() {
    const tsProject = ts.createProject('tsconfig.json');
    return gulp.src(config.srcFiles)
        .pipe(tsProject())
        .pipe(gulp.dest(config.distDir));
});

gulp.task('tslint', function() {
    return gulp.src(config.srcFiles)
        .pipe(tslint({formatter: 'verbose'}))
        .pipe(tslint.report())
});

gulp.task('clean', function(callback) {
    return del([
        './dist/**',
        '!./node_modules/**',
        '!./gulpfile.js',
        '!./bin/**',
        '!./src/**'
    ], callback);
});

gulp.task('server:start', ['default'], function() {
    server.listen({path: './bin/www'}, function(error) {
        if (error) {
            console.log(error);
        }
    });
});

gulp.task('server:restart', function() {
    const tsProject = ts.createProject('tsconfig.json');
    gulp.src(config.srcFiles)
        .pipe(tsProject())
        .pipe(gulp.dest(config.distDir))
        .pipe(server())
});

gulp.task('develop', ['server:start'], function() {
    gulp.watch(config.srcFiles, ['server:restart']);
});
