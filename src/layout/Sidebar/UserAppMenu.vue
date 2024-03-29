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
                            <el-menu-item index="/display_contest">展示竞赛信息</el-menu-item>
                            <el-menu-item index="/add_user">添加用户</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3" class="menu-border">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>登录</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="/Login">管理员登陆</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="4" class="menu-border">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
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