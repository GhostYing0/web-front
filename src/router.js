import { createRouter, createWebHistory } from 'vue-router';
import TestAddUser from './components/my-test-adduser.vue';
import TestGetContest from './components/my-test-getcontest.vue';
import CmsLogin from './components/cms-login.vue';
import HelloWorld from "./components/HelloWorld";

const routes = [
    {
        path:'/',
        component:HelloWorld
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
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export {router};