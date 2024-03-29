import axios from "axios";
import { getToken } from '@/utils/auth'

const request = axios.create({
    baseURL: "http://localhost:9006/api/",
    timeout: 5000
})

request.interceptors.request.use(
    config => {
        if(config && config.headers) {
            config.headers['content-Type'] = 'application/json;charset=utf-8';
            config.headers["BackServer-token"] = getToken()
        }
        return config
    },
        error => {
    return Promise.reject(error)
});

request.interceptors.response.use(
    response => {
        // let res = response.data;
        // if (response.config.responseType === 'blob') {
        //     return res
        // }
        // if (typeof res === 'string') {
        //     res = res ? JSON.parse(res) : res
        // }
        // return res;
        return response.data
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default request;