<template>
    <div class="login-container">
        <!--<el-form ref="loginForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on" label-position="left">-->
        <el-form ref="loginForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on" label-position="left">
            <!-- 标题 -->
            <div class="title-container">
                <h3 class="title">注册</h3>
            </div>
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input
                        class="yuan"
                        ref="username"
                        v-model="registerForm.username"
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
                        v-model="registerForm.password"
                        :type="passwordType"
                        placeholder="请输入密码"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
                <!--确认密码-->
                <span class="show-pwd" @click="showPwd"></span>
            </el-form-item>
            <el-form-item prop="confirm_password">
                <el-input
                        class="yuan"
                        :key="passwordType"
                        ref="confirm_password"
                        v-model="registerForm.confirm_password"
                        :type="passwordType"
                        placeholder="请再次输入密码"
                        name="confirm_password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
            </el-form-item>
            <el-form-item prop="name">
                <el-input
                        class="yuan"
                        ref="name"
                        v-model="registerForm.name"
                        :type="text"
                        placeholder="请输入姓名"
                        name="name"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio v-model="registerForm.gender" :label="1">男</el-radio>
                <el-radio v-model="registerForm.gender" :label="2">女</el-radio>
            </el-form-item>
            <el-form-item prop="school">
                <el-input
                        class="yuan"
                        ref="school"
                        v-model="registerForm.school"
                        :type="text"
                        placeholder="学校"
                        name="school"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
            </el-form-item>
            <el-form-item prop="college">
                <el-input
                        class="yuan"
                        ref="college"
                        v-model="registerForm.college"
                        :type="text"
                        placeholder="学院"
                        name="college"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
            </el-form-item>
            <el-form-item prop="semester" v-if="registerForm.role === 1">
                <el-input
                        class="yuan"
                        ref="semester"
                        v-model="registerForm.semester"
                        :type="text"
                        placeholder="入学年份"
                        name="semester"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
            </el-form-item>
            <el-form-item prop="class" v-if="registerForm.role === 1">
                <el-input
                        class="yuan"
                        ref="class"
                        v-model="registerForm.class"
                        :type="text"
                        placeholder="班级"
                        name="class"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter="handleRegister"
                />
            </el-form-item>
            <!-- 权限 -->
            <el-form-item prop="authority">
                <el-select v-model="registerForm.role" placeholder="请选择" style="width:240px">
                    <el-option :key="0" label="学生" :value=1></el-option>
                    <el-option :key="1" label="教师" :value=2></el-option>
                    <!--<el-option :key="2" label="管理员" :value=0></el-option>-->
                </el-select>
            </el-form-item>

            <!-- 登录按钮 -->
            <div style="height: 40px; margin-bottom: 30px;">
                <el-button :loading="loading" type="primary" style="width: 48%; float: left;" @click.prevent="handleRegister">注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { getToken } from '@/utils/auth'
    export default {
        name: 'register',

        data() {
            return {
                registerForm: {
                    username: '',
                    password: '',
                    confirm_password: "",
                    role: 1,
                    name:"",
                    gender: '',
                    school: "",
                    college: "",
                    semester: "",
                    class:""

                },
                loading: false,
                passwordType: 'password',
                redirect: undefined,
            }
        },
        methods: {
            isStudent() {
                console.log(this.registerForm.role)
                return this.registerForm.role === "学生"
            },
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
            handleRegister() {
                // this.$refs.registerForm.validate(valid => {
                //     if (valid) {
                        if (!getToken()) {
                            this.loading = true;
                            console.log(this.loginForm)
                            if(this.registerForm.gender === 1) {
                                this.registerForm.gender = "男"
                            }  else {
                                this.registerForm.gender = "女"
                            }
                            this.$store.dispatch('user/Register', this.registerForm).then((data) => {
                                console.log("data:", data)

                                const redirect = this.$route.query.redirect || '/login';

                                // 登录成功后跳转到登录前的页面
                                this.$router.push(redirect);


                            }).catch((error) => {
                                console.error("error:", error)
                                this.loading = false
                            })
                        } else {
                            console.log('您已登录,请推出后注册')
                        }
                    }
                    // else {
                    //     console.log("表单验证不通过，不允许提交")
                    //     return false
                    // }
                //})
            //}
        }
    }
</script>
<style scoped>

</style>