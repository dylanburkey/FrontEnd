module.exports = {
	styles: {
        src: ['./source/css/*.scss'],
        dest: './public/dist',
        watch: ['source/css/*.scss', 'source/css/**/*.scss']
    },
    scripts: {
        src: ['./source/js/*.js'],
        dest: './public/dist',
        watch: ['source/js/*.js', 'source/js/**/*.js']
    },
    images: {
        src: ['./source/images/*.{jpg,jpeg,png,svg,gif}'],
        dest: './public/images',
        watch: ['source/images/*.{jpg,jpeg,png,svg,gif}', 'source/images/**/*.{jpg,jpeg,png,svg,gif}']
    },
    fonts: {
        src: ['./source/fonts/*.{eot,svg,woff2,woff,ttf}'],
        dest: './public/dist/fonts',
        watch: ['source/fonts/*.{eot,svg,woff2,woff,ttf}', 'source/fonts/**/*.{eot,svg,woff2,woff,ttf}']
    },
    jekyll: {
        default: '_config.yml',
        development: '_config.yml,_config.development.yml',
        watch: [
            './source/schema/**/*.yml',
            './source/data/*.json',
            './source/data/*.yml',
            './source/data/**/*.json',
            './source/data/**/*.yml',
            './source/views/**/*.html',
            './source/views/**/*.md'
        ]
    },
    browserSync: {
        baseDir: './public',
        startPath: './'
    },
    webpack: {
        development: {
            mode: 'development'
        },
        production: {
            mode: 'production'
        }
    }
}