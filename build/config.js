module.exports = {
  dev: {
    host: 'localhost',
    port: '8080',
    proxyTable: {},
    publicPath: '/',
    devtool: 'cheap-module-eval-source-map',
    sourceMap: false
  },
  build: {
    sourceMap: true,
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
