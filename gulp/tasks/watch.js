module.exports = ({config, gulp, browserSync}) => {
    
    const { task, watch, series, parallel } = gulp;

    //start the server
    function start(done) {  
        browserSync.init({
            server: {
            	baseDir: config.browserSync.baseDir
            },
            startPath: config.browserSync.startPath,
            directory: false,
            notify: false,
            logFileChanges: false
        });
        done();
    }

    function reload(done) {
	  browserSync.reload();
	  done()
	}

    function watcher(done){
    	watch(config.styles.watch, series('css'))
  		watch(config.scripts.watch, series('js'))
  		watch(config.scripts.watch, series('fonts'))
        watch(config.jekyll.watch, series('jekyll', reload))
    }

    task('watch', series(start, 'build', watcher));

};