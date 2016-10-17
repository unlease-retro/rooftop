const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../app'),
  dist: path.join(__dirname, '../public'),
  static: path.join(__dirname, '../static'),
}

module.exports = {

  devtool: 'eval',

  entry: [ PATHS.src ],

  output: {
    path: PATHS.dist,
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({ favicon: path.resolve(PATHS.static, 'favicon.ico'), template: path.resolve(PATHS.static, 'index.html') })
  ],

  devServer: {
    contentBase: PATHS.dist,
    port: 3000,
    inline: true,
    stats: 'errors-only',
    historyApiFallback: true
  },

  eslint: {
    configFile: './config/.eslintrc.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel?cacheDirectory', 'eslint' ]
      }
    ]
  },

}
