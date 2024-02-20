import {router} from './router'
import NProgress from 'nprogress' // progress bar


NProgress.configure({ showSpinner: false }) // NProgress Configuration

//const whiteList = ['/login', '/register'] // 没有重定向白名单

router.beforeEach(async(to, from, next) => {
    // start progress bar~
    NProgress.start()

    console.log(to.path)
    if (to.path === '/') {
        next({path: '/cms_login'})
        console.log("asdasd")
        NProgress.done()
    } else {
        console.log("0000000000")
        next()
        NProgress.done()
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
