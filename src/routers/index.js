import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/RegisterNew"),
        meta: {requiresAuth: false}
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginNew"),
        meta: {requiresAuth: false}
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/HomeNew"),
        meta: {requiresAuth: false},
        children: [
            {
                path: "",
                component: () => import("../views/home/Index")
            }, {
                path: "index",
                name: "index",
                component: () => import("../views/home/Index")
            }, {
                path: "userInfo",
                name: "userInfo",
                component: () => import("../views/home/UserInfo")
            }
        ]
    }, {
        path: "/test",
        name: "test",
        component: () => import("../views/Test"),
        meta: {requiresAuth: false}
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;