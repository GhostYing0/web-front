import { createRouter, createWebHistory } from 'vue-router';
import TestAddUser from './views/my-test-adduser.vue';
import TestGetContest from './views/my-test-getcontest.vue';
//import HomeApp from './Home/HomeApp.vue';
import AppLayout from  './layout/AppLayout.vue'
import Login from './views/login/Login'
import Register from "./views/Register";
import DashBoard from "./views/dashboard/DashBoard"
//import BreadCrumb from "./components/breadc-rumb.vue";

const asyncRoutes = [
    {
        path:"/",
        component: AppLayout,
        children:[
            {
                path: '/display_contest',
                component: TestGetContest
            },
            {
                path: '/add_user',
                component: TestAddUser
            },
        ]
    }
];

const constantRoutes= [
    {
        path:"/index",
        component: DashBoard,
        children:[
            {
                path: '/login',
                component: Login
            },
            {
                path: '/register',
                component: Register
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
});

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export {router, asyncRoutes};