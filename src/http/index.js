import axios from "../axios";

export const alldata=(data)=>{
    return axios({
        url:'/cms/add_user',
        methdo:"post",
        data
    })
}

export default {alldata}