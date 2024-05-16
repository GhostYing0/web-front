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
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="98500">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily active users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one day"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
              24%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="693700">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Monthly Active Users
                <el-tooltip
                    effect="dark"
                    content="Number of users who logged into the product in one month"
                    placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>month on month</span>
              <span class="red">
              12%
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="72000" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                New transactions today
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
              16%
              <el-icon>
                <CaretTop />
              </el-icon>
            </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
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