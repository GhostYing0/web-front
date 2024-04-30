const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,

  // publicPath: './', // 基准URL，相对于构建生成的HTML文件
  // outputDir: 'dist', // 输出的目录
  // assetsDir: 'public/login', //
  // devServer: {
  //   port: 9005,
  //   proxy: {
  //     'api': {
  //       target: 'http://127.0.0.1:9006',
  //       //pathRewrite: {'^/api': ''},
  //       ws: true,
  //       changeOrigin: true  //控制请求头中的host值
  //     },
  //   }
  // }
})
