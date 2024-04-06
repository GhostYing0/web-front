import request from '@/http/axios'

//获取竞赛信息
export function getContest(param) {
    return request({
        url: "/cms/getContest",
        method: "get",
        params: param
    })
}

//添加竞赛信息
export function addContest(data) {
    return request({
        url: "/cms/addContest",
        method: "post",
        data: data
    })
}

//获取报名信息
export function updateContest(data) {
    return request({
        url: "/cms/updateContest",
        method: "post",
        data: data
    })
}

//获取报名信息
export function deleteContest(data) {
    return request({
        url: "/cms/deleteContest",
        method: "delete",
        data: data
    })
}

//获取报名信息
export function processContest(data) {
    return request({
        url: "/cms/processContest",
        method: "post",
        data: data
    })
}