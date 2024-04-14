<template>
      <div>
     <el-menu
    :default-active="defaultActive"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item index="/gradeProcessing">审核中</el-menu-item>
    <el-menu-item index="/gradeRejected">被驳回</el-menu-item>
  </el-menu>
  <el-main>
  <router-view/>
</el-main>
  </div>
  </template>
  
<script setup>  
import { router } from '@/router'
import { onMounted, ref } from 'vue'  
  
const defaultActive = ref("/gradeProcessing")
const handleSelect = (key, keyPath) => {  
  console.log(key, keyPath)  
}  

const initDash = () => {
  router.push("/gradeProcessing")
}

onMounted(initDash)
</script>