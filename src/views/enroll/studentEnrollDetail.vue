<template>
  <div>
    <el-form :model="information" label-width="auto" style="max-width: 800px">
      <el-form-item label="竞赛名称">
        <el-input v-model="information.contest" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="竞赛所属项目">
        <el-input v-model="information.contest_entry" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="报名时间">
        <el-input v-model="information.create_time" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-tag v-if="information.state === 3" type="primary">审核中</el-tag>
        <el-tag v-else-if="information.state === 1" type="success">通过</el-tag>
        <el-tag v-else-if="information.state === 2" type="danger">未通过</el-tag>
        <el-tag v-else-if="information.state === 4" type="warning">已撤回</el-tag>
      </el-form-item>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row">
          <el-form-item label="学生姓名">
            <el-input v-model="information.name" style="width: 150px"  disabled />
          </el-form-item>
          <el-form-item label="学生所属学院">
            <el-input v-model="information.college" style="width: 150px"  disabled />
          </el-form-item>
          <el-form-item label="学生专业">
            <el-input v-model="information.major"  style="width: 150px" disabled />
          </el-form-item>
        </div>
        <div style="display: flex; flex-direction: row">
          <el-form-item label="班级">
            <el-input v-model="information.student_class" style="width: 150px" disabled />
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="information.student_school_id" style="width: 150px"  disabled />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="电话号码">
        <el-input v-model="information.phone"  style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="information.email"  style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="所属队伍" v-if="information.is_group === 1">
        <el-input v-model="information.team_name" style="width: 200px" disabled/>
      </el-form-item>
      <el-form-item label="指导教师姓名">
        <el-input v-model="information.teacher_name" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="指导教师所在系">
        <el-input v-model="information.department" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="指导教师职称">
        <el-input v-model="information.title" style="width: 200px" disabled />
      </el-form-item>
      <el-form-item label="驳回原因" v-if="information.state === 2">
        <el-input v-model="information.reject_reason" style="width: 200px" disabled />
      </el-form-item>
    </el-form>

    <div>
    </div>
  </div>
  <el-button @click="returnDesktop()" type="success" size="default">返回</el-button>

</template>

<script setup>
import { ref , reactive, onMounted, watch} from 'vue'
import {viewContest, getContestType, departmentManagerSearchEnroll} from "@/api/contest";
import {ElMessage} from "element-plus";
import {router} from "@/router"
import store from "@/store";
import {enrollContest, getUserEnroll} from "@/api/enroll";
import { defineProps, defineEmits } from 'vue'
import {info} from "sass";

const route = ref(router)

const param = reactive({
  id: -1,
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
      information.is_group = resp.data.list[0].is_group
      information.student_school_id = resp.data.list[0].student_school_id
      information.phone = resp.data.list[0].phone
      information.email = resp.data.list[0].email
      information.student_class = resp.data.list[0].student_class
      information.teacher_name = resp.data.list[0].teacher_name
      information.department = resp.data.list[0].department
      information.state = resp.data.list[0].state
      information.title = resp.data.list[0].title
      information.reject_reason = resp.data.list[0].reject_reason
    }
  })
}


const returnDesktop = () => {
  router.back()
  return
  // if (store.getters.roles.includes('manager')) {
  //   router.push("/enrollManage")
  //   return
  // }
  // router.push("/searchEnrollResult")
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