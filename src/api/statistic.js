import request from "@/http/axios";

export function studentStatistic() {
    return request({
        url: "/student_statistic",
        method: "get"
    })
}

export function teacherStatistic() {
    return request({
        url: "/teacher_statistic",
        method: "get"
    })
}

export function departmentStatistic() {
    return request({
        url: "/department_statistic",
        method: "get"
    })
}

export function managerStatistic() {
    return request({
        url: "/manager_statistic",
        method: "get"
    })
}