import request from '@/http/axios'

//登录
export function login(data) {
    return request({
        url: "/login",
        method: "post",
        data
    })
}

//注册
export function register(data) {
    return request({
        url: "/register",
        method: "post",
        data
    })
}

//修改密码
export  function updatePassword(data) {
    return request({
        url: "/update_passwd",
        method: "post",
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/public/get_info',
        method: 'get',
        params: { token }
    })
}

export function logout(token) {
    return request ({
        url: "/public/logout",
        method: "get",
        params: { token }
    })
}

//登录
export function cmsLogin(data) {
    return request({
        url: "/cms/login",
        method: "post",
        data
    })
}

//注册
export function cmsRegister(data) {
    return request({
        url: "/cms/register",
        method: "post",
        data
    })
}

//修改密码
export function cmsUpdatePassword(data) {
    return request({
        url: "/cms/update_passwd",
        method: "post",
        data
    })
}

//查看学生用户
export function getStudentUser(param) {
    return request({
        url: "/cms/getStudentUser",
        method: "get",
        params: param
    })
}

//查看教师用户
export function getTeacherUser(param) {
    return request({
        url: "/cms/getTeacherUser",
        method: "get",
        params: param
    })
}

//添加用户
export function addUser(data) {
    return request({
        url: "/cms/addUser",
        method: "post",
        data
    })
}

// 获取用户数量
export function getUserCount() {
    return request({
        url: '/cms/getUserCount',
        method: 'get'
    })
}

// 删除用户
export function deleteUsers(param) {
    return request({
        url: '/cms/deleteUSer',
        method: 'delete',
        data: param
    })
}

export function updateUser(data) {
    return request({
        url: '/cms/updateUser',
        method: 'post',
        data
    })
}