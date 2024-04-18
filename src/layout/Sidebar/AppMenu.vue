<template>
    <el-row class="tac">
        <el-col :span="24">
            <div class="content">
            <h2 class="mb-2" style="background-color: orange">导航栏</h2>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    router
            >
                <el-sub-menu index="/enrollContest" class="menu-border">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>报名信息管理</span>
                    </template>
                        <el-menu-item index="/enrollManage">进入</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2" class="menu-border">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>竞赛信息管理</span>
                    </template>
                        <el-menu-item index="/contestManage">竞赛信息展示</el-menu-item>
                        <el-menu-item index="/contestProcess">竞赛信息审核</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3" class="menu-border">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>用户信息管理</span>
                    </template>
                        <el-menu-item index="/studentManage">学生信息</el-menu-item>
                        <el-menu-item index="/teacherManage">教师信息</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4" class="menu-border">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>成绩信息管理</span>
                    </template>
                        <el-menu-item index="/gradeManage">进入</el-menu-item>
                </el-sub-menu>
              <el-sub-menu index="5" class="menu-border">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>数据统计与分析</span>
                </template>
                <el-menu-item index="/analysis">进入</el-menu-item>
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
        border: 1px solid #ccc;

    }
    .content {
        background-color: white;
    }
    .menu-border {
        border: 1px solid #ccc;
    }
</style>