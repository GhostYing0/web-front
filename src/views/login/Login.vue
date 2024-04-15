<template>
  <div class="root-background">
    <div class="login-container">
        <div class="login-icon">
        </div>
        <div class="login-window">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <!-- 标题 -->
            <div class="title-container">
                <h3 class="title">登录竞赛信息管理系统</h3>
            </div>
            <!-- 用户名 -->
            <el-form-item prop="username" class="login-input" label="用户名" label-width="80px">
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
            <el-form-item prop="password" class="login-input" label="密码" label-width="80px">
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
            <el-form-item prop="authority" class="login-auth" label="身份" label-width="80px">
                <el-select v-model="loginForm.role" placeholder="请选择" style="width:240px">
                    <el-option :key="0" label="学生" :value=1></el-option>
                    <el-option :key="1" label="教师" :value=2></el-option>
                    <el-option :key="2" label="管理员" :value=0></el-option>
                </el-select>
            </el-form-item>

            <!-- 登录按钮 -->
            <div class="login-button">
                <el-button :loading="loading" type="primary" class="login-login-button"  @click.prevent="handleLogin">登录</el-button>
                <el-button :loading="loading" type="success" class="login-register-button"  @click.prevent="handleRegister">注册</el-button>
            </div>
        </el-form>
        </div>
    </div>
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
  .root-background {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #5a5e66;
    .login-container {
      background-color: white;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10%;
      width: 700px;
      border-style: solid;
      border-width: 3px;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 300px;

      .login-icon {
        flex: 3;
      }

      .login-window {
        border-left: 1px solid;
        flex: 4;

        .login-input {
          margin-left: 20px;
          width: 275px;
        }

        .login-auth {
          margin-left: 20px;
          width: 200px;
        }

        .login-button {
          flex-direction: row;

          .login-login-button {
            width: 120px;
          }

          .login-register-button {
            margin-left: 30px;
            width: 50px;
          }
        }
      }
    }
  }
//  //  .login-button .el-button {
//  //      display: flex; /* 使用 flexbox 布局 */
//  //justify-content: space-between; /* 两端对齐，确保按钮之间有间隔 */
//  //      margin: 0 5px; /* 可选：按钮之间的间距 */
//}
</style>