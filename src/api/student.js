import request from '@/http/axios'

//登录
export function login(data) {
    return request({
        url: "/student/login",
        method: "post",
        data
    })
}

//注册
export function register(data) {
    return request({
        url: "/student/register",
        method: "post",
        data
    })
}

//修改密码
export  function updatePassword(data) {
    return request({
        url: "/student/update_passwd",
        method: "post",
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/student/info',
        method: 'get',
        params: { token }
    })
}