const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.styleLoaders = function (env) {
  const loaders = [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        minimize: true
        // modules: true
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