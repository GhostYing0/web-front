<template>
  <div class="root-background">
  <div  class="register-form">
    <div>
      <h3 class="title">注册</h3>
    </div>
    <el-form ref="loginForm" :model="registerForm" :rules="registerRuler" auto-complete="on" label-position="left">
      <div class="register-el-step">
        <el-steps :active="active" finish-status="success" :align-center="true">
          <el-step :active="active" title="Step 1"/>
          <el-step :active="active" title="Step 2"/>
          <el-step :active="active" title="Step 3"/>
        </el-steps>
      </div>
      <div class="register-step-form" v-if="active === 0">
        <el-form-item prop="authority" label="身份" label-width="80px">
          <el-select v-model="registerForm.role" placeholder="请选择" style="width:200px" >
            <el-option :key="0" label="学生" :value=1></el-option>
            <el-option :key="1" label="教师" :value=2></el-option>
            <!--<el-option :key="2" label="管理员" :value=0></el-option>-->
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名" label-width="80px">
          <el-input
              class="register-form-text"
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
        <el-form-item prop="password" label="密码" label-width="80px">
          <el-input
              class="register-form-text"
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
        <el-form-item prop="confirm_password" label="再次输入" label-width="80px">
          <el-input
              class="register-form-text"
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
        <el-form-item prop="phone" label="手机号码" label-width="80px">
          <el-input
              class="register-form-text"
              ref="phone"
              v-model="registerForm.phone"
              placeholder="请输入手机号码"
              name="phone"
              type="text"
              tabindex="1"
              auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱" label-width="80px">
          <el-input
              class="register-form-text"
              ref="email"
              v-model="registerForm.email"
              placeholder="请输入电子邮箱"
              name="email"
              type="text"
              tabindex="1"
              auto-complete="on"
          />
        </el-form-item></div>
      <div class="register-step-form" v-if="active === 1">
        <el-form-item prop="name" label="姓名" label-width="80px">
          <el-input
              class="register-form-text"
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
        <el-form-item prop="school" label="学校" label-width="80px" style="width:300px">
          <div class="m-4">
            <el-cascader
                v-model="item_school"
                :options="schoolOptions"
                :props="props"
                filterable
                @change="handleSchool"
            />
          </div>
        </el-form-item>
        <el-form-item prop="college" label="所属学院" label-width="80px" style="width:300px">
          <div class="m-4">
            <el-cascader
                v-model="item_college"
                :options="collegeOptions"
                :props="props"
                filterable
                @change="handleCollege"
            />
          </div>
        </el-form-item>
        <el-form-item prop="semester" v-if="registerForm.role === 1" label="入学年份" label-width="80px" style="width:300px">
          <div class="m-4">
            <el-cascader
                v-model="item_semester"
                :options="semesterOptions"
                :props="props"
                filterable
                @change="handleSemester"
            />
          </div>
        </el-form-item>
        <el-form-item prop="class" v-if="registerForm.role === 1" label="班级" label-width="80px" style="width:295px">
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
      </div>
      <div class="register-step-form" v-if="active === 2"> <!-- 登录按钮 -->
        <div style="height: 40px; margin-bottom: 30px;">
          <el-button :loading="loading" type="primary" class="register-el-step-button" @click.prevent="next">注册</el-button>
        </div></div>
      <div class="register-step-form" v-if="active === 3">注册成功,3秒后跳转到登陆界面</div>
    </el-form>
    <div class="register-step-button">
      <el-button  v-if="active > 0" @click="prev">上一步</el-button>
      <el-button  v-if="active < 2" @click="next">下一步</el-button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { getToken } from '@/utils/auth'
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router"
import {router} from "@/router"
import store from "@/store"
import {getSchool, getCollege, getSemester} from "@/api/contest";
const active = ref(0)

const route = ref(router.currentRoute)
const schoolOptions = ref([])
const collegeOptions = ref([])
const semesterOptions = ref([])

const item_school = ref()
const item_college = ref()
const item_semester = ref()

