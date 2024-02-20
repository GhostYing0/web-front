<template>
    <div>
        <input type="text" v-model="username"/>用户名
        <input type="password" v-model="password"/>密码
        <input type="button" @click="login"/>登录
    </div>
</template>

<script>
    import request from '../http/axios';
    export default {
        data() {
            return {
                username: "",
                password: "",
                role: "cms"
            }
        },
        methods: {
            login() {
                const data = {
                    username: this.username,
                    password: this.password,
                    role : this.role
                }
                request.post('/cms/login', data).
                    then(data => console.log(data))
                    .catch(error => console.error(error));
            }

        }
    }
</script>

<style scoped>

</style>