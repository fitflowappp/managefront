var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('stylesheets/app.css');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        common: [
            'webpack-hot-middleware/client',
            './src/index',
            './src/dist/stylesheets/app.css'
        ],
    //     style: [
    //         'webpack-hot-middleware/client',
    //          './src/dist/stylesheets/app.css']
    },
    output: {
        path: path.join(__dirname, 'src/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env.BROWSER': true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        extractCSS,
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            // host: 'localhost',
            // port: 3001,
            // server: { baseDir: ['public'] }
            proxy: 'localhost:3001'
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
            { test: /\.css$/i, loader:extractCSS.extract(['css'])},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    }
};


