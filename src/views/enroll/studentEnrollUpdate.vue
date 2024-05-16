<template>
  <div>
    <el-form :model="information" label-width="auto" style="max-width: 600px">
      <el-form-item label="竞赛名称">
        <el-input v-model="information.contest" disabled />
      </el-form-item>
      <el-form-item label="竞赛所属项目">
        <el-input v-model="information.contest_entry" disabled />
      </el-form-item>
      <el-form-item label="报名时间">
        <el-input v-model="information.create_time" disabled />
      </el-form-item>
      <el-form-item label="所属队伍" v-if="information.is_group === 1">
        <el-input v-model="form.team_name" />
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input v-model="information.name" disabled />
      </el-form-item>
      <el-form-item label="学生所属学院">
        <el-input v-model="information.college" disabled />
      </el-form-item>
      <el-form-item label="学生专业">
        <el-input v-model="information.major" disabled />
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="information.student_school_id" disabled />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="information.student_class" disabled/>
      </el-form-item>
      <el-form-item label="指导教师姓名">
        <el-input v-model="form.teacher_name" />
      </el-form-item>
      <el-form-item label="指导教师所在系">
        <el-input v-model="form.department" />
      </el-form-item>
      <el-form-item label="指导教师职称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-input v-model="information.state" disabled />
      </el-form-item>
      <el-form-item label="驳回原因" v-if="information.state === 2">
        <el-input v-model="information.reject_reason" disabled />
      </el-form-item>
    </el-form>

    <div>
    </div>

    <el-button @click="returnDesktop()" type="info" size="small" >返回</el-button>
    <el-button @click="UpdateEnroll()" type="success" size="small" >提交</el-button>
  </div>

</template>

<script setup>
import { ref , reactive, onMounted, watch} from 'vue'
import {viewContest, getContestType, departmentManagerSearchEnroll} from "@/api/contest";
import {ElMessage} from "element-plus";
import {router} from "@/router"
import store from "@/store";
import {enrollContest, getUserEnroll, uploadContest, studentUpdateEnrollContest, updateEnroll} from "@/api/enroll";
import { defineProps, defineEmits } from 'vue'
import {info} from "sass";

const route = ref(router)

const param = reactive({
  id: -1,
})

const form = reactive({
  id: -1,
  phone:"",
  email:"",
  student_class:"",
  teacher_name: "",
  department: "",
  title: "",
})

const handleContestIDChange = (newContestID) => {
  param.id = newContestID
  handleShowContest()
  // 在这里添加你想要执行的代码
}

const information = reactive({
})

const handleShowContest = async () => {
  console.log("asdasdasdadas:",route.value.currentRoute.params.enroll_information_id)
  param.id = parseInt(route.value.currentRoute.params.enroll_information_id, 10)
  await getUserEnroll(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      information.id = resp.data.list[0].id
      information.contest = resp.data.list[0].contest
      information.contest_entry = resp.data.list[0].contest_entry
      information.create_time = resp.data.list[0].create_time
      information.team_name = resp.data.list[0].team_name
      information.name = resp.data.list[0].name
      information.college = resp.data.list[0].college
      information.major = resp.data.list[0].major
      information.student_school_id = resp.data.list[0].student_school_id
      information.phone = resp.data.list[0].phone
      information.email = resp.data.list[0].email
      information.is_group = resp.data.list[0].is_group
      information.student_class = resp.data.list[0].student_class
      information.teacher_name = resp.data.list[0].teacher_name
      information.department = resp.data.list[0].department
      information.state = resp.data.list[0].state
      information.title = resp.data.list[0].title
      information.reject_reason = resp.data.list[0].reject_reason

      form.id = information.id
      form.phone = information.phone
      form.email = information.email
      form.student_class = information.student_class
      form.teacher_name = information.teacher_name
      form.department = information.department
      form.title = information.title
      form.team_name = information.team_name
    }
  })
}

const UpdateEnroll = () => {
  studentUpdateEnrollContest(form).then(resp => {
    console.log("addUser:", resp)
    if (resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '修改成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '修改失败',
    })
  })
}

const returnDesktop = () => {
  if(store.getters.roles.includes("manager")) {
    router.push("/enrollManage")
    return
  }
  router.push("/searchEnrollResult")
}

onMounted(handleShowContest)
</script>

<style lang="scss">
.desc {
  width:60vw;
  margin-left:auto;
  margin-right: auto;

}
</style>