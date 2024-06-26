// import {login, register, updatePassword, getUser} from "@/api/manager";
import {
    login as userLogin,
    getInfo,
    cmsLogin,
    logout,
    cmsRegister,
    register,
    getProfileStudent,
    getProfileTeacher,
    departmentLogin, departmentRegister,getProfileDepartmentManager
} from "@/api/user";
// import {getToken, setToken, removeToken} from "../../utils/auth";
import {getToken, setToken, removeToken} from "../../utils/auth";
import {resetRouter} from "../../router";
//import {resetRouter} from "../../router";

const getDefaultState = () => {
    return {
        token: getToken(),
        id: 0,
        username: "",
        roles: [],
        name: "",
        gender: "",
        school: "",
        college: "",
        semester: "",
        student_class: "",
        phone: "",
        email: "",
        avatar: "",
        department: "",
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_GENDER: (state, gender) => {
        state.gender = gender
    },
    SET_SCHOOL: (state, school) => {
        state.school = school
    },
    SET_COLLEGE: (state, college) => {
        state.college = college
    },
    SET_SEMESTER: (state, semester) => {
        state.semester = semester
    },
    SET_CLASS: (state, student_class) => {
        state.student_class = student_class
    },
    SET_PHONE: (state, phone) => {
        state.phone = phone
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_DEPARTMENT: (state, department) => {
        state.department = department
    }
}

const actions = {
    Login({commit}, userInfo) {
        const {username, password, role} = userInfo
        return new Promise((resolve, reject) => {
            if(role === 0){
                cmsLogin({username: username.trim(), password: password, role: role}).then(response => {
                    console.log(response)
                    const {code, message, data} = response

                    if(code !== 200) {
                        reject(message)
                        return
                    }

                    commit("SET_TOKEN", data.token)
                    console.log("asdasdasd:",data.token)
                    setToken(data.token)
                    resolve(data)
                }).catch(error => {
                    console.log("error!")
                    reject(error)
                })
            } else if(role === 1 || role === 2) {
                userLogin({username: username.trim(), password: password, role: role}).then(response => {
                    const {code, message, data} = response
                    console.log(response)

                    if(code !== 200) {
                        reject(message)
                        return
                    }

                    commit("SET_TOKEN", data.token)
                    setToken(data.token)
                    resolve(data)
                }).catch(error => {
                    console.log("error!")
                    reject(error)
                })
            } else if(role === 3) {
                departmentLogin({username: username.trim(), password: password, role: role}).then(response => {
                    const {code, message, data} = response
                    console.log(response)

                    if(code !== 200) {
                        reject(message)
                        return
                    }

                    commit("SET_TOKEN", data.token)
                    setToken(data.token)
                    resolve(data)
                }).catch(error => {
                    console.log("error!")
                    reject(error)
                })
            } else {
                reject("非法role")
            }
        })
    },

    Register({commit}, registerForm) {
        const {username, password, confirm_password, role, name,gender,school, college,semester, phone, email, department, student_class} = registerForm
        return new Promise((resolve, reject) => {
            if(role === 0){
                cmsRegister({username: username.trim(), password: password, confirm_password: confirm_password, role: role}).then(response => {
                    console.log(response)
                    const {code, message, data} = response

                    if(code != 200) {
                        reject(message)
                    }

                    resolve(data)
                }).catch(error => {
                    console.log("error!")
                    reject(error)
                })
            } else if(role === 1 || role === 2) {
                register({username: username.trim(), password: password, confirm_password: confirm_password, role: role,
                    name:name, gender:gender, school:school, college:college, semester:semester, class:student_class, phone:phone, email:email}).then(response => {
                    const {code, message, data} = response

                    if(code != 200) {
                        reject(message)
                    }

                    resolve(data)
                }).catch(error => {
                    console.log("error!")
                    reject(error)
                })
            } else if(role === 3 ){
                departmentRegister({username: username.trim(), password: password, confirm_password: confirm_password, role: role,
                    name:name, school:school, college:college, department:department, phone:phone, email:email}).then(response => {
                    const {code, message, data} = response

                    if(code != 200) {
                        reject(message)
                    }

                    resolve(data)
                }).catch(error => {
                    console.log("error!")
                    reject(error)
                })
            } else {
                reject("非法role")
            }
        })
    },

    getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
            const {data} = response
            if(!data) {
                reject("验证失败，请重新登录")
            }

            console.log("返回值:",data)
            if(data.role === 0) {
                data["roles"] = ["manager"]
            } else if(data.role === 1) {
                data["roles"] = ["student"]
            } else if(data.role === 2) {
                data["roles"] = ["teacher"]
            } else if(data.role === 3) {
                data["roles"] = ["department_manager"]
            } else {
                reject("非法用户身份!")
            }

            const {id, roles, username} = data

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
                reject('getInfo: roles 必须是非空数组!')
            }

            commit('SET_ID', id)
            commit('SET_ROLES', roles)
            commit('SET_USERNAME', username)

            console.log(state.id)
            console.log(state.roles)
            console.log(state.name)
            resolve(data)
        }).catch(error => {
            reject(error)
        })
    })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    ResetToken({ commit })
    {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    getProfile({ commit, state}) {
        return new Promise((resolve, reject) => {
            if(state.roles.includes("student")) {
                getProfileStudent().then(response => {
                    console.log("student:",response)
                    const {data} = response
                    if (!data) {
                        reject("验证失败，请重新登录")
                    }

                    const {name, gender, school, semester, college, student_class, avatar, phone, email} = data


                    commit('SET_NAME', name)
                    commit('SET_GENDER', gender)
                    commit('SET_SCHOOL', school)
                    commit('SET_SEMESTER', semester)
                    commit('SET_COLLEGE', college)
                    commit('SET_CLASS', student_class)
                    commit('SET_AVATAR', avatar)
                    commit('SET_PHONE', phone)
                    commit('SET_EMAIL', email)

                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else if (state.roles.includes("teacher")) {
                getProfileTeacher(state.token).then(response => {
                    const {data} = response
                    if(!data) {
                        reject("验证失败，请重新登录")
                    }

                    const {name, gender, school, college, avatar, phone, email, department} = data

                    commit('SET_NAME', name)
                    commit('SET_GENDER', gender)
                    commit('SET_SCHOOL', school)
                    commit('SET_COLLEGE', college)
                    commit('SET_AVATAR', avatar)
                    commit('SET_PHONE', phone)
                    commit('SET_DEPARTMENT', department)
                    commit('SET_EMAIL', email)

                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            } else if (state.roles.includes("department_manager")) {
                getProfileDepartmentManager(state.token).then(response => {
                    const {data} = response
                    if(!data) {
                        reject("验证失败，请重新登录")
                    }

                    const {name, gender, school, college, phone, email, department} = data

                    commit('SET_NAME', name)
                    commit('SET_GENDER', gender)
                    commit('SET_SCHOOL', school)
                    commit('SET_COLLEGE', college)
                    commit('SET_PHONE', phone)
                    commit('SET_EMAIL', email)
                    commit('SET_DEPARTMENT', department)

                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}