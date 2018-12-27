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



**loader**

webpack中处理多种文件的机制loader，ES6 module，Babel处理，css预处理语言，模板引擎，图片等等不同的类型的文件都可以通过loader的rules配置转换成我们所需要的文件格式，支持webpack的多样性。感觉还是很有必要学习如何去开发loader，可能某一天有一种转换需要我们自己去写...



**plugins**

在webpack的构建流程中，loader负责模块代码的转换，plugin负责处理构建流程的中特定的工作，比如代码压缩、份割、复制静态文件、提取公用代码、模板的生成等等。同样plugin贯穿于webpack的构建流程中。与loader一样还是有必要去学习开发plugin。



#### webpack手动搭建vue单页应用

很多人肯定刚开始都是在使用官方的脚手架工具，通过一段时间的使用我发现了很多潜在的问题，比如编译有点慢，需要添加一些其它的loader，打包速度能不能快一点，如果我项目现在变成了多入口应该如何调整，甚至要自己写loader与plugin，面对这些问题，有木有很难受。通过手动搭建vue项目去更加的了解webpack的使用以及vue-loader的配置，优化代码提升效率，面对不同的需求更好的去处理。

1. 处理ES6，处理预处理语言css
   .browserList .babelrc postcss.conf配置
2. 打包公共模块
   CommonsChunkPlugin [vendor, runtime] 提取js
   公共代码与第三方依赖打包
   区分webpack生成代码与第三方依赖
   多entry
   提取css extract-text-webpack-plugin 提取css
3. 代码分割 动态import(需要支持promise) [magic chunk] require.ensure第三方依赖分离
4. Tree Shaking UglifyJsPlugin，PurifyCSSPlugin
5. postcss处理插件
   处理图片，字体合成雪碧图
6. 处理第三方库 providePlugin 三种方式 cdn node_modules import 结合alias
7. html-webpack-plugin生成html 插入资源
   对图片的处理 image-loader
8. html-webpack-inline-chunk-plugin 提前加载插入webpack生成代码减少不必要的请求
9. webpack-dev-server
   HotModuleReplacementPlugin
   NoEmitOnErrorsPlugin
10. 打包优化
    dll happy-pack 缓存 平行
11. 打包分析
    webpack-bundle-analyzer
