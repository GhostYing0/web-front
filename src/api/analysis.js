import request from '@/http/axios'


export function totalEnrollCountOfPerYear() {
    return request({
        url: '/totalEnrollCountOfPerYear',
        method: 'get',
    })
}

export function preTypeEnrollCountOfPerYear() {
    return request({
        url: '/preTypeEnrollCountOfPerYear',
        method: 'get',
    })
}

export function preLevelEnrollCountOfPerYear() {
    return request({
        url: '/preLevelEnrollCountOfPerYear',
        method: 'get',
    })
}

export function compareEnrollCount() {
    return request({
        url: '/compareEnrollCount',
        method: 'get',
    })
}

export function schoolEnrollCount(param) {
    return request({
        url: '/schoolEnrollCount',
        method: 'get',
        params:param
    })
}

export function studentContestSemester(param) {
    return request({
        url: '/studentContestSemester',
        method: 'get',
        params:param
    })
}

export function studentRewardRate(param) {
    return request({
        url: '/studentRewardRate',
        method: 'get',
        params:param
    })
}

export function getContest(param) {
    return request({
        url: '/public/getContest',
        method: 'get',
        params:param
    })
}
