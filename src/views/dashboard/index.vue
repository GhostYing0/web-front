<template>
         <p class="dashtext" v-if="this.$store.getters.roles.includes('department_manager')">
           <p>欢迎系部管理员{{this.$store.getters.name}}</p>
           <p>使用高校学科竞赛信息管理系统</p>
         </p>
         <p class="dashtext" v-else-if="this.$store.getters.roles.includes('student')">
           <p>欢迎{{this.$store.getters.name}}同学</p>
           <p>使用高校学科竞赛信息管理系统</p>
         </p>
         <p class="dashtext" v-else-if="this.$store.getters.roles.includes('teacher')">
           <p>欢迎{{this.$store.getters.name}}教师</p>
           <p>使用高校学科竞赛信息管理系统</p>
         </p>
         <p class="dashtext" v-else-if="this.$store.getters.roles.includes('manager')">
           <p>欢迎系统管理员</p>
           <p>{{this.$store.getters.username}}</p>
           <p>使用高校学科竞赛信息管理系统</p>
         </p>
         <p class="dashtext" v-else>欢迎使用高校学科竞赛信息管理系统</p>
        <el-button type="success" @click="visit" class="dashboard-button" v-if="this.$store.getters.roles.length === 0">进入系统</el-button>
</template>

<script>
    import {router} from '../../router'
    import {store} from "@/store";
    export default {
        name: "DashBoard",


        methods: {
            visit() {
                router.push("/contestInformationManager")
            }
        }
    }
</script>

<style lang="scss">
.dashboard-button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30vh;

}
.dashtext{
    font-size: 50px;
}
</style>