import request from '@/http/axios'

//获取报名信息
export function getEnroll(param) {
    return request({
        url: "/cms/getEnrollInformation",
        method: "get",
        params: param
    })
}

//添加报名信息
export function addEnroll(data) {
    return request({
        url: "/cms/addEnrollInformation",
        method: "post",
        data
    })
}

// 获取报名信息数量
export function getCount() {
    return request({
        url: '/cms/getCount',
        method: 'get'
    })
}

// 删除报名信息
export function deleteEnroll(data) {
    return request({
        url: '/cms/deleteEnrollInformation',
        method: 'delete',
        data: data
    })
}

//更新报名信息
export function updateEnroll(data) {
    return request({
        url: '/cms/updateEnrollInformation',
        method: 'post',
        data
    })
}