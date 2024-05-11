<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="报名竞赛名称">
        <el-input v-model="form.contest" disabled/>
      </el-form-item>
      <el-form-item label="竞赛类型">
        <el-input v-model="form.contest_type" disabled/>
      </el-form-item>
      <el-form-item label="报名竞赛级别">
        <el-input v-model="form.contest_level" disabled/>
      </el-form-item>
      <el-form-item label="获奖学生姓名">
        <el-input v-model="form.name" disabled/>
      </el-form-item>
      <el-form-item label="获奖学生学号">
        <el-input v-model="form.student_school_id" disabled/>
      </el-form-item>
      <el-form-item label="获奖时间">
      <div class="demo-date-picker">
          <el-date-picker
              v-model="form.reward_time"
              type="datetime"
              placeholder="选择时间"
              :size="size"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
          />
      </div>
      </el-form-item>
      <el-form-item label="所属学院">
        <el-input v-model="form.college" disabled/>
      </el-form-item>
      <el-form-item label="所属专业">
        <el-input v-model="form.major" disabled/>
      </el-form-item>
      <el-form-item label="指导老师姓名">
        <el-input v-model="form.guidance_teacher" />
      </el-form-item>
      <el-form-item label="指导老师所属院系">
        <el-input v-model="form.teacher_department" />
      </el-form-item>
      <el-form-item label="指导老师职称">
        <el-input v-model="form.teacher_title" />
      </el-form-item>
      <el-form-item label="获奖级别" class="filter-check">
        <el-radio v-model="form.prize" :label="1" @change="handleFilter">特等奖</el-radio>
        <el-radio v-model="form.prize" :label="2" @change="handleFilter">一等奖</el-radio>
        <el-radio v-model="form.prize" :label="3" @change="handleFilter">二等奖</el-radio>
        <el-radio v-model="form.prize" :label="4" @change="handleFilter">三等奖</el-radio>
      </el-form-item>
      <el-form-item label="证书">
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
        <el-button class="doUploadGrade-button" type="primary" @click="handleCreate">提交</el-button>
        <el-button class="doUploadGrade-button" @click="handleReturn()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {teacherGetOneEnroll} from "@/api/enroll";
import {onMounted, reactive, ref} from "vue";
import {router} from "@/router";
import store from "@/store";
import axios from "axios";
import {getToken} from "@/utils/auth";
import {uploadGrade} from "@/api/grade";
import {ElMessage} from "element-plus";

const route = ref(router)

const form = reactive({
  enroll_id: -1,
  contest: "",
  contest_id : 0,
  contest_type: "",
  contest_level: "",
  name: "",
  student_school_id: "",
  semester: "",
  reward_time: "",
  major: "",
  guidance_teacher: "",
  teacher_department: "",
  teacher_title: "",
  prize: "",
  college: "",
  certificate: "",
})

const param = reactive({
  id: -1,
})


const handleGetEnroll = async () => {
  param.id = parseInt(route.value.currentRoute.params.enroll_information_id, 10)
  console.log("=====",param.id)
  param.page_number = 1
  param.type = ""
  await teacherGetOneEnroll(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      form.contest = resp.data.list[0].contest
      form.contest_type = resp.data.list[0].contest_type
      form.major = resp.data.list[0].major
      form.semester = resp.data.list[0].semester
      form.name = resp.data.list[0].name
      form.contest_level = resp.data.list[0].contest_level
      form.college = resp.data.list[0].college
      form.student_school_id = resp.data.list[0].student_school_id
      form.contest_id = resp.data.list[0].contest_id
    }
  })
}

const uploadRef = ref(null); // 上传组件的引用，需要是 null，因为组件可能还没有挂载

const formPic = reactive({
  file: '',
})

// 清除表单
const handleReturn = () => {
  router.push(`/uploadGradeDetail/${form.contest_id}`)
};

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

// 创建表单
const handleCreate = async () => {
  form.enroll_id = parseInt(route.value.currentRoute.params.enroll_information_id, 10)
  // 假设 uploadRef.value 是一个具有 submit 方法的上传组件实例
  //if (uploadRef.value && typeof uploadRef.value.submit === 'function') {
  if (uploadRef.value && uploadRef.value.name !== "") {
    console.log("(((((((^^^^^^^^^^^^^^^^^^^676")
    formPic.file = uploadRef.value
    //发送请求到后端接口
    const resp = await uploadAxios.post('public/v1/upload', formPic)
    console.log("resp:",resp)
    if(resp.data.code === 200) {
      form.certificate = resp.data.data.imageurl
    }
  }

  try {
    const resp = await uploadGrade(form);
    console.log("addUser:", resp);
    if (resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '提交成功',
      });
    } else {
      ElMessage({
        type: 'error',
        message: '提交失败',
      });
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '提交失败',
    });
  }
};

onMounted(handleGetEnroll)
</script>


<style lang="scss">
.doUploadGrade-button {
  margin-left: 250px;
}
</style>