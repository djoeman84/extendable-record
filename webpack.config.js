/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var PROD = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'source-map',
  entry: [
    './bin/bower_root.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: PROD ? 'bundle.min.js' : 'bundle.js',
    publicPath: '/',
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [
          /node_modules/,
        ],
      },
    ],
  },
};
