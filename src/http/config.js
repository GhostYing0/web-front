export default {
    method: 'get',
    vaseUrl: process.env.BASE_URL,

    header: {
        'Content-Type': 'application/json;charset=UTF-8'
    },

    data: {},

    timeout: 5000,

    withCredentials: false,

    responseType: 'json'
}

