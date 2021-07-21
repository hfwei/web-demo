import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: '/register'
    },
    {
        path: "/register",
        name: "register",
        component: () => import('../components/Register'),
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../components/Login')
    },
    {
        path: "/home",
        name: "home",
        component: () => import('../components/Home')
    }
]

const index = createRouter({
    history: createWebHashHistory(),
    routes
})

export default index;