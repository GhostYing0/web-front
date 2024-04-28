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

//获取竞赛信息
export function updateContest(data) {
    return request({
        url: "/cms/updateContest",
        method: "post",
        data: data
    })
}

//获取竞赛信息
export function deleteContest(data) {
    return request({
        url: "/cms/deleteContest",
        method: "delete",
        data: data
    })
}

//获取竞赛信息
export function processContest(data) {
    return request({
        url: "/cms/processContest",
        method: "post",
        data: data
    })
}

// 获取竞赛数量
export function getContestCount() {
    return request({
        url: '/cms/getContestCount',
        method: 'get'
    })
}

// 获取竞赛类型
export function getContestType() {
    return request({
        url: '/public/getContestType',
        method: 'get'
    })
}

// 游览竞赛类型
export function viewContest(param) {
    return request({
        url: '/viewContest',
        method: 'get',
        params: param
    })
}

// 游览竞赛类型
export function viewTeacherContest(param) {
    return request({
        url: '/viewTeacherContest',
        method: 'get',
        params: param
    })
}

// 教师修改竞赛
export function updateTeacherContest(data) {
    return request({
        url: '/updateContest',
        method: 'post',
        data: data
    })
}

// 教师上传竞赛
export function uploadContest(data) {
    return request({
        url: '/uploadContest',
        method: 'post',
        data: data
    })
}

// // 管理员通过竞赛
// export function processPassContest(data) {
//     return request({
//         url: '/cms/processPassContest',
//         method: 'post',
//         data: data
//     })
// }
//
// // 管理员驳回竞赛
// export function processRejectContest(data) {
//     return request({
//         url: '/cms/processRejectContest',
//         method: 'post',
//         data: data
//     })
// }

// 系部管理员通过竞赛
export function processPassContest(data) {
    return request({
        url: '/processPassContest',
        method: 'post',
        data: data
    })
}

// 系部管理员驳回竞赛
export function processRejectContest(data) {
    return request({
        url: '/processRejectContest',
        method: 'post',
        data: data
    })
}

// 获取学校
export function getSchool() {
    return request({
        url: '/public/getSchool',
        method: 'get'
    })
}

// 获取学院
export function getCollege() {
    return request({
        url: '/public/getCollege',
        method: 'get'
    })
}

// 获取学年
export function getSemester() {
    return request({
        url: '/public/getSemester',
        method: 'get'
    })
}

export function getContestForTeacher() {
    return request({
        url: '/getContestForTeacher',
        method: 'get'
    })
}

export function transformState(data) {
    return request({
        url: '/transformState',
        method: 'post',
        data:data
    })
}

export function cancelContest(data) {
    return request({
        url: '/cancelContest',
        method: 'post',
        data:data
    })
}

export function getDepartmentContest(param) {
    return request({
        url: '/getDepartmentContest',
        method: 'get',
        params:param
    })
}

export function departmentManagerSearchEnroll(param) {
    return request({
        url: '/departmentManagerSearchEnroll',
        method: 'get',
        params:param
    })
}


// 获取竞赛类型
export function onlyGetDepartmentContest() {
    return request({
        url: '/onlyGetDepartmentContest',
        method: 'get'
    })
}

export function getDepartmentContestGrade(param) {
    return request({
        url: '/getDepartmentContestGrade',
        method: 'get',
        params:param
    })
}

export function viewTeacherContestGrade(param) {
    return request({
        url: '/viewTeacherContestGrade',
        method: 'get',
        params:param
    })
}