<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 800px">
      <el-form-item>
        <el-text style="font-size: 20px">请填写报名信息</el-text>
      </el-form-item>
      <div class="contest-form">
        <el-form-item label="报名竞赛名称">
          <el-input v-model="form.contest" disabled style="max-width: 300px" />
        </el-form-item>
        <el-form-item label="竞赛类型">
          <el-input v-model="form.contest_type" style="max-width: 90px" disabled/>
        </el-form-item>
        <el-form-item label="报名竞赛级别">
          <el-input v-model="form.contest_level" style="max-width: 80px" disabled/>
        </el-form-item>
      </div>
      <el-form-item label="报名学生姓名">
        <el-input v-model="form.student_name" style="max-width: 150px" disabled/>
      </el-form-item>
      <el-form-item label="报名学生学号">
        <el-input v-model="form.student_school_id" style="max-width: 150px" />
      </el-form-item>
      <el-form-item label="电话号码" >
        <el-input v-model="form.phone" style="max-width: 400px"/>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" style="max-width: 400px"/>
      </el-form-item>
      <el-form-item v-if="form.is_group === 1" label="组队操作" prop="role" class="filter-check">
        <el-radio v-model="form.handle_team" :label="1">创建队伍</el-radio>
        <el-radio v-model="form.handle_team" :label="2">加入队伍</el-radio>
      </el-form-item>
      <el-form-item  label="创建队伍名" v-if="form.is_group === 1 && form.handle_team === 1">
        <el-input v-model="form.team_name" style="max-width: 250px"/>
      </el-form-item>
      <el-form-item label="加入队伍名" v-if="form.handle_team === 2">
        <el-input v-model="form.team_name" style="max-width: 250px"/>
      </el-form-item>
      <el-form-item label="学生所属学院">
        <el-input v-model="form.college" style="max-width: 250px"/>
      </el-form-item>
      <el-form-item label="学生所属专业">
        <el-input v-model="form.major" style="max-width: 250px"/>
      </el-form-item>
      <el-form-item label="指导老师姓名">
        <el-input v-model="form.guidance_teacher" style="max-width: 150px"/>
      </el-form-item>
      <el-form-item label="指导老师所属院系">
        <el-input v-model="form.teacher_department" style="max-width: 150px"/>
      </el-form-item>
      <el-form-item label="指导老师职称">
        <el-input v-model="form.teacher_title" style="max-width: 150px"/>
      </el-form-item>
      <el-form-item>
        <el-button class="enroll-detail-button" type="primary" @click="Submit">提交</el-button>
        <el-button class="enroll-detail-button" @click="handleReturn">返回</el-button>
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
import {enrollContest, addEnrollInformation} from "@/api/enroll";

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
  major: "",
  guidance_teacher: "",
  teacher_department: "",
  teacher_title: "",
  college: "",
  phone: store.getters.phone,
  email: store.getters.email,
  is_group: 2,
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
      form.is_group = resp.data.list[0].is_group
    }
  })
}

const Submit = () => {
  if(store.getters.roles.includes("student")) {
    enrollContest(form).then(resp => {
      console.log("addUser:", resp)
      if (resp.code === 200) {
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
}

// 清除表单
const handleReturn = () => {
  router.push("/displayContest")
}

onMounted(handleGetContest)
</script>


<style lang="scss">
.enroll-detail-button {
  margin-left: 10px;
}
.contest-form {
  display: flex;
  flex-direction: row;
  gap: 1px;
}
</style>