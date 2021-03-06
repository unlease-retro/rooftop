const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../app'),
  dist: path.join(__dirname, '../public'),
  static: path.join(__dirname, '../static'),
  img: path.join(__dirname, '../static/img'),
  components: 'shared/components',
  style: 'shared/style',
}

module.exports = {

  devtool: 'cheap-module-source-map',

  profile: true,

  entry: [ 'regenerator-runtime/runtime', PATHS.src ],

  output: {
    path: PATHS.dist,
    filename: '[name].[hash].js',
    publicPath: '/'

  },

  resolve: {
    root: PATHS.src,
    alias: {
      components: PATHS.components,
      style: PATHS.style,
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new CleanWebpackPlugin([ PATHS.dist ], { root: process.cwd() }),
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
    new CopyPlugin([ { from: PATHS.img } ]),
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
