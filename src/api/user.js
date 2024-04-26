import request from '@/http/axios'

//登录
export function login(data) {
    return request({
        url: "/login",
        method: "post",
        data
    })
}

//注册
export function register(data) {
    return request({
        url: "/register",
        method: "post",
        data
    })
}

//修改密码
export  function updatePassword(data) {
    return request({
        url: "/update_passwd",
        method: "post",
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/public/get_info',
        method: 'get',
        params: { token }
    })
}

export function logout(token) {
    return request ({
        url: "/public/logout",
        method: "get",
        params: { token }
    })
}

//登录
export function cmsLogin(data) {
    return request({
        url: "/cms/login",
        method: "post",
        data
    })
}

//注册
export function cmsRegister(data) {
    return request({
        url: "/cms/register",
        method: "post",
        data
    })
}

//修改密码
export function cmsUpdatePassword(data) {
    return request({
        url: "/cms/update_passwd",
        method: "post",
        data
    })
}

//查看学生用户
export function getStudent(param) {
    return request({
        url: "/cms/getStudent",
        method: "get",
        params: param
    })
}

//添加学生用户
export function addStudent(data) {
    return request({
        url: "/cms/addStudent",
        method: "post",
        data
    })
}

// 获取学生数量
export function getStudentCount() {
    return request({
        url: '/cms/getStudentCount',
        method: 'get'
    })
}

// 删除学生用户
export function deleteStudent(param) {
    return request({
        url: '/cms/deleteStudent',
        method: 'delete',
        data: param
    })
}

// 更改学生用户
export function updateStudent(data) {
    return request({
        url: '/cms/updateStudent',
        method: 'post',
        data
    })
}

//查看教师用户
export function getTeacher(param) {
    return request({
        url: "/cms/getTeacher",
        method: "get",
        params: param
    })
}

//添加教师用户
export function addTeacher(data) {
    return request({
        url: "/cms/addTeacher",
        method: "post",
        data
    })
}

// 获取教师数量
export function getTeacherCount() {
    return request({
        url: '/cms/getTeacherCount',
        method: 'get'
    })
}

// 删除教师用户
export function deleteTeacher(param) {
    return request({
        url: '/cms/deleteTeacher',
        method: 'delete',
        data: param
    })
}

// 更改教师用户
export function updateTeacher(data) {
    return request({
        url: '/cms/updateTeacher',
        method: 'post',
        data
    })
}

export function getProfileStudent() {
    return request({
        url: '/profileStudent',
        method: 'get',
    })
}

export function getProfileTeacher() {
    return request({
        url: '/profileTeacher',
        method: 'get',
    })
}

export function updateAvatar(data) {
    return request({
        url: '/updateAvatar',
        method: 'post',
        data: data
    })
}

export function updateProfile(data) {
    return request({
        url: '/updateProfile',
        method: 'post',
        data: data
    })
}

export function updateTeacherProfile(data) {
    return request({
        url: '/updateTeacherProfile',
        method: 'post',
        data: data
    })
}

export function getManager(param) {
    return request({
        url: '/cms/getManager',
        method: 'get',
        params: param
    })
}

export function addManager(data) {
    return request({
        url: '/cms/addManager',
        method: 'post',
        data: data
    })
}

export function updateManager(data) {
    return request({
        url: '/cms/updateManager',
        method: 'post',
        data: data
    })
}

export function deleteManager(data) {
    return request({
        url: '/cms/deleteManager',
        method: 'delete',
        data: data
    })
}

export function getManagerCount() {
    return request({
        url: '/cms/getManager',
        method: 'get',
    })
}

export function departmentLogin(data) {
    return request({
        url: '/department_login',
        method: 'post',
        data: data
    })
}

export function departmentRegister(data) {
    return request({
        url: '/department_register',
        method: 'post',
        data: data
    })
}



