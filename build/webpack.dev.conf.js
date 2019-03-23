const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('./config')
const BaseWebpackConf = require('./webpack.base.conf')
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = (env, argv) => {
  return merge(BaseWebpackConf, {
    module: {
      rules: utils.styleLoaders(argv.mode)
    },
    devtool: config.dev.devtool,
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
        warnings: false,
        errors: true
      },
      clientLogLevel: 'none',
      hot: true,
      open: true,
      proxy: config.dev.proxyTable,
      publicPath: config.dev.publicPath,
      quiet: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() : undefined
      }),
      new StyleLintPlugin({
        'files': ['**/*.{html,vue,css,scss,sass}'],
        'fix': true,
        'cache': false,
        'emitErrors': true,
        'failOnError': false
      })
    ]
  })
}
