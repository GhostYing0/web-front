<template>
  <div class="root-background">
  <div  class="register-form">
    <div>
      <h3 class="title">注册</h3>
    </div>
    <el-form ref="loginForm" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="left">
      <div class="register-el-step">
        <el-steps style="max-width: 600px" :active="active" finish-status="success">
          <el-step :active="active" title="Step 1"/>
          <el-step :active="active" title="Step 2"/>
          <el-step :active="active" title="Step 3"/>
        </el-steps>
      </div>
      <div class="register-step-form" v-if="active === 0">
        <el-form-item prop="authority">
          <el-select v-model="registerForm.role" placeholder="请选择" style="width:240px">
            <el-option :key="0" label="学生" :value=1></el-option>
            <el-option :key="1" label="教师" :value=2></el-option>
            <!--<el-option :key="2" label="管理员" :value=0></el-option>-->
          </el-select>
        </el-form-item>
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
        </el-form-item></div>
      <div class="register-step-form" v-if="active === 1">
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
          <div class="m-4">
            学校
            <el-cascader
                v-model="item_school"
                :options="schoolOptions"
                :props="props"
                filterable
                @change="handleSchool"
            />
          </div>
        </el-form-item>
        <el-form-item prop="college">
          <div class="m-4">
            所属学院
            <el-cascader
                v-model="item_college"
                :options="collegeOptions"
                :props="props"
                filterable
                @change="handleCollege"
            />
          </div>
        </el-form-item>
        <el-form-item prop="semester" v-if="registerForm.role === 1">
          <div class="m-4">
            入学年份
            <el-cascader
                v-model="item_semester"
                :options="semesterOptions"
                :props="props"
                filterable
                @change="handleSemester"
            />
          </div>
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
      </div>
      <div class="register-step-form" v-if="active === 2"> <!-- 登录按钮 -->
        <div style="height: 40px; margin-bottom: 30px;">
          <el-button :loading="loading" type="primary" style="width: 48%; float: left;" @click.prevent="handleRegister">注册</el-button>
        </div></div>
    </el-form>
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </div>
  </div>
</template>

<script setup>
import { getToken } from '@/utils/auth'
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router"
import store from "@/store"
import {getSchool, getCollege, getSemester} from "@/api/contest";
const active = ref(0)

const route = useRouter()
const schoolOptions = ref([])
const collegeOptions = ref([])
const semesterOptions = ref([])

const item_school = ref()
const item_college = ref()
const item_semester = ref()

const next = () => {
if (active.value++ > 2) active.value = 0
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

const handleRegister = () => {
// this.$refs.registerForm.validate(valid => {
//     if (valid) {
  if (!getToken()) {
      loading.value = true;
      if(registerForm.gender === 1) {
          registerForm.gender = "男"
      }  else {
          registerForm.gender = "女"
      }
      console.log(registerForm)
      store.dispatch('user/Register', registerForm).then((data) => {
          console.log("data:", data)

          const redirect = route.query.redirect || '/login';

          // 登录成功后跳转到登录前的页面
        route.push(redirect);


      }).catch((error) => {
          console.error("error:", error)
          loading.value  = false
      })
  } else {
      console.log('您已登录,请推出后注册')
  }
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

  .register-el-step {
    margin-top: 10px;
    margin-left: 300px;
    flex-shrink: 0; // 防止元素收缩
  }
  .register-form {
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
    width: 800px;
    border-style: solid;
    border-width: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 400px;
    .register-step-form {
      margin-left: 200px;
      flex-shrink: 0; // 防止元素收缩
    }
  }
}
</style>