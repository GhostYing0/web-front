import { createRouter, createWebHistory } from 'vue-router';
//import HomeApp from './Home/HomeApp.vue';
import AppLayout from  './layout/AppLayout.vue'
//import BreadCrumb from "./components/breadcrumb.vue";

const asyncRoutes = [
    {
        path:"/contestInformationManager",
        component:() => import("@/layout/AppLayout"),
        children:[
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
                path: "/studentManage",
                component: () => import("@/views/userManage/student/index"),
                roles: ["manager"]
            },
            {
                path: "/teacherManage",
                component: () => import("@/views/userManage/teacher/index"),
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
            },
            {
                path: "/uploadGrade",
                component: () => import("@/views/grade/indexUploadGrade"),
                roles: ["student"]
            },
            {
                path: "/searchGrade",
                component: () => import("@/views/grade/indexSearchGrade"),
                roles: ["student"]
            },
            {
                path: "/processEnroll",
                component: () => import("@/views/process/processEnroll"),
                roles: ["teacher"]
            },
            {
                path: "/processGrade",
                component: () => import("@/views/process/processGrade"),
                roles: ["teacher"]
            },
            {
                path: "/profile",
                component: () => import("@/views/profile/index"),
                roles: ["student","teacher"]
            },
            {
                path:"/displayContest",
                component: () => import("@/views/contest/index"),
                roles: ["student","teacher"]
            },
            {
                path:"/displayMyContest",
                component: () => import("@/views/contest/teacher/display/index"),
                roles: ["teacher"]
            },
            {
                path:"/uploadContest",
                component: () => import("@/views/contest/teacher/upload/index"),
                roles: ["teacher"]
            },
            {
                path:"/contestProcess",
                component: () => import("@/views/contestManage/contestProcess/index.vue"),
                roles: ["manager"]
            },
            {
                path:"/enrollProcess",
                component: () => import("@/views/enroll/teacherProcessEnroll/index.vue"),
                roles: ["teacher"],
                children : [
                    {
                        path:"/enrollProcessing",
                        component: () => import("@/views/enroll/teacherProcessEnroll/processing.vue"),
                        roles: ["teacher"]
                    },
                    {
                        path:"/enrollRejected",
                        component: () => import("@/views/enroll/teacherProcessEnroll/rejected.vue"),
                        roles: ["teacher"]
                    }
                ]
            },
            {
                path:"/gradeProcess",
                component: () => import("@/views/grade/teacherProcessGrade/index.vue"),
                roles: ["teacher"],
                children : [
                    {
                        path:"/gradeProcessing",
                        component: () => import("@/views/grade/teacherProcessGrade/processing.vue"),
                        roles: ["teacher"]
                    },
                    {
                        path:"/gradeRejected",
                        component: () => import("@/views/grade/teacherProcessGrade/rejected.vue"),
                        roles: ["teacher"]
                    }
                ]
            },
            {
                path:"/teacherViewEnroll",
                component: () => import("@/views/enroll/teacherViewEnroll/index.vue"),
                roles: ["teacher"]
            },
            {
                path:"/teacherViewGrade",
                component: () => import("@/views/grade/teacherViewGrade/index.vue"),
                roles: ["teacher"],
            },
            {
                path:"/analysis",
                component: () => import("@/views/dataAnalysis/index.vue"),
                roles: ["manager"],
                children : [
                    {
                        path:"/contestStatistic",
                        component: () => import("@/views/dataAnalysis/contest/index.vue"),
                        roles: ["manager"],
                    },
                    {
                        path:"/contestTypeStatistic",
                        component: () => import("@/views/dataAnalysis/contestType/index.vue"),
                        roles: ["manager"],
                    },
                    {
                        path:"/enrollStatistic",
                        component: () => import("@/views/dataAnalysis/enroll/index.vue"),
                        roles: ["manager"],
                    },
                    {
                        path:"/schoolStatistic",
                        component: () => import("@/views/dataAnalysis/school/index.vue"),
                        roles: ["manager"],
                    }
                ]
            },
        ]
    }
];

const constantRoutes= [
    {
        path: '/',
        redirect: '/dashboard',
        children: [
            {
                title: "系统",
                path: '/dashboard',
                component: () => import("@/views/dashboard/index"),
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
        component: () => import("@/views/register/index"),
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