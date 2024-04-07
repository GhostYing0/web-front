<template>
    <el-row class="tac">
        <el-col :span="24">
            <div class="content">
                <h5 class="mb-2">导航栏</h5>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        router
                >
                    <el-sub-menu index="1" class="menu-border">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>报名信息模块</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="/enrollContest">报名竞赛</el-menu-item>
                            <el-menu-item index="/searchEnrollResult">查看报名结果</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2" class="menu-border">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>成绩信息模块</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="/uploadGrade">上传成绩</el-menu-item>
                            <el-menu-item index="/SearchGrade">查看成绩</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3" class="menu-border">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>竞赛信息模块</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="/Login">管理员登陆</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="4" class="menu-border" v-if="store.getters.roles.includes('teacher')">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>审核信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="processEnroll">审核报名</el-menu-item>
                            <el-menu-item index="processGrade">审核成绩</el-menu-item>
                        </el-menu-item-group>
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
        border: 1px solid #ccc;

    }
    .content {
        background-color: white;
    }
    .menu-border {
        border: 1px solid #ccc;
    }
</style>