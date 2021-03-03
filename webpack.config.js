const path = require("path");
const outputDir = path.resolve(__dirname, "public/dist");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "source/js/main.js"),
    devtool: "inline-source-map",
    output: {
        path: outputDir,
        filename: '[name].js',
    },
    devtool: 'source-map',
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
    }
};