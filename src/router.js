import { createRouter, createWebHistory } from 'vue-router';
import TestAddUser from './components/my-test-adduser.vue';
import TestGetContest from './components/my-test-getcontest.vue';
import CmsLogin from './components/cms-login.vue';
import HomeApp from './Home/HomeApp.vue';
import AppLayout from  './layout/AppLayout.vue'
//import BreadCrumb from "./components/breadc-rumb.vue";

const routes = [
    {
        path:'/manage',
        component: AppLayout,
        children:[
            {
                path:'/',
                component:HomeApp
            },
            {
                path: '/display_contest',
                component: TestGetContest
            },
            {
                path: '/add_user',
                component: TestAddUser
            },
            {
                path: '/cms_login',
                component: CmsLogin
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export {router};