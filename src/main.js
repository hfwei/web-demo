import {createApp} from 'vue';
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import index from "@/routers";

createApp(App)
    .use(ElementPlus)
    .use(index)
    .mount('#app')
