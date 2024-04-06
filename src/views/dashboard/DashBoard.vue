<template>
    <div class="mb-4">
        <el-button type="primary" plain @click="login">登录</el-button>
        <el-button type="success" plain @click="register">注册</el-button>
    </div>
</template>

<script>
    import {router} from '../../router'
    export default {
        name: "DashBoard",


        methods: {
            login() {
                router.push("/login")
            },

            register() {
                router.push("/register")
            }
        }
    }
</script>

<style scoped>
</style>