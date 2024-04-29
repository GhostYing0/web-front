<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="报名学生姓名">
        <el-input v-model="form.student_name" disabled/>
      </el-form-item>
      <el-form-item label="报名学生学号">
        <el-input v-model="form.student_school_id"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="组队操作" prop="role" class="filter-check">
        <el-radio v-model="form.handle_team" :label="1">创建队伍</el-radio>
        <el-radio v-model="form.handle_team" :label="2">加入队伍</el-radio>
      </el-form-item>
      <el-form-item label="创建队伍名" v-if="form.handle_team === 1">
        <el-input v-model="form.team_name"/>
      </el-form-item>
      <el-form-item label="加入队伍名" v-if="form.handle_team === 2">
        <el-input v-model="form.team_name"/>
      </el-form-item>
      <el-form-item label="报名竞赛名称">
        <el-input v-model="form.contest" disabled/>
      </el-form-item>
      <el-form-item label="竞赛类型">
        <el-input v-model="form.contest_type" disabled/>
      </el-form-item>
      <el-form-item label="报名竞赛级别">
        <el-input v-model="form.contest_level" disabled/>
      </el-form-item>
      <el-form-item label="学生所属学院">
        <el-input v-model="form.college"/>
      </el-form-item>
      <el-form-item label="学生所属专业">
        <el-input v-model="form.major"/>
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
      <el-form-item>
        <el-button type="primary" @click="Submit">提交</el-button>
        <el-button @click="handleClearForm">清空表单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {studentGetOneContest} from "@/api/contest";
import {onMounted, reactive, ref} from "vue";
import {router} from "@/router";
import store from "@/store";
import axios from "axios";
import {getToken} from "@/utils/auth";
import {uploadGrade} from "@/api/grade";
import {ElMessage} from "element-plus";
import {enrollContest} from "@/api/enroll";

const route = ref(router)

const form = reactive({
  contest_id: 0,
  handle_team: 1,
  contest: "",
  contest_type: "",
  contest_level: "",
  student_name: store.getters.name,
  student_school_id: "",
  team_name: "",
  major: 0,
  guidance_teacher: "",
  teacher_department: "",
  teacher_title: "",
  college: 0,
  phone: store.getters.phone,
  email: store.getters.email,
})

const param = reactive({
  id: -1,
})


const handleGetContest = async () => {
  param.id = parseInt(route.value.currentRoute.params.contest_id, 10)
  form.contest_id = parseInt(route.value.currentRoute.params.contest_id, 10)
  console.log("=====",param.id)
  param.page_number = 1
  param.type = ""
  await studentGetOneContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      form.contest = resp.data.list[0].contest
      form.contest_type = resp.data.list[0].contest_type
      form.contest_level = resp.data.list[0].contest_level
    }
  })
}

const Submit = () => {
  form.major = parseInt(form.major, 10)
  form.college = parseInt(form.college, 10)
  enrollContest(form).then(resp => {
    console.log("addUser:", resp)
    if(resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '报名成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: resp.message,
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '报名失败',
    })
  })
}

// 清除表单
const handleClearForm = () => {
  // form.username = store.getters.username;
  // form.contest = '';
  // form.grade = '';
  // form.certificate = '';
  // form.desc = '';
}

onMounted(handleGetContest)
</script>


<style scoped>

</style>