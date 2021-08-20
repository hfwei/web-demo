import {createApp} from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "@/routers";
import store from "@/store/store";
import i18n from "../public/languages";
import axios from "axios";
// import {Base64} from "js-base64";
// import NProgress from "nprogress.js";
import "nprogress/nprogress.css"
import "material-design-icons-iconfont/dist/material-design-icons.css";

axios.defaults.withCredentials = true;

router.beforeEach((to, from) => {
    console.log(`router beforeEach. to:${to}, from:${from}`);
    console.log(`router to matched:`, to.matched.length);
    // NProgress.start();
    if (to.meta.requiresAuth && !store.state.isLogin) {
        return {
            path: "/login",
            query: {redirect: to.fullPath}
        };
    } else {
        return true;
    }
});

router.afterEach(() => {
    // NProgress.done();
});

const app: any = createApp(App)
    .use(i18n)
    .use(Antd)
    .use(router)
    .use(store)
    // .use(Base64)
    .mount("#app");