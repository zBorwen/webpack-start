const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.styleLoaders = function (env) {
  const loaders = [
    // 这里匹配 `<style module>`
    {
      resourceQuery: /module/,
      use: [
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss'
          }
        }
      ]
    },
    // 这里匹配普通的 `<style>` 或 `<style scoped>`
    {
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss'
          }
        }
      ]
    }
  ]
  if (env === 'development') {
    return [{
      test: /\.css$/,
      oneOf: loaders
    }]
  } else {
    const extracts = ExtractTextPlugin.extract({
      fallback: 'vue-style-loader',
      use: loaders
    });
    return [{
      test: /\.css$/,
      use: extracts
    }]
  }
}