<template>
         <p class="dashtext" v-if="this.$store.getters.roles.includes('department_manager')">
           <p>欢迎{{this.$store.getters.department}}系部管理员{{this.$store.getters.name}}</p>
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
           <p>欢迎系统管理员{{this.$store.getters.username}}</p>
           <p>使用高校学科竞赛信息管理系统</p>
         </p>
         <p class="dashtext" v-else>欢迎使用高校学科竞赛信息管理系统</p>
  <div v-if="this.$store.getters.roles.includes('student')" style="margin-top: 100px"><span style="font-size: 30px">网站信息概述</span><StudentStatistic/></div>
          <div v-if="this.$store.getters.roles.includes('teacher')" style="margin-top: 100px"><span style="font-size: 30px">网站信息概述</span><TeacherStatistic/></div>
          <div v-if="this.$store.getters.roles.includes('department_manager')" style="margin-top: 100px"><span style="font-size: 30px">网站信息概述</span><DepartmentManagerStatistic/></div>
          <div v-if="this.$store.getters.roles.includes('manager')" style="margin-top: 100px"><span style="font-size: 30px">网站信息概述</span><ManagerStatistic/></div>
        <el-button type="success" @click="visit" class="dashboard-button" v-if="this.$store.getters.roles.length === 0">进入系统</el-button>
</template>

<script>
    import {router} from '../../router'
    import {store} from "@/store";
    import StudentStatistic from "./student_statistic.vue"
    import TeacherStatistic from "./teacher_statistic.vue"
    import DepartmentManagerStatistic from "./department_statistic.vue"
    import ManagerStatistic from "./manager_statistic.vue"
    export default {
        name: "DashBoard",
        components: {  
          // 局部注册Statistic组件
          StudentStatistic,
          TeacherStatistic,
          DepartmentManagerStatistic,
          ManagerStatistic
        },

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
  margin-top: 100px;
    font-size: 40px;
}
</style>