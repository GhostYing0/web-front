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
            {
                path: "/enrollContest",
                component: () => import("@/views/enroll/indexEnrollContest"),
                roles: ["student"]
            },
            {
                path: "/searchEnrollResult",
                component: () => import("@/views/enroll/indexSearchEnrollResult"),
                roles: ["student"]
            },
            {
                path: "/enrollManage",
                component: () => import("@/views/enrollManage/index"),
                roles: ["manager"]
            },
            {
                path: "/userManage",
                component: () => import("@/views/userManage/index"),
                roles: ["manager"]
            },
            {
                path: "/contestManage",
                component: () => import("@/views/contestManage/index"),
                roles: ["manager"]
            },
            {
                path: "/gradeManage",
                component: () => import("@/views/gradeManage/index"),
                roles: ["manager"]
            }
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
    const newRouter = createRouter({
        history: createWebHistory(),
        scrollBehavior: () => ({ top: 0 }),
        routes: constantRoutes
    })

    // 移除所有已注册的路由
    router.getRoutes().forEach((route) => {
        router.removeRoute(route.name);
    });

    // 添加新的路由
    newRouter.getRoutes().forEach((route) => {
        router.addRoute(route);
    });
}

export {router, asyncRoutes, constantRoutes};