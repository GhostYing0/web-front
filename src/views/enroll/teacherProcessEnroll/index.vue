<template>
  <div>
 <el-menu
:default-active="defaultActive"
class="el-menu-demo"
mode="horizontal"
@select="handleSelect"
router
>
<el-menu-item index="/enrollProcessing">审核中</el-menu-item>
<el-menu-item index="/enrollRejected">被驳回</el-menu-item>
</el-menu>
<el-main>
<router-view/>
</el-main>
</div>
</template>

<script setup>  
import { router } from '@/router'
import { ref ,onMounted} from 'vue'  
const defaultActive = ref("/enrollProcessing")
const handleSelect = (key, keyPath) => { 
  console.log("==============", key, "  ",keyPath) 
}  
const initDash = () => {
  router.push("/enrollProcessing")
}

onMounted(initDash)
</script>