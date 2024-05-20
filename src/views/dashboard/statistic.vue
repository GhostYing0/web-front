<template>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="studentData.contest_count" v-if="this.$store.getters.roles.includes('student')">
            {{studentData.contest_count}}
            <template #title>
              <div style="display: inline-flex; align-items: center">
                <p v-if="this.$store.getters.roles.includes('student')">当前可报名竞赛数量</p>
                <p v-if="this.$store.getters.roles.includes('teacher')">您已提交成功竞赛数量</p>
                <p v-if="this.$store.getters.roles.includes('department_manager')">已审核竞赛数</p>
                <p v-if="this.$store.getters.roles.includes('manager')">系统审核通过竞赛数</p>
                <el-tooltip
                  effect="dark"
                  content="Number of users who logged into the product in one day"
                  placement="top"
                >
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
                <p v-if="this.$store.getters.roles.includes('student')"></p>
                <p v-if="this.$store.getters.roles.includes('teacher')">审核驳回竞赛数:</p>
                <p v-if="this.$store.getters.roles.includes('department_manager')">待审核竞赛数:</p>
                <p v-if="this.$store.getters.roles.includes('manager')">系统总竞赛数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="studentData.enroll_pass_count" v-if="this.$store.getters.roles.includes('student')">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                <p v-if="this.$store.getters.roles.includes('student')">您已报名成功竞赛数</p>
                <p v-if="this.$store.getters.roles.includes('teacher')">您上传的竞赛报名成功:</p>
                <p v-if="this.$store.getters.roles.includes('department_manager')">待审核报名数:</p>
                <p v-if="this.$store.getters.roles.includes('manager')">系统报名信息审核通过</p>
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
              <p v-if="this.$store.getters.roles.includes('student')">审核中:<span class="blue">{{studentData.enroll_process_count}}</span></p>
              <p v-if="this.$store.getters.roles.includes('teacher')"></p>
              <p v-if="this.$store.getters.roles.includes('department_manager')">待审核报名数</p>
              <p v-if="this.$store.getters.roles.includes('manager')">系统报名信息审核通过</p>
              <p>&nbsp&nbsp&nbsp</p>
              <p v-if="this.$store.getters.roles.includes('student')">被驳回:<span class="red">{{studentData.enroll_reject_count}}</span></p>
              <p v-if="this.$store.getters.roles.includes('department_manager')">驳回报名:</p>
              <p v-if="this.$store.getters.roles.includes('manager')">系统总报名信息数:</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="studentData.grade_count" title="New transactions today" v-if="this.$store.getters.roles.includes('student')">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                <p v-if="this.$store.getters.roles.includes('student')">您的竞赛获奖数量</p>
                <p v-if="this.$store.getters.roles.includes('teacher')">您审核通过的获奖信息</p>
                <p v-if="this.$store.getters.roles.includes('department_manager')">待审核获奖信息</p>
                <p v-if="this.$store.getters.roles.includes('manager')">系统审核通过获奖信息</p>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <p v-if="this.$store.getters.roles.includes('student')"></p>
              <p v-if="this.$store.getters.roles.includes('teacher')">审核中获奖信息:
                <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
              </p>
              <p v-if="this.$store.getters.roles.includes('department_manager')">驳回获奖信息:
                <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
              </p>
              <p v-if="this.$store.getters.roles.includes('manager')">系统总获奖信息数
                <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
  import store from "@/store"
  import {studentStatistic, teacherStatistic, departmentStatistic, managerStatistic} from "@/api/statistic"
  import {
    ArrowRight,
    CaretBottom,
    CaretTop,
    Warning,
  } from '@element-plus/icons-vue'
  import {onMounted, reactive} from "vue";

  const studentData = reactive ({
    contest_count: 0,
    enroll_pass_count: 0,
    enroll_reject_count: 0,
    enroll_process_count: 0,
    grade_count: 0,
  })

  const initStatistic = () => {
    if(store.getters.roles.includes("student")) {
      studentStatistic().then((resp) => {
        studentData.contest_count = resp.data.contest_count
        studentData.enroll_pass_count = resp.data.enroll_pass_count
        studentData.enroll_reject_count = resp.data.enroll_reject_count
        studentData.enroll_process_count = resp.data.enroll_process_count
        studentData.grade_count = resp.data.grade_count
      }).catch((error) => {
        console.error(error)
      })
    } else if (store.getters.roles.includes("teacher")) {
      teacherStatistic().then((resp) => {

      }).catch((error) => {
        console.error(error)
      })
    } else if (store.getters.roles.includes("department_manager")) {
      departmentStatistic().then((resp) => {

      }).catch((error) => {
        console.error(error)
      })
    } else if (store.getters.roles.includes("manager")) {
      managerStatistic().then((resp) => {

      }).catch((error) => {
        console.error(error)
      })
    }
  }

  onMounted(initStatistic)
  </script>
  
  <style scoped>
  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }
  
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
  
  .statistic-card {
    height: 100px ;
    border-style: solid;
    padding: 20px;
    border-width: 1px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
  }
  
  .statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 20px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
  }
  
  .statistic-footer .footer-item {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: center;
  }
  
  .statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
  }
  
  .green {
    color: var(--el-color-success);
  }
  .blue {
    color: var(--el-color-primary);
  }
  .red {
    color: var(--el-color-error);
  }
  </style>
  