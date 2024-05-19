<template>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="98500">
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
                <p v-if="this.$store.getters.roles.includes('manager')">系统审核通过竞赛数</p>
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
          </div>
        </div>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
  import {store} from "@/store"
  import {
    ArrowRight,
    CaretBottom,
    CaretTop,
    Warning,
  } from '@element-plus/icons-vue'
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
  .red {
    color: var(--el-color-error);
  }
  </style>
  