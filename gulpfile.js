const modules = {
    config: require('./gulp/config'),
    fs: require('fs'),
    gulp: require('gulp'),
    sass: require('gulp-sass'),
    babel: require('gulp-babel'),
    minifyCSS: require('gulp-csso'),
    autoprefixer: require('autoprefixer'),
    sourcemaps: require('gulp-sourcemaps'),
    postcss: require('gulp-postcss'),
    presetenv: require('postcss-preset-env'),
    browserSync: require('browser-sync').create(),
    stylelint: require('stylelint'),
    reporter: require('postcss-reporter'),
    webpack: require('webpack'),
    webpackStream: require('webpack-stream'),
    concat: require('gulp-concat'),
    eslint: require('gulp-eslint'),
    beautify: require('gulp-beautify'),
    path: require('path'),
    cp: require('child_process'),
    spawn: require('cross-spawn'),
    imagemin: require('gulp-imagemin')
}

const tasks = [
    "./gulp/tasks/scss",
    "./gulp/tasks/scss-lint",
    "./gulp/tasks/js",
    "./gulp/tasks/js-lint",
    "./gulp/tasks/jekyll",
    "./gulp/tasks/image-resize",
    "./gulp/tasks/fonts",
    "./gulp/tasks/build",
    "./gulp/tasks/watch"
];

tasks.forEach(function (path) {
    require(path)(modules);
});