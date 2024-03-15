import { createRouter, createWebHistory } from 'vue-router';
//import HomeApp from './Home/HomeApp.vue';
import AppLayout from  './layout/AppLayout.vue'
//import BreadCrumb from "./components/breadc-rumb.vue";

const asyncRoutes = [
    {
        path:"/test",
        component:() => import("@/layout/AppLayout"),
        children:[
            {
                path: '/display_contest',
                component:() => import("@/views/my-test-getcontest"),
                roles: ["manager", "student", "teacher"],
            },
            {
                path: '/add_user',
                component: () => import("@/views/my-test-adduser"),
                roles: ["manager","student", "teacher"],
            },
        ]
    }
];

const constantRoutes= [
    {
        path: '/',
        component: AppLayout,
        redirect: '/dashboard',
        children: [
            {
                title: "系统",
                path: 'dashboard',
                component: () => import("@/views/dashboard/DashBoard"),
                meta: { title: "首页" }
            }
        ]
    },
    {
        path: '/login',
        component: () => import("@/views/login/Login"),
    },
    {
        path: '/register',
        component: () => import("@/views/Register"),
    }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
});

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export {router, asyncRoutes, constantRoutes};