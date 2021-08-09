import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: "/register",
        name: "register",
        component: () => import('../views/RegisterNew'),
        meta: {requiresAuth: false}
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../views/LoginNew'),
        meta: {requiresAuth: false}
    },
    {
        path: "/home",
        name: "home",
        component: () => import('../views/Home'),
        meta: {requiresAuth: true}
    }, {
        path: "/test",
        name: "test",
        component: () => import('../views/Test'),
        meta: {requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;