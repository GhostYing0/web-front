<template>
    <el-row class="tac">
        <el-col :span="24">
            <div class="content">
              <h2 class="mb-2" style="background-color: #2c3e50"><span class="text">导航栏</span></h2>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        router
                >
                    <el-sub-menu index="1" class="menu-border">
                        <template #title>
                            <el-icon style="color: white"><location /></el-icon>
                            <span class="text">报名信息模块</span>
                        </template>
                        <el-menu-item class="menu-item" index="/enrollContest" v-if="store.getters.roles.includes('student')"><span class="text">报名竞赛</span></el-menu-item>
                      <el-menu-item class="menu-item" index="/departmentDisplayEnroll" v-if="store.getters.roles.includes('department_manager')"><span class="text">查看报名结果</span></el-menu-item>
                      <el-menu-item class="menu-item" index="/searchEnrollResult" v-if="store.getters.roles.includes('student')"><span class="text">查看报名结果</span></el-menu-item>
                      <el-menu-item class="menu-item" index="/teacherViewEnroll" v-if="store.getters.roles.includes('teacher')"><span class="text">查看报名信息</span></el-menu-item>
                      <el-menu-item class="menu-item" index="/enrollProcess" v-if="store.getters.roles.includes('department_manager')"><span class="text">审核报名</span></el-menu-item>
                      <!--<el-menu-item class="menu-item" index="/enrollProcess" v-if="store.getters.roles.includes('teacher')"><span class="text">审核报名</span></el-menu-item>-->
                    </el-sub-menu>
                    <el-sub-menu index="2" class="menu-border">
                        <template #title>
                            <el-icon style="color: white"><location /></el-icon>
                            <span class="text">成绩信息模块</span>

                        </template>
                        <el-menu-item class="menu-item" index="/uploadGrade" v-if="store.getters.roles.includes('teacher')"><span class="text">上传成绩</span></el-menu-item>
                      <el-menu-item class="menu-item" index="/departmentDisplayGrade" v-if="store.getters.roles.includes('department_manager')"><span class="text">查看成绩</span></el-menu-item>
                        <!--<el-menu-item class="menu-item" index="/uploadGrade" v-if="store.getters.roles.includes('student')"><span class="text">上传成绩</span></el-menu-item>-->
                        <el-menu-item class="menu-item" index="/SearchGrade" v-if="store.getters.roles.includes('student')"><span class="text">查看成绩</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/teacherViewGrade" v-if="store.getters.roles.includes('teacher')"><span class="text">查看成绩信息</span></el-menu-item>
                      <el-menu-item class="menu-item" index="/gradeProcess" v-if="store.getters.roles.includes('department_manager')"><span class="text">审核成绩</span></el-menu-item>
                        <!--<el-menu-item class="menu-item" index="/gradeProcess" v-if="store.getters.roles.includes('teacher')"><span class="text">审核成绩</span></el-menu-item>-->
                    </el-sub-menu>
                    <el-sub-menu index="3" class="menu-border">
                        <template #title>
                            <el-icon style="color: white"><location /></el-icon>
                            <span class="text">竞赛信息模块</span>
                        </template>
                        <el-menu-item class="menu-item" index="/displayContest"><span class="text">查看竞赛信息</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/contestProcess" v-if="store.getters.roles.includes('department_manager')"><span class="text">竞赛信息审核</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/displayMyContest" v-if="store.getters.roles.includes('teacher')"><span class="text">查看上传竞赛</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/uploadContest" v-if="store.getters.roles.includes('teacher')"><span class="text">上传竞赛</span></el-menu-item>
                    </el-sub-menu>
            
                </el-menu>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'
    import store from "@/store";
    const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
    }
</script>

<style>
    .tac {
        width: 100%;
        height: 100%;
        border: 1px solid #cccccc;
      background-color: #2c3e50;

    }
    .content {
        background-color: white;
    }
    .menu-border {
      background-color: #2c3e50;
    }
    .text {
      color:white;
    }
    .menu-item {
      background-color: #2c3e50;
    }
    .menu-item:hover {
      background-color: black;
    }
</style>