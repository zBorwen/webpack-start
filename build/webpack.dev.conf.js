const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('./config')
const BaseWebpackConf = require('./webpack.base.conf')

module.exports = (env, argv) => {
  return merge(BaseWebpackConf, {
    module: {
      rules: utils.styleLoaders(argv.mode)
    },
    devtool: config.dev.devtool,
    devServer: {
      port: 8000,
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
      hot: true,
      open: true,
      proxy: config.dev.proxyTable,
      publicPath: config.dev.publicPath
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  })
}
