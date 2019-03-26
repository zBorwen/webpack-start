const merge = require('webpack-merge')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const configs = require('./config')
const cfg = process.env.NODE_ENV === 'development' ? configs.dev.env : configs.build.env

module.exports = {
  chainWebpack: config => {
    // 注入到browser环境中
    config.plugin('define')
      .tap(args => {
        let name = 'process.env'
        args[0][name] = merge(args[0][name], cfg)
        return args
      })
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        'files': ['**/*.{html,vue,css,sass,scss}'],
        'fix': true,
        'cache': false,
        'emitErrors': true,
        'failOnError': false
      })
    ]
  }
}