import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:9006/api/",
    timeout: 5000
})

request.interceptors.request.use(config => {
    if(config && config.headers){
        config.headers['content-Type'] = 'application/json;charset=utf-8';
    }
    return config
}, error => {
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
        return response
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export default request;