const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入用户名'));
  }
}
const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('密码不能为空'));
  } else if (value.length < 6 || value.length > 18) {
    callback(new Error('密码长度应在6到18位之间'));
  } else if (!/^[A-Za-z0-9]+$/.test(value)) {
    callback(new Error('密码只能包含数字和字母'));
  } else {
    callback(); // 如果验证通过，则调用 callback 不带参数
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请再次输入密码'));
  } else if (registerForm.password !== registerForm.confirm_password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
}
const validateConfirmName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入姓名'));
  }
}
const validateConfirmGender = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择性别'));
  }
}
const validateConfirmSchool = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择学校'));
  }
}
const validateConfirmCollege = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择学院'));
  }
}
const validateConfirmSemester = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择入学年份'));
  }
}
const validateConfirmPhone = (rule, value, callback) => {
  const phoneRegex = /^\d{11}$/;
  if (!phoneRegex.test(value)) {
    callback(new Error('请输入有效的手机号码（11位数字）'));
  }
  callback()
}
const validateConfirmEmail = (rule, value, callback) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    callback(new Error('请输入有效的电子邮箱地址'));
  }
  callback()
}
const registerRuler = ref({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  confirm_password: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
  name: [{ required: true, trigger: 'blur', validator: validateConfirmName }],
  gender: [{ required: true, trigger: 'blur', validator: validateConfirmGender }],
  school: [{ required: true, trigger: 'blur', validator: validateConfirmSchool }],
  college: [{ required: true, trigger: 'blur', validator: validateConfirmCollege }],
  semester: [{ required: true, trigger: 'blur', validator: validateConfirmSemester }],
  phone: [{ required: true, trigger: 'blur', validator: validateConfirmPhone }],
  email: [{ required: true, trigger: 'blur', validator: validateConfirmEmail }],
})

const next = () => {
  if (active.value++ > 2) active.value = 0

  if(active.value === 3) {
    let res = handleRegister()
    if (res === true) {
      const redirect = route.value.query.redirect || "/login"
      console.log("redirect:", redirect)
      setTimeout(() => {
        router.push(redirect)
      }, 3000)
    } else {
      active.value = 0
    }
  }
}

const prev = () => {
  if (active.value-- <= 0) active.value = 0
}

const registerForm = reactive({
    username: '',
    password: '',
    confirm_password: "",
    role: 1,
    name:"",
    gender: '',
    school: "",
    college: "",
    semester: "",
    phone: "",
    email: "",
    class:""
})
const loading = ref(false)
const passwordType = ref('password')
const redirect = ref(null)

const handleSchool = () => {
  registerForm.school = item_school.value[0]
  console.log(registerForm.school)
}

const handleCollege = () => {
  registerForm.college = item_college.value[0]
  console.log(registerForm.college)
}

const handleSemester = () => {
  registerForm.semester = item_semester.value[0]
  console.log(registerForm.semester)
}

const isStudent = () => {
    console.log(registerForm.role)
    return registerForm.role === "学生"
}

const showPwd = () => {
  if (passwordType.value  === 'password') {
      passwordType.value = ''
  } else {
      passwordType.value  = 'password'
  }
  this.$nextTick(() => {
      this.$refs.password.focus()
  })
}
const initOptions = async () => {
  getSchool().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.School)
        schoolOptions.value.push({
          value:unit.School,
          label:unit.School
        })
        console.log(schoolOptions)
      })
    } catch (error) {
      console.error(error)
    }
  })
  getCollege().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.College)
        collegeOptions.value.push({
          value:unit.College,
          label:unit.College
        })
        console.log(collegeOptions)
      })
    } catch (error) {
      console.error(error)
    }
  })
  getSemester().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.semester)
        semesterOptions.value.push({
          value:unit.Semester,
          label:unit.Semester
        })
        console.log(semesterOptions)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

const handleRegister = async () => {
// this.$refs.registerForm.validate(valid => {
//     if (valid) {
  let res = true
  if (!getToken()) {
      loading.value = true;
      if(registerForm.gender === 1) {
          registerForm.gender = "男"
      }  else {
          registerForm.gender = "女"
      }
      console.log(registerForm)
    await store.dispatch('user/Register', registerForm).then((data) => {
        console.log("data:", data)
        loading.value  = false
      }).catch((error) => {
          console.error("error:", error)
          loading.value  = false
          res = false
      })
  } else {
      console.log('您已登录,请退出后注册')
  }
  return res
}
onMounted(initOptions)
</script>

<style lang="scss">
.root-background {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #5a5e66;
  .register-el-step-button {
    margin-left: auto;
    margin-top: 50px;
    width:150px;
    margin-right: auto;
  }
  .register-step-button {
    position: absolute;
    flex-direction: row;
    margin-top: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  .register-form {
    position: relative;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 800px;
    border-style: solid;
    border-width: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 550px;
    .register-el-step {
      flex:1;
      width: 500px;
      margin-top: 30px;
      margin-left: auto;
      margin-right: auto;
      flex-shrink: 0; // 防止元素收缩
    }
    .register-step-form {
      flex:4;
      margin-top: 50px;
      width: 300px;
      margin-left: auto;
      margin-right: auto;
      flex-shrink: 0; // 防止元素收缩
      .register-form-text {
        width: 200px;
      }
    }
  }
}
</style>