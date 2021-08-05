import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: "/register",
        name: "register",
        component: () => import('../components/RegisterNew'),
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../components/LoginNew')
    },
    {
        path: "/home",
        name: "home",
        component: () => import('../components/Home')
    }, {
        path: "/test",
        name: "test",
        component: () => import('../components/Test')
    }
]

const index = createRouter({
    history: createWebHashHistory(),
    routes
})

export default index;