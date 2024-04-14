<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <!-- 标题 -->
            <div class="title-container">
                <h3 class="title">登录竞赛信息管理系统</h3>
            </div>
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input
                        class="yuan"
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="请输入用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input
                        class="yuan"
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleLogin"
                />
                <span class="show-pwd" @click="showPwd"></span>
            </el-form-item>
            <!-- 权限 -->
            <el-form-item prop="authority">
                <el-select v-model="loginForm.role" placeholder="请选择" style="width:240px">
                    <el-option :key="0" label="学生" :value=1></el-option>
                    <el-option :key="1" label="教师" :value=2></el-option>
                    <el-option :key="2" label="管理员" :value=0></el-option>
                </el-select>
            </el-form-item>

            <!-- 登录按钮 -->
            <div class="login-button">
                <el-button :loading="loading" type="primary" style="width: 48%; " @click.prevent="handleLogin">登录</el-button>
                <el-button :loading="loading" type="success" style="width: 48%; " @click.prevent="handleRegister">注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    // import request from '../../http/axios';
    // import {login, getUser, state} from "../../store/manger"
    import { getToken } from '@/utils/auth'
    export default {
        name: 'UserLogin',

        data() {
            const validateUsername = (rule, value, callback) => {
                callback()
            }
            const validatePassword = (rule, value, callback) => {
                callback()
            }
            return {
                loginForm: {
                    username: 'gu',
                    password: 'gu112233..',
                    role: 1
                },
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                loading: false,
                passwordType: 'password',
                redirect: undefined,
            }
        },
        methods: {
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        if (!getToken()) {
                            this.loading = true;
                            console.log(this.loginForm)
                            this.$store.dispatch('user/Login', this.loginForm).then((data) => {
                                console.log("data:", data)

                                const redirect = this.$route.query.redirect || '/dashboard';

                                // 登录成功后跳转到登录前的页面
                                this.$router.push(redirect);


                            }).catch((error) => {
                                console.error("error:", error)
                                this.loading = false
                            })
                        } else {
                            console.log('您已登录,不能重复登陆')
                        }
                    }
                    else {
                        console.log("表单验证不通过，不允许提交")
                        return false
                    }
                })
            },
            handleRegister() {
                console.log("注册按钮")
                this.$router.push({ path: '/register' })  // 进注册页面
            }
        }
    }
</script>
<style lang="scss">
    .login-container{
        border-style: solid;
        border-width: 5px;
        display: flex;  
        justify-content: center; 
        align-items: center;  
        height: 10%;
    }
    .login-button .el-button {  
        display: flex; /* 使用 flexbox 布局 */  
  justify-content: space-between; /* 两端对齐，确保按钮之间有间隔 */  
        margin: 0 5px; /* 可选：按钮之间的间距 */  
}  
</style>