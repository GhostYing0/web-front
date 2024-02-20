import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import {router} from './router'
import ElementPlus from 'element-plus';

const app=createApp(App)
//app.use(store)
app.use(router)
app.use(ElementPlus)

//app.use(ElementPlus)

app.config.globalProperties.$http=axios;

app.mount('#app')
