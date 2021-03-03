module.exports = ({ config, gulp }) => {
    const { src, task, dest } = gulp;
    task('fonts', () => {
    	const fonts = 
				src(config.fonts.src)
				.pipe(dest(config.fonts.dest))
        return fonts;
    });
};