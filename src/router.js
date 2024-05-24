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
                title: "系统",
                path: '/home',
                component: () => import("@/views/dashboard/index"),
                meta: { title: "首页" },
                name: "首页"
            },
            {
                path: "/enrollContest",
                component: () => import("@/views/enroll/indexEnrollContest"),
                roles: ["student", "manager"],
                name:"报名竞赛"
            },
            {
                path: "/studentEnrollDetail/:enroll_information_id",
                component: () => import("@/views/enroll/studentEnrollDetail.vue"),
                roles: ["student", "manager", "teacher"],
                name:"报名详情"
            },
            {
                path: "/studentEnrollUpdate/:enroll_information_id",
                component: () => import("@/views/enroll/studentEnrollUpdate.vue"),
                roles: ["student", "manager"],
                name:"修改报名"
            },
            {
                path: "/enrollContest/:contest_id",
                component: () => import("@/views/enroll/indexEnrollContest"),
                roles: ["student"],
                name:"报名竞赛"
            },
            {
                path: "/searchEnrollResult",
                component: () => import("@/views/enroll/indexSearchEnrollResult"),
                roles: ["student"],
                name:"个人报名信息"
            },
            {
                path: "/enrollManage",
                component: () => import("@/views/enrollManage/index"),
                roles: ["manager"],
                name:"报名信息管理"
            },
            {
                path: "/userManage",
                component: () => import("@/views/userManage/index"),
                roles: ["manager"],
                name:"系统管理员用户管理"
            },
            {
                path: "/studentManage",
                component: () => import("@/views/userManage/student/index"),
                roles: ["manager"],
                name:"学生用户管理"
            },
            {
                path: "/teacherManage",
                component: () => import("@/views/userManage/teacher/index"),
                roles: ["manager"],
                name:"教师用户管理"
            },
            {
                path: "/managerManage",
                component: () => import("@/views/userManage/index"),
                roles: ["manager"],
                name:"系统管理员用户管理"
            },
            {
                path: "/departmentManagerManage",
                component: () => import("@/views/userManage/department/index"),
                roles: ["manager"],
                name:"系部管理员用户管理"
            },
            {
                path: "/contestManage",
                component: () => import("@/views/contestManage/index"),
                roles: ["manager"],
                name:"竞赛信息管理"
            },
            {
                path: "/gradeManage",
                component: () => import("@/views/gradeManage/index"),
                roles: ["manager"],
                name:"成绩信息管理"
            },
            {
                path: "/teacherDisplayEnrollDetail/:contest_id",
                component: () => import("@/views/enroll/teacherViewEnroll/detail.vue"),
                roles: ["teacher"],
                name:"竞赛报名信息"
            },
            {
                path: "/uploadGrade",
                component: () => import("@/views/grade/teacherViewGrade/upload.vue"),
                roles: ["teacher"],
                name:"上传成绩竞赛信息"
            },
            {
                path: "/uploadGradeDetailA/:contest_id",
                component: () => import("@/views/grade/teacherViewGrade/detail.vue"),
                roles: ["teacher"],
                name:"上传成绩报名表"
            },
            {
                path: "/teacherDisplayGradeDetail/:contest_id",
                component: () => import("@/views/grade/teacherViewGrade/gradeDetail.vue"),
                roles: ["teacher"],
                name:"竞赛成绩信息"
            },
            {
                path: "/doUploadGrade/:enroll_information_id",
                component: () => import("@/views/grade/teacherViewGrade/doUploadGrade.vue"),
                roles: ["teacher"],
                name:"上传成绩"
            },
            {
                path: "/UpdateGrade1/:contest_id/:grade_id",
                component: () => import("@/views/grade/teacherViewGrade/updateGrade.vue"),
                roles: ["teacher","manager"],
                name:"修改成绩"
            },
            {
                path: "/UpdateGrade/:grade_id",
                component: () => import("@/views/grade/teacherViewGrade/updateGrade.vue"),
                roles: ["teacher", "manager"],
                name:"修改成绩1"
            },
            {
                path: "/UpdateContest/:contest_id",
                component: () => import("@/views/contest/teacher/update.vue"),
                roles: ["teacher", "manager"],
                name:"修改竞赛信息"
            },
            {
                path: "/departmentDisplayGrade",
                component: () => import("@/views/grade/departmentDisplayGrade/index"),
                roles: ["department_manager"],
                name:"竞赛获奖情况"
            },
            {
                path: "/departmentDisplayGradeDetail/:contest_id",
                component: () => import("@/views/grade/departmentDisplayGrade/detail.vue"),
                roles: ["department_manager"],
                name:"成绩信息详情"
            },
            {
                path: "/departmentDisplayEnroll",
                component: () => import("@/views/enroll/departmentDisplayEnroll/index"),
                roles: ["department_manager"],
                name:"竞赛报名情况"
            },
            {
                path: "/departmentDisplayEnrollDetail/:contest_id",
                component: () => import("@/views/enroll/departmentDisplayEnroll/detail.vue"),
                roles: ["department_manager"],
                name:"报名信息详情"
            },
            {
                path: "/searchGrade",
                component: () => import("@/views/grade/indexSearchGrade"),
                roles: ["student"],
                name:"个人成绩信息"
            },
            {
                path: "/processEnroll",
                component: () => import("@/views/process/processEnroll"),
                roles: ["teacher"],
                name:"竞赛报名信息2"
            },
            {
                path: "/gradeDetail/:grade_id",
                component: () => import("@/views/grade/gradeDetail"),
                roles: ["student","teacher","department_manager", "manager"],
                name:"上传成绩信息详情"
            },
            {
                path: "/processGrade",
                component: () => import("@/views/process/processGrade"),
                roles: ["teacher"],
                name:"竞赛成绩信息2"
            },
            {
                path: "/profile",
                component: () => import("@/views/profile/index"),
                roles: ["student","teacher", "department_manager"],
                name:"个人信息"
            },
            {
                path:"/displayContest",
                component: () => import("@/views/contest/index"),
                roles: ["student","teacher", "department_manager", "manager"],
                name:"竞赛信息预览",
                children : [
                    {
                        path:"/contestDetail",
                        component: () => import("@/views/contest/detail/index"),
                        roles: ["student","teacher","department_manager"],
                        name:"竞赛信息详情"
                    },
                ]
            },
            {
                path:"/displayMyContest",
                component: () => import("@/views/contest/teacher/display/index"),
                roles: ["teacher"],
                name:"查看竞赛信息"
            },
            {
                path:"/uploadContest",
                component: () => import("@/views/contest/teacher/upload/index"),
                roles: ["teacher", "manager"],
                name:"上传竞赛信息"
            },
            {
                path:"/contestProcess",
                component: () => import("@/views/contestManage/contestProcess/index.vue"),
                roles: ["department_manager"],
                name:"竞赛信息审核"
            },
            {
                path:"/processContestDetail/:contest_id",
                component: () => import("@/views/contestManage/contestProcess/detail.vue"),
                roles: ["department_manager", "manager"],
                name:"竞赛信息审核详情"
            },
            {
                path:"/enrollProcess",
                component: () => import("@/views/enroll/teacherProcessEnroll/index.vue"),
                roles: ["department_manager"],
                name:"报名信息审核",
                children : [
                    {
                        path:"/enrollProcessing",
                        component: () => import("@/views/enroll/teacherProcessEnroll/processing.vue"),
                        roles: ["department_manager"],
                        name:"审核中报名信息预览"
                    },
                    {
                        path:"/enrollRejected",
                        component: () => import("@/views/enroll/teacherProcessEnroll/rejected.vue"),
                        roles: ["department_manager"],
                        name:"驳回报名信息预览"
                    }
                ]
            },
            {
                path:"/gradeProcess",
                component: () => import("@/views/grade/teacherProcessGrade/index.vue"),
                roles: ["department_manager"],
                name:"成绩信息审核",
                children : [
                    {
                        path:"/gradeProcessing",
                        component: () => import("@/views/grade/teacherProcessGrade/processing.vue"),
                        roles: ["department_manager"],
                        name:"审核中成绩信息预览"
                    },
                    {
                        path:"/gradeRejected",
                        component: () => import("@/views/grade/teacherProcessGrade/rejected.vue"),
                        roles: ["department_manager"],
                        name:"驳回成绩信息预览"
                    }
                ]
            },
            {
                path:"/teacherViewEnroll",
                component: () => import("@/views/enroll/teacherViewEnroll/index.vue"),
                roles: ["teacher"],
                name:"报名信息预览"
            },
            {
                path:"/teacherViewGrade",
                component: () => import("@/views/grade/teacherViewGrade/index.vue"),
                roles: ["teacher"],
                name:"成绩信息预览"
            },
            //{
                // path:"/analysis",
                // component: () => import("@/views/dataAnalysis/index.vue"),
                // roles: ["department_manager"],
                // name:"数据统计与分析",
                // children : [
                    {
                        path:"/contestStatistic",
                        component: () => import("@/views/dataAnalysis/contest/index.vue"),
                        roles: ["department_manager"],
                        name:"数据统计与分析1",
                    },
                    {
                        path:"/contestTypeStatistic",
                        component: () => import("@/views/dataAnalysis/contestType/index.vue"),
                        roles: ["department_manager"],
                        name:"数据统计与分析",
                    },
                    {
                        path:"/enrollStatistic",
                        component: () => import("@/views/dataAnalysis/enroll/index.vue"),
                        roles: ["department_manager"],
                        name:"数据统计与分析3",
                    },
                    {
                        path:"/schoolStatistic",
                        component: () => import("@/views/dataAnalysis/school/index.vue"),
                        roles: ["department_manager"],
                        name:"数据统计与分析4",
                    }
                //]
            //},
        ]
    }
];

const constantRoutes= [
    {
        path: '/',
        redirect: '/dashboard',
        component:() => import("@/layout/AppLayout"),
        name:"首页",
        children: [
            {
                title: "系统",
                path: '/dashboard',
                component: () => import("@/views/dashboard/index"),
                meta: { title: "首页" },
                name:"首页",
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