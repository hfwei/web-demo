import {createApp} from 'vue';
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import index from "@/routers";
import store from "@/store/store";
import i18n from "../public/languages";
import {defaults} from "axios";
// import {Base64} from "js-base64";

defaults.withCredentials = true

createApp(App)
    // .use(ElementPlus)
    .use(i18n)
    .use(Antd)
    .use(index)
    .use(store)
    // .use(Base64)
    .mount('#app')
