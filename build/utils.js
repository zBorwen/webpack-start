const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.styleLoaders = function (env) {
  const loaders = [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        minimize: true,
        // 开启css-modules
        modules: false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss'
      }
    }
  ]
  if (env === 'development') {
    return [{
      test: /\.css$/,
      use: loaders
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