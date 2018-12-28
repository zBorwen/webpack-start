const utils = require('./utils')
const baseWebpackConf = require('./webpack.common.conf')

const path = require('path')
const glob = require('glob-all');
const Webpack = require('webpack')
const merge = require('webpack-merge')
const PurifyCSSPlugin = require('purifycss-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')

const webpackProdConf = merge(baseWebpackConf, {
  // 生产环境切换为chunkhash
  output: {
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  module: {
    rules: utils.styleLoaders(process.env.NODE_ENV)
  },
  plugins: [
    // 长缓存 保证相同文件进行缓存引入的模块 动态imoprt()使用magic chunkname解决
    new Webpack.NamedChunksPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/app.min.css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
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
    // js tree-shaking 选择是否需要sourceMap在插入
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      dllname: `dll/vendor.dll.js`
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
    })
  ]
})

module.exports = webpackProdConf