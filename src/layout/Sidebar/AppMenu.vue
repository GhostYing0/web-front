<template>
    <div class="logo">

    </div>
    <el-menu
            default-active="2"
            :collapse-transition="false"
            @open="handleOpen"
            @close="handleClose"
            background-color="#ebf1f5"
            text-color="#606266"
            active-text-color="#2F74FF"
            class="menu"
            router
    >
        <el-sub-menu index="1" class="base-menu">
            <template #title>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Test One">
                <!--<template #title><span>Group One</span></template>-->
                <el-menu-item index="/display_contest">展示竞赛信息</el-menu-item>
                <el-menu-item index="/add_user">添加用户</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Test Two">
                <el-menu-item index="/Login">管理员登陆</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4" class="derive-menu">
                <template #title><span>二级栏</span></template>
                <el-menu-item index="index">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
</script>

<style>
    .logo{
        height:80px;
        background: #e1eaf4;
    }
    .menu{
        min-height: calc(100vh - 80px);

    }

    .base-menu{
        color: red;
    }
    .derive-menu{
        color: blueviolet;
    }
</style>
