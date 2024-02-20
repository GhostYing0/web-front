<template>
    <div>
        <p>添加用户</p>
    </div>
    <div>
        <input type="text" v-model="username" placeholder="请输入账号">
        <input type="password" v-model="password" placeholder="请输入密码">
        <button @click="sendData">添加</button>
    </div>
</template>

<script>
    //import {alldata} from "@/http/index.js";
    import request from '../http/axios';
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            sendData() {
                const data = {
                        username:this.username,
                        password:this.password};
                request.post('/cms/add_user', data)
                    .then(data => console.log(data))
                    .catch(error => console.error(error));
            }
        }
    }
</script>

<style scoped>

</style>