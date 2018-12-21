const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')

exports.styleLoaders = (mode) => {
  const postLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss'
    }
  }

  const extractCss = mode === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader
  const loaders = [
    // 这里匹配 `<style module>`
    {
      resourceQuery: /module/,
      use: [
        extractCss,
        {
          loader: 'css-loader',
          options: {
            sourceMap: config.dev.sourceMap,
            modules: true,
            localIdentName: '[local]_[hash:base64:5]'
          }
        },
        postLoader
      ]
    },
    {
      use: [
        extractCss,
        'css-loader',
        postLoader
      ]
    }
  ]
  return [{
    test: /\.css$/,
    oneOf: loaders
  }]
}
