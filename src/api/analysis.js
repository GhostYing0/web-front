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