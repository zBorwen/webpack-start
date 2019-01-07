### webpack3 搭建vue瞎折腾

![webpack](https://user-gold-cdn.xitu.io/2018/3/19/1623bfac4a1e0945?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

> 使用vue开发项目但是之前对webpack的配置基本不了解，碰到特定的需求基本就傻眼了，所以专门好好学习了一下webpack，虽然对于loader，plugin的编写没有去深入了解，对于基本的配置以及优化有了一定的了解。
>
> webpack3的特性（4x已经出了快一年了，哈哈还在折腾3）
>
> Scope Hoisting 作用域提升 webpack3学习了Closure Compiler和RollupJS，连接所有闭包到一个闭包里，放入一个函数，让执行速度更快,并且整体代码体积也会有所缩小，在打包的时候可以观察一下写的函数和之前打包的有什么不同
>
> magic comments 魔法注释 针对动态引入的文件没有chunkname，以前使用require.ensure 在以前的vue项目中经常看到 webpack3添加了此特性
>
> import(/* webpackChunkName: name */ 'xxx')
>
> tree shaking 在打包的流程中会将使用以及未使用的进行标记，使用purifycss-webpack、UglifyJsPlugin来进行css，js的tree shaking打包剔除无用代码



####  webpack基本概念

**entry**

在构建的起始webpack会读取入口文件，解析依赖进行打包。可以从图中看的出来，常见的单页应用入口文件就一个，多页应用就需要配置多个入口。配置的写法很多种，最好给入口文件起一个名字，这样在打包的时候可以看到具体的chunkName

```js
module.exports = {
    entry: 'main.js'
}

module.exports = {
    entry: {
        main: 'main.js'
    }
}
// 多页面
module.exports = {
    entry: {
        pageA: 'index.js',
        pageB: 'main.js'
    }
}
```



**output**

webpack的输出就是最终构建出来的文件输出的路径，文件名。入口文件经过loader，plugin的处理会生成不同的静态文件。



**loaders**

webpack中处理多种文件的机制loader，ES6 module，Babel处理，css预处理语言，模板引擎，图片等等不同的类型的文件都可以通过loader的rules配置转换成我们所需要的文件格式，支持webpack的多样性。感觉还是很有必要学习如何去开发loader，可能某一天有一种转换需要我们自己去写...



**plugins**

在webpack的构建流程中，loader负责模块代码的转换，plugin负责处理构建流程的中特定的工作，比如代码压缩、份割、复制静态文件、提取公用代码、模板的生成等等。同样plugin贯穿于webpack的构建流程中。与loader一样还是有必要去学习开发plugin。



#### webpack手动搭建vue单页应用

很多人肯定刚开始都是在使用官方的脚手架工具，通过一段时间的使用我发现了很多潜在的问题，比如编译有点慢，需要添加一些其它的loader，打包速度能不能快一点，如果我项目现在变成了多入口应该如何调整，甚至要自己写loader与plugin，面对这些问题，有木有很难受。通过手动搭建vue项目去更加的了解webpack的使用以及vue-loader的配置，优化代码提升效率，面对不同的需求更好的去处理。



#### 优化

- 公共模块

  CommonsChunkPlugin 多`entry` 提取公共代码，第三方依赖，webpack生成代码，异步模块common模块，在vue-cli中的写法可以参考，下面具体介绍一下

  ```js
  module.exports = {
      entry: {
          main: './src/main'
      },
      plugins: [
          // 第三方依赖 minChunks参数做为函数更加的灵活如果没有在entry中设置 vendor 下面的操作会帮助我们将业务代码与第三方依赖分离
          new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
              // any required modules inside node_modules are extracted to vendor
              return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
            }
          }),
          // webpack 运行生成代码
          // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
          new Webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            minChunks: Infinity
          })
      ]
  }
  ```

  ```js
  module.exports = {
      entry: {
          pageA: './src/pageA',
          pageB: './src/pageB',
          vendor: ['loadsh']
      },
      plugins: [
          // 1. 多个入口文件可以通过配置chunk指定文件将相同的代码提取出来 如果不指定chunks会报错
          new webpack.optimize.CommonsChunkPlugin({
              name: 'common',
              minChunks: 3,
              // 指定文件
              chunks: ['pageA', 'pageB']
          }),
          // 2. 第三方依赖代码与公共代码一起打包
          new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor',
              minChunks: Infinity
          }),
          // 3. 区分webpack生成的与第三方依赖
          new webpack.optimize.CommonsChunkPlugin({
              name: 'runtime',
              minChunks: Infinity
          })
          // 2,3 可以写到一个配置中 通过names配置
          new webpack.optimize.CommonsChunkPlugin({
              names: ['vendor', 'runtime'],
              minChunks: Infinity
          })
      ]
  }
  ```

  另外的配置 `children` `deepChildren` 表示chunk的子模块是否会被选择， chunk 的后代模块是否会被选择。配合`async` 使用异步加载。假如两个异步加载的模块中有公共的代码模块，打包的时候如果没有设置异步引入的chunkname，异步模块中的公共代码就会被打包进自己的模块中。

  ```js
  // pageA
  import utils from './utils'
  
  // pageB
  import utils from './utils'
  
  // utils
  function common() {
      return 'common'
  }
  
  // main 动态引入
  import(/*webpackChunkName: "pageA"*/'./pageA')
  import(/*webpackChunkName: "pageB"*/'./pageB')
  // 或者 懒加载
  // require.ensure(['./pageA.js'], function() {
  //     const pageA = require('./pageB.js')
  // }, 'pageA')
  
  // require.ensure(['./pageB.js'], function() {
  //     const pageB = require('./pageB.js')
  // }, 'pageB')
  ```

  ```js
  module.exports = {
      entry: {
          main: '/src/main'
      },
      plugins: [
          new Webpack.optimize.CommonsChunkPlugin({
              // name 入口文件名字一致
              name: 'main',
              async: 'vendor-async',
              children: true,
              minChunks: 3
          })
      ]
  }
  ```

  如果没有设置children， async对于动态加载的模块与懒加载的模块中的相同代码就会被打包进各自的包，导致重复打包。还有一点需要注意 **对于动态与懒加载的chunk设置chunkName**  避免打包的时候分不清是一个模块。webpack4中使用 [*SplitChunksPlugin*](https://webpack.docschina.org/plugins/split-chunks-plugin/) 代替 *CommonChunkPlugin*



- 代码分割、懒加载

  代码分割的方式有两种，第一个是webpack中特有的 `require.ensure` 以及 动态`import()` 

  > *tips*: 以上都需要支持 *promise* 如果不支持需要手动加载必要的 *polyfill* 

  分离业务代码与第三方依赖，首次加载与访问后加载

  ```js
  // 针对不同的条件引入对应的模块
  if(condition) {
      require.ensure(['./moduleA'], function() {
          const moduleA = require('./moduleA')
      }, 'moduleA')   
  } else {
      require.ensure(['./moduleB'], function() {
          const moduleB = require('./moduleB')
      }, 'moduleB')
  }
  
  // 分离业务代码与第三方库
  import Vue from 'vue'
  import(/*webpackChunkName: lodash*/'lodash').then(() => // 执行...)
  // 或者
  require.ensure(['lodash'], function() {
      const _ = require('lodash')
      // 执行...
  }, 'lodash')
  ```

  *require.ensure* 都可以使用动态 *import* 替换

  ```js
  // require.include 直接看官网的例子
  require.include('a');
  require.ensure(['a', 'b'], function(require) { /* ... */ }, ['a', 'b']);
  require.ensure(['a', 'c'], function(require) { /* ... */ }, ['a', 'c']);
  // entry chunk: file.js and a
  // anonymous chunk: b
  // anonymous chunk: c
  ```

  简单的来说其实和提取公共代码类似，在引入的两个模块中都存在相同的模块，那么可以在引用之前通过 *require.include* 以前引入 打包的结果就不会从重复了。

  **对于异步引入的模块提取公共代码在上面已经说过了，这里就跳过了。可以看的出来代码分割和提取公共代码有点傻傻分不清，所以更加需要多去动手实践** 

- 处理css

  `style-loader` 创建style标签

  `css-loader` 在js中可以引入css

  extract-text-webpack-plugin

- tree shaking

  purifycss-webpack

  UglifyJsPlugin

- inline-chunk

  html-webpack-inline-chunk-plugin

- 平行、缓存、长缓存

  NamedChunksPlugin

  HashedModuleIdsPlugin

- DllPlugin打包、happypack开启多线程

  DllPlugin

  DllReferencePlugin

  happypack

- Scope Hoisting

  ModuleConcatenationPlugin

- 图片压缩、雪碧图合成



1. 代码分割 动态import(需要支持promise) [magic chunk] require.ensure第三方依赖分离
2. postcss处理插件
   处理图片，字体合成雪碧图
3. 处理第三方库 providePlugin 三种方式 cdn node_modules import 结合alias
4. html-webpack-plugin生成html 插入资源
   对图片的处理 image-loader
