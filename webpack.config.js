'use strict';
var path = require('path');

var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var baseConfig = {
    evtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:
                {
                    presets:['react','es2015']
                }
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
        app: './public/jsx/app.jsx'
    },
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    postcss: [
        autoprefixer({browsers: ['> 3%', 'last 2 versions']})
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

module.exports = baseConfig;
