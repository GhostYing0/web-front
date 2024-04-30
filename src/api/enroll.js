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
export function getEnrollCount() {
    return request({
        url: '/cms/getEnrollCount',
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

//报名
export function enrollContest(data) {
    return request({
        url: "/enrollContest",
        method: "post",
        data
    })
}

//报名
export function getUserEnroll(param) {
    return request({
        url: "/searchEnrollResult",
        method: "get",
        params: param
    })
}

// 教师上传竞赛
export function uploadContest(data) {
    return request({
        url: "/uploadContest",
        method: "post",
        data: data
    })
}

// 教师显示自身竞赛报名成绩
export function teacherSearchEnroll(param) {
    return request({
        url: "/teacherSearchEnroll",
        method: "get",
        params: param
    })
}

export function processPassEnroll(data) {
    return request({
        url: "/processPassEnroll",
        method: "post",
        data: data
    })
}

export function processRejectEnroll(data) {
    return request({
        url: "/processRejectEnroll",
        method: "post",
        data: data
    })
}

export function processRecoverEnroll(data) {
    return request({
        url: "/processRecoverEnroll",
        method: "post",
        data: data
    })
}

export function revokeEnroll(data) {
    return request({
        url: "/revokeEnroll",
        method: "post",
        data: data
    })
}

//
export function teacherGetOneEnroll(param) {
    return request({
        url: "/teacherGetOneEnroll",
        method: "get",
        params: param
    })
}

export function studentUpdateEnrollContest(data) {
    return request({
        url: "/studentUpdateEnrollContest",
        method: "post",
        data: data
    })
}

