<template>
    <div>
   <el-menu
  :default-active="defaultActive"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  router
  >
  <el-menu-item index="/contestStatistic">竞赛分析</el-menu-item>
  <el-menu-item index="/contestTypeStatistic">竞赛类型统计</el-menu-item>
  <el-menu-item index="/enrollStatistic">报名统计</el-menu-item>
  <el-menu-item index="/schoolStatistic">学校报名成绩统计</el-menu-item>
  </el-menu>
  <el-main>
  <router-view/>
  </el-main>
  </div>
  </template>
  
  <script setup>  
  import { router } from '@/router'
  import { ref ,onMounted} from 'vue'  
  const defaultActive = ref("/contestStatistic")
  const handleSelect = (key, keyPath) => { 
    console.log("==============", key, "  ",keyPath) 
  }  
  const initDash = () => {
    router.push("/contestStatistic")
  }
  
  onMounted(initDash)
  </script>