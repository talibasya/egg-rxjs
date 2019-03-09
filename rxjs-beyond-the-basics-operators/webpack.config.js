const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'app', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      include: [
        path.resolve(__dirname, 'app')
      ],
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};