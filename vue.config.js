const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: '/',
    // devServer: {
    //     host: 'localhost',
    //     port: 8080,   // 端口
    //     open: true,
    //     proxy: {
    //         '/api': {   // 请求路径关键字
    //             target: 'http://localhost:8762/',   // 后台接口
    //             changeOrigin: true,   // 是否允许跨域
    //             pathRewrite: {
    //                 '^/api': ''   // 请求地址重写
    //             }
    //         }
    //     }
    // },
    lintOnSave: false, // 取消 eslint 验证
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             // "@": resolve("src"),
    //             "@": "src",
    //             src: "@",
    //             components: "@/components",
    //             views: "@/views"
    //         }
    //     }
    // },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("./src"))
            .set("components", resolve("./src/components"))
            .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')   // 去掉v-i18n浏览器告警部分
    }
}