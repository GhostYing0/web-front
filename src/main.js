import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import {router} from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from "./store"
import '@/premission'
import * as echarts from 'echarts';

const app=createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)

//app.use(echarts)

const debounce = (fn, delay) => {
    let timer
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
        callback = debounce(callback, 200);
        super(callback);
    }
}

app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$http=axios;

app.mount('#app')
