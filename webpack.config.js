var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './bin/bower_root.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [
          /node_modules/,
        ],
      },
    ]
  }
};
