// 公共变量
const com = {
  IP: JSON.stringify('xxx')
}

module.exports = {
  // 开发环境变量
  dev: {
    env: {
      TYPE: JSON.stringify('dev'),
      // 使用JSON.stringify处理对象（拷贝） BASE_URL: '/vue'在merge时会把 /vue看成一个变量去读取 发生报错
      // BASE_URL: '"/vue"',
      ...com
    }
  },

  // 生产环境变量
  build: {
    env: {
      TYPE: JSON.stringify('prod'),
      ...com
    }
  }
}
