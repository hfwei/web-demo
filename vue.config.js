module.exports = {
    publicPath: '/',
    // devServer: {
    //     host: 'localhost',
    //     port: 8080,   //端口
    //     open: true,
    //     proxy: {
    //         '/api': { //请求路径关键字
    //             target: 'http://localhost:8762/',   //后台接口
    //             changeOrigin: true,   //是否允许跨域
    //             pathRewrite: {
    //                 '^/api': ''   //请求地址重写
    //             }
    //         }
    //     }
    // },
    lintOnSave: false // 取消 eslint 验证
}