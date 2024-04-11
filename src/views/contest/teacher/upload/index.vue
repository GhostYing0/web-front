<template>
  教师上传竞赛
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="竞赛名称">
      <el-input v-model="form.contest" />
    </el-form-item>
    <div class="m-4">
      竞赛类型
      <el-cascader
          v-model="item"
          :options="options"
          :props="props"
          filterable
          @change="handleFilter"
      />
    </div>
<!--    <el-form-item label="电话号码">-->
<!--      <el-input v-model="form.phone" />-->
<!--    </el-form-item>-->
<!--    <el-form-item label="电子邮箱">-->
<!--      <el-input v-model="form.email" />-->
<!--    </el-form-item>-->
    <el-form-item label="开赛时间" prop="create_time">
      <!--<el-input v-model="form.create_time"></el-input>-->
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="Select date and time"
            :shortcuts="shortcuts"
        />
      </div>
    </el-form-item>
    <el-form-item label="报名截止时间" prop="create_time">
      <!--<el-input v-model="form.create_time"></el-input>-->
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="form.deadline"
            type="datetime"
            placeholder="Select date and time"
            :shortcuts="shortcuts"
        />
      </div>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleCreate">提交</el-button>
      <el-button @click="handleClearForm">清空表单</el-button>
    </el-form-item>
  </el-form>

</template>

<script setup>
import {uploadContest} from '@/api/enroll'
import {ElMessage} from 'element-plus';
import store from "@/store";
import {reactive} from "vue";

const form = reactive({
  username: store.getters.username,
  school: store.getters.school,
  contest: '',
  phone: '',
  email: '',
  start_time: "",
  deadline: "",
  desc: ''
})

const handleClearForm = () => {
  this.form = {
    username: store.getters.username,
    school: store.getters.school,
    contest: '',
    phone: '',
    email: '',
    start_time: "",
    deadline: "",
    desc: ''
  }
}
const handleCreate = () => {
  // 表单是添加状态
  console.log("handleCreate")
  uploadContest(form).then(resp => {
    console.log("addUser:", resp)
    if (resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '提交成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '提交失败',
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '提交失败',
    })
  })
}
</script>

<style scoped>

</style>
