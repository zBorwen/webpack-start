### webpack-vue-practice

1. webpack四要素entry，output，module，plugins
2. 处理ES6，处理预处理语言css
   .browserList .babelrc postcss.conf配置
3. 打包公共模块
   CommonsChunkPlugin [vendor, runtime] 提取js
   公共代码与第三方依赖打包
   区分webpack生成代码与第三方依赖
   多entry
   提取css extract-text-webpack-plugin 提取css
4. 代码分割 动态import(需要支持promise) [magic chunk] require.ensure第三方依赖分离
5. Tree Shaking UglifyJsPlugin，PurifyCSSPlugin
6. postcss处理插件
   处理图片，字体合成雪碧图
7. 处理第三方库 providePlugin 三种方式 cdn node_modules import 结合alias
8. html-webpack-plugin生成html 插入资源
   对图片的处理 image-loader
9. html-webpack-inline-chunk-plugin 提前加载插入webpack生成代码减少不必要的请求
10. webpack-dev-server
    HotModuleReplacementPlugin
    NoEmitOnErrorsPlugin
11. 打包优化
    dll happy-pack 缓存 平行
12. 打包分析
    webpack-bundle-analyzer

手动搭建vue-project配置生产环境与开发环境使用webpack处理资源
