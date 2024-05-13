import {router} from './router'
import NProgress from 'nprogress' // progress bar
import store from './store'
import { getToken } from '@/utils/auth'
import { ElMessage  } from 'element-plus'
//import user from './store/user/user.js'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/login", "/register", "/dashboard"] // 没有重定向白名单

router.beforeEach(async(to, from, next) => {
    // start progress bar~
    NProgress.start()

    const hasToken = getToken()

    console.log("hasToken:", hasToken)

    console.log(to.path)
    if (hasToken) {
        if (to.path === '/login' || to.path === "/register") {
            console.log("您已登录")
            next("/contestInformationManager");
            NProgress.done()
        } else {
            console.log("你有令牌访问其他网页,还需要写身份验证")
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            console.log("roles:",store.getters.roles)
            if(hasRoles){
                next()
            } else {
                console.log("进行添加路由")
                try {
                    const { roles } = await store.dispatch("user/getInfo")
                    console.log(roles[0])
                    // 先不展示系部管理员的简介
                    if(!roles.includes("manager")) {
                        await store.dispatch("user/getProfile")
                    }
                        //await store.dispatch("user/getProfile", 1)
                    // } else if (roles.includes("teacherProcessEnroll")){
                    //     //await store.dispatch("user/getProfile", 2)
                    // }

                    const accessedRoutes = await store.dispatch("permission/generateRoutes", roles)

                    //console.log("accessedRoutes:", accessedRoutes)
                    //
                    // // dynamically add accessible routes
                    router.addRoute(accessedRoutes)
                    accessedRoutes.forEach(route => {
                        router.addRoute(route)
                    })

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (error) {
                    console.error("添加失败:",error)
                    // remove token and go to login page to re-login
                    await store.dispatch('user/ResetToken')
                    ElMessage .error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
            NProgress.done()
        }
    } else {
        console.log("没有token")
        if (whiteList.indexOf(to.path) !== -1) {
            console.log(to.path)
            // 访问白名单网页，直接跳转S
            next()
        } else {
            console.log(to.path)
            // 需要token，跳转到/Login页面
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
