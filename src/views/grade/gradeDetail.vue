<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 800px">
      <div class="contest-form">
        <el-form-item label="报名竞赛名称">
          <el-input v-model="form.contest" disabled/>
        </el-form-item>
        <el-form-item label="竞赛类型">
          <el-input v-model="form.contest_type" disabled/>
        </el-form-item>
        <el-form-item label="报名竞赛级别">
          <el-input v-model="form.contest_level" disabled/>
        </el-form-item>
      </div>
      <el-form-item label="获奖学生姓名">
        <el-input v-model="form.name" disabled style="max-width: 200px"/>
      </el-form-item>
      <el-form-item label="获奖学生学号">
        <el-input v-model="form.student_school_id" disabled style="max-width: 200px"/>
      </el-form-item>
      <el-form-item label="所属学院">
        <el-input v-model="form.college" disabled style="max-width: 300px"/>
      </el-form-item>
      <el-form-item label="所属专业">
        <el-input v-model="form.major" disabled style="max-width: 300px"/>
      </el-form-item>
      <el-form-item label="获奖时间">
        <div class="demo-date-picker">
          <el-date-picker
              v-model="form.reward_time"
              type="datetime"
              disabled
              placeholder="选择时间"
              :size="size"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
      </el-form-item>
      <el-form-item label="指导老师姓名">
        <el-input v-model="form.guidance_teacher_name" disabled style="max-width: 300px"/>
      </el-form-item>
      <el-form-item label="指导老师所属院系">
        <el-input v-model="form.department" disabled style="max-width: 300px"/>
      </el-form-item>
      <el-form-item label="指导老师职称">
        <el-input v-model="form.title" disabled style="max-width: 300px"/>
      </el-form-item>
      <el-form-item label="获奖级别" class="filter-check">
        <el-input v-model="form.prize" disabled style="max-width: 300px"/>
      </el-form-item>
      <el-form-item label="证书">
        <el-image :src="form.certificate"
                  style="width: 500px; height: 300px"
                  fit="contain"
                  :preview-src-list="[form.certificate]"
                  :initial-index="1">

        </el-image>
      </el-form-item>
      <el-form-item>
        <el-button class="doUploadGrade-button" type="primary" @click="handleReturn()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {teacherGetOneEnroll} from "@/api/enroll";
import {onMounted, reactive, ref} from "vue";
import {router} from "@/router";
import axios from "axios";
import {getToken} from "@/utils/auth";
import {searchGrade, uploadGrade} from "@/api/grade";
import store from "@/store";
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
  guidance_teacher_name: "",
  department: "",
  title: "",
  prize: "",
  college: "",
  certificate: "",
})

const param = reactive({
  id: -1,
})

const handleReturn = () => {
  if(store.getters.roles.includes("student")) {
    router.push(`/SearchGrade`)
    return
  } else if(store.getters.roles.includes("teacher")) {
    router.push(`/uploadGradeDetailA/${form.contest_id}`)
    return
  } else if(store.getters.roles.includes("manager")) {
    router.back()
  } else if(store.getters.roles.includes("department_manager")) {
    router.back()
    return
  }
};

const handleGetGrade = async () => {
  param.id = parseInt(route.value.currentRoute.params.grade_id, 10)
  console.log("=====",param.id)
  param.page_number = 1
  param.type = ""
  await searchGrade(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      form.contest = resp.data.list[0].contest
      form.contest_type = resp.data.list[0].contest_type
      form.major = resp.data.list[0].major
      form.semester = resp.data.list[0].semester
      form.name = resp.data.list[0].name
      form.contest_level = resp.data.list[0].contest_level
      form.college = resp.data.list[0].college
      form.guidance_teacher_name = resp.data.list[0].guidance_teacher_name
      form.title = resp.data.list[0].title
      form.department = resp.data.list[0].department
      form.student_school_id = resp.data.list[0].student_school_id
      form.contest_id = resp.data.list[0].contest_id
      form.prize = resp.data.list[0].grade
      form.certificate = resp.data.list[0].certificate
      form.reward_time = resp.data.list[0].reward_time
    }
  })
}




onMounted(handleGetGrade)
</script>


<style lang="scss">
.doUploadGrade-button {
  margin-left: 120px;
}
.contest-form {
  display: flex;
  flex-direction: row;
  gap: 1px;
}
</style>