module.exports = ({ config, gulp, webpackStream, webpack, babel, concat, sourcemaps, browserSync }) => {
    
    const { src, task, dest } = gulp;

    // let webpackConfig = config.webpack.development;
  	// if ( process.env.NODE_ENV === 'production' ){
  	// 	webpackConfig = config.webpack.production;
	//   }
	  
	const webpackConfig = process.env.NODE_ENV === "production" ? "../../webpack.config.prod.js" : "../../webpack.config.js";

	// run webpack to compile the script into a bundle
	function compile(done) {
		return new Promise((resolve, reject) => {
			webpack(require(webpackConfig), (err, stats) => {
				if (err) {
					return reject(err);
				}

				if (stats.hasErrors()) {
					return reject(new Error(stats));
				}
				resolve();
			});
		});
	}

	task('js', compile)

    // task('js', () => {


    // 	const js = 
	// 			src(config.scripts.src, {  sourcemaps: true })
	// 			.pipe(webpackStream({
	// 				output: {
	// 					filename: '[name].js',
	// 				},
	// 				module: {
	// 					rules: [
	// 						{
	// 							test: /\.js$/,
    //     						exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
	// 							use: ['babel-loader']
	// 						}
	// 					]
	// 				}
	// 			}, webpack))
	// 			.pipe(babel({
	// 				presets: ['@babel/env']
	// 			}))
	// 			.pipe(concat('main.js'))
	// 			.pipe(dest(config.scripts.dest))
	// 			.pipe(browserSync.stream())

    //     return js;

    // });
};