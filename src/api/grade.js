import request from '@/http/axios'

//获取成绩信息
export function getGrade(param) {
    return request({
        url: "/cms/getGrade",
        method: "get",
        params: param
    })
}

//添加成绩信息
export function addGrade(data) {
    return request({
        url: "/cms/addGrade",
        method: "post",
        data
    })
}


// 删除成绩信息
export function deleteGrade(data) {
    return request({
        url: '/cms/deleteGrade',
        method: 'delete',
        data: data
    })
}

//更新报名信息
export function updateGrade(data) {
    return request({
        url: '/cms/updateGrade',
        method: 'post',
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


// 上传成绩
export function uploadGrade(data) {
    return request({
        url: '/uploadGrade',
        method: 'post',
        data
    })
}

// 获取报名信息数量
export function searchGrade(param) {
    return request({
        url: '/searchGrade',
        method: 'get',
        params:param
    })
}

// 上传图片
export function uploadImg(data) {
    return request({
        url: '/public/v1/upload',
        method: 'post',
        data: data
    })
}

// 获取成绩数量
export function getGradeCount() {
    return request({
        url: '/cms/getGradeCount',
        method: 'get'
    })
}

// 获取报名信息数量
export function teacherSearchGrade(param) {
    return request({
        url: '/teacherSearchGrade',
        method: 'get',
        params:param
    })
}

//
export function processPassGrade(data) {
    return request({
        url: '/processPassGrade',
        method: 'post',
        data:data
    })
}

//
export function processRejectGrade(data) {
    return request({
        url: '/processRejectGrade',
        method: 'post',
        data:data
    })
}