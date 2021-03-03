module.exports = ({ config, gulp, imageResize, rename, imagemin }) => {
    
    const { src, task, dest } = gulp;

    task('image-resize', done => {
        gulp.src(config.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    {
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: true
                    }
                ]
            })
        ]))
        .pipe(gulp.dest(config.images.dest))
        done();
    });
};