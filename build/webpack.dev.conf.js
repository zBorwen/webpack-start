const path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common.conf')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders(process.env.NODE_ENV)
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8000,
    host: 'localhost',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(__dirname, '../src/index.html') }
      ]
    },
    compress: true,
    overlay: {
      warning: true
    },
    hot: true,
    open: true,
    proxy: {},
    publicPath: '/'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
  ]
})