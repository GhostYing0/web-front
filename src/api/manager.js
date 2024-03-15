import request from '@/http/axios'

//登录
export function login(data) {
    return request({
        url: "/cms/login",
        method: "post",
        data
    })
}

//注册
export function register(data) {
    return request({
        url: "/cms/register",
        method: "post",
        data
    })
}

//修改密码
export function updatePassword(data) {
    return request({
        url: "/cms/update_passwd",
        method: "post",
        data
    })
}

//查看用户
export function getUser(token) {
    return request({
        url: "/cms/get_user",
        method: "get",
        params: {token}
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/cms/get_info',
        method: 'get',
        params: { token }
    })
}