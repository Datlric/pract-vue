// const proxy = require('http-proxy-middleware');
//服务器会将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:4000上
module.exports = {
  devServer: {
      //vue自己启动的端口
      port:8081,
      proxy: {                 //设置代理，必须填,解决跨域问题的
          '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
              target: 'http://localhost',     //代理的目标地址
              changeOrigin: true,              //是否设置同源，输入是的
              pathRewrite: {                   //路径重写
                  '^/api': ''                     //选择忽略拦截器里面的内容
              }
          }
      },
  }
}
