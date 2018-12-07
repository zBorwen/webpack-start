const path = require('path')
const rm = require('rimraf')
const Webpack = require('webpack')

// 打包优化 第三方依赖打包一次
const dllWebpackConf = {
  context: path.resolve(__dirname, '../'),
  entry: {
    vendor: ['vue']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist/dll'),
    library: '[name]'
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.join(__dirname, '../dist/dll', '[name]-manifest.json'),
      name: '[name]'
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  ]
}

rm(path.resolve(__dirname, '../dist/dll'), err => {
  if (err) throw err
  Webpack(dllWebpackConf, (err, state) => {
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
