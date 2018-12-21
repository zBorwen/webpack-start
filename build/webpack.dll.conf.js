const path = require('path')
const rm = require('rimraf')
const Webpack = require('webpack')

const dllWebpackConf = {
  entry: {
    vendor: ['vue/dist/vue.esm.js']
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
