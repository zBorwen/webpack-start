/* eslint-disable */
const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')

// 获取对应的页面路径 pages
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

/**
 * 获取pages底下对应的js作为入口文件
 */
exports.setPages = configs => {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')

  return entryFiles.reduce((cfp, pfp) => {
    let filename = pfp.substring(pfp.lastIndexOf('\/') + 1, pfp.lastIndexOf('.'))
    let tmp = pfp.substring(0, pfp.lastIndexOf('\/'))

    let conf = {
      entry: pfp,
      template: tmp + '.html', // 模板路径
      filename: filename + '.html', // 生成 html 的文件名
      chunks: ['chunk-vendors', 'chunk-common', filename],
      title: filename,
      inject: true
    }

    /**
     * 自定义配置合并
     */
    if (configs) {
      conf = merge(conf, configs)
    }

    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true, // 删除 html 中的注释代码
          collapseWhitespace: true, // 删除 html 中的空白符
          // removeAttributeQuotes: true // 删除 html 元素中属性的引号
        },
        chunksSortMode: 'manual' // 按 manual 的顺序引入
      })
    }
    cfp[filename] = conf
    return cfp
  }, {})
}
