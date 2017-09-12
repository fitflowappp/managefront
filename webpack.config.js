var path = require('path')
var webpack = require('webpack')
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'src/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            minimize: true,
            sourceMap: true,
            // mangle: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env.BROWSER': true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader', 'babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            // // SASS
            // {
            //     test: /\.scss$/,
            //     loaders: ["style", "css", "sass"]
            // }
        ]
    }
};


