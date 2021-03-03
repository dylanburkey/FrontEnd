const path = require("path");
const outputDir = path.resolve(__dirname, "public/dist");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "source/js/main.js"),
    output: {
        path: outputDir,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(swiper|ssr-window|dom7)\/).*/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        concatenateModules: true,
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: 4,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};