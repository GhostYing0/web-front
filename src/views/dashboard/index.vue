<template>
         <p class="dashtext" v-if="this.$store.getters.roles.includes('department_manager')">department_manager</p>
         <p class="dashtext" v-else-if="this.$store.getters.roles.includes('student')">student</p>
         <p class="dashtext" v-else-if="this.$store.getters.roles.includes('teacher')">teacher</p>
         <p class="dashtext" v-else-if="this.$store.getters.roles.includes('manager')">manager</p>
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
    font-size: 100px;
}
</style>