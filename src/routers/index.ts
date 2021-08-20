import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/RegisterNew.vue"),
        meta: {requiresAuth: false}
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginNew.vue"),
        meta: {requiresAuth: false}
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/HomeNew.vue"),
        meta: {requiresAuth: false},
        children: [
            {
                path: "",
                component: () => import("@/views/home/Index.vue")
            }, {
                path: "index",
                name: "index",
                component: () => import("@/views/home/Index.vue")
            }, {
                path: "userInfo",
                name: "userInfo",
                component: () => import("@/views/home/UserInfo.vue")
            }
        ]
    }, {
        path: "/test",
        name: "test",
        component: () => import("@/views/Test.vue"),
        meta: {requiresAuth: false}
    },
    // {
    //     path: "/:pathMatch(.*)",
    //     redirect: "/test"
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;