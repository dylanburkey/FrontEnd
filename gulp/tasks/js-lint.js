module.exports = ({ config, gulp, eslint }) => {
    
    const { src, task } = gulp;

    task('js-lint', () => {

    	const js = 
			src(config.scripts.watch)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
        
        return js;

    });
};