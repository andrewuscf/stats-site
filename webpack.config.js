require('es6-promise').polyfill();
var path = require('path');

var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var baseConfig = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|static\/vendor/,
                loader: 'babel-loader'
            },
            {
                id: 'sass-loader-config',
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap')
            }
        ]
    },
    entry: {
        app_style: './public/scss/app.scss',
        home: './public/jsx/app.jsx'
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({ browsers: ['> 3%', 'last 2 versions'] })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'vendor': path.join(__dirname, 'static/vendor')
        }
    }
};

module.exports = baseConfig;
