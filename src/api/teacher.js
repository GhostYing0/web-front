import request from '@/http/axios'

//登录
export function login(data) {
    return request({
        url: "/teacher/login",
        method: "post",
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/teacher/info',
        method: 'get',
        params: { token }
    })
}