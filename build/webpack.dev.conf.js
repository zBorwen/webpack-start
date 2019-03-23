const path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./utils')
const config = require('./config')
const baseWebpackConfig = require('./webpack.common.conf')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders(process.env.NODE_ENV)
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: config.dev.port,
    host: config.dev.host,
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(__dirname, '../src/index.html')
      }]
    },
    compress: true,
    overlay: {
      warning: true
    },
    quiet: true,
    hot: true,
    open: true,
    proxy: {},
    publicPath: '/'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`],
      },
      onErrors: config.dev.notifyOnErrors ?
        utils.createNotifierCallback() : undefined
    })
  ]
})