const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const utils = require('./utils')
const config = require('./config')
const BaseWebpackConf = require('./webpack.base.conf')

module.exports = (env, argv) => {
  return merge(BaseWebpackConf, {
    output: {
      filename: 'static/js/[name].[chunkhash:8].js'
    },
    module: {
      rules: utils.styleLoaders(argv.mode)
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: config.build.sourceMap
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      // 长缓存
      new webpack.NamedChunksPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].min.css',
        chunkFilename: 'static/css/[name].[contenthash:5].min.css'
      })
    ]
  })
}
