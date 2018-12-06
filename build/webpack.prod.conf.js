const utils = require('./utils')
const baseWebpackConf = require('./webpack.common.conf')

const path = require('path')
const glob = require('glob-all');
const Webpack = require('webpack')
const merge = require('webpack-merge')
const PurifyCSSPlugin = require('purifycss-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')

module.exports = merge(baseWebpackConf, {
  // 生产环境切换为chunkhash
  output: {
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  module: {
    rules: utils.styleLoaders(process.env.NODE_ENV)
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'static/css/app.min.css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    // css tree-shaking
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, '../*.html'),
        path.join(__dirname, '../src/*.js')
      ]),
    }),
    // js tree-shaking
    new Webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      // 并行处理 加速打包
      parallel: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // 引入的项目依赖
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // webpack 运行生成代码
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // 提前插入固定的chunk 减少请求
    new HtmlInlineChunkPlugin({
      inlineChunks: ['manifest']
    }),
    // 异步引入模块
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new CleanWebpackPlugin(['../dist']),
  ]
})
