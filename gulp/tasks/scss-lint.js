module.exports = ({ config, gulp, postcss, stylelint, reporter }) => {
    
    const { src, task } = gulp;

    task('scss-lint', () => {

        const lint = 
            src(config.styles.watch)
            .pipe(postcss([
                stylelint(), 
                reporter({
                  clearMessages: true,
                  throwError: false
                })
            ], {syntax: require('postcss-scss')}))

        return lint;

    });
};