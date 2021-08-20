import {createI18n} from "vue-i18n";    // 引入vue-i18n组件

// 注册i8n实例并引入语言文件
const i18n = createI18n({
    locale: localStorage.getItem("language") || 'zh-CN',    // 默认显示的语言
    // locale: 'en-US',
    messages: {
        'zh-CN': require('./zh-CN'),    // 引入语言文件
        'en-US': require('./en-US')
    }
})

export default i18n;    // 将i18n暴露出去，在main.ts中引入挂载