module.exports = ({ config, gulp, sass, sourcemaps, postcss, autoprefixer, presetenv, minifyCSS, browserSync }) => {
    
    const { src, task, dest } = gulp;

    sass.compiler = require('node-sass');

    task('css', () => {

        const css = 
            src(config.styles.src, {  sourcemaps: true })
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss([ autoprefixer({ grid: 'autoplace' }), presetenv() ]))
            .pipe(minifyCSS())
            .pipe(sourcemaps.write('.'))
            .pipe(dest(config.styles.dest))
            .pipe(browserSync.stream())

        return css;

    });
};