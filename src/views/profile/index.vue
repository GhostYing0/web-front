<template>
  <div>
    <el-avatar size="large"
        :src=avatar
               v-if="!store.getters.roles.includes('department_manager')"
    />
  </div>
  <el-descriptions
        class="margin-top"
        title="个人信息"
        :column="3"
        :size="size"
        border
    >
      <template #extra>
        <el-button type="primary" @click="updateUserAvatar" v-if="!store.getters.roles.includes('department_manager')">更换头像</el-button>
        <el-button type="primary" @click="updateUserProfile">编辑</el-button>
        <el-button type="warning" @click="updateUserPassword">修改密码</el-button>
      </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          角色
        </div>
      </template>
      <el-text v-if="store.getters.roles.includes('student')">学生</el-text>
      <el-text v-if="store.getters.roles.includes('teacher')">教师</el-text>
      <el-text v-if="store.getters.roles.includes('department_manager')">系部管理员</el-text>
    </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
             姓名
          </div>
        </template>
        <el-text v-text=name></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            电话号码
          </div>
        </template>
        <el-text v-text=phone></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Message />
            </el-icon>
            邮箱
          </div>
        </template>
        <el-text v-text=email></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            学校
          </div>
        </template>
        <el-text v-text=school></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            学院
          </div>
        </template>
        <el-text v-text=college></el-text>
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
<!--      <el-descriptions-item>-->
<!--        <template #label>-->
<!--          <div class="cell-item">-->
<!--            <el-icon :style="iconStyle">-->
<!--              <office-building />-->
<!--            </el-icon>-->
<!--            性别-->
<!--          </div>-->
<!--        </template>-->
<!--        <el-text v-text=gender></el-text>-->
<!--      </el-descriptions-item>-->
      <el-descriptions-item v-if="store.getters.roles.includes('student')">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            班级
          </div>
        </template>
        <el-text v-text=student_class></el-text>
      </el-descriptions-item>
    <el-descriptions-item v-if="store.getters.roles.includes('department_manager')">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          系部
        </div>
      </template>
      <el-text v-text=department></el-text>
    </el-descriptions-item>
    <el-descriptions-item v-if="store.getters.roles.includes('student')">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          入学年份
        </div>
      </template>
      <el-text v-text=semester></el-text>
    </el-descriptions-item>
    </el-descriptions>

  <!--弹出框-->
  <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
    <!--普通表单-->
    <el-form :rules="registerRuler">
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item><el-form-item>
    <el-button type="primary" @click="SubmitProfile">提交</el-button>
  </el-form-item>
    </el-form>
  </el-dialog>

  <!--弹出框-->
  <el-dialog :title="formTitle" v-model="dialogPasswordVisible" width="30%">
    <!--普通表单-->
    <el-form :rules="registerRuler">
    <el-form-item label="新密码" prop="password">
      <el-input v-model="form.password" :type="'password'"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <el-input v-model="form.confirm_password" :type="'password'"></el-input>
    </el-form-item><el-form-item>
    <el-button type="primary" @click="SubmitPassword">提交</el-button>
  </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog :title="formAvatar" v-model="dialogAvatarVisible" width="30%">
    <el-form-item label="头像">
      <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          action="http://localhost:9006/api/public/v1/upload"
          :on-change="handleChange"
          :auto-upload="false"
          name="file"
      >
        <el-icon class="esl-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="SubmitAvatar">提交</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script setup>
  import store from '../../store'
  import {computed, reactive, ref} from 'vue'
  import {
      Iphone,
      Location,
      OfficeBuilding,
      Tickets,
      User,
      Message,


  } from '@element-plus/icons-vue'
  import {updateAvatar, updateProfile, updatePassword} from '../../api/user'
  import {FALSE} from "sass";
  import {ElMessage} from "element-plus";
  import {router} from "@/router";
  import axios from "axios";
  import {getToken} from "@/utils/auth";

  const route = ref(router)
  const name = computed(()=>{
    return store.getters.name
  })
  const phone = computed(()=>{
    return store.getters.phone
  })
  const email = computed(()=>{
    return store.getters.email
  })
  const gender = computed(()=>{
    return store.getters.gender
  })
  const school = computed(()=>{
    return store.getters.school
  })
  const semester = computed(()=>{
    return store.getters.semester
  })
  const college = computed(()=>{
    return store.getters.college
  })
  const student_class = computed(()=>{
    return store.getters.student_class
  })
  const avatar = computed(()=>{
    return store.getters.avatar
  })
  const department = computed(()=>{
    return store.getters.department
  })

  const size = ref('default')
  const iconStyle = computed(() => {
    const marginMap = {
      large: '8px',
      default: '6px',
      small: '4px',
    }
    return {
      marginRight: marginMap[size.value] || marginMap.default,
    }
  })

  const dialogAvatarVisible = ref(false)
  const dialogFormVisible = ref(false)
  const dialogPasswordVisible = ref(false)

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
    } else if (form.password !== form.confirm_password) {
      callback(new Error('两次输入的密码不一致'));
    } else {
      callback();
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
    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
    confirm_password: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
    phone: [{ required: true, trigger: 'blur', validator: validateConfirmPhone }],
    email: [{ required: true, trigger: 'blur', validator: validateConfirmEmail }],
  })

  const form = reactive({
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: "",
  })

  const updateUserPassword = () => {
    dialogPasswordVisible.value = true
  }

  const updateUserProfile = () => {
    dialogFormVisible.value = true
  }

  const updateUserAvatar = () => {
    dialogAvatarVisible.value = true
  }

  const SubmitPassword = () => {
    if(store.getters.roles.includes("student") || store.getters.roles.includes("teacher")) {
      updatePassword(form).then(resp => {
        if(resp.data.code === 200) {
          route.value.go(0)
        }
      }).catch(error => {
        ElMessage({
          type: 'fail',
          message: '更新失败',
        })
        console.error(error)
      })
    }
    dialogPasswordVisible.value = false
  }

  const SubmitProfile = () => {
    if(store.getters.roles.includes("student") || store.getters.roles.includes("teacher")) {
      updateProfile(form).then(resp => {
        if(resp.data.code === 200) {
          route.value.go(0)
        }
      }).catch(error => {
        ElMessage({
          type: 'fail',
          message: '更新失败',
        })
        console.error(error)
      })
    }
    dialogFormVisible.value = false
  }


  const uploadRef = ref(null); // 上传组件的引用，需要是 null，因为组件可能还没有挂载

  // 处理文件变化
  const handleChange = (file) => {
    console.log("文件变化：", file);
    uploadRef.value = file
    // 如果这里是要引用某个上传组件的实例，请确保该组件正确传递了引用
    // uploadRef.value = file; // 这一步取决于你的上传组件API，可能需要的是文件对象，而不是组件实例
  };

  // 创建Axios实例，用于特定的请求配置
  const uploadAxios = axios.create({
    baseURL: "http://localhost:9006/api/",
    timeout: 5000
  })

  // 为这个特定的Axios实例设置请求拦截器
  uploadAxios.interceptors.request.use(config => {
    // 这里可以添加或覆盖头部信息
    config.headers["Content-Type"] = 'multipart/form-data'
    config.headers["BackServer-token"] = getToken()
    return config;
  }, error => {
    return Promise.reject(error);
  });

  const formPic = reactive({
    file: '',
  })

  const SubmitAvatar = async () => {
    if (uploadRef.value) {
      console.log("(((((((^^^^^^^^^^^^^^^^^^^676")
      formPic.file = uploadRef.value
      //发送请求到后端接口
      const resp = await uploadAxios.post('public/v1/upload', formPic)
      console.log("resp:",resp)
      if(resp.data.code === 200) {
        form.avatar = resp.data.data.imageurl
      }
    }

    if(store.getters.roles.includes("student") || store.getters.roles.includes("teacher")) {
      updateAvatar(form).then(resp => {
        if(resp.data.code === 200) {
          route.value.go(0)
        }
      }).catch(error => {
        ElMessage({
          type: 'fail',
          message: '更新失败',
        })
        console.error(error)
      })
    }
    dialogAvatarVisible.value = false
  }
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>