<template>
  <div>
    <div class="desc">
      <el-descriptions title="竞赛详情" border label-align="">
        <el-descriptions-item width="10vw" label=竞赛名 >{{contestName}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="竞赛类型">{{contestType}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="竞赛级别">{{contestLevel}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="开赛时间">{{contestStartTime}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="报名开始时间">{{contestEnrollTime}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="报名截止时间">{{contestDeadline}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="竞赛介绍">{{contestDesc}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
    </div>

    <el-button @click="returnDesktop()" type="success" size="small" >返回</el-button>
  </div>
  
</template>
  
  <script setup>
  import { ref , reactive, onMounted} from 'vue'
  import {viewContest, getContestType} from "@/api/contest";
  import {ElMessage} from "element-plus";
  import {router} from "@/router"
  import store from "@/store";
  import {enrollContest} from "@/api/enroll";
  import { defineProps, defineEmits } from 'vue'  
   
  const emit = defineEmits(['sendToParent'])
  const props = defineProps({
  contestName: {
    type: String,
    required: true,
  },
  contestDesc: {
    type: String,
    required: true
  },
  contestStartTime: {
    type: String,
    required: true
  },
  contestDeadLine: {
    type: String,
    required: true
  },
  ContestEnrollTime: {
    type: String,
    required: true
  },
  contestType: {
    type: String,
    required: true
  },
  contestLevel: {
    type: String,
    required: true
  }
})

  const returnDesktop = () => {
    emit('sendToParent',)
  }
  </script>
  
  <style lang="scss">
  .desc {
    width:60vw;
    margin-left:auto;
    margin-right: auto;
  
  }
  </style>