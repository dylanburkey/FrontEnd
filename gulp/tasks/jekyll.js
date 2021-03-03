module.exports = ({ config, gulp, spawn }) => {
    
    const { task } = gulp;

    function jekyll () {
   
    	let jekyllConfig = config.jekyll.development;
    	if ( process.env.NODE_ENV === 'production' ){
    		jekyllConfig = config.jekyll.default;
    	}
		return spawn('bundle', [
				'exec',
				'jekyll',
				'build',
				'--config',
				jekyllConfig
			], {
				env: process.env,
				stdio: 'inherit'
			})
		}

		task('jekyll', jekyll);
};