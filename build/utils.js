const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')
const packageConfig = require('../package.json')

exports.styleLoaders = (mode) => {
  const postLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss'
    }
  }

  const extractCss = mode === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader
  const cssLoaders = [
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

  const scssLoader = [
    'vue-style-loader',
    'css-loader',
    'sass-loader'
  ]

  // 只想在某些 Vue 组件中使用 CSS Modules，你可以使用 oneOf 规则并在 resourceQuery 字符串中检查 module 字符串
  return [{
    test: /\.css$/,
    oneOf: cssLoaders
  }, {
    test: /\.scss$/,
    use: scssLoader
  }]
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
