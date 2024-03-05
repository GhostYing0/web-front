const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

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
