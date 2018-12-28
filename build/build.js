const webpackProdConf = require('./webpack.prod.conf')
const path = require('path')
const rm = require('rimraf')
const Webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  // 开启打包分析
  isAnalyzer: process.env.npm_config_report,
  isSourceMap: false
}

if (config.isAnalyzer) {
  webpackProdConf.plugins.push(new BundleAnalyzerPlugin())
}

webpackProdConf.plugins.push(new Webpack.optimize.UglifyJsPlugin({
  // 删除生产环境的console dubugg语句
  compress: {
    warnings: false,
    drop_debugger: true,
    drop_console: true
  },
  sourceMap: config.isSourceMap,
  // 并行处理 加速打包
  parallel: true,
  // 开启缓存
  cache: true
}), )

// dll renfrence 引用 写多个
webpackProdConf.plugins.push(
  new Webpack.DllReferencePlugin({
    manifest: require('../dist/dll/vendor-manifest.json')
  })
)

rm(path.resolve(__dirname, '../dist/static'), err => {
  if (err) throw err
  Webpack(webpackProdConf, (err, state) => {
    if (err) throw err
    process.stdout.write(state.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
})