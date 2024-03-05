import {router} from './router'
import NProgress from 'nprogress' // progress bar
import store from './store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-plus'
//import user from './store/user/student.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/login", "/register"] // 没有重定向白名单

router.beforeEach(async(to, from, next) => {
    // start progress bar~
    NProgress.start()

    const hasToken = getToken()
    //console.log("token:", user.state.token)

    console.log(to.path)
    if (hasToken) {
        if (to.path === '/login' || to.path === "/register") {
            next()
            NProgress.done()
        } else {
            console.log("你有令牌访问其他网页,还需要写身份验证")
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if(hasRoles){
                next()
            } else {
                try {
                    const { roles } = await store.dispatch("user/getInfo")

                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
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
            // 访问白名单网页，直接跳转
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
