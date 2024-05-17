<template>
    <el-row class="tac">
        <el-col :span="24">
            <div class="content">
              <h2 class="mb-2" style="background-color: #2c3e50;"><span class="text">导航栏</span></h2>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    router
            >
                <el-sub-menu index="/enrollContest" class="menu-border">
                    <template #title>
                        <el-icon style="color: white"><location /></el-icon>
                        <span class="text">报名信息管理</span>
                    </template>
                        <el-menu-item class="menu-item" index="/enrollManage"><span class="text">报名信息预览</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/enrollManage"><span class="text">添加报名信息</span></el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2" class="menu-border">
                    <template #title>
                        <el-icon style="color: white"><location /></el-icon>
                        <span class="text">竞赛信息管理</span>
                    </template>
                        <el-menu-item class="menu-item" index="/contestManage"><span class="text">竞赛信息预览</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/contestManage"><span class="text">添加竞赛信息</span></el-menu-item>
                        <!--<el-menu-item class="menu-item" index="/contestProcess"><span class="text">竞赛信息审核</span></el-menu-item>-->
                </el-sub-menu>
                <el-sub-menu index="3" class="menu-border">
                    <template #title>
                        <el-icon style="color: white"><location /></el-icon>
                        <span class="text">用户信息管理</span>
                    </template>
                        <el-menu-item class="menu-item" index="/studentManage"><span class="text">学生信息</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/teacherManage"><span class="text">教师信息</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/managerManage"><span class="text">系统管理人员账号管理</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/departmentManagerManage"><span class="text">系部管理员账号管理</span></el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4" class="menu-border">
                    <template #title>
                        <el-icon style="color: white"><location /></el-icon>
                        <span class="text">成绩信息管理</span>
                    </template>
                        <el-menu-item class="menu-item" index="/gradeManage"><span class="text">成绩信息预览</span></el-menu-item>
                        <el-menu-item class="menu-item" index="/gradeManage"><span class="text">添加成绩信息</span></el-menu-item>
                </el-sub-menu>
             <!-- <el-sub-menu index="5" class="menu-border">
                <template #title>
                    <el-icon style="color: white"><location /></el-icon>
                    <span class="text">数据统计与分析</span>
                </template>
                <el-menu-item class="menu-item" index="/analysis"><span class="text">进入</span></el-menu-item>
                </el-sub-menu>-->
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
    import {ref, computed} from "vue"
    const route = ref(router)
    import {router} from "@/router"
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

    }
    .content {
        background-color: white;
    }
    .menu-border {
        border: 1px solid #cccccc;
    }
</style>