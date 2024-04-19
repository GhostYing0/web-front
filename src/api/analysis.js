import request from '@/http/axios'


export function totalEnrollCountOfPerYear() {
    return request({
        url: '/cms/totalEnrollCountOfPerYear',
        method: 'get',
    })
}

export function preTypeEnrollCountOfPerYear() {
    return request({
        url: '/cms/preTypeEnrollCountOfPerYear',
        method: 'get',
    })
}

export function compareEnrollCount() {
    return request({
        url: '/cms/compareEnrollCount',
        method: 'get',
    })
}

export function schoolEnrollCount(param) {
    return request({
        url: '/cms/schoolEnrollCount',
        method: 'get',
        params:param
    })
}

export function studentContestSemester(param) {
    return request({
        url: '/cms/studentContestSemester',
        method: 'get',
        params:param
    })
}

export function studentRewardRate(param) {
    return request({
        url: '/cms/studentRewardRate',
        method: 'get',
        params:param
    })
}