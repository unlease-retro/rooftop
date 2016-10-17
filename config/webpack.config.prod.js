const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../app'),
  dist: path.join(__dirname, '../public'),
  static: path.join(__dirname, '../static'),
}

module.exports = {

  devtool: 'source-map',

  profile: true,

  entry: [ PATHS.src ],

  output: {
    path: PATHS.dist,
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({ favicon: path.resolve(PATHS.static, 'favicon.ico'), template: path.resolve(PATHS.static, 'index.html') })
  ],

  eslint: {
    configFile: './config/.eslintrc.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel', 'eslint' ]
      },
    ]
  },

}